'use strict';

function BalancePanelCtrl ($scope, $http, $rootScope, $filter) {
    $scope.updateBalance = function () {
        var today = moment();
        var date;

        if ($rootScope.month == today.month()) {
            date = today;
        }
        else {
            date = today.endOf('month');
            date.month($rootScope.month);
        }

        date = date.format('YYYY-MM-DD');

        $http.get('/api/v1/data/balance/?date=' + date).then(function (result) {
            $scope.balance_data = result.data;
        });
    };

    $rootScope.$on('transactionCreated', $scope.updateBalance);
    $rootScope.$on('transactionRemoved', $scope.updateBalance);
    $rootScope.$watch('month', $scope.updateBalance);

    $('#balance-help').popover();

    $('.side-panel').affix({offset: 40});
}

BalancePanelCtrl.$inject = ['$scope', '$http', '$rootScope', '$filter'];
