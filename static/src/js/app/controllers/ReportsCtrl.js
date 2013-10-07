function ReportsCtrl ($scope, BalanceChart, Top10) {
    'use strict';

    $scope.options = {};

    function getParams () {
        return {
            date_start: $scope.options.dateStart.format('YYYY-MM-DD'),
            date_end: $scope.options.dateEnd.format('YYYY-MM-DD')
        };
    }

    function updateBalance () {
        var data = BalanceChart.fetchData(getParams()).then(function setupScope (result) {
            result.options.chart.backgroundColor = '#f5f5f5';
            return result;
        });

        $scope.balanceData = data;
    };

    function updateTop10 () {

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
        var dateStart = $scope.options.dateStart;
        var dateEnd = $scope.options.dateEnd;

        if (dateEnd.diff(dateStart, 'months') > 12) {
            toastr.warning(gettext('The period must be 12 months or lower.'));
            return;
        }

        updateBalance();
        updateTop10();
    };
    $scope.updateAll();
}

ReportsCtrl.$inject = ['$scope', 'BalanceChart', 'Top10'];
