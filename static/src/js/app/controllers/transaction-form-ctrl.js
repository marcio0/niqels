function TransactionFormCtrl ($scope, $element, $http, $rootScope, Transaction, Category) {
    'use strict';
    $scope.formData = {};
    $scope.selected_category = null;
    $scope.formData.date = moment();

    var resetForm = function resetForm () {
        $scope.sending = false;
        $scope.formData.description = '';
        $scope.formData.value = '';
        $scope.category = '';
    };

    Category.query().$then(function (result) {
        // adding a default option so angular won't freak out
        var c = {name: gettext('Select a category')};
        result.resource.unshift(c);
        $scope.categories = result.resource;
    });

    resetForm();

    $scope.submit = function () {
        var transaction_data = angular.copy($scope.formData),
            form = this.transactionForm;

        if (form.$valid) {
            $scope.sending = true;
            transaction_data.date = transaction_data.date.format('DD/MM/YYYY');

            var cls, promise;

            promise = Transaction.save(transaction_data)
                .$then(function (value) {
                    resetForm();
                    return value;
                })
                .then(function (value) {
                    $rootScope.$emit('transaction-created', value.resource);
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

TransactionFormCtrl.$inject = ['$scope', '$element', '$http', '$rootScope', 'Transaction', 'Category'];
