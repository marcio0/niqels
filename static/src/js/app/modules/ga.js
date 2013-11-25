(function () {
'use strict';

angular.module('ga', [])
    .config(function () {
        if (window._gaq === undefined) {
            console.warn("Your attention please: _gaq is not present. Using a dummy instead.");
            window._gaq = [];
        }
    })

    .directive('track', function () {
        return {
            retrict: 'A',
            link: function (scope, element, attrs) {
                var vars = attrs.track.split(',');

                var action = vars.splice(0, 1)[0];

                vars.unshift('_trackEvent');

                element.on(action, function () {
                    _gaq.push(vars);
                });
            }
        };
    })

    .run(['$rootScope', '$location', function setupGoogleAnalytics ($rootScope, $location) {
        var transactionsCategory = "Transactions";
        var reportsCategory = 'Reports';
        var accountsCategory = 'Account';

        var createdAccountsMetric = 'metric1';
        var userAccessMetric = 'metric2';


        _gaq.push(['set', 'metric2', 1]);
        if (window.isUserFirstLogin){
            _gaq.push(['set', 'metric1', 1]);
            _gaq.push(['_trackEvent', accountsCategory, 'create']);
            window.isUserFirstTransaction = true;
        }
        else {
            window.isUserFirstTransaction = false;
        }


        $rootScope.$on('$stateChangeSuccess', function () {
            _gaq.push(['_trackPageview', $location.path()]);
        });


        $rootScope.$on('transaction-created', function (ev, transaction) {
            // tracks transactions

            if (window.isUserFirstTransaction) {
                // if it's the first user transaction

                _gaq.push(['_trackEvent', transactionsCategory, 'create-first']);
                window.isUserFirstTransaction = false;
            }
            _gaq.push(['_trackEvent', transactionsCategory, 'create', transaction.category.name]);
        });


        $rootScope.$on('transaction-removed', function () {
            _gaq.push(['_trackEvent', 'Transactions', 'remove']);
        });


        $rootScope.$on('category-comparison-category-selected', function (event, category) {
            // tracking when a user changes the category on comparison report
            _gaq.push(['_trackEvent', reportsCategory, 'comparison-category-selection', category]);
        });
    }])

    ;
})();
