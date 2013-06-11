'use strict';

function BalancePanelCtrl ($scope, $http, $rootScope) {
    $scope.updateBalance = function () {
        $http.get('/api/v1/data/balance/').then(function (result) {
            $scope.balance_data = result.data;
        });
    };

    $rootScope.$on('transactionCreated', function (event, data) {
        $scope.updateBalance();
    });

    $scope.updateBalance();

    $('#balance-help').popover({
        placement: 'left',
        trigger: 'hover',
        content: gettext('Shows the sum of all your transactions up to the current day, and the comparison with the previous months.')
    });

    $('.side-panel').affix({offset: 40});
}

function TransactionActionBarCtrl ($scope, Transaction) {
    $scope.removeTransaction = function () {
        //finish this
        Transaction.delete({id: $scope.transaction.id}).$then(function () {
            for (var i in $scope.days) {
                var day = $scope.days[i];
                if (day.day === $scope.transaction.date) {
                    day.transactions.splice(day.transactions.indexOf($scope.transaction), 1);
                }
            }
        });
    };
}

function TransactionFormCtrl ($scope, $element, $http, $rootScope, Transaction, Category) {
    $scope.transaction = {};
    $scope.errors = {};
    $scope.sending = false;

    $scope.submit = function () {
        var transaction_data = $scope.transaction,
            form = this.entryform;

        if (form.$invalid) {
            $scope.errors.category = form.category.$error.required;
            $scope.errors.value = form.value.$error.required;
        }
        else {
            $scope.sending = true;
            // clears invalid state
            $scope.errors = {};

            Transaction.save(transaction_data)
                .$then(function (value) {
                    $rootScope.$broadcast('transactionCreated', value.data);

                    // clears the form
                    $scope.transaction = {};
                    form.$setPristine();
                })
                .always(function () {
                    $scope.sending = false;
                });
        }
    };

    $('[name="entryform"]').affix({offset: 40});
}

function TransactionListCtrl($scope, $rootScope, Transaction, $filter) {
    $scope.days = [];
    $scope.month = new Date();
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

        Transaction.get(filter).$then(function (result) {
            $scope.days = [];
            var transactions = result.data.objects;

            // grouping the entries by day
            var days = {};
            for (var i in transactions) {
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

    $scope.$watch('month', filterTransactions);
    
    $rootScope.$on('transactionCreated', function (event, data) {
        var showingMonth = month.getMonth() + 1;
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
