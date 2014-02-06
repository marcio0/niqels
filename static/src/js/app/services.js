(function () {
'use strict';

angular.module('webapp')
    .factory('UserOptions', ['$window', function ($window) {
        var prefix = 'nq-';

        return {
            get: function (name) {
                return $window.localStorage.getItem(prefix + name);
            },
            set: function (name, value) {
                $window.localStorage.setItem(prefix + name, value);
            },
            setDefault: function (name, value) {
                var item = $window.store.get(prefix + name);

                if (item === undefined) {
                    return $window.store.set(prefix + name, value);
                }
                else {
                    return item;
                }
            },
            watch: function (scope, variable, option) {
                // binds the option to the variable on the scope
                scope.$watch(variable, function (newValue) {
                    $window.store.set(prefix + option, newValue);
                });
            }
        };
    }])
    ;

angular.module('interceptor', []).
    factory('sessionInterceptor', ['$q', '$window', function($q, $window) {
        return function(promise) {
            return promise.then(null, function(response) {
                if (response.status === 401) {
                    $window.location.href = '/login';
                }
                if (response.status === 0 || (response.status >= 400 || response.status < 600)) {
                    toastr.error(gettext('Oops! Something went wrong. Please try again later.'));
                }
                return $q.reject(response);
            });
        };
    }]); 
})();
