(function () {
'use strict';

function xAxisMonthParser (months) {
    var monthNames = [];
    var actualYear;

    for (var i in months) {
        var month = months[i];
        var format = 'MMM';

        if (month.year() != actualYear) {
            actualYear = month.year();
            format = 'MMM YYYY';
        }

        monthNames.push(month.format(format));
    }
    return monthNames;
}

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
                    var series = [],
                        options = {},
                        months = [],
                        renevuesSeries = {data: [], name: gettext('Renevues'), color: '#049cdb', codename: 'renevues'},
                        expensesSeries = {data: [], name: gettext('Expenses'), color: '#9d261d', codename: 'expenses'},
                        balanceSeries = {data: [], name: gettext('Total'), type: 'area'};

                    $.extend(true, options, me.chartOptions);

                    for (var i in result.data) {
                        var data = {},
                            month = result.data[i],
                            monthName,
                            renevues = parseFloat(month.renevues),
                            expenses = parseFloat(month.expenses);

                        months.push(moment(month.period, 'YYYY-MM-DD'));

                        renevuesSeries.data.push(renevues);
                        expensesSeries.data.push(Math.abs(expenses));
                        balanceSeries.data.push(renevues + expenses);
                    }

                    options.xAxis.categories = xAxisMonthParser(months);
                    options.series = [renevuesSeries, expensesSeries];

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
                    backgroundColor: 'rgba(255, 255, 255, 0.002)'
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: null
                },
                xAxis: {
                },
                legend: {
                    enabled: 'true'
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
                    enabled: true,
                    formatter: function () {
                        var point1 = this.points[0],
                            point2 = this.points[1],
                            renevues = 0,
                            expenses = 0;

                        if (point1.series.codename === 'expenses') {
                            renevues = point2.y;
                            expenses = -point1.y;
                        }
                        else {
                            renevues = point1.y;
                            expenses = -point2.y;
                        }
                        return '<p class="total">Total: <b>{0}</b></p>'.format($filter('currency')(renevues + expenses));
                    },
                    borderRadius: 0,
                    borderWidth: 1,
                    shadow: false,
                    shared: true,
                    animation: false,
                    //backgroundColor: 'rgba(255, 255, 255, 0.25)',
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true,
                            formatter: function () {
                                return this.y !== 0 ? $filter('currency')(this.y) : '';
                            }
                        }
                    },
                    area: {
                        fillOpacity: 0.1,
                        lineWidth: 1,
                        lineColor: '#000',
                        marker: {enabled: false},
                        dataLabels: {
                            enabled: true,
                            formatter: function () {
                                return this.y !== 0 ? $filter('currency')(this.y) : '';
                            }
                        }
                    },
                }
            }
        };
    }])

    /*
     * Top 10 Categories chart
     */
    .factory('TopCategories', ['$q', '$filter', 'Transaction', function ($q, $filter, Transaction) {
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
                        var value = category.sum;
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
                    type: 'pie',
                    backgroundColor: 'rgba(255, 255, 255, 0.002)',
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: ''
                },
                tooltip: {
                    enabled: false,
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
                            enabled: true,
                            //format: '<b>{point.name}</b>: <br/> {point.value} ({point.percentage:.1f}%)'
                            formatter: function () {
                                var value = $filter('currency')(this.point.y);
                                var percentage = this.point.percentage.toFixed(2);
                                var name = this.point.name;
                                return '<b>{0}</b> <br/>{1} ({2}%)'.format(name, value, percentage);
                            }
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

                // creating xAxis categories
                var categories = [];
                var start = moment(params.date_start);
                var end = moment(params.date_end);
                var months = [];

                do {
                    categories.push(start.format('MMM YYYY'));
                    months.push(start.clone());
                    start.add('months', 1);
                } while (start < end);
                var period = categories.length;

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
                        var value = transactionGroup.sum;

                        dict[category] = dict[category] || {name: '', data: []};

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
                        for (var j=0; j<dict[group].data.length; j++) {
                            if (dict[group].data[j] === undefined) {
                                dict[group].data[j] = 0;
                            }
                        }
                        series.push(dict[group]);
                    }

                    $.extend(true, options, me.chartOptions);
                    options.series = series;
                    options.xAxis.categories = xAxisMonthParser(months);

                    deferred.resolve({options: options, result: result});
                }, 
                function failure (result) {
                    deferred.reject(result);
                });

                return deferred.promise;
            },
            chartOptions: {
                chart: {
                    type: 'line',
                    backgroundColor: 'rgba(255, 255, 255, 0.002)',
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: ''
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
                    enabled: false,
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
                        fillOpacity: 0.1,
                        lineWidth: 1
                    },
                    series: {
                        dataLabels: {
                            enabled: true,
                            formatter: function () {
                                return this.y !== 0 ? this.y : '';
                            }
                        }
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
