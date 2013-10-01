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

    .factory('Reminder', ['$resource', '$http', 'Transaction', '$q', '$rootScope', function($resource, $http, Transaction, $q, $rootScope){
        var Reminder = $resource('/api/v1/reminder/:id', {id: '@id'}, {
            query: {
                method: 'GET',
                isArray: true,
                transformResponse: tastypieDataTransformer($http)
            }
        });

        Reminder.prototype.remainingDays = function () {
            var dueDate = moment(this.due_date);
            return dueDate.fromNow();
        };

        Reminder.prototype.createReminder = function () {
            var deferred = $q.defer();
            var me = this;

            this.$save({},
                function success (reminder) {
                    var promise = reminder.createTransaction()
                        .then(function (transaction) {
                            $rootScope.$broadcast('transactionCreated', transaction, {silent: true});
                            return reminder;
                        });

                    deferred.resolve(promise);
                },
                function failure (result) {
                    deferred.reject(result);
                }
            );

            return deferred.promise;
        };

        Reminder.prototype.skip = function () {
            return $http.post(this.resource_uri + '/skip', {});
        };

        Reminder.prototype.createTransaction = function () {
            var deferred = $q.defer();

            $http.post(this.resource_uri + '/transaction', {}).success(function (result) {
                deferred.resolve(new Transaction(result));
            }).error(function (result) {
                deferred.reject(result);
            });

            return deferred.promise;
        };

        $rootScope.$on('reminderCreated', function (e, value, opts) {
            opts = opts || {};
            if (opts && !opts.silent) {
                toastr.notifyCreationSuccess(gettext('Reminder'));
            }
        });

        return Reminder;
    }])

    .factory('Transaction', ['$resource', '$http', '$rootScope', function($resource, $http, $rootScope){
        var Transaction = $resource('/api/v1/transaction/:id', {}, {
            query: {
                method: 'GET',
                isArray: true,
                transformResponse: tastypieDataTransformer($http)
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

        $rootScope.$on('categoryUpdated', function (e, category, opts) {
            opts = opts || {};
            if (opts && !opts.silent) {
                toastr.notifyUpdateSuccess(gettext('Category'));
            }
            cache.remove('/api/v1/category?limit=100');
        });

        $rootScope.$on('categoryCreated', function (e, category, opts) {
            opts = opts || {};
            if (opts && !opts.silent) {
                toastr.notifyCreationSuccess(gettext('Category'));
            }
            cache.remove('/api/v1/category?limit=100');
        });

        $rootScope.$on('categoryRemoved', function (e, category, opts) {
            opts = opts || {};
            if (opts && !opts.silent) {
                toastr.notifyRemovalSuccess(gettext('Category'));
            }
            cache.remove('/api/v1/category?limit=100');
        });

        $rootScope.$on('transactionCreated', function (e, transaction) {
            var cache = $cacheFactory.get('Category'),
                cache_result = cache.get('/api/v1/category?limit=100'),
                id = transaction.category.id;

            if (cache_result.indexOf('"id": %d,'.replace('%d', id)) == -1) {
            }
        });

        return Category;
    }]);
})();
