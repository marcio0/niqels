'use strict';

function TransactionListCtrl ($scope, $rootScope, Transaction, $filter) {
    $scope.days = [];
    $rootScope.month = new Date().getMonth();
    $rootScope.filterDate = new Date();
    $scope.loading = false;

    var filterTransactions = function (value) {
        var start, end, filter;

        $scope.loading = true;

        start = value;
        start.setDate(1);

        // somehow this sets to the last day of the month
        end = new Date(start.getFullYear(), start.getMonth()+1, 0);

        filter = {
            date__gte: $filter('date')(start, 'yyyy-MM-dd'),
            date__lte: $filter('date')(end, 'yyyy-MM-dd')
        };

        Transaction.query(filter).$then(function (result) {
            $scope.days = [];
            var transactions = result.resource;

            // grouping the entries by day
            var days = {};
            for (var i=0; i < transactions.length; i++) {
                var transaction = transactions[i];

                if (!(transaction.date in days)) {
                    days[transaction.date] = [];
                }

                days[transaction.date].push(transaction);
            }

            // trasforming the data into a list to be used in ang orderBy filter
            for (var day in days) {
                $scope.days.push({
                    day: day,
                    transactions: days[day]
                });
            }
        }).always(function () {$scope.loading = false;});
    };

    $scope.$watch('filterDate', function (newValue) {
        $rootScope.month = newValue.getMonth();
        filterTransactions(newValue);
    });

    $rootScope.$on('transactionCreated', function (event, data) {
        var showingMonth = $rootScope.month + 1;
        var transactionMonth = parseInt(data.date.split('-')[1]);

        if (showingMonth !== transactionMonth) {
            // the transaction is not for this month, getting out
            return;
        }

        // when a transaction is created, add it to the list
        // it's an alternative to loading everything again
        for (var i in $scope.days) {
            var day = $scope.days[i];
            if (day.day == data.date) {
                day.transactions.unshift(data);
                return;
            }
        }
        $scope.days.push({
            day: data.date,
            transactions: [data]
        });
    });
}

TransactionListCtrl.$inject = ['$scope', '$rootScope', 'Transaction', '$filter'];
