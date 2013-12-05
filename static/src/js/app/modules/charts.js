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

    .config(function () {
        Highcharts.setOptions({
            chart: {
                backgroundColor: 'rgba(255, 255, 255, 0.002)'
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        style: {
                            textShadow: "1px 1px 0px #FFF, -1px 1px 0px #fff, 1px -1px 0px #fff, -1px -1px 0px #fff, 2px 2px 0px #FFF, -2px 2px 0px #fff, 2px -2px 0px #fff, -2px -2px 0px #fff"
                        }
                    }
                }
            }
        });
    })

    /*
     * BalanceChart
     */
    .factory('BalanceChart', ['$http', '$filter', '$q', function ($http, $filter, $q) {
        return {
            fetchData: function (params) {
                var me = this,
                    deferred = $q.defer();

                $http.get('/api/v1/data/balance/', {params: params}).then(function (result) {
                    var options = {},
                        months = [],
                        renevuesSeries = {data: [], name: gettext('Renevues'), color: '#46a546', codename: 'renevues'},
                        expensesSeries = {data: [], name: gettext('Expenses'), color: '#9d261d', codename: 'expenses'},
                        balanceSeries = {data: [], name: gettext('Total'), type: 'area', visible: false},
                        avgSeries = {data: [], name: gettext('Average'), type: 'spline', visible: false},
                        avgValues = [];

                    $.extend(true, options, me.chartOptions);

                    for (var i in result.data) {
                        var month = result.data[i],
                            renevues = parseFloat(month.renevues),
                            expenses = parseFloat(month.expenses),
                            total = renevues + expenses,
                            avg = 0,
                            realLength = 1;

                        avgValues.push(total);

                        avg = avgValues.reduce(function (previous, current) {
                            var sum = previous + current;
                            if (sum != 0) {
                                realLength++;
                            }
                            return sum;
                        }) / realLength;

                        months.push(moment(month.period, 'YYYY-MM-DD'));

                        renevuesSeries.data.push(renevues);
                        expensesSeries.data.push(Math.abs(expenses));
                        balanceSeries.data.push(total);
                        avgSeries.data.push(avg);
                    }

                    options.xAxis.categories = xAxisMonthParser(months);
                    options.series = [renevuesSeries, expensesSeries, balanceSeries, avgSeries];

                    deferred.resolve({options: options, result: result.data});
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
                    spacingRight: 3
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
                    useHTML: true
                },
                plotOptions: {
                    spline: {
                        dataLabels: {
                            enabled: true,
                            formatter: function () {
                                return this.y !== 0 ? $filter('currency')(this.y) : '';
                            }
                        }
                    },
                    column: {
                        pointPadding: 0.1,
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
                        lineColor: '#ccc',
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

                Transaction.query(params).$promise.then(function (result) {
                    var options = {},
                        series = [];

                    $.extend(true, options, me.chartOptions);

                    for (var i in result) {
                        var category = result[i];
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
                    type: 'pie'
                },
                title: {
                    text: ''
                },
                legend: {
                    enabled: true,
                    layout: 'vertical',
                    align: 'left',
                    verticalAlign: 'top',
                    floating: true,
                    borderWidth: 0,
                    labelFormatter: function () {
                        var value = $filter('currency')(this.y);
                        var percentage = this.percentage.toFixed(2);
                        var name = this.name;
                        return '<b>{0}</b> <br/>{1} ({2}%)'.format(name, value, percentage);
                    }

                },
                tooltip: {
                    enabled: false
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false,
                            //format: '<b>{point.name}</b>: <br/> {point.value} ({point.percentage:.1f}%)'
                            formatter: function () {
                                var value = $filter('currency')(this.point.y);
                                var percentage = this.point.percentage.toFixed(2);
                                var name = this.point.name;
                                return '<b>{0}</b> <br/>{1} ({2}%)'.format(name, value, percentage);
                            }
                        },
                        showInLegend: true
                    }
                }
            }
        };
    }])


    /*
     * Category Comparison
     */
    .factory('CategoryComparison', ['$q', '$filter', 'Transaction', function ($q, $filter, Transaction) {
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

                Transaction.query(params).$promise.then(function (result) {
                    var options = {},
                        series = [],
                        expenses = gettext('Expenses'),
                        renevues = gettext('Renevues');

                    // organizing data into series
                    var dict = {};
                    dict[expenses] = {name: expenses, data: [], type: 'area'};
                    dict[renevues] = {name: renevues, data: [], type: 'area'};

                    for (var i=0; i<result.length; i++) {
                        var transactionGroup = result[i];

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
                    type: 'line'
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
                                return $filter('currency')(this.y);
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
