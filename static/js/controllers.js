function TransactionFormCtrl ($scope, $element, $http, $location, Transaction) {
    $scope.transaction = {};
    $scope.errors = {};

    $http.defaults.headers.post['X-CSRFToken'] = $('input[name=csrfmiddlewaretoken]', $element).val();

    $scope.submit = function () {
        var transaction = $scope.transaction,
            form = this.entryform;

        if (form.$invalid) {
            $scope.errors.category = form.category.$error.required;
            $scope.errors.value = form.value.$error.required;
            $scope.errors.date = form.date.$error.required;
        }
        else {
            $scope.errors = {};
            Transaction.save(transaction, function(){
                $location.url('/#/transactions');
            });
        }
    };
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
