function ReportsCtrl ($scope, $rootScope, BalanceChart, Top10, CategoryComparison, Category) {
    'use strict';

    $scope.options = {};

    function createAdditionalCategories (categories) {
        var renevuesCategory = {
            name: gettext('Renevues'),
            group: gettext('Balance data')
        };
        var expensesCategory = {
            name: gettext('Expenses'),
            group: gettext('Balance data')
        };
        for (var i in categories) {
            var category = $scope.categories[i];

            //removing previous "balance data" items
            if (category.group == gettext('Balance data')) {
                categories.splice(i, 1);
            }
        }
        categories.unshift(renevuesCategory, expensesCategory);
        $scope.category1 = renevuesCategory;
        $scope.category2 = expensesCategory;
    };

    function getParams () {
        return {
            date_start: $scope.options.dateStart.startOf('month').format('YYYY-MM-DD'),
            date_end: $scope.options.dateEnd.endOf('month').format('YYYY-MM-DD')
        };
    }

    function updateBalance () {
        var data = BalanceChart.fetchData(getParams()).then(function setupScope (result) {
            result.options.chart.backgroundColor = '#f5f5f5';
            return result;
        });

        $scope.balanceData = data;
    }

    function updateTop10 () {

        var data = Top10.fetchData(getParams()).then(function (result) {
            result.options.chart.backgroundColor = '#f5f5f5';
            return result;
        });

        $scope.top10Data = data;
    }

    function updateCategoryComparison() {
        Category.query().$then(function (result) {
            $scope.categories = result.resource;

            createAdditionalCategories($scope.categories);
        });

        var data = CategoryComparison.fetchData(getParams()).then(function (result) {
            result.options.chart.backgroundColor = '#f5f5f5';
            // save result and use only 2 of them

            return result;
        });

        $scope.categoryComparisonData = data;
    }

    function selectCategory (category) {
        if (!category) return;
        //override series
    }

    $scope.$watch('category1', selectCategory);
    $scope.$watch('category2', selectCategory);

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

ReportsCtrl.$inject = ['$scope', '$rootScope', 'BalanceChart', 'Top10', 'CategoryComparison', 'Category'];
