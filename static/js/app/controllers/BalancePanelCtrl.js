'use strict';

function BalancePanelCtrl ($scope, $http, $rootScope, $filter, calculators, BalanceChart) {
    $scope.updateBalance = function () {
        var today = moment();
        var reference_date, day, months, this_month;

        reference_date = today;

        // if it's not the actual month, uses the last_day
        if ($rootScope.month != today.month()) {
            reference_date.month($rootScope.month);
            reference_date = reference_date.endOf('month');
        }

        months = [reference_date];
        for (var i=0; i<2; i++) {
            var actual_date = months[i].clone().subtract('month', 1);
            months.push(actual_date);
        }

        months.reverse();

        for (var i in months) {
            months[i] = months[i].format('YYYY-MM');
        }

        this_month = months[months.length-1];

        months = angular.toJson(months);

        var params = {
            months: months,
            up_to_day:  reference_date.date()
        };

        $scope.chartData = BalanceChart.fetchData(params).then(function setupScope (result) {
            var options = result.options,
                httpResult = result.result;

            $scope.income = parseFloat(httpResult.data[this_month].income);
            $scope.outgo = parseFloat(httpResult.data[this_month].outgo);

            options.subtitle = {
                text: gettext('Data up to day %s.').replace('%s', reference_date.date())
            };


            return result.options;
        });
    };

    $rootScope.$on('transactionCreated', $scope.updateBalance);
    $rootScope.$on('transactionRemoved', $scope.updateBalance);
    $rootScope.$watch('month', $scope.updateBalance);

    //$('.side-panel').affix({offset: 40});
}

BalancePanelCtrl.$inject = ['$scope', '$http', '$rootScope', '$filter', 'calculators', 'BalanceChart'];
