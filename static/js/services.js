angular.module('categoryService', ['ngResource']).
    factory('Category', function($resource){
        return $resource('/api/v1/category/:category_id', {}, {
            query: {
                method: 'GET', 
                params: {category_id: ''},
                isArray: true,
                transformResponse: function (data, headers) {
                    return angular.fromJson(data).objects;
                }
            }
        });
    });
