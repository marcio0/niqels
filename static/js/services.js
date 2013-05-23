angular.module('transactionService', ['ngResource']).
    factory('Transaction', function($resource, $route){
        return $resource('/api/v1/transaction/:id', {}, {
            query: {
                method: 'GET',
                isArray: false
            }
        });
    });
