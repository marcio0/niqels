'use strict';

function TransactionFormCtrl ($scope, $element, $http, $rootScope, Transaction, Reminder) {
    $scope.transaction = {};
    $scope.errors = {};
    $scope.sending = false;

    $scope.isRepeat = false;
    $scope.repeatOptions = ['daily', 'weekly', 'biweekly', 'monthly'];

    $scope.submit = function () {
        var transaction_data = $scope.transaction,
            form = this.entryform;

        if (form.$invalid) {
            $scope.errors.category = form.category.$error.required;
            $scope.errors.value = form.value.$error.required;
        }
        else {
            $scope.sending = true;
            $scope.errors = {};  // clears invalid state

            /*
                se for reminder:
                salvar reminder;
                chamar create_transaction na api de reminder;
                chamar mesmo callback de transacion.save;
            */

            Transaction.save(transaction_data)
                .$then(function (value) {
                    $rootScope.$broadcast('transactionCreated', value.resource);

                    // clears the form
                    $scope.transaction = {};
                    form.$setPristine();
                })
                .always(function () {
                    $scope.sending = false;
                });
        }
    };
}

TransactionFormCtrl.$inject = ['$scope', '$element', '$http', '$rootScope', 'Transaction', 'Reminder'];
