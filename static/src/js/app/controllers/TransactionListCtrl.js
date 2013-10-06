'use strict';

function TransactionListCtrl ($scope, $rootScope, Transaction, $filter) {
    $scope.days = [];
    $rootScope.filterDate = moment();
    $scope.loading = true;

    var filterTransactions = function (value) {
        var start, end, filter;

        $scope.loading = true;

        start = value.startOf('month');
        end = moment(start).endOf('month');

        filter = {
            date__gte: start.format('YYYY-MM-D'),
            date__lte: end.format('YYYY-MM-D'),
            limit: 0
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

    $rootScope.$watch('filterDate', filterTransactions);

    $scope.moveMonth = function moveMonth (dir) {
        $rootScope.filterDate = $rootScope.filterDate.clone()[dir]('month', 1);
    };

    $rootScope.$on('transactionCreated', function (event, data) {
        var showingMonth = $rootScope.filterDate.month() + 1;
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

    $scope.isEmpty = function isEmpty () {
        return ($scope.days.length === 0) && !$scope.loading;
    };
}

TransactionListCtrl.$inject = ['$scope', '$rootScope', 'Transaction', '$filter'];
