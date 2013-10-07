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
                if (response.status === 500 || response.status === 0) {
                    toastr.error(gettext('Oops! Something went wrong. Please try again later.'));
                }
                return $q.reject(response);
            });
        };
    }]); 
})();
