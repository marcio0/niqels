function TransactionListCtrl ($scope, $rootScope, Transaction, $filter, $parse) {
    'use strict';

    $scope.days = [];
    $scope.groupBy = 'category.name';
    $scope.categories = [];
    $rootScope.filterDate = moment();
    $scope.loading = true;
    $scope.allTransactions = [];
    $scope.transactionGroups = [];

    function groupTransactions (grouper) {
        var transactionGroups = [];
        var getter = $parse(grouper);
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
            transactionGroups.push({
                name: groupName,
                transactions: groupObj[groupName]
            });
        }

        return transactionGroups;
    }

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

            $scope.allTransactions = result.resource;
            $scope.transactionGroups = groupTransactions($scope.groupBy);

        }).always(function () {$scope.loading = false;});
    };

    $rootScope.$watch('filterDate', filterTransactions);

    $scope.moveMonth = function moveMonth (dir) {
        $rootScope.filterDate = $rootScope.filterDate.clone()[dir]('month', 1);
    };

    $rootScope.$on('transactionCreated', function (event, transaction) {
        var showingMonth = $rootScope.filterDate.month() + 1;
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
                return;
            }
        }
        $scope.transactionGroups.push({
            name: attr,
            transactions: [transaction]
        });
    });

    $scope.isEmpty = function isEmpty () {
        return ($scope.transactionGroups.length === 0) && !$scope.loading;
    };
}

TransactionListCtrl.$inject = ['$scope', '$rootScope', 'Transaction', '$filter', '$parse'];
