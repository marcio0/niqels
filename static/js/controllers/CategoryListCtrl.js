function CategoryListCtrl ($scope, Category) {
    Category.query().$then(function (result) {
        var categories = result.resource;
        $scope.categories = categories;
    });
}

CategoryListCtrl.$inject = ['$scope', 'Category'];
