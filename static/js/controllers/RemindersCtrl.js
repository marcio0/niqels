'use strict';

function RemindersCtrl ($scope, $rootScope, Reminder) {
    $scope.reminders = [];

    Reminder.get().$then(function (result) {
        $scope.reminders  = result.data.objects;

    }).always(function () {});
}

RemindersCtrl.$inject = ['$scope', '$rootScope', 'Reminder'];
