import mock
import datetime
from decimal import Decimal
import unittest

import django.forms
from django.test import TestCase

import expenses.models
from expenses.models import Category, Transaction, CategoryGroup
from expenses import forms
from access.models import User


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
