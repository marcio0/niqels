'use strict';

angular.module('charts', [])

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

                    for(var k in result.data) {
                        var data = {},
                            category;

                        category = moment(k, 'YYYY-MM').format('MMM YYYY');
                        categories.push(category);

                        data.renevues = parseFloat(result.data[k].renevues);
                        data.renevues_text = $filter('currency')(data.renevues);
                        data.expenses = parseFloat(result.data[k].expenses)
                        data.expenses_text = $filter('currency')(data.expenses);

                        data.y = data.renevues + data.expenses;
                        data.y_text = $filter('currency')(data.y);
                        data.color = data.y < 0 ? '#9d261d' : '#049cdb';

                        data.id = k;

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
                    spacingRight: 3
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
                    shared: true,
                    animation: false,
                    useHTML: true,
                    positioner: function (tooltipWidth, tooltipHeight) {
                        return {x: 0, y: 0};
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
                    $.extend(deepCopy, newSettings, chartsDefaults, scope.chartData);
                    var chart = new Highcharts.Chart(newSettings);
                });
            }
        };
    }])
    ;
