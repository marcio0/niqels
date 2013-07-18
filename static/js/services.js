'use strict'

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
    ])
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
                            $rootScope.$broadcast('transactionCreated', transaction);
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

        return Reminder;
    }])

    .factory('Transaction', ['$resource', '$http', function($resource, $http){
        var Transaction = $resource('/api/v1/transaction/:id', {}, {
            query: {
                method: 'GET',
                isArray: true,
                transformResponse: tastypieDataTransformer($http)
            }
        });

        return Transaction;
    }])

    .factory('Category', ['$resource', '$cacheFactory', '$http', function($resource, $cacheFactory, $http){
        var cache = $cacheFactory('Category');
        var Category = $resource('/api/v1/category/:id', {}, {
            query: {
                method: 'GET',
                isArray: true,
                transformResponse: tastypieDataTransformer($http)
            }
        });

        var loadCache = function (value) {
            var objs = value.data.objects;

            for (var i in objs) {
                var obj = objs[i];
                cache.put(obj.name, obj);
            }
            return value;
        };

        // caching all categories
        Category.get().$then(loadCache);

        Category.cacheLookup = function (catName) {
            var category = cache.get(catName);

            // if this category is not present on the cache, retrieve from the api and saves it
            if (category) {
                return category;
            }
            else {
                return Category.get({name: catName}).$then(function (data) {
                    var category = data.data.objects[0];
                    cache.put(category.name, category);
                    return data;
                });
            }
        };

        return Category;
    }]);

angular.module('interceptor', []).
    factory('sessionInterceptor', ['$q', '$window', function($q, $window) {
        return function(promise) {
            return promise.then(null, function(response) {
                if (response.status === 401) {
                    $window.location.href = '/login';
                }
                return $q.reject(response);
            });
        };
    }]); 
