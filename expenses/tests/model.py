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

    def test_one_month(self):
        start = datetime.date(2010, 03, 10)

        result = Transaction.objects.up_to_day(start_date=start)

        self.assertEquals(len(result), 1)
        self.assertEquals(result[0].count(), 2)


    def test_three_months(self):
        start = datetime.date(2010, 03, 10)

        result = Transaction.objects.up_to_day(start_date=start, qty_months=3)

        self.assertEquals(len(result), 3)

        self.assertEquals(result[0].count(), 2)
        self.assertEquals(result[1].count(), 3)
        self.assertEquals(result[2].count(), 4)

    def test_default_date(self):
        dt_m = mock.Mock()
        dt_m.date.today.return_value = datetime.date(2010, 01, 03)

        expenses.models.datetime = dt_m

        result = Transaction.objects.up_to_day()

        self.assertEquals(len(result), 1)
        self.assertEquals(result[0].count(), 3)


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


