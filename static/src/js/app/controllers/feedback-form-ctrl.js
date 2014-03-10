function FeedbackFormCtrl ($scope, $http) {
    'use strict';

    $scope.formData = {};
    $scope.url = "";
    $scope.sending = false;

    $scope.sendFeedback = function () {
        $scope.sending = true;
        // use $http to send the message to the backend
        // on the backend get the user email from the logged user
        // treat as a ajax request
        $http.post($scope.url, $scope.formData, {
            // django won't work without these headerse
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        })
        .success(function () {
            $scope.formData.message = "";
            toastr.success(gettext("Sua mensagem foi enviada.\nResponderemos em breve."));
            $scope.sending = false;
        })
        .error(function () {
            toastr.error(gettext("Houve um problema para enviar sua mensagem.\nPor favor, tente novamente mais tarde."));
            $scope.sending = false;
        });
    };
}

FeedbackFormCtrl.$inject = ['$scope', '$http'];