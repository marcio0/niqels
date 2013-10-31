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

        $rootScope.$on('transactionCreated', function (e, value, opts) {
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
