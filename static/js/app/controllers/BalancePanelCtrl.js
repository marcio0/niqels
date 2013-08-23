'use strict';

function BalancePanelCtrl ($scope, $http, $rootScope, $filter) {
    $scope.updateBalance = function () {
        var today = moment();
        var reference_date, day, months, this_month;

        reference_date = today;

        // if it's not the actual month, uses the last_day
        if ($rootScope.month != today.month()) {
            reference_date.month($rootScope.month);
            reference_date = reference_date.endOf('month');
        }

        months = [reference_date];
        for (var i=0; i<2; i++) {
            var actual_date = months[i].clone().subtract('month', 1);
            months.push(actual_date);
        }

        months.reverse();

        for (var i in months) {
            months[i] = months[i].format('YYYY-MM');
        }

        this_month = months[months.length-1];

        months = angular.toJson(months);

        var params = {
            months: months,
            up_to_day:  reference_date.date()
        };

        $http.get('/api/v1/data/balance/', {params: params}).then(function (result) {
            var categories = [],
                values = [],
                options = {},
                median = 0;

            $scope.income = parseFloat(result.data[this_month].income);
            $scope.outgo = parseFloat(result.data[this_month].outgo);

            $.extend(true, options, chartOptions);

            for(var k in result.data) {
                var data = {};

                categories.push(k);

                data.income = parseFloat(result.data[k].income);
                data.income_text = $filter('currency')(data.income);
                data.outgo = parseFloat(result.data[k].outgo)
                data.outgo_text = $filter('currency')(data.outgo);

                data.y = data.income + data.outgo;
                data.y_text = $filter('currency')(data.y);
                data.color = data.y < 0 ? 'red' : 'blue';

                values.push(data);

                median += data.y;
            }

            median = median / values.length;

            options.xAxis.categories = categories;
            options.yAxis.plotLines.push({
                value: median,
                color: 'red',
                width: 1,
                zIndex: 4,
                label: {
                    align: 'right',
                    text: $filter('currency')(median)
                }
            });
            options.series = [{data: values}];
            $scope.chartData = options;
        });
    };

    var chartOptions = {
        chart: {
            type: 'column',
            spacingLeft: 3,
            spacingRight: 3,
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
            headerFormat: '<span style="font-size:10px">{point.key}</span><div>',
            pointFormat:    '<p class="income">Income: <b>{point.income_text}</b></p>' +
                            '<p class="outgo">Outgo: <b>{point.outgo_text}</b></p>' +
                            '<p class="total">Total: <b>{point.y_text}</b></p>',
            footerFormat: '</div>',
            borderRadius: 0,
            shared: true,
            hideDelay: 50,
            animation: false,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        }
    };

    $rootScope.$on('transactionCreated', $scope.updateBalance);
    $rootScope.$on('transactionRemoved', $scope.updateBalance);
    $rootScope.$watch('month', $scope.updateBalance);

    $('#balance-help').popover();

    $('.side-panel').affix({offset: 40});
}

BalancePanelCtrl.$inject = ['$scope', '$http', '$rootScope', '$filter'];
