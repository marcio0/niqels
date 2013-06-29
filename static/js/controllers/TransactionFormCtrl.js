'use strict';

function TransactionFormCtrl ($scope, $element, $http, $rootScope, Transaction, Category) {
    $scope.transaction = {};
    $scope.errors = {};
    $scope.sending = false;

    $scope.submit = function () {
        var transaction_data = $scope.transaction,
            form = this.entryform;

        if (form.$invalid) {
            $scope.errors.category = form.category.$error.required;
            $scope.errors.value = form.value.$error.required;
        }
        else {
            $scope.sending = true;
            // clears invalid state
            $scope.errors = {};

            Transaction.save(transaction_data)
                .$then(function (value) {
                    $rootScope.$broadcast('transactionCreated', value.data);

                    // clears the form
                    $scope.transaction = {};
                    form.$setPristine();
                })
                .always(function () {
                    $scope.sending = false;
                });

            if (user_categories.indexOf(transaction_data.category) == -1) {
                user_categories.push(transaction_data.category);
            }
        }
    };
}

TransactionFormCtrl.$inject = ['$scope', '$element', '$http', '$rootScope', 'Transaction', 'Category'];
