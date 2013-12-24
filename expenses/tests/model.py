# encoding: utf-8

import mock
import datetime
import factory
from decimal import Decimal

from django.test import TestCase
from django.utils.translation import ugettext, ugettext_lazy as _

import expenses.models
from expenses.models import Category, Transaction, CategoryGroup, SplitTransaction


class TransactionFactory(factory.Factory):
    FACTORY_FOR = Transaction

    description = "a transaction"
    date = datetime.date.today()
    value = Decimal(10)


class SplitTransactionTest(TestCase):
    @mock.patch.object(SplitTransaction, 'transactions')
    def test_total_value(self, *args):
        split = SplitTransaction()

        t1 = TransactionFactory.build()
        t2 = TransactionFactory.build()
        t3 = TransactionFactory.build()

        split.transactions = [t1, t2, t3]

        self.assertEquals(split.get_total_value(), Decimal(30))

    @mock.patch.object(SplitTransaction, 'transactions')
    def test_unicode(self, *args):
        split = SplitTransaction()
        split.transactions.count.return_value = 3

        self.assertEquals(unicode(split), _(u'Movimentação em 3 parcelas'))


class TransactionUpToDayTest(TestCase):
    fixtures = ['TransactionUpToDayTest.yaml']

    def test_default(self):
        """
        By default, uses today as the reference date; and returns one month of data.
        """
        dt_m = mock.Mock()
        dt_m.date.today.return_value = datetime.date(2010, 03, 10)
        dt_m.datetime = datetime.datetime
        expenses.models.datetime = dt_m

        result = Transaction.objects.up_to_day()

        self.assertEquals(len(result), 1)
        self.assertEquals(result['2010-03'].count(), 4)

        expenses.models.datetime = datetime

    def test_day_greater_than_month_days(self):
        """
        Must use last day of months if `day` is greater than the amount of days of that month.
        """
        result = Transaction.objects.up_to_day(months=['2010-02'], day=31)

        self.assertEquals(len(result), 1)
        self.assertEquals(result['2010-02'].count(), 5)

    def test_one_month(self):
        result = Transaction.objects.up_to_day(months=['2010-03'])

        self.assertEquals(len(result), 1)
        self.assertEquals(result['2010-03'].count(), 4)

    def test_one_month_and_day(self):
        result = Transaction.objects.up_to_day(months=['2010-03'], day=10)

        self.assertEquals(len(result), 1)
        self.assertEquals(result['2010-03'].count(), 2)
    
    def test_three_months(self):
        months = ['2010-03', '2010-02', '2010-01']
        result = Transaction.objects.up_to_day(months=months)

        self.assertEquals(len(result), 3)
        self.assertEquals(result['2010-03'].count(), 4)
        self.assertEquals(result['2010-02'].count(), 5)
        self.assertEquals(result['2010-01'].count(), 6)

    def test_three_months_and_day(self):
        months = ['2010-03', '2010-02', '2010-01']
        result = Transaction.objects.up_to_day(months=months, day=10)

        self.assertEquals(len(result), 3)
        self.assertEquals(result['2010-03'].count(), 2)
        self.assertEquals(result['2010-02'].count(), 3)
        self.assertEquals(result['2010-01'].count(), 4)


class CategoryGroupModelTest(TestCase):
    def test_unicode(self):
        group = CategoryGroup(name='test')
        self.assertEquals(str(group), 'test')

    def test_natural_key(self):
        group = CategoryGroup.objects.create(name='group')

        self.assertEquals(group.natural_key(), 'group')
        self.assertEquals(CategoryGroup.objects.get_by_natural_key('group'), group)


class CategoryModelTest(TestCase):
    def test_unicode(self):
        cat = Category(name='test')
        self.assertEquals(str(cat), 'test')

    def test_natural_key(self):
        CategoryGroup.objects.create(name='group')
        cat = Category.objects.create(name='cat', group_id=1)

        expected_key = ('group', 'cat')

        self.assertEquals(cat.natural_key(), expected_key)
        self.assertEquals(Category.objects.get_by_natural_key(*expected_key), cat)
