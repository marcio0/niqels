(function () {
'use strict';

var app = angular.module('webapp', ['models', 'interceptor', '$strap.directives', 'ui.router', 'charts', 'ga', 'hashtags', 'ngAnimate'])

    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider){
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

            // Reports view.
            .state('reports', {
                url: "/reports",
                templateUrl: "reports.html"
            })
            // Reports view -> balance report.
            .state('reports.balance', {
                url: "/balance",
                templateUrl: "balance.html",
                controller: 'BalanceChartCtrl'
            })
            // Reports view -> top categories report.
            .state('reports.top-categories', {
                url: "/top-categories",
                templateUrl: "top-categories.html",
                controller: 'TopCategoriesChartCtrl'
            })
            // Reports view -> category comparison report.
            .state('reports.category-comparison', {
                url: "/category-comparison",
                templateUrl: "category-comparison.html",
                controller: 'CategoryComparisonCtrl'
            })
            ;

            $locationProvider.html5Mode(false);
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
    .run(['$rootScope', '$state', '$window', 'Category', function ($rootScope, $state, $window, Category) {
        $rootScope.gettext = function ngGettext (string) {
            return gettext(string);
        };

        $rootScope.interpolate = function ngInterpolate (fmt, obj, named) {
            return interpolate(fmt, obj, named);
        };

        Category.query().$promise.then(function (result) {
            $rootScope.categories = result;
        });

        $rootScope.$state = $state;
        $rootScope.$on('$stateChangeSuccess', function (event, toState) {
            if (toState.name === 'reports') {
                $state.go('reports.balance');
            }
        });

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

        // String format function
        // First, checks if it isn't implemented yet.
        if (!String.prototype.format) {
            String.prototype.format = function() {
                var args = arguments;
                return this.replace(/{(\d+)}/g, function(match, number) { 
                    return typeof args[number] != 'undefined' ? args[number] : match;
                });
            };
        }

    }])

    .run(['$rootScope', '$window', function ($rootScope, $window) {
        // screen values based on bootstrap's default variables
        var phone = 768,
            tablet = 992,
            desktop = 1200;

        var checkDevice = function checkDevice () {
            var width = document.width,
                device = '';

            if (width < phone) {
                device = 'phone';
            }
            else if (width < tablet) {
                device = 'tablet';
            }
            else if (width < desktop) {
                device = 'desktop';
            }
            else {
                device = 'desktop-lg';
            }

            if (device != $rootScope.device) {
                $rootScope.device = device;
                if (device !== '') {
                    $rootScope.$broadcast('devicechanged', device);
                }
            }
        };

        $window.onresize = function () {
            $rootScope.$apply(function () {
                // since this event happened outside angular's cycle,
                // we must to it inside an apply call to make sure
                // angular will see the changes
                // also, this code is here because angular crashes on the first call to checkDevice()
                // on the digest cycle
                checkDevice();
            });
        };
        checkDevice();

        $rootScope.mobile = function() {
            var check = false;
            (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true;})(navigator.userAgent||navigator.vendor||window.opera);
            return check; }();

        if ($rootScope.mobile) {
            toastr.options = {
                "positionClass": "toast-bottom-full-width"
            };
        }
    }])

    ;
})();
