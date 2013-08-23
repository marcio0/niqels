import mock
import datetime
from decimal import Decimal

import django.forms
from django.test import TestCase

import expenses.models
from expenses.models import Category, Transaction
from expenses import forms
from access.models import User
from reminder.models import RepeatableTransaction


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
        '''
        Must use last day of months if `day` is greater than the amount of days of that month.
        '''
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


class CategoryModelTest(TestCase):
    def test_unicode(self):
        cat = Category(name='test')
        self.assertEquals(str(cat), 'Category: test')


class TransactionModelTest(TestCase):
    fixtures = ['TransactionUpToDayTest.yaml']

    def test_repeatable_cascade(self):  
        '''
        When a repeatable is deleted, the related transactions must be kept.
        '''
        repeatable = RepeatableTransaction()
        repeatable.value = Decimal(40)
        repeatable.due_date = datetime.date(2010, 10, 10)
        repeatable.category_id = 1
        repeatable.user_id = 1
        repeatable.save()

        transaction = repeatable.create_transaction()
        transaction.save()

        repeatable.delete()
        self.assertTrue(Transaction.objects.filter(pk=transaction.id).exists())


