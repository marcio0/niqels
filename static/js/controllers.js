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
        $scope.sending = true;
        var transaction_data = $scope.transaction,
            form = this.entryform;

        if (form.$invalid) {
            $scope.errors.category = form.category.$error.required;
            $scope.errors.value = form.value.$error.required;
            $scope.errors.date = form.date.$error.required;
        }
        else {
            // clears invalid state
            $scope.errors = {};

            Transaction.save(transaction_data)
                .$then(function (value) {
                    $rootScope.$broadcast('transactionCreated', value.data);

                    // clears the form
                    $scope.transaction = {};
                    form.$setPristine();
                    form.date.resetDate();
                })
                .always(function () {
                    $scope.sending = false;
                });
        }
    };
}

function TransactionListCtrl($scope, $rootScope, Transaction) {
    $scope.days = [];

    Transaction.get().$then(function (result) {
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
    });
    
    $rootScope.$on('transactionCreated', function (event, data) {
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
