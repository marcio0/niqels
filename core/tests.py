from django.test import TestCase
from core.parser import parse_entry, get_value, get_date
from core.models import Entry, Category
from decimal import Decimal
import datetime


class TypeTest(TestCase):
    def test_get_value(self):
        self.assertIsInstance(get_value('valor 50'), Decimal)

        self.assertEquals(get_value('valor 50'), Decimal(50))
        self.assertEquals(get_value('valor 50.'), Decimal(50))
        self.assertEquals(get_value('valor 50.0'), Decimal(50))
        self.assertEquals(get_value('valor 50.10'), Decimal('50.10'))
        self.assertEquals(get_value('valor 0.10'), Decimal('.10'))
        #self.assertEquals(get_value('valor .10'), Decimal('.10')) # TODO

    def test_get_value_failure(self):
        self.assertEquals(get_value('no value'), None)
