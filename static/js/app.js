angular.module('expenses', []).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/categories', {templateUrl: 'category-list.html', controller: CategoryListCtrl}).
      when('/category/:category_id', {templateUrl: 'category-detail.html', controller: CategoryDetailCtrl}).
      otherwise({redirectTo: '/categories'});
}]);
