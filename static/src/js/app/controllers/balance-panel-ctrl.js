function BalancePanelCtrl ($scope, $http, $rootScope, $filter, calculators, BalanceChart) {
    'use strict';

    $scope.updateBalance = function () {
        if ($rootScope.filterDate === undefined) return;

        var reference_date, date_start, date_end;

        date_end = $rootScope.filterDate;
        date_start = date_end.clone().subtract(2, 'months');

        var params = {
            date_start: date_start.format('YYYY-MM-DD'),
            date_end: date_end.format('YYYY-MM-DD')
        };

        var data = BalanceChart.fetchData(params).then(function setupScope (result) {
            var httpResult = result.result,
                this_month = httpResult.data[httpResult.data.length -1];

            $scope.renevues = parseFloat(this_month.renevues);
            $scope.expenses = parseFloat(this_month.expenses);

            return result;
        });
        if ($rootScope.device != 'phone') {
            // don't create the chart if it's on a mobile
            $scope.chartData = data;
        }
    };

    $rootScope.$on('transaction-created', $scope.updateBalance);
    $rootScope.$on('transactionRemoved', $scope.updateBalance);
    $rootScope.$watch('filterDate', $scope.updateBalance);
    $rootScope.$on('devicechanged', function (e, device) {
        if (device != 'phone') {
            $scope.updateBalance();
        }
    });
}

BalancePanelCtrl.$inject = ['$scope', '$http', '$rootScope', '$filter', 'calculators', 'BalanceChart'];
