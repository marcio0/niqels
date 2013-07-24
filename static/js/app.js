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

    // configuring global vars and scope
    .run(['$rootScope', function ($rootScope) {
        $rootScope.$on('transactionCreated', function (ev, transaction) {
            if (user_categories.indexOf(transaction.category.name) == -1) {
                //TODO: move this to somewhere else maybe
                user_categories.push(transaction.category.name);
            }
        });

        $rootScope.gettext = function ngGettext (string) {
            return gettext(string);
        };

        $rootScope.interpolate = function ngInterpolate (fmt, obj, named) {
            return interpolate(fmt, obj, named);
        };
    }])

    ;
