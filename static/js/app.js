var app = angular.module('webapp', ['models', 'interceptor'])

    .config(['$routeProvider', function($routeProvider, $httpProvider) {
        $routeProvider
            .when('/transactions/', {
                templateUrl: '/partials/transaction-list/'
            })
            .otherwise({
                redirectTo: '/transactions/'
            });
    }])

    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.headers.common['X-CSRFToken'] = $('body > input[name=csrfmiddlewaretoken]').val();
        $httpProvider.responseInterceptors.push('sessionInterceptor');
    }]);
