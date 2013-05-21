function CategoryListCtrl($scope, $http) {
    $http.get('/api/v1/category/').success(function(data){
        $scope.categories = data.objects;
    });
}

function CategoryDetailCtrl($scope, $routeParams) {
  $scope.category_id = $routeParams.category_id;
}
