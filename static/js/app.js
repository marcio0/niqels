var app = angular.module('webapp', ['transactionService']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/transactions', {templateUrl: '/app/transaction-list/', controller: TransactionListCtrl}).
      when('/transactions/:id', {templateUrl: '/app/transaction-detail/', controller: TransactionDetailCtrl}).
      otherwise({redirectTo: '/transactions'});
}]);
