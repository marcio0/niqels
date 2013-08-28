'use strict';

function TransactionFormCtrl ($scope, $element, $http, $rootScope, Transaction, Reminder) {
    $scope.repeatOptions = ['daily', 'weekly', 'biweekly', 'monthly'];

    var resetForm =  function resetForm () {
        $scope.transaction = {repeat: 'monthly'};
        $scope.sending = false;

        $scope.isRepeat = false;
    };

    resetForm();

    $scope.submit = function () {
        var transaction_data = $scope.transaction,
            form = this.entryform;

        if (form.$valid) {
            $scope.sending = true;

            var cls = null,
                promise = null;

            if ($scope.isRepeat) {
                transaction_data.due_date = transaction_data.date;
                var reminder = new Reminder(transaction_data);

                promise = reminder.createReminder()
                    .then(function (value) {
                        resetForm();
                        return value;
                    })
                    .then(function (value) {
                        $rootScope.$emit('reminderCreated', value.resource);
                        return value;
                    });

                $scope.isRepeat = false;
            }
            else {
                promise = Transaction.save(transaction_data)
                    .$then(function (value) {
                        resetForm();
                        form.$setPristine();
                        return value;
                    })
                    .then(function (value) {
                        $rootScope.$emit('transactionCreated', value.resource);
                        return value;
                    });
            }

            promise.always(function () {
                $scope.sending = false;
            });
        }
    };
}

TransactionFormCtrl.$inject = ['$scope', '$element', '$http', '$rootScope', 'Transaction', 'Reminder'];
