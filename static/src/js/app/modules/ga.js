(function () {
'use strict';

angular.module('ga', [])
    .config(function () {
        if (window._gaq === undefined) {
            console.warn("Your attention please: _gaq is not present. I'm replacing it with a list.");
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

        $rootScope.$on('$stateChangeSuccess', function () {
            _gaq.push(['_trackPageview', $location.path()]);
        });

        if (window.isUserFirstLogin){
            _gaq.push(['_trackEvent', accountsCategory, 'create']);
            window.isUserFirstTransaction = true;
        }
        else {
            window.isUserFirstTransaction = false;
            _gaq.push(['_trackEvent', accountsCategory, 'returned']);
        }

        $rootScope.$on('transaction-created', function () {
            // tracks transactions

            if (window.isUserFirstTransaction) {
                // if it's the first user transaction

                _gaq.push(['_trackEvent', transactionsCategory, 'create-first']);
                window.isUserFirstTransaction = false;
            }
            else {
                _gaq.push(['_trackEvent', transactionsCategory, 'create']);
            }
        });

        $rootScope.$on('transaction-removed', function () {
            _gaq.push(['_trackEvent', 'Transactions', 'remove']);
            
        });

        var first = false;
        $rootScope.$on('transaction-list-filter-date-changed', function (event, date) {
            // when a user changes the date period on the transaction list
            if (!first) {
                // do not log the first hit, it's not user interaction
                first = true;
                return;
            }

            var dateStr = moment(date).format('YYYY-MM-DD');
            _gaq.push(['_trackEvent', transactionsCategory, 'change-list-period', dateStr]);
        });

        $rootScope.$on('category-comparison-category-selected', function (event, category) {
            // tracking when a user changes the category on comparison report
            _gaq.push(['_trackEvent', reportsCategory, 'comparison-category-selection', category]);
        });
    }])

    ;
})();
