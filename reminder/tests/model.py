import datetime
from decimal import Decimal

from django.test import TestCase

from reminder.models import RepeatableTransaction


class RepeatableTransactionDueDateTest(TestCase):
    def test_due_weekly(self):
        '''
        Must advance 7 days.
        '''
        rep = RepeatableTransaction()
        rep.repeat = 'weekly'
        rep.last_date = datetime.date(2010, 10, 10)

        self.assertEquals(rep.due, datetime.date(2010, 10, 17))

    def test_due_weekly_crossing_month(self):
        '''
        Must advance 7 days.
        '''
        rep = RepeatableTransaction()
        rep.repeat = 'weekly'
        rep.last_date = datetime.date(2010, 10, 25)

        self.assertEquals(rep.due, datetime.date(2010, 11, 01))

    def test_due_monthly(self):
        '''
        Must advance 30 days.
        '''
        rep = RepeatableTransaction()
        rep.repeat = 'monthly'
        rep.last_date = datetime.date(2010, 10, 10)

        self.assertEquals(rep.due, datetime.date(2010, 11, 10))

    def test_due_fortnightly(self):
        '''
        Must advance 2 weeks.
        '''
        rep = RepeatableTransaction()
        rep.repeat = 'biweekly'
        rep.last_date = datetime.date(2010, 10, 10)

        self.assertEquals(rep.due, datetime.date(2010, 10, 24))

    def test_due_daily(self):
        '''
        Must advance 2 weeks twice.
        '''
        rep = RepeatableTransaction()
        rep.repeat = 'daily'
        rep.last_date = datetime.date(2010, 10, 10)

        self.assertEquals(rep.due, datetime.date(2010, 10, 11))


class RepeatableTransactionLastDateTest(TestCase):
    '''
    Tests last_date property and date advancing based on repeat attribute.
    '''
    def test_date_property(self):
        '''
        Updating last_date via property must set both _last_date and _day_of_month.
        '''
        rep = RepeatableTransaction()
        rep.last_date = datetime.date(2010, 05, 31)

        self.assertEquals(rep._day_of_month, 31)
        self.assertEquals(rep.last_date, datetime.date(2010, 05, 31))

    def test_update_last_date_weekly_twice(self):
        '''
        Must advance 7 days.
        '''
        rep = RepeatableTransaction()
        rep.repeat = 'weekly'
        rep.last_date = datetime.date(2010, 10, 10)

        rep.update_last_date()
        rep.update_last_date()
        self.assertEquals(rep._last_date, datetime.date(2010, 10, 24))

    def test_update_last_date_monthly_31_to_30_to_31(self):
        '''
        Must advance 30 days, respecting days with less days.
        '''
        rep = RepeatableTransaction()
        rep.repeat = 'monthly'
        rep.last_date = datetime.date(2010, 05, 31)

        rep.update_last_date()
        self.assertEquals(rep.last_date, datetime.date(2010, 06, 30))

        rep.update_last_date()
        self.assertEquals(rep.last_date, datetime.date(2010, 07, 31))

    def test_update_last_date_fortnightly_twice(self):
        '''
        Must advance 2 weeks twice.
        '''
        rep = RepeatableTransaction()
        rep.repeat = 'biweekly'
        rep.last_date = datetime.date(2010, 10, 10)

        rep.update_last_date()
        rep.update_last_date()
        self.assertEquals(rep._last_date, datetime.date(2010, 11, 07))


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
        rep.category_id = 1
        rep.user_id = 1
        rep.repeat = 'weekly'
        rep.last_date = datetime.date(2010, 10, 10)

        rep.save()

        transaction = rep.create_transaction()
        self.assertEquals(transaction.value, rep.value)
        self.assertEquals(transaction.description, rep.description)
        self.assertEquals(transaction.date, datetime.date.today())
        self.assertEquals(transaction.category.id, rep.category.id)
        self.assertEquals(transaction.user.id, rep.user.id)

    def test_overrides(self):
        rep = RepeatableTransaction()
        rep.value = Decimal('-10')
        rep.description = 'a simple repeatition'
        rep.category_id = 1
        rep.user_id = 1
        rep.repeat = 'weekly'
        rep.last_date = datetime.date(2010, 10, 10)

        rep.save()

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

    def test_validate_value(self):
        rep = RepeatableTransaction()
        rep.description = 'a simple repeatition'
        rep.category_id = 1
        rep.user_id = 1
        rep.repeat = 'weekly'
        rep.last_date = datetime.date(2010, 10, 10)

        rep.save()

        self.assertRaises(ValueError, rep.create_transaction)
