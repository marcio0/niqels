var app = angular.module('webapp', ['transactionService', 'categoryService', 'interceptor']).

    config(['$routeProvider', function($routeProvider, $httpProvider) {
        $routeProvider
            .when('/transactions/', {
                templateUrl: '/partials/transaction-list/'
            })
            .otherwise({
                redirectTo: '/transactions/'
            });
    }]);
