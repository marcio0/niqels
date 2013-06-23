import datetime
from decimal import Decimal

from django.test import TestCase

from reminder.models import RepeatableTransaction

class RepeatableTransactionTest(TestCase):
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

    def test_update_last_date_weekly(self):
        rep = RepeatableTransaction()
        rep.value = Decimal('-10')
        rep.category_id = 1
        rep.user_id = 1
        rep.repeat = 'weekly'
        rep.last_date = datetime.date(2010, 10, 10)
        
        rep.save()

        rep.update_last_date()

        self.assertEquals(rep.last_date, datetime.date(2010, 10, 17))

    def test_update_last_date_weekly(self):
        rep = RepeatableTransaction()
        rep.value = Decimal('-10')
        rep.category_id = 1
        rep.user_id = 1
        rep.repeat = 'weekly'
        rep.last_date = datetime.date(2010, 10, 10)

        rep.save()

        rep.update_last_date()

        self.assertEquals(rep.last_date, datetime.date(2010, 10, 17))

