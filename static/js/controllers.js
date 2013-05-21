function CategoryListCtrl($scope, Category) {
    $scope.categories = Category.query();
}

function CategoryDetailCtrl($scope, $routeParams, Category) {
    $scope.category = Category.get({category_id: $routeParams.category_id});
}
