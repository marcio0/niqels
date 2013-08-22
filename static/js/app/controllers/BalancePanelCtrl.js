'use strict';

function BalancePanelCtrl ($scope, $http, $rootScope, $filter) {
    $scope.updateBalance = function () {
        var today = moment();
        var reference_date, day, months;

        if ($rootScope.month == today.month()) {
            reference_date = today;
        }
        else {
            reference_date = today.endOf('month');
            reference_date.month($rootScope.month);
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

        months = angular.toJson(months);

        $http.get('/api/v1/data/balance/?months=' + months + '&up_to_day=' + reference_date.date()).then(function (result) {
            chartOptions;
            var categories = [],
                values = [];

            for(var k in result.data) {
                categories.push(k);
                values.push(parseFloat(result.data[k].income) + parseFloat(result.data[k].outcome));
            }

            chartOptions.xAxis.categories = categories
            chartOptions.series = [{'data': values, name: 'asd'}];
            $scope.chartData = chartOptions;
        });
    };

    var chartOptions = {
        chart: {
            type: 'column'
        },
        title: {
            text: ''
        },
        xAxis: {
        },
        yAxis: {
            plotLines:[{
                value: 0,
                color: '#000',
                width: 1,
                zIndex: 4
            }]
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
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
