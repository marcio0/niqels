var app = angular.module('webapp', ['models', 'interceptor', '$strap.directives'])

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

    .config(['$interpolateProvider', function($interpolateProvider) {
        $interpolateProvider.startSymbol('((');
        $interpolateProvider.endSymbol('))');
    }])

    .run(['$locale', function ($locale) {
        // configuring moment language based on angular's locale
        moment().lang($locale.id);
    }])

    .run(['$rootScope', function ($rootScope) {
        // configuring global vars and scope
        $rootScope.$on('transactionCreated', function (ev, transaction) {
            if (user_categories.indexOf(transaction.category.name) == -1) {
                //TODO: move this to somewhere else maybe
                user_categories.push(transaction.category.name);
            }
        });
    }])

    ;
