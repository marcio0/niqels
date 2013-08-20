'use strict';

var app = angular.module('webapp', ['models', 'interceptor', '$strap.directives', 'ui.state'])

    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise("/transactions");

        $stateProvider
            // Transaction list view.
            .state('transactions', {
                url: "/transactions",
                templateUrl: "transaction-list.html"
            })

            // Settings view.
            .state('settings', {
                url: "/settings",
                templateUrl: "settings.html"
            })
            // Settings view -> category list.
            .state('settings.categories', {
                url: "/categories",
                templateUrl: "/partials/category-list/",
                controller: "CategoryListCtrl"
            })
            // Settings view -> reminder list.
            .state('settings.reminders', {
                url: "/reminders",
                templateUrl: "/partials/reminder-list/",
                controller: "ReminderListCtrl"
            })
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
    .run(['$rootScope', '$state', '$window', function ($rootScope, $state, $window) {
        $rootScope.$on('transactionCreated', function (e, transaction) {
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

        $rootScope.$state = $state;

        //configuring toastr
        toastr.options = {
            "positionClass": "toast-bottom-right",
            "fadeIn": 400,
            "fadeOut": 500,
            "timeOut": 3000,
            "extendedTimeOut": 3000
        };

        toastr.notifyCreationSuccess = function (entity, values) {
            toastr.success(gettext('%s sucessfuly created!').replace('%s', entity));
        };

        toastr.notifyUpdateSuccess = function (entity, values) {
            toastr.success(gettext('%s sucessfuly updated!').replace('%s', entity));
        };

        toastr.notifyCreationFailure = function (entity, values) {
            toastr.error(gettext('An error ocurred creating %s.').replace('%s', entity.toLowerCase()));
        };

        toastr.notifyRemovalSuccess = function (entity, values) {
            toastr.success(gettext('%s sucessfuly removed.').replace('%s', entity));
        };

    }])

    ;
