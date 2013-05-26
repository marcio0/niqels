angular.module('transactionService', ['ngResource']).
    factory('Transaction', function($resource, $cacheFactory){
        var Transaction = $resource('/api/v1/transaction/:id', {}, {
            get: {
                method: 'GET',
                isArray: false
            }
        });

        return Transaction;
    });

angular.module('categoryService', ['ngResource']).
    factory('Category', function($resource, $cacheFactory){

        var cache = $cacheFactory('Category');
        var Category = $resource('/api/v1/category/:id', {}, {
            get: {
                method: 'GET',
                isArray: false
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
    });
