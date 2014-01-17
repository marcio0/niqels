from django.test import TestCase
import mock
import factory
from freezegun import freeze_time
import access.models
from expenses.models import Transaction, Category, CategoryGroup


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
    def test_simple(self):
        user1 = UserFactory.create()
        transactions = TransactionFactory.create_batch(2, category=self.category, user=user1, date='2010-10-01')

        print user1.transactions.all()