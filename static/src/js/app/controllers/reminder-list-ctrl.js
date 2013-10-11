function ReminderListCtrl ($scope, Reminder) {
    'use strict';

    Reminder.query().$then(function (result) {
        var reminders = result.resource;
        $scope.reminders = reminders;
    });
}

ReminderListCtrl.$inject = ['$scope', 'Reminder'];
