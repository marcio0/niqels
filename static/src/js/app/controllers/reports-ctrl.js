function ReportsCtrl ($scope, $rootScope) {
    'use strict';

    // setting up scope variables
    $scope.period = 3;

    $scope.options = {
        dateStart: moment().startOf('month').subtract(11, 'months'),
        dateEnd: moment().endOf('month')
    };
    $scope.customPeriod = angular.copy($scope.options);

    $scope.queryPeriods = [
        {name: gettext('This month'), value: 0},
        {name: gettext('Three months'), value: 1},
        {name: gettext('Six months'), value: 2},
        {name: gettext('A year'), value: 3},
        {name: gettext('Custom...'), value: 4}
    ];

    $scope._getInterval = function (months) {
        return [
            moment().startOf('month').subtract(months, 'months'),
            moment().endOf('month')
        ];
    };

    $scope._getCustomIntervals = function () {
        return [$scope.customPeriod.dateStart, $scope.customPeriod.dateEnd];
    };

    var periodIntervals = {
        0: function () {return $scope._getInterval(0)},
        1: function () {return $scope._getInterval(2)},
        2: function () {return $scope._getInterval(5)},
        3: function () {return $scope._getInterval(12)},
        4: $scope._getCustomIntervals
    };

    $scope.$watch('period', function (newValue) {
        if (newValue === undefined) return;
        if (newValue === 4) {
            var action = 'show';
        } else {
            var action = 'hide';
        }
        $('#custom-period-panel').collapse(action);
    });

    function getParams () {
        var params = {
            date_start: $scope.options.dateStart.startOf('month').format('YYYY-MM-DD'),
            date_end: $scope.options.dateEnd.endOf('month').format('YYYY-MM-DD')
        };
        params.date__gte = params.date_start;
        params.date__lte = params.date_end;
        return params;
    }
    $scope._getParams = getParams;

    $scope.updateCharts = function updateCharts () {
        var period = periodIntervals[$scope.period]();

        $scope.options.dateStart = period[0];
        $scope.options.dateEnd = period[1];

        if ($scope.options.dateEnd.diff($scope.options.dateStart, 'months') > 12) {
            toastr.warning(gettext('The period must be 12 months or lower.'));
            return;
        }
        if ($scope.options.dateStart > $scope.options.dateEnd) {
            toastr.warning(gettext('The start date must be lower than the end date.'));
            return;
        }

        // here I use $broadcast to warn all child scopes (the charts)
        $scope.$broadcast('update-charts');
    };
}
ReportsCtrl.$inject = ['$scope', '$rootScope'];


function CategoryComparisonCtrl ($scope, $q, $rootScope, CategoryComparison, Category) {
    'use strict';

    var allSeries = {};
    function update () {

        var params = $scope._getParams();
        var data = CategoryComparison.fetchData(params).then(function (result) {
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

        var diffMonths = $scope.options.dateEnd.diff($scope.options.dateStart, 'months');

        function getDefaultData (name) {
            var data = {name: name, data: []};
            for (var i=0; i<diffMonths; i++) {
                data.data.push(0);
            }
            return data;
        }

        c1 = c1 || getDefaultData($scope.category1.name);
        c2 = c2 || getDefaultData($scope.category2.name);

        // adding missing points at the end
        for (var i=c1.data.length; i< diffMonths + 1; i++) {
            c1.data.push(0);
            //c2.data.push(0);
        }
        for (var i=c2.data.length; i< diffMonths + 1; i++) {
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

    var c1Flag = false;
    $scope.$watch('category1', function (category) {
        if (!category) return;
        if (!c1Flag) {
            c1Flag = true;
            return;
        }
        $rootScope.$emit('category-comparison-category-selected', category);
    });

    var c2Flag = false;
    $scope.$watch('category2', function (category) {
        if (!category) return;
        if (!c2Flag) {
            c2Flag = true;
            return;
        }
        $rootScope.$emit('category-comparison-category-selected', category);
    });


    // the parent scope will $broadcast this
    $scope.$on('update-charts', update);

    update();

}
CategoryComparisonCtrl.$inject = ['$scope', '$q', '$rootScope', 'CategoryComparison', 'Category'];


function TopCategoriesChartCtrl ($scope, TopCategories) {
    'use strict';

    function update () {
        var params = $scope._getParams();
        var data = TopCategories.fetchData(params);
        $scope.topCategoriesData = data;
    }

    // the parent scope will $broadcast this
    $scope.$on('update-charts', update);

    update();
}
TopCategoriesChartCtrl.$inject = ['$scope', 'TopCategories'];


function BalanceChartCtrl ($scope, BalanceChart) {
    'use strict';

    function update () {
        var params = $scope._getParams();
        var data = BalanceChart.fetchData(params);
        $scope.balanceData = data;
    }

    // the parent scope will $broadcast this
    $scope.$on('update-charts', update);

    update();
}
BalanceChartCtrl.$inject = ['$scope', 'BalanceChart'];
