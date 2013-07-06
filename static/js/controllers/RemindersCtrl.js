'use strict';

function RemindersCtrl ($scope, $rootScope, Reminder) {
    $scope.reminders = [];

    function loadReminders () {
        var range = moment().subtract('days', 5).format('YYYY-MM-DD'),
            filter = {
                'due_date__lte': range
            };
        Reminder.query().$then(function (result) {
            $scope.reminders = result.resource;
        });
    }

    $scope.createTransaction = function (reminder) {
        reminder.createTransaction().then(function (transaction) {
            $rootScope.$broadcast('transactionCreated', transaction);
            loadReminders();
        });

    };

    loadReminders();
}

RemindersCtrl.$inject = ['$scope', '$rootScope', 'Reminder'];
