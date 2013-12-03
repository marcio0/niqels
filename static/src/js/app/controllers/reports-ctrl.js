function ReportsCtrl ($scope, $rootScope) {
    'use strict';

    $scope.getInterval = function (months) {
        return [
            moment().startOf('month').subtract(months, 'months'),
            moment().endOf('month')
        ];
    };

    var periodsIntervals = {
        0: $scope.getInterval(0),
        1: $scope.getInterval(2),
        2: $scope.getInterval(5),
        3: $scope.getInterval(12)
    };

    var today = moment();

    $scope.queryPeriods = [
        {name: gettext('This month'), value: 0},
        {name: gettext('Three months'), value: 1},
        {name: gettext('Six months'), value: 2},
        {name: gettext('A year'), value: 3},
        {name: gettext('Custom...'), value: 4}
    ];
    $scope.period = 3;

    $scope.options = {};
    $scope.options.dateStart = today.clone().subtract(11, 'months');
    $scope.options.dateEnd = today;

    $scope.$watch('period', function (newValue) {
        if (!newValue) return;
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
        var period = periodsIntervals[$scope.period];
        console.log(period[0], period[1]);
        return;

        var dateStart = period[0];
        var dateEnd = period[1];

        if (dateEnd.diff(dateStart, 'months') > 12) {
            toastr.warning(gettext('The period must be 12 months or lower.'));
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
