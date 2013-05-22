angular.module('transactionService', ['ngResource']).
    factory('Transaction', function($resource){
        return $resource('/api/v1/transaction/:id', {}, {
            query: {
                method: 'GET', 
                params: {id: ''}
            }
        });
    });
