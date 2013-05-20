function CategoryCt($scope, $http) {
    $http.get('/api/v1/category/').success(function(data){
        $scope.categories = data.objects;
    });
}
