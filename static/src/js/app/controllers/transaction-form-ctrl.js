function TransactionFormCtrl ($scope, $element, $http, $rootScope, Transaction) {
    'use strict';
    $scope.formData = {};

    var resetForm = function resetForm () {
        $scope.sending = false;
        $scope.formData.description = '';
        $scope.formData.value = '';
    };

    resetForm();

    $scope.submit = function () {
        var transaction_data = angular.copy($scope.formData),
            form = this.transactionForm;

        if (form.$valid) {
            $scope.sending = true;

            var cls = null,
                promise = null;

            promise = Transaction.save(transaction_data)
                .$then(function (value) {
                    resetForm();
                    return value;
                })
                .then(function (value) {
                    $rootScope.$emit('transactionCreated', value.resource);
                    return value;
                });

            promise.always(function () {
                form.$setPristine();
                $scope.sending = false;
            });
        }
        else {
            // forcing the error icon
            form.category.$dirty = true;
            toastr.warning(gettext('Please fill in the fields correctly.'));
        }
    };
}

TransactionFormCtrl.$inject = ['$scope', '$element', '$http', '$rootScope', 'Transaction'];
