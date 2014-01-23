function TransactionFormCtrl ($scope, $rootScope, Transaction, Category, SplitTransaction) {
        'use strict';

    $scope.formData = {};
    $scope.selected_category = null;
    $scope.formData.date = moment();

    var resetForm = function resetForm () {
        // only used on creating form

        $scope.sending = false;
        $scope.formData.description = '';
        $scope.formData.value = '';
        $scope.category = '';

        $scope.is_installment = false;
        $scope.installment = {
            installments: 1
        };
    };

    Category.query().$promise.then(function (result) {
        // adding a default option so angular won't freak out
        var c = {name: gettext('Select a category')};
        result.unshift(c);
        $scope.categories = result;
    });

    resetForm();

    if ($scope.editingTransaction) {
        $scope.formData = angular.copy($scope.editingTransaction);
        $scope.formData.category = $scope.editingTransaction.category.resource_uri;

        if ($scope.editingTransaction.installment_of) {
            $scope.is_installment = true;
        }
    }

    function handleTransaction (data) {
        var promise;

        if (data.id) {
            promise = Transaction.save(data)
                .$promise.then(function (value) {
                    $rootScope.$emit('transaction-updated', value);
                    $scope.$hide();  // hiding the modal
                    return value;
                });
        }
        else{

            promise = Transaction.save(data)
                .$promise.then(function (value) {
                    resetForm();
                    $rootScope.$emit('transaction-created', value);
                    return value;
                });
        }
        return promise;
    }

    function handleSplitTransaction (data, installment_data) {
        data['first_installment_date'] = data['date'];
        delete data['date'];

        (function () {
            // hotfix for the date and value formats, will be removed eventually
            data.total_value = accounting.formatNumber(installment_data.total_value);
        })();
        delete data['value'];

        data['installments'] = installment_data['installments'];

        var promise;
        promise = SplitTransaction.save(data)
            .$promise.then(function (value) {
                resetForm();
                $rootScope.$emit('split-transaction-created', value);
                return value;
            });
        return promise;
    }

    $scope.submit = function () {
        var transaction_data = angular.copy($scope.formData),
            form = this.transactionForm,
            promise;

        if (form.$valid) {
            $scope.sending = true;

            (function () {
                // hotfix for the date and value formats, will be removed eventually
                transaction_data.value = accounting.formatNumber(transaction_data.value);
                transaction_data.date = transaction_data.date.format('DD/MM/YYYY');
            })();

            if (!$scope.is_installment) {
                promise = handleTransaction(transaction_data);
            }
            else {
                promise = handleSplitTransaction(transaction_data, $scope.installment);
            }

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

    $scope.removeTransaction = function (transaction) {
        // used on edit form
        Transaction.delete({id:transaction.id}).$promise.then(function () {
            $rootScope.$emit('transaction-removed', transaction);
            $scope.$hide();
        });
    };
}

TransactionFormCtrl.$inject = ['$scope', '$rootScope', 'Transaction', 'Category', 'SplitTransaction'];
