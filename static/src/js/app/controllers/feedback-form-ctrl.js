function FeedbackFormCtrl ($scope, $rootScope, $http) {
    'use strict';

    $scope.formData = {};
    $scope.url = "";

    $scope.sendFeedback = function () {
        // use $http to send the message to the backend
        // on the backend get the user email from the logged user
        // treat as a ajax request
        $http.post($scope.url, $scope.formData, {
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        })
        .success(function () {
            $scope.formData.message = "";
        })
        .error(function () {
            console.log('error');
        });
    };
}

FeedbackFormCtrl.$inject = ['$scope', '$rootScope', '$http'];