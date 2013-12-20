(function () {
'use strict';

var tastypieDataTransformer = function ($http) {
    return $http.defaults.transformResponse.concat([
        function (data, headersGetter) {
            if (data.meta && data.objects) {
                var result = data.objects;
                result.meta = data.meta;
                return result;
            }
            return data;
        }
    ]);
};

angular.module('models', ['ngResource'])

    .factory('SplitTransaction', ['$resource', '$rootScope', '$http', function ($resource, $rootScope, $http) {
        var SplitTransaction = $resource('/api/v1/split_transaction/:id', {}, {
            query: {
                method: 'GET',
                isArray: true,
                transformResponse: tastypieDataTransformer($http).concat(function (data, headersGetter) {
                    for (var idx in data) {
                        data[idx].total_value = parseFloat(data[idx].total_value);
                        // TODO setar valor das transações tb
                    }
                    return data;
                })
            }
        });

        $rootScope.$on('split-transaction-created', function (e, value, opts) {
            opts = opts || {};
            if (opts && !opts.silent) {
                toastr.notifyCreationSuccess(gettext('Movimentação parcelada'));
            }
        });

        return SplitTransaction;
    }])

    .factory('Transaction', ['$resource', '$http', '$rootScope', function($resource, $http, $rootScope){
        var Transaction = $resource('/api/v1/transaction/:id', {}, {
            query: {
                method: 'GET',
                isArray: true,
                transformResponse: tastypieDataTransformer($http).concat(function (data, headersGetter) {
                    for (var idx in data) {
                        data[idx].value = parseFloat(data[idx].value);

                        if (data[idx].sum !== undefined) {
                            data[idx].sum = parseFloat(data[idx].sum);
                        }
                    }
                    return data;
                })
            }
        });

        $rootScope.$on('transaction-created', function (e, value, opts) {
            opts = opts || {};
            if (opts && !opts.silent) {
                toastr.notifyCreationSuccess(gettext('Transaction'));
            }
        });

        return Transaction;
    }])

    .factory('Category', ['$resource', '$cacheFactory', '$http', '$rootScope', function($resource, $cacheFactory, $http, $rootScope){
        var cache = $cacheFactory('Category');
        var Category = $resource('/api/v1/category/:id', {id: '@id', limit: 100}, {
            query: {
                method: 'GET',
                isArray: true,
                cache: cache,
                transformResponse: tastypieDataTransformer($http)
            },
            update: {method: 'PUT'}
        });

        return Category;
    }]);
})();
