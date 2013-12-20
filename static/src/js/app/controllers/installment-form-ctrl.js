function InstallmentFormCtrl ($scope) {
    "use strict";

    $scope.$watch('is_installment', function selectInstallment (is_installment) {
        if (is_installment) {
            $scope.installment.total_value = $scope.formData.value;
            $scope.updateTotalValue();
        }
    });

    function getTotalValue () {
        var installment_value = $scope.installment.installment_value;
        return accounting.toFixed(installment_value * $scope.installment.installments, 2);
    }

    function getInstallmentValue () {
        var total_value = $scope.installment.total_value;
        return accounting.toFixed(total_value / $scope.installment.installments, 2);
    }

    /*
     * Updates the installment value when the number of installments changes.
     */
    $scope.updateQtyInstallments = function () {
        $scope.installment.installment_value = getInstallmentValue();
    };

    /*
     * Updates the total value when the installment value changes.
     */
    $scope.updateInstallmentValue = function () {
        $scope.installment.total_value = getTotalValue();
    };

    /*
     * Updates the installment value when the total value changes.
     */
    $scope.updateTotalValue = function () {
        $scope.installment.installment_value = getInstallmentValue();
    };
}

InstallmentFormCtrl.$inject = ['$scope', '$filter'];