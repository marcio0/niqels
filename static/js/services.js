'use strict'

var tastypieDataTransformer = function ($http) {
    return $http.defaults.transformResponse.concat([
        function (data, headersGetter) {
            var result = data.objects;
            result.meta = data.meta;
            return result;
        }
    ])
};

angular.module('models', ['ngResource'])

    .factory('Reminder', ['$resource', '$http', function($resource, $http){
        var Reminder = $resource('/api/v1/reminder/:id', {}, {
            query: {
                method: 'GET',
                isArray: true,
                transformResponse: tastypieDataTransformer($http)
            }
        });

        Reminder.prototype.remainingDays = function () {
            var today = moment(),
                dueDate = moment(this.due_date);
            return dueDate.diff(today, 'days');
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
