'use strict';

function ReportsCtrl ($scope, BalanceChart, Top10) {
    var params = {
        date_start: '2010-08-01',
        date_end: '2010-10-30'
    };

    $scope.updateBalance = function () {
        var data = BalanceChart.fetchData(params).then(function setupScope (result) {
            result.options.chart.backgroundColor = '#f5f5f5';
            return result;
        });

        $scope.balanceData = data;
    };

    $scope.updateTop10 = function () {

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
