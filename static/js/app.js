var app = angular.module('webapp', ['transactionService', 'categoryService', 'interceptor']).

    config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
        $routeProvider.
            when('/transactions', {
                templateUrl: '/app/transaction-list/'
            }).
            otherwise({
                redirectTo: '/transactions'
            });
    }]);
