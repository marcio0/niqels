function TransactionFormCtrl ($scope, $element, $http, Transaction) {
    $scope.transaction = {};

    $http.defaults.headers.post['X-CSRFToken'] = $('input[name=csrfmiddlewaretoken]', $element).val();

    $scope.submit = function () {
        var transaction = $scope.transaction;
        Transaction.save(transaction);
    }
}

function TransactionListCtrl($scope, Transaction) {
    $scope.transactions = Transaction.query();

    indexed = [];

    $scope.allTransactions = function () {
        indexed = [];
        return $scope.transactions.objects;
    };

    $scope.filterTransactions = function(transaction) {
        var isNew = indexed.indexOf(transaction.date) == -1;
        if (isNew) {
            indexed.push(transaction.date);
        }
        return isNew;
    }

}

function TransactionDetailCtrl($scope, $routeParams, Transaction) {
    $scope.transactions = Transaction.get({id: $routeParams.id});
}
