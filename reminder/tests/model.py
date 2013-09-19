import mock
import datetime
from decimal import Decimal
import unittest

from django.test import TestCase

from reminder.models import RepeatableTransaction
from expenses.models import Category, CategoryConfig
from access.models import User


class RepeatableTransactionModelTest(TestCase):
    def test_unicode(self):
        user = User.objects.create_user('user@test.com', 'asd')

        category = Category()
        category.name = 'cat'
        category.save()

        category_config = CategoryConfig()
        category_config.category = category
        category_config.user = user


        rep = RepeatableTransaction()
        rep.repeat = 'weekly'
        rep.value = Decimal("-40")
        rep.due_date = datetime.date(2010, 10, 10)
        rep.category_config = category_config
        self.assertEquals(str(rep), '-40 of cat due 2010-10-10 (weekly)')



class RepeatableTransactionNextDueDateTest(TestCase):
    def test_weekly(self):
        '''
        Must advance 7 days.
        '''
        rep = RepeatableTransaction()
        rep.repeat = 'weekly'
        rep.due_date = datetime.date(2010, 10, 10)

        self.assertEquals(rep.next_due_date, datetime.date(2010, 10, 17))

    def test_weekly_crossing_month(self):
        '''
        Must advance 7 days.
        '''
        rep = RepeatableTransaction()
        rep.repeat = 'weekly'
        rep.due_date = datetime.date(2010, 10, 25)

        self.assertEquals(rep.next_due_date, datetime.date(2010, 11, 01))

    def test_monthly(self):
        '''
        Must advance 30 days.
        '''
        rep = RepeatableTransaction()
        rep.repeat = 'monthly'
        rep.due_date = datetime.date(2010, 10, 10)

        self.assertEquals(rep.next_due_date, datetime.date(2010, 11, 10))

    def test_fortnightly(self):
        '''
        Must advance 2 weeks.
        '''
        rep = RepeatableTransaction()
        rep.repeat = 'biweekly'
        rep.due_date = datetime.date(2010, 10, 10)

        self.assertEquals(rep.next_due_date, datetime.date(2010, 10, 24))

    def test_daily(self):
        '''
        Must advance 2 weeks twice.
        '''
        rep = RepeatableTransaction()
        rep.repeat = 'daily'
        rep.due_date = datetime.date(2010, 10, 10)

        self.assertEquals(rep.next_due_date, datetime.date(2010, 10, 11))

    def test_weekly_twice(self):
        '''
        Must advance 14 days.
        '''
        rep = RepeatableTransaction()
        rep.repeat = 'weekly'
        rep.due_date = datetime.date(2010, 10, 10)

        rep.due_date = rep.next_due_date
        rep.due_date = rep.next_due_date
        self.assertEquals(rep.due_date, datetime.date(2010, 10, 24))

    def test_monthly_31_to_30_to_31(self):
        '''
        Must advance 30 days, respecting days with less days.
        '''
        rep = RepeatableTransaction()
        rep.repeat = 'monthly'
        rep.due_date = datetime.date(2010, 05, 31)

        rep.due_date = rep.next_due_date
        self.assertEquals(rep.due_date, datetime.date(2010, 06, 30))

        rep.due_date = rep.next_due_date
        self.assertEquals(rep.due_date, datetime.date(2010, 07, 31))

    def test_fortnightly_twice(self):
        '''
        Must advance 2 weeks twice.
        '''
        rep = RepeatableTransaction()
        rep.repeat = 'biweekly'
        rep.due_date = datetime.date(2010, 10, 10)

        rep._due_date = rep.next_due_date
        rep._due_date = rep.next_due_date
        self.assertEquals(rep.due_date, datetime.date(2010, 11, 07))

    def test_due_date_property(self):
        '''
        due_date() must set _day_of_month only if the value is 0.
        '''
        rep = RepeatableTransaction()

        rep.due_date = datetime.date(2010, 10, 10)
        self.assertEquals(rep._due_date, datetime.date(2010, 10, 10))
        self.assertEquals(rep._day_of_month, 10)

        rep.due_date = datetime.date(2010, 10, 20)
        self.assertEquals(rep._due_date, datetime.date(2010, 10, 20))
        self.assertEquals(rep._day_of_month, 10)


class RepeatableTransactionCreateTransactionTest(TestCase):
    '''
    Tests the creation of a transaction based on the repeatable transaction attributes.
    '''
    fixtures = ['RepeatableTransactionTest']

    def test_all_values(self):
        '''
        Asserts all transaction values on the repeatable are passed to a created transaction.
        '''
        rep = RepeatableTransaction()
        rep.value = Decimal('-10')
        rep.description = 'a simple repeatition'
        rep.category_config_id = 1
        rep.user_id = 1
        rep.repeat = 'weekly'
        rep.last_date = datetime.date(2010, 10, 10)

        transaction = rep.create_transaction()
        self.assertEquals(transaction.value, rep.value)
        self.assertEquals(transaction.description, rep.description)
        self.assertEquals(transaction.date, datetime.date.today())
        self.assertEquals(transaction.category_config.id, rep.category_config.id)
        self.assertEquals(transaction.user.id, rep.user.id)
        self.assertEquals(transaction.repeatable, rep)

    def test_overrides(self):
        rep = RepeatableTransaction()
        rep.value = Decimal('-10')
        rep.description = 'a simple repeatition'
        rep.category_config_id = 1
        rep.user_id = 1
        rep.repeat = 'weekly'
        rep.last_date = datetime.date(2010, 10, 10)

        transaction = rep.create_transaction(
            value=Decimal(50)
        )
        self.assertEquals(transaction.value, Decimal(50))

        transaction = rep.create_transaction(
            description='overriden'
        )
        self.assertEquals(transaction.description, 'overriden')

        transaction = rep.create_transaction(
            date=datetime.date(2010, 10, 11)
        )
        self.assertEquals(transaction.date, datetime.date(2010, 10, 11))


    @unittest.expectedFailure
    def test_validate_value(self):
        rep = RepeatableTransaction()
        rep.description = 'a simple repeatition'
        rep.category_config_id = 1
        rep.user_id = 1
        rep.repeat = 'weekly'
        rep.last_date = datetime.date(2010, 10, 10)

        self.assertRaises(ValueError, rep.create_transaction)
