function InstallmentFormCtrl ($scope, $filter) {
    "use strict";

    $scope.installment = {
        qtyInstallments: 1
    };

    $scope.selectInstallment = function selectInstallment () {

    };

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