function TransactionFormCtrl ($scope, $element, $http, $rootScope, Transaction, Category) {
    'use strict';
    $scope.formData = {};
    $scope.formData.date = moment();
    $scope.selected_category = null;

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

        transaction_data.date = transaction_data.date.format('YYYY-MM-DD');

        if (form.$valid) {
            $scope.sending = true;

            var cls, promise;

            promise = Transaction.save(transaction_data)
                .$then(function (value) {
                    resetForm();
                    return value;
                })
                .then(function (value) {
                    $scope.$emit('transaction-created', value.resource);
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

    $scope.$watch('formData.date', function (date, oldDate) {
        if (date === undefined) return;
        $rootScope.$broadcast('transaction-list-date-changed', date);
    });
}

TransactionFormCtrl.$inject = ['$scope', '$element', '$http', '$rootScope', 'Transaction', 'Category'];
