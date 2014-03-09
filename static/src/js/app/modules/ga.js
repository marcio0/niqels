(function () {
'use strict';

// TODO
// - criar factory $ga com métodos setMetric, setDimension, sendMetric e trackEvent
// refatorar diretiva, poder selecionar se é métrica ou evento ou dimensão

angular.module('ga', [])
    .config(function () {
        if (window.ga === undefined) {
            console.warn("Your attention please: ga is not present. Using '_ga' as a dummy instead.");
            window._ga = [];
            window.ga = function () {
                _ga.push(arguments);
            };
        }
    })

    .directive('track', function () {
        return {
            retrict: 'A',
            link: function (scope, element, attrs) {
                var vars = attrs.track.split(',');

                var listener = vars.splice(0, 1)[0];

                var category = vars.shift();
                var action = vars.shift();
                var label = vars.shift();

                element.on(listener, function () {
                    ga('send', 'event', category, action, label);
                });
            }
        };
    })

    .factory('Tracker', function () {
        return {
            event: function trackEvent (category, action, label, value) {
                ga('send', 'event', category, action, label, value);
            },
            pageview: function (path) {
                ga('send', 'pageview', path);
            }
        };
    })

    .run(['$rootScope', '$location', function setupGoogleAnalytics ($rootScope, $location) {
        var transactionsCategory = "Transactions";
        var reportsCategory = 'Reports';

        var accountsCategory = 'Account';

        var createdAccountsMetric = 'metric1';
        var userAccessMetric = 'metric2';
        var createdTransactionsMetric = 'metric3';

        var transactionTypeDimension = 'dimension1';

        ga('send', 'event', accountsCategory, 'login', {'metric2': 1});
        if (window.isUserFirstLogin){
            ga('send', 'event', accountsCategory, 'create', {'metric1': 1});
            window.isUserFirstTransaction = true;
        }
        else {
            window.isUserFirstTransaction = false;
        }


        $rootScope.$on('transaction-created', function (ev, transaction) {
            if (window.isUserFirstTransaction) {
                ga('send', 'event', transactionsCategory, 'create-first');
                window.isUserFirstTransaction = false;
            }
            ga('send', 'event', transactionsCategory, 'create', transaction.category.name, {
                'metric3': 1, //createdTransactionsMetric
                'dimension1': transaction.category.name //transactionTypeDimension

            });
        });


        $rootScope.$on('transaction-removed', function () {
            ga('send', 'event', 'Transactions', 'remove');
        });


        $rootScope.$on('category-comparison-category-selected', function (event, category) {
            // tracking when a user changes the category on comparison report
            ga('send', 'event', reportsCategory, 'comparison-category-selection', category);
        });

        $rootScope.$on('$stateChangeSuccess', function () {
            ga('send', 'pageview', $location.path());
        });
    }])


    // Setting up threshold related events
    .run(['$rootScope', 'CategoryThreshold', function ($rootScope, CategoryThreshold) {
        var thresholdsCategory = 'Threshold';

        $rootScope.$on(CategoryThreshold.EVENT_CREATE, function (ev, threshold) {
            ga('send', 'event', thresholdsCategory, 'create', threshold.category.name);
        });

        $rootScope.$on(CategoryThreshold.EVENT_UPDATE, function (ev, threshold) {
            ga('send', 'event', thresholdsCategory, 'update', threshold.category.name);
        });

        $rootScope.$on(CategoryThreshold.EVENT_DELETE, function (ev, threshold) {
            ga('send', 'event', thresholdsCategory, 'delete', threshold.category.name);
        });
    }])

;
})();
