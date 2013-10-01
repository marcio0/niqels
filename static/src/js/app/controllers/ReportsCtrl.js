'use strict';

function ReportsCtrl ($scope, BalanceChart) {
    $scope.options = {
    };

    $scope.updateBalance = function () {
        var reference_date, day, months, this_month;

        reference_date = moment();

        months = [reference_date];
        for (var i=0; i<11; i++) {
            var actual_date = months[i].clone().subtract('month', 1);
            months.push(actual_date);
        }

        months.reverse();

        for (var i in months) {
            months[i] = months[i].format('YYYY-MM');
        }

        months = angular.toJson(months);

        var params = {
            months: months
        };

        var data = BalanceChart.fetchData(params);

        $scope.balanceData = data;
    };

    $scope.updateBalance();
}

ReportsCtrl.$inject = ['$scope', 'BalanceChart'];
