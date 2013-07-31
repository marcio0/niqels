function ReminderListCtrl ($scope, Reminder) {
    Reminder.query().$then(function (result) {
        var reminders = result.resource;
        $scope.reminders = reminders;
    });
}

RemindersListCtrl.$inject = ['$scope', 'Reminder'];
