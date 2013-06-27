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
        // sending csrf token on all requests
        $httpProvider.defaults.headers.common['X-CSRFToken'] = $('body > input[name=csrfmiddlewaretoken]').val();
        $httpProvider.responseInterceptors.push('sessionInterceptor');
    }])

    .run(['$locale', function ($locale) {
        // configuring moment language based on angular's locale
        moment().lang($locale.id);
    }]);

    ;
