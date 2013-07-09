'use strict';

function RemindersCtrl ($scope, $rootScope, Reminder) {
    $scope.reminders = [];

    function loadReminders () {
        var range = moment().add('days', 5).format('YYYY-MM-DD'),
            filter = {
                'due_date__lte': range
            };
        Reminder.query(filter).$then(function (result) {
            $scope.reminders = result.resource;
        });
    }

    $rootScope.$on('reminderCreated', loadReminders);

    $scope.createTransaction = function (reminder) {
        reminder.createTransaction().then(function (transaction) {
            $rootScope.$broadcast('transactionCreated', transaction);
            loadReminders();
        });
    };

    loadReminders();
}

RemindersCtrl.$inject = ['$scope', '$rootScope', 'Reminder'];
