from django.test import TestCase
from django.utils import timezone
import mock
from freezegun import freeze_time
from datetime import timedelta
import access.models
from data.management.commands import count_active_users
from data.models import Data


COMMAND_INDICATOR = 'active users ratio'


class CommandTest(TestCase):
    @freeze_time('2010-10-01')
    @mock.patch.object(Data, 'objects')
    @mock.patch.object(access.models.User, 'objects')
    def test_simple(self, user_mgr, data_mgr):
        one_week_diff = timezone.now() - timedelta(weeks=1)

        user_mgr.annotate().filter().count.return_value = 10
        user_mgr.filter().distinct().count.return_value = 5

        command = count_active_users.Command()
        command.handle()

        user_mgr.filter.assert_called_with(transactions__created__gte=one_week_diff)

        data_mgr.create.assert_called_with(
            date=timezone.now(),
            value='50.00%',
            indicator=COMMAND_INDICATOR
        )