function InstallmentFormCtrl ($scope, $filter) {
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

    $scope.updateQtyInstallments = function () {
        if ($scope.installment.totalValue) {
            var totalValue = parseFloat($scope.installment.totalValue.replace(',', '.'), 2);
            var installmentValue = (totalValue / $scope.installment.qtyInstallments).toFixed(2);
            $scope.installment.installmentValue = installmentValue;
        }
    };

    $scope.updateInstallmentValue = function () {
        var installmentValue = parseFloat($scope.installment.installmentValue.replace(',', '.'), 2);
        $scope.installment.totalValue = (installmentValue * $scope.installment.qtyInstallments).toFixed(2).toString();
    };

    $scope.updateTotalValue = function () {
        var totalValue = parseFloat($scope.installment.totalValue.replace(',', '.'), 2);
        $scope.installment.installmentValue = (totalValue / $scope.installment.qtyInstallments).toFixed(2).toString();
    }
}

InstallmentFormCtrl.$inject = ['$scope', '$filter'];