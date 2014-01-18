from django.test import TestCase
from django.utils import timezone
import mock
from freezegun import freeze_time
from datetime import timedelta
import access.models
from data.management.commands import count_evaded_users
from data.models import Data


COMMAND_INDICATOR = 'evaded users ratio'


class CommandTest(TestCase):
    @freeze_time('2010-10-01')
    @mock.patch.object(Data, 'objects')
    @mock.patch.object(access.models.User, 'objects')
    @mock.patch('data.management.commands.count_evaded_users.Q')
    def test_simple(self, q, user_mgr, data_mgr):
        one_week_diff = timezone.now() - timedelta(weeks=1)
        three_weeks_diff = timezone.now() - timedelta(weeks=3)

        user_mgr.filter().distinct().count.return_value = 10
        user_mgr.filter().filter().distinct().count.return_value = 5

        command = count_evaded_users.Command()
        command.handle()

        user_mgr.filter.assert_called_with(transaction__date__gte=three_weeks_diff)
        user_mgr.filter().filter.assert_called_with(~q.return_value)
        q.assert_called_with(transaction__date__gt=one_week_diff)

        data_mgr.create.assert_called_with(
            date=timezone.now(),
            value='50.00%',
            indicator=COMMAND_INDICATOR
        )