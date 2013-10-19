(function () {
'use strict';

angular.module('charts', [])

    /*
     * BalanceChart
     */
    .factory('BalanceChart', ['$http', '$filter', '$q', function ($http, $filter, $q) {
        return {
            fetchData: function (params) {
                var me = this,
                    deferred = $q.defer();

                $http.get('/api/v1/data/balance/', {params: params}).then(function (result) {
                    var categories = [],
                        values = [],
                        options = {},
                        avg = 0;

                    $.extend(true, options, me.chartOptions);

                    for(var i in result.data) {
                        var data = {},
                            month = result.data[i],
                            category;

                        category = moment(month.period, 'YYYY-MM-DD').format('MMM YYYY');
                        categories.push(category);

                        data.renevues = parseFloat(month.renevues);
                        data.renevues_text = $filter('currency')(data.renevues);
                        data.expenses = parseFloat(month.expenses);
                        data.expenses_text = $filter('currency')(data.expenses);

                        data.y = data.renevues + data.expenses;
                        data.y_text = $filter('currency')(data.y);
                        data.color = data.y < 0 ? '#9d261d' : '#049cdb';

                        data.id = month.period;

                        values.push(data);

                        avg += data.y;
                    }

                    avg = avg / values.length;

                    options.xAxis.categories = categories;
                    options.yAxis.plotLines.push({
                        value: avg,
                        color: 'red',
                        width: 1,
                        zIndex: 4,
                        label: {
                            align: 'right',
                            text: $filter('currency')(avg)
                        }
                    });
                    options.series = [{data: values}];

                    deferred.resolve({options: options, result: result});
                }, 
                function failure (result) {
                    deferred.reject(result);
                });

                return deferred.promise;
            },

            chartOptions: {
                chart: {
                    type: 'column',
                    spacingLeft: 3,
                    spacingRight: 3,
                    backgroundColor: '#e7e6e6',
                    marginBottom: 130
                },
                title: {
                    text: null
                },
                xAxis: {
                },
                legend: {
                    enabled: false
                },
                yAxis: {
                    title: null,
                    plotLines:[{
                        value: 0,
                        color: '#000',
                        width: 1,
                        zIndex: 4
                    }]
                },
                tooltip: {
                    headerFormat: '<div class="title">{point.key}</div>',
                    pointFormat:    '<p class="renevues">renevues: <b>{point.renevues_text}</b></p>' +
                                    '<p class="expenses">expenses: <b>{point.expenses_text}</b></p>' +
                                    '<p class="total">Total: <b>{point.y_text}</b></p>',
                    borderRadius: 0,
                    borderWidth: 0,
                    shadow: false,
                    shared: true,
                    animation: false,
                    backgroundColor: 'rgba(255, 255, 255, 0.25)',
                    useHTML: true,
                    positioner: function (tooltipWidth, tooltipHeight, point) {
                        var y = this.chart.chartHeight - tooltipHeight;
                        var x = (this.chart.chartWidth - tooltipWidth) / 2;
                        return {x: x, y: y};
                    }
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                }
            }
        };
    }])

    /*
     * Top 10 Categories chart
     */
    .factory('Top10', ['$q', '$filter', 'Transaction', function ($q, $filter, Transaction) {
        return {
            fetchData: function (params) {
                var me = this,
                    deferred = $q.defer();

                params = params || {};
                params.group_by = ['category__name'];
                params.date__gte = params.date_start;
                params.date__lte = params.date_end;

                Transaction.query(params).$then(function (result) {
                    var options = {},
                        series = [];

                    $.extend(true, options, me.chartOptions);

                    for (var i in result.data) {
                        var category = result.data[i];
                        var value = parseFloat(category.sum);
                        if (value < 0) {
                            //this chart shows only expenses
                            value = value * -1;
                            series.push([category.category__name, value]);
                        }
                    }

                    options.series = [{data: series}];

                    deferred.resolve({options: options, result: result});
                }, 
                function failure (result) {
                    deferred.reject(result);
                });

                return deferred.promise;
            },
            chartOptions: {
                chart: {
                    type: 'pie'
                },
                title: {
                    text: gettext('Top 10 Categories')
                },
                tooltip: {
                    formatter: function () {
                        var value = $filter('currency')(this.y);
                        var percentage = this.percentage;
                        return '<b>' + value + ' (' + percentage + '%)</b>';
                    }
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: false,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true
                        },
                        showInLegend: false
                    }
                }
            }
        };
    }])


    /*
     * Category Comparison
     */
    .factory('CategoryComparison', ['$q', 'Transaction', function ($q, Transaction) {
        return {
            fetchData: function (params) {
                var me = this,
                    deferred = $q.defer();

                params = params || {};
                params.group_by = 'date__month,category__name';
                params.date__gte = params.date_start;
                params.date__lte = params.date_end;

                // creating xAxis categories
                var categories = [];
                var start = moment(params.date_start);
                var end = moment(params.date_end);
                do {
                    categories.push(start.format('MMM YYYY'));
                    start.add('months', 1);
                } while (start < end)

                Transaction.query(params).$then(function (result) {
                    var options = {},
                        series = [],
                        expenses = gettext('Expenses'),
                        renevues = gettext('Renevues');

                    // organizing data into series
                    var dict = {};
                    dict[expenses] = {name: expenses, data: [], type: 'area'};
                    dict[renevues] = {name: renevues, data: [], type: 'area'};

                    for (var i=0; i<result.data.length; i++) {
                        var transactionGroup = result.data[i];

                        var month = moment(transactionGroup.date__month).format('MMM YYYY');
                        var category = transactionGroup.category__name;
                        var value = parseFloat(transactionGroup.sum);

                        dict[category] = dict[category] || {name: '', data: []}

                        var idx = categories.indexOf(month);
                        dict[category].data[idx] = Math.abs(value);

                        dict[category].name = transactionGroup.category__name;

                        // balance data
                        if (value > 0) {
                            dict[renevues].data[idx] = dict[renevues].data[idx] || 0;
                            dict[renevues].data[idx] += value;
                        }
                        else {
                            dict[expenses].data[idx] = dict[expenses].data[idx] || 0;
                            dict[expenses].data[idx] += Math.abs(value);
                        }
                    }

                    for (var group in dict) {
                        for (var i=0; i<dict[group].data.length; i++) {
                            if (dict[group].data[i] === undefined) {
                                dict[group].data[i] = 0;
                            }
                        }
                        series.push(dict[group]);
                    }
                    console.log(series);

                    $.extend(true, options, me.chartOptions);
                    options.series = series;
                    options.xAxis.categories = categories;

                    deferred.resolve({options: options, result: result});
                }, 
                function failure (result) {
                    deferred.reject(result);
                });

                return deferred.promise;
            },
            chartOptions: {
                chart: {
                    type: 'line'
                },
                title: {
                    text: gettext('Comparação')
                },
                xAxis: {
                    tickmarkPlacement: 'on',
                    title: {
                        enabled: false
                    }
                },
                yAxis: {
                    title: {
                        text: ''
                    },
                    labels: {
                        formatter: function() {
                            return this.value;
                        }
                    }
                },
                tooltip: {
                    shared: true,
                    formatter: function () {
                        var t = '';
                        for (var i=0; i<this.points.length; i++) {
                            var point = this.points[i];
                            t += '<p><strong>' + point.series.name + '</strong>' + point.y + '</p>';
                        }
                        return t;
                    }
                },
                plotOptions: {
                    area: {
                        stacking: 'normal',
                        lineWidth: 1
                    }
                }
            }
        };
    }])

    .directive('chart', [function () {
        return {
            restrict: 'A',
            template: '<div></div>',
            scope: {
                chartData: "=value"
            },
            transclude:true,
            replace: true,

            link: function (scope, element, attrs) {
                var chartsDefaults = {
                    chart: {
                        renderTo: element[0],
                        type: attrs.type || null,
                        height: attrs.height || null,
                        width: attrs.width || null
                    }
                };

                //Update when charts data changes
                scope.$watch('chartData', function(value) {
                    if(!value) return;

                    // We need deep copy in order to NOT override original chart object.
                    // This allows us to override chart data member and still the keep
                    // our original renderTo will be the same
                    var deepCopy = true;
                    var newSettings = {};
                    $.extend(deepCopy, newSettings, chartsDefaults, value.options);
                    var chart = new Highcharts.Chart(newSettings);
                });
            }
        };
    }])
    ;
})();
