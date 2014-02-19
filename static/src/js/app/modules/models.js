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
                        cache.put(threshold.category.name, threshold);
                    });
                })
            },
            update: {method: 'PUT'}
        });

        CategoryThreshold.prototype.save = function () {
            if (this.id) {
                return this.$update({id: this.id});
            }
            else {
                return this.$save();
            }
        };

        $rootScope.$on('category-threshold-created', function (e, value, opts) {
            opts = opts || {};
            if (opts && !opts.silent) {
                toastr.notifyCreationSuccess(gettext('Limite de gastos'));
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

        $rootScope.$on('split-transaction-created', function (e, value, opts) {
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

        $rootScope.$on('transaction-created', function (e, value, opts) {
            opts = opts || {};
            if (opts && !opts.silent) {
                toastr.notifyCreationSuccess(gettext('Transaction'));
            }
        });

        $rootScope.$on('transaction-updated', function (e, value, opts) {
            opts = opts || {};
            if (opts && !opts.silent) {
                toastr.notifyUpdateSuccess(gettext('Transaction'));
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
                    });

                    return data;
                })
            },
            update: {method: 'PUT'}
        });

        return Category;
    }]);
})();