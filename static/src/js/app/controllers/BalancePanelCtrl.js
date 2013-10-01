'use strict';

function BalancePanelCtrl ($scope, $http, $rootScope, $filter, calculators, BalanceChart) {
    $scope.updateBalance = function () {
        var reference_date, day, months, this_month;

        reference_date = moment().month($rootScope.month);

        months = [reference_date];
        for (var i=0; i<2; i++) {
            var actual_date = months[i].clone().subtract('month', 1);
            months.push(actual_date);
        }

        months.reverse();

        for (var i in months) {
            months[i] = months[i].format('YYYY-MM');
        }

        // saving the showing month for later
        this_month = months[months.length-1];

        months = angular.toJson(months);

        var params = {
            months: months
        };

        var data = BalanceChart.fetchData(params).then(function setupScope (result) {
            var options = result.options,
                httpResult = result.result;

            $scope.renevues = parseFloat(httpResult.data[this_month].renevues);
            $scope.expenses = parseFloat(httpResult.data[this_month].expenses);

            return result;
        });
        if ($rootScope.device != 'phone') {
            // don't create the chart if it's on a mobile
            $scope.chartData = data;
        }
    };

    $rootScope.$on('transactionCreated', $scope.updateBalance);
    $rootScope.$on('transactionRemoved', $scope.updateBalance);
    $rootScope.$watch('month', $scope.updateBalance);
    $rootScope.$on('devicechanged', function (e, device) {
        if (device != 'phone') {
            $scope.updateBalance();
        }
    });
}

BalancePanelCtrl.$inject = ['$scope', '$http', '$rootScope', '$filter', 'calculators', 'BalanceChart'];
