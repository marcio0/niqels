function BalancePanelCtrl ($scope, $rootScope, BalanceChart, Transaction, SplitTransaction) {
    'use strict';

    $scope.updateBalance = function () {
        if ($rootScope.filterDate === undefined) {
            return;
        }

        var reference_date, date_start, date_end;

        date_end = $rootScope.filterDate.endOf('month');
        date_start = $rootScope.filterDate.startOf('month');
        var params = {
            date_start: date_start.format('YYYY-MM-DD'),
            date_end: date_end.format('YYYY-MM-DD')
        };

        BalanceChart.fetchData(params).then(function setupScope (result) {
            var httpResult = result.result,
                this_month = httpResult[0];

            $scope.renevues = parseFloat(this_month.renevues);
            $scope.expenses = parseFloat(this_month.expenses);

            return result;
        });
    };

    $rootScope.$on(Transaction.EVENT_CREATE, $scope.updateBalance);
    $rootScope.$on(Transaction.EVENT_UPDATE, $scope.updateBalance);
    $rootScope.$on(SplitTransaction.EVENT_CREATE, $scope.updateBalance);
    $rootScope.$on(Transaction.EVENT_DELETE, $scope.updateBalance);
    $rootScope.$watch('filterDate', $scope.updateBalance);
}

BalancePanelCtrl.$inject = ['$scope', '$rootScope', 'BalanceChart', 'Transaction', 'SplitTransaction'];
