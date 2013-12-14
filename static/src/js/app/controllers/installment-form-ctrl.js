function InstallmentFormCtrl ($scope) {
    "use strict";

    $scope.installment = {
        qtyInstallments: 1
    };

    $scope.$watch('is_installment', function selectInstallment (is_installment) {
        if (is_installment) {
            $scope.installment.totalValue = $scope.formData.value;
            $scope.updateTotalValue();
        }
    });

    function getTotalValue () {
        var installmentValue = $scope.installment.installmentValue;
        return accounting.toFixed(installmentValue * $scope.installment.qtyInstallments, 2);
    }

    function getInstallmentValue () {
        var totalValue = $scope.installment.totalValue;
        return accounting.toFixed(totalValue / $scope.installment.qtyInstallments, 2);
    }

    /*
     * Updates the installment value when the number of installments changes.
     */
    $scope.updateQtyInstallments = function () {
        $scope.installment.installmentValue = getInstallmentValue();
    };

    /*
     * Updates the total value when the installment value changes.
     */
    $scope.updateInstallmentValue = function () {
        $scope.installment.totalValue = getTotalValue();
    };

    /*
     * Updates the installment value when the total value changes.
     */
    $scope.updateTotalValue = function () {
        $scope.installment.installmentValue = getInstallmentValue();
    };
}

InstallmentFormCtrl.$inject = ['$scope', '$filter'];