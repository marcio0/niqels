'use strict';

function BalancePanelCtrl ($scope, $http, $rootScope, $filter) {
    $scope.updateBalance = function () {
        var today = new Date();
        var date;

        if ($rootScope.month == today.getMonth()) {
            date = today;
        }
        else {
            date = new Date(today.getFullYear(), $rootScope.month+1, 0);
        }

        date = $filter('date')(date, 'yyyy-MM-dd');

        $http.get('/api/v1/data/balance/?date=' + date).then(function (result) {
            $scope.balance_data = result.data;
        });
    };

    $rootScope.$on('transactionCreated', $scope.updateBalance);
    $rootScope.$on('transactionRemoved', $scope.updateBalance);
    $rootScope.$watch('month', $scope.updateBalance);

    $('#balance-help').popover({
        placement: 'left',
        trigger: 'hover',
        content: gettext('Shows the sum of all your transactions up to the current day, and the comparison with the previous months.')
    });

    $('.side-panel').affix({offset: 40});
}

BalancePanelCtrl.$inject = ['$scope', '$http', '$rootScope', '$filter'];
