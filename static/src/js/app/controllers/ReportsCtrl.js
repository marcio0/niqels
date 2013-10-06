'use strict';

function ReportsCtrl ($scope, BalanceChart, Top10) {
    $scope.options = {};

    function getParams () {
        return {
            date_start: $scope.options.dateStart.format('YYYY-MM-DD'),
            date_end: $scope.options.dateEnd.format('YYYY-MM-DD')
        };
    };

    $scope.updateBalance = function () {
        var data = BalanceChart.fetchData(getParams()).then(function setupScope (result) {
            result.options.chart.backgroundColor = '#f5f5f5';
            return result;
        });

        $scope.balanceData = data;
    };

    $scope.updateTop10 = function () {

        var data = Top10.fetchData(getParams()).then(function (result) {
            result.options.chart.backgroundColor = '#f5f5f5';
            return result;
        });

        $scope.top10Data = data;
    };

    var today = moment();

    $scope.options.dateStart = today.clone().subtract(12, 'months');
    $scope.options.dateEnd = today;

    $scope.updateAll = function updateAll () {
        $scope.updateBalance();
        $scope.updateTop10();
    };
    $scope.updateAll();
}

ReportsCtrl.$inject = ['$scope', 'BalanceChart', 'Top10'];
