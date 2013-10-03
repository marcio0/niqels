'use strict';

function ReportsCtrl ($scope, BalanceChart, Top10) {
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

        var data = BalanceChart.fetchData(params).then(function (result) {
            result.options.chart.backgroundColor = '#f5f5f5';
            return result;
        });

        $scope.balanceData = data;
    };

    $scope.updateTop10 = function () {
        var params = {
            date_start: '2010-08-01',
            date_end: '2010-10-30'
        };

        var data = Top10.fetchData(params).then(function (result) {
            result.options.chart.backgroundColor = '#f5f5f5';
            return result;
        });

        $scope.top10Data = data;
    };

    $scope.updateBalance();
    $scope.updateTop10();
}

ReportsCtrl.$inject = ['$scope', 'BalanceChart', 'Top10'];
