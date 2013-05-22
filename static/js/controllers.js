function TransactionListCtrl($scope, Transaction) {
    $scope.transactions = Transaction.query();

    indexed = [];

    $scope.allTransactions = function () {
        indexed = [];
        return $scope.transactions.objects;
    };

    $scope.filterTransactions = function(transaction) {
        var isNew = indexed.indexOf(transaction.date) == -1;
        console.log(isNew);
        if (isNew) {
            indexed.push(transaction.date);
        }
        return isNew;
    }

}

function TransactionDetailCtrl($scope, $routeParams, Transaction) {
    $scope.transactions = Transaction.get({id: $routeParams.id});
}
