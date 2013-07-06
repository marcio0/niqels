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
            $scope.errors.repeat = form.repeat.$error.required;
        }
        else {
            $scope.sending = true;
            $scope.errors = {};  // clears invalid state

            var cls = null,
                cb = null;

            if ($scope.isRepeat) {
                transaction_data.due_date = transaction_data.date;
                debugger;
                // forward the date
                $scope.isRepeat = false;
                cls = Reminder;
                cb = function (value) {
                    $rootScope.$broadcast('reminderCreated', value.resource);
                    return value;
                };
            }
            else {
                cls = Transaction;
                cb = function (value) {
                    $rootScope.$broadcast('transactionCreated', value.resource);
                    return value;
                };
            }

            cls.save(transaction_data)
                .$then(function (value) {
                    $scope.transaction = {};
                    form.$setPristine();
                    return value;
                })
                .then(cb)
                .always(function () {
                    $scope.sending = false;
                });
        }
    };
}

TransactionFormCtrl.$inject = ['$scope', '$element', '$http', '$rootScope', 'Transaction', 'Reminder'];
