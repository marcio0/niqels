'use strict';

function RemindersCtrl ($scope, $rootScope, Reminder) {
    $scope.reminders = [];
    Reminder.query().$then(function (result) {
        $scope.reminders = result.resource;
    });
}

RemindersCtrl.$inject = ['$scope', '$rootScope', 'Reminder'];
