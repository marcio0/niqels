function ReportsCtrl ($scope, $rootScope, BalanceChart, Top10, CategoryComparison, Category, $q) {
    'use strict';

    $scope.options = {};

    function getParams () {
        var params = {
            date_start: $scope.options.dateStart.startOf('month').format('YYYY-MM-DD'),
            date_end: $scope.options.dateEnd.endOf('month').format('YYYY-MM-DD')
        };
        params.date__gte = params.date_start;
        params.date__lte = params.date_end;
        return params;
    }

    function updateBalance () {
        var data = BalanceChart.fetchData(getParams()).then(function setupScope (result) {
            return result;
        });

        $scope.balanceData = data;
    }

    function updateTop10 () {

        var data = Top10.fetchData(getParams()).then(function (result) {
            return result;
        });

        $scope.top10Data = data;
    }

    var allSeries = {};
    function updateCategoryComparison() {
        var data = CategoryComparison.fetchData(getParams()).then(function (result) {
            var c1 = gettext('Renevues');
            var c2 = gettext('Expenses');

            for (var i in result.options.series) {
                var group = result.options.series[i];
                allSeries[group.name] = group;
            }

            result.options.series = [allSeries[c1], allSeries[c2]];

            $scope.$watch('category1', selectCategory);
            $scope.$watch('category2', selectCategory);

            return result;
        });

        $scope.categoryComparisonData = data;
    }


    function selectCategory (category) {
        if (!category) return;

        var c1 = allSeries[$scope.category1.name];
        var c2 = allSeries[$scope.category2.name];

        //TODO: fix this for different periods
        c1 = c1 || {name: $scope.category1.name, data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]};
        c2 = c2 || {name: $scope.category2.name, data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]};

        for (var i=0; i<$scope.options.dateStart.diff($scope.options.dateEnd, 'months'); i++) {
            c1.data.push(0);
            c2.data.push(0);
        }

        // after the chart data promise delivers, set up series
        $scope.categoryComparisonData.then(function (data) {
            data.options.series = [c1, c2];
            $scope.categoryComparisonData = $q.when(data);
        });
    }

    Category.query().$then(function (result) {
        var categories = result.resource;

        // adding balance data as categories
        var renevuesCategory = {
            name: gettext('Renevues'),
            group: gettext('Balance data')
        };
        var expensesCategory = {
            name: gettext('Expenses'),
            group: gettext('Balance data')
        };

        categories.unshift(renevuesCategory, expensesCategory);
        $scope.categories = categories;

        $scope.category1 = renevuesCategory;
        $scope.category2 = expensesCategory;

        selectCategory();
    });


    var today = moment();

    $scope.options.dateStart = today.clone().subtract(11, 'months');
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
        updateCategoryComparison();
    };
    $scope.updateAll();
}

ReportsCtrl.$inject = ['$scope', '$rootScope', 'BalanceChart', 'Top10', 'CategoryComparison', 'Category', '$q'];
