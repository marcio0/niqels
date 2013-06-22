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
