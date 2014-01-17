from decimal import Decimal
from django.test import TestCase
from django.utils import timezone
import mock
import factory
from freezegun import freeze_time
from datetime import timedelta, datetime
import access.models
from data.management.commands import count_active_users
from expenses.models import Transaction, Category, CategoryGroup


COMMAND_INDICATOR = 'active users ratio'

class UserFactory(factory.DjangoModelFactory):
    FACTORY_FOR = access.models.User

    email = factory.Sequence(lambda n: 'user{0}@example.com'.format(n))
    name = factory.Sequence(lambda n: 'user1'.format(n))


class TransactionFactory(factory.DjangoModelFactory):
    FACTORY_FOR = Transaction


class CommandTest(TestCase):
    def setUp(self):
        group = CategoryGroup.objects.create(name='group')
        self.category = Category.objects.create(name="category", group=group)

    @freeze_time('2010-10-01')
    @mock.patch.object(access.models.User, 'objects')
    def test_simple(self, user_mgr):
        one_week_diff = timezone.now() - timedelta(weeks=1)

        user_mgr.annotate().filter().count.return_value = 10
        user_mgr.filter().distinct().count.return_value = 5

        command = count_active_users.Command()
        data = command.handle()

        self.assertEquals(data.date, timezone.now())
        self.assertEquals(data.value, '50.00%')
        self.assertEquals(data.indicator, COMMAND_INDICATOR)

        user_mgr.filter.assert_called_with(transaction__created__gte=one_week_diff)