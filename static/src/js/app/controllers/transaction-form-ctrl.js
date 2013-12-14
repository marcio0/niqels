function TransactionFormCtrl ($scope, $element, $http, $rootScope, Transaction, Category) {
    'use strict';

    $scope.formData = {};
    $scope.selected_category = null;
    $scope.formData.date = moment();
    $scope.is_installment = false;

    var resetForm = function resetForm () {
        $scope.sending = false;
        $scope.formData.description = '';
        $scope.formData.value = '';
        $scope.category = '';
    };

    Category.query().$promise.then(function (result) {
        // adding a default option so angular won't freak out
        var c = {name: gettext('Select a category')};
        result.unshift(c);
        $scope.categories = result;
    });

    resetForm();

    $scope.submit = function () {
        var transaction_data = angular.copy($scope.formData),
            form = this.transactionForm;

        if (form.$valid) {
            $scope.sending = true;


            (function () {
                // hotfix for the date and value formats
                transaction_data.value = accounting.formatNumber(transaction_data.value);
                transaction_data.date = transaction_data.date.format('DD/MM/YYYY');
            })();

            var cls, promise;

            promise = Transaction.save(transaction_data)
                .$promise.then(function (value) {
                    resetForm();
                    return value;
                })
                .then(function (value) {
                    $rootScope.$emit('transaction-created', value);
                    return value;
                });

            promise.finally(function () {
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

TransactionFormCtrl.$inject = ['$scope', '$element', '$http', '$rootScope', 'Transaction', 'Category'];
