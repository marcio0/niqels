function CategoryListCtrl($scope, Category) {
    $scope.categories = Category.query();
}

function CategoryDetailCtrl($scope, $routeParams) {
  //$scope.category_id = $routeParams.category_id;
}
