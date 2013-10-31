function TransactionActionBarCtrl ($scope, Transaction, $rootScope) {
    'use strict';

    $scope.removeTransaction = function () {
        //finish this
        Transaction['delete']({id: $scope.transaction.id}).$then(function () {
            for (var i in $scope.days) {
                var day = $scope.days[i];
                if (day.day === $scope.transaction.date) {
                    //removing the transaction from the day
                    day.transactions.splice(day.transactions.indexOf($scope.transaction), 1);

                    if (day.transactions.length === 0) {
                        //if there are no transactions left on the day, remove the day
                        $scope.days.splice($scope.days.indexOf(day), 1);
                    }
                }
            }
            $rootScope.$emit('transaction-removed', $scope.transaction);

        });
    };
}

TransactionActionBarCtrl.$inject = ['$scope', 'Transaction', '$rootScope'];
