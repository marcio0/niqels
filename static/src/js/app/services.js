(function () {
'use strict';

angular.module('webapp')
    .factory('calculators', function () {
        return {
            deviation: function () {
            }
        };
    })
    ;

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
})();
