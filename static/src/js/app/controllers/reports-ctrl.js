function ReportsCtrl ($scope, $rootScope, BalanceChart, Top10, CategoryComparison, Category) {
    'use strict';

    $scope.options = {};

    function createAdditionalCategories (categories) {
        var renevuesCategory = {
            name: gettext('Renevues'),
            sum: 0,
            group: gettext('Balance data')
        };
        var expensesCategory = {
            name: gettext('Expenses'),
            sum: 0,
            group: gettext('Balance data')
        };
        for (var i in categories) {
            var category = $scope.categories[i];

            //removing previous "balance data" items
            if (category.group == gettext('Balance data')) {
                categories.splice(i, 1);
            }

            if (category.sum > 0) {
                renevuesCategory.sum += category.sum;
            }
            else {
                expensesCategory.sum += category.sum;
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

        var data = CategoryComparison.fetchData(getParams()).then(function (result) {
            result.options.chart.backgroundColor = '#f5f5f5';

            Category.query().$then(function (result) {
                $scope.categories = result.resource;

                createAdditionalCategories($scope.categories);

                // organizing the categories to find them easily later
                $scope.categoriesDict = {};
                for (var i in $scope.categories) {
                    var c = $scope.categories[i];
                    $scope.categoriesDict[c.name] = c;
                }
            });
            return result;
        });

        $scope.categoryComparisonData = data;
    }

    function selectCategory (category) {
        if (!category) return;

        var c1 = $scope.categoriesDict[$scope.category1.name],
            c2 = $scope.categoriesDict[$scope.category2.name];
        console.log(c1, c2);
        $scope.categoryComparisonData.series = [c1, c2];
    }

    $scope.$watch('category1', selectCategory);
    $scope.$watch('category2', selectCategory);

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
        updateCategoryComparison();
    };
    $scope.updateAll();
}

ReportsCtrl.$inject = ['$scope', '$rootScope', 'BalanceChart', 'Top10', 'CategoryComparison', 'Category'];
