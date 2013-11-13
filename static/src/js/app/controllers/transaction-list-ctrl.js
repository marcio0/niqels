function TransactionListCtrl ($scope, $rootScope, Transaction, $filter, $parse) {
    'use strict';

    $scope.days = [];
    $scope.groupBy = 'category.name';
    $scope.categories = [];
    $scope.filterDate = moment();
    $scope.loading = true;
    $scope.allTransactions = [];
    $scope.transactionGroups = [];

    $scope.getAbsTotal = function getAbsTotal (group) {
        return Math.abs(group.total);
    };

    function groupTransactions () {
        var transactionGroups = [];
        var getter = $parse($scope.groupBy);
        var allTransactions = $scope.allTransactions;

        var groupObj = {};
        for (var i=0; i < allTransactions.length; i++) {
            var transaction = allTransactions[i];
            var attr = getter(transaction);

            if (!(attr in groupObj)) {
                groupObj[attr] = [];
            }

            groupObj[attr].push(transaction);
        } 

        for (var groupName in groupObj) {
            var group = {
                name: groupName,
                transactions: groupObj[groupName],
                total: 0
            };
            for (var idx in group.transactions) {
                group.total += group.transactions[idx].value;
            }
            transactionGroups.push(group);
        }

        return transactionGroups;
    }

    var filterTransactions = function (value) {
        var start, end, filter;

        $rootScope.filterDate = value;

        $scope.transactionGroups = [];
        $scope.loading = true;

        start = value.startOf('month');
        end = moment(start).endOf('month');

        filter = {
            date__gte: start.format('YYYY-MM-D'),
            date__lte: end.format('YYYY-MM-D'),
            limit: 0
        };

        Transaction.query(filter).$then(function (result) {

            $scope.allTransactions = result.resource;
            $scope.transactionGroups = groupTransactions($scope.groupBy);

        }).always(function () {$scope.loading = false;});
    };

    $scope.moveMonth = function moveMonth (dir) {
        $scope.filterDate = $scope.filterDate.clone()[dir]('month', 1);
    };

    $rootScope.$on('transaction-created', function (event, transaction) {
        var showingMonth = $scope.filterDate.month() + 1;
        var transactionMonth = parseInt(transaction.date.split('-')[1]);

        if (showingMonth !== transactionMonth) {
            // the transaction is not for this month, getting out
            return;
        }

        $scope.allTransactions.push(transaction);

        // when a transaction is created, add it to the list
        // it's an alternative to loading everything again
        var attr = $parse($scope.groupBy)(transaction);
        for (var i in $scope.transactionGroups) {
            var group = $scope.transactionGroups[i];
            if (group.name == attr) {
                group.transactions.unshift(transaction);
                group.total += parseFloat(transaction.value);
                return;
            }
        }
        $scope.transactionGroups.push({
            name: attr,
            transactions: [transaction],
            total: parseFloat(transaction.value)
        });
    });

    // callbacks

    $rootScope.$on('transaction-removed', function reloadAfterRemove () {
        filterTransactions($scope.filterDate);
    });

    $scope.isEmpty = function isEmpty () {
        return ($scope.transactionGroups.length === 0) && !$scope.loading;
    };

    // watchers

    $scope.$watch('filterDate', filterTransactions);

    $scope.$watch('filterDate', function () {
        _gaq.push(['_trackEvent', 'Transacions', 'change-period']);
    });

    $scope.$watch('groupBy', function regroup () {
        $scope.transactionGroups = groupTransactions();
    });
}

TransactionListCtrl.$inject = ['$scope', '$rootScope', 'Transaction', '$filter', '$parse'];
