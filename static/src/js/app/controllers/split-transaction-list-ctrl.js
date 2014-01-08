function SplitTransactionListCtrl ($scope, $rootScope, SplitTransaction) {
    'use strict';

    $scope.splitTransactions = SplitTransaction.query();
}

SplitTransactionListCtrl.$inject = ['$scope', '$rootScope', 'SplitTransaction']