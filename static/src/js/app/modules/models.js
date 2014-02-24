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

    .factory('CategoryThreshold', ['$resource', '$rootScope', '$http', '$cacheFactory', function ($resource, $rootScope, $http, $cacheFactory) {
        var cache = $cacheFactory('category-threshold');

        var CategoryThreshold = $resource('/api/v1/threshold/category/:id', {}, {
            query: {
                method: 'GET',
                isArray: true,
                transformResponse: tastypieDataTransformer($http).concat(function (data) {
                    cache.removeAll();
                    $.each(data, function (idx, threshold) {
                        //caching by both name and uri
                        cache.put(threshold.category.name, threshold);
                        cache.put(threshold.category.resource_uri, threshold);
                    });
                })
            },
            update: {method: 'PUT'}
        });
        CategoryThreshold.EVENT_DELETE = 'category-threshold-deleted';
        CategoryThreshold.EVENT_UPDATE = 'category-threshold-updated';
        CategoryThreshold.EVENT_CREATE = 'category-threshold-created';

        $rootScope.$on(CategoryThreshold.EVENT_CREATE, function (e, value, opts) {
            opts = opts || {};
            if (opts && !opts.silent) {
                toastr.notifyCreationSuccess(gettext('Limite de gastos'));
            }
        });
        $rootScope.$on(CategoryThreshold.EVENT_UPDATE, function (e, value, opts) {
            opts = opts || {};
            if (opts && !opts.silent) {
                toastr.notifyUpdateSuccess(gettext('Limite de gastos'));
            }
        });
        $rootScope.$on(CategoryThreshold.EVENT_DELETE, function (e, value, opts) {
            opts = opts || {};
            if (opts && !opts.silent) {
                toastr.notifyRemovalSuccess(gettext('Limite de gastos'));
            }
        });

        return CategoryThreshold;
    }])

    .factory('SplitTransaction', ['$resource', '$rootScope', '$http', function ($resource, $rootScope, $http) {
        var SplitTransaction = $resource('/api/v1/split_transaction/:id', {}, {
            query: {
                method: 'GET',
                isArray: true,
                cache: true,
                transformResponse: tastypieDataTransformer($http).concat(function (data, headersGetter) {
                    for (var idx in data) {
                        data[idx].total_value = parseFloat(data[idx].total_value);
                        // TODO setar valor das transações tb
                    }
                    return data;
                })
            }
        });
        SplitTransaction.EVENT_CREATE = 'split-transaction-created';

        $rootScope.$on(SplitTransaction.EVENT_CREATE, function (e, value, opts) {
            opts = opts || {};
            if (opts && !opts.silent) {
                toastr.notifyCreationSuccess(gettext('Movimentação parcelada'));
            }
        });

        return SplitTransaction;
    }])

    .factory('Transaction', ['$resource', '$http', '$rootScope', 'SplitTransaction', function($resource, $http, $rootScope, SplitTransaction){
        var Transaction = $resource('/api/v1/transaction/:id', {}, {
            query: {
                method: 'GET',
                isArray: true,
                transformResponse: tastypieDataTransformer($http).concat(function (data, headersGetter) {
                    $.each(data, function (idx, transaction) {
                        transaction.value = parseFloat(transaction.value);

                        if (transaction.sum !== undefined) {
                            transaction.sum = parseFloat(transaction.sum);
                        }
                    })
                    return data;
                })
            },
            update: {method: 'PUT'}
        });

        Transaction.prototype.setInstallmentData = function (data) {
            this.installment_data = '{0}/{1}'.format(this.installment_number, data.transactions.length);
        };

        Transaction.prototype.loadInstallmentData = function () {
            if (this.installment_data) {
                // already loaded
                return false;
            }

            if (this.installment_of) {
                var split = this.installment_of.split('/'),
                    installmentId = split[split.length-1],
                    transaction = this;

                return SplitTransaction.get({id: installmentId}, function (installment) {
                    transaction.setInstallmentData(installment);
                });
            }
            return false;
        };
        Transaction.EVENT_CREATE = 'transaction-created';
        Transaction.EVENT_UPDATE = 'transaction-updated';
        Transaction.EVENT_DELETE = 'transaction-removed';

        $rootScope.$on(Transaction.EVENT_CREATE, function (e, value, opts) {
            opts = opts || {};
            if (opts && !opts.silent) {
                toastr.notifyCreationSuccess(gettext('Movimentação'));
            }
        });
        $rootScope.$on(Transaction.EVENT_UPDATE, function (e, value, opts) {
            opts = opts || {};
            if (opts && !opts.silent) {
                toastr.notifyUpdateSuccess(gettext('Movimentação'));
            }
        });
        $rootScope.$on(Transaction.EVENT_DELETE, function (e, value, opts) {
            opts = opts || {};
            if (opts && !opts.silent) {
                toastr.notifyRemovalSuccess(gettext('Movimentação'));
            }
        });

        return Transaction;
    }])

    .factory('Category', ['$resource', '$cacheFactory', '$http', function($resource, $cacheFactory, $http){
        var cache = $cacheFactory('category');

        var Category = $resource('/api/v1/category/:id', {id: '@id', limit: 100}, {
            query: {
                method: 'GET',
                isArray: true,
                cache: cache,
                transformResponse: tastypieDataTransformer($http).concat(function (data) {
                    $.each(data, function (idx, category) {
                        cache.put(category.name, category);
                        cache.put(category.resource_uri, category);
                    });

                    return data;
                })
            },
            update: {method: 'PUT'}
        });

        return Category;
    }]);
})();