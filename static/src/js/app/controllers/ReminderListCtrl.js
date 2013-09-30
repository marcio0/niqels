'use strict';

function ReminderListCtrl ($scope, Reminder) {
    Reminder.query().$then(function (result) {
        var reminders = result.resource;
        $scope.reminders = reminders;
    });
}

ReminderListCtrl.$inject = ['$scope', 'Reminder'];
