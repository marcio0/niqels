'use strict';

function BalancePanelCtrl ($scope, $http, $rootScope, $filter) {
    $scope.updateBalance = function () {
        var today = moment();
        var date, day, first_month, months;

        if ($rootScope.month == today.month()) {
            date = today;
        }
        else {
            date = today.endOf('month');
            date.month($rootScope.month);
        }

        date = date.format('YYYY-MM-DD').split('-');
        day = date[2];

        first_month = [date[0], date[1]].join('-');

        months = [];
        //montar o dict de meses


        $http.get('/api/v1/data/balance/?date=' + date).then(function (result) {
            $scope.balance_data = result.data;
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
            categories: [
                'Jan',
                'Feb',
                'Mar'
            ]
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
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
        },
        series: [{
            name: 'Balanço',
            data: [1, 2, 3]
        }]
    };

    $rootScope.chartData = chartOptions;

    $rootScope.$on('transactionCreated', $scope.updateBalance);
    $rootScope.$on('transactionRemoved', $scope.updateBalance);
    $rootScope.$watch('month', $scope.updateBalance);

    $('#balance-help').popover();

    $('.side-panel').affix({offset: 40});
}

BalancePanelCtrl.$inject = ['$scope', '$http', '$rootScope', '$filter'];
