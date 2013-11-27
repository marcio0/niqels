(function () {
'use strict';

// TODO
// - criar factory $ga com métodos setMetric, setDimension, sendMetric e trackEvent
// refatorar diretiva, poder selecionar se é métrica ou evento ou dimensão

angular.module('ga', [])
    .config(function () {
        if (window.ga === undefined) {
            console.warn("Your attention please: ga is not present. Using a dummy instead.");
            window.ga = function () {
                console.log('ga() called with arguments:', arguments);
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

    .run(['$rootScope', '$location', function setupGoogleAnalytics ($rootScope, $location) {
        var transactionsCategory = "Transactions";
        var reportsCategory = 'Reports';
        var accountsCategory = 'Account';

        var createdAccountsMetric = 'metric1';
        var userAccessMetric = 'metric2';
        var createdTransactionsMetric = 'metric3';

        var transactionTypeDimension = 'dimension1';

        ga('set', userAccessMetric, 1);
        //_gaq.push(['_trackEvent', accountsCategory, 'login']);
        ga('send', 'event', accountsCategory, 'login');
        if (window.isUserFirstLogin){
            //_gaq.push(['set', 'metric1', 1]);
            //_gaq.push(['_trackEvent', accountsCategory, 'create']);
            ga('set', createdAccountsMetric, 1);
            ga('send', 'event', accountsCategory, 'create');
            window.isUserFirstTransaction = true;
        }
        else {
            window.isUserFirstTransaction = false;
        }


        $rootScope.$on('$stateChangeSuccess', function () {
            //_gaq.push(['_trackPageview', $location.path()]);
            ga('send', 'pageview', $location.path());
        });


        $rootScope.$on('transaction-created', function (ev, transaction) {
            if (window.isUserFirstTransaction) {
                ga('send', 'event', transactionsCategory, 'create-first');
                window.isUserFirstTransaction = false;
            }
            ga('set', {
                createdTransactionsMetric: 1,
                transactionTypeDimension: transaction.category.name
                
            });
            ga('send', 'event', transactionsCategory, 'create', transaction.category.name);
        });


        $rootScope.$on('transaction-removed', function () {
            ga.push('send', 'event', 'Transactions', 'remove');
        });


        $rootScope.$on('category-comparison-category-selected', function (event, category) {
            // tracking when a user changes the category on comparison report
            ga('send', 'event', reportsCategory, 'comparison-category-selection', category);
        });
    }])

    ;
})();
