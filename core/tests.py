from django.test import TestCase
from core.parser import get_value, get_date
from core.models import Entry, Category
from decimal import Decimal
import datetime


class DateParsingTest(TestCase):
    def test_type(self):
        self.assertIsInstance(get_date('01/01'), datetime.date)

    def test_month_day(self):
        # If year is absent, default is actual year.
        expected = datetime.date(month=01, day=01, year=datetime.date.today().year)
        self.assertEquals(get_date('date 01/01'), expected)
        self.assertEquals(get_date('date 1/01'), expected)
        self.assertEquals(get_date('date 01/1'), expected)

    def test_month_day_full_year(self):
        expected = datetime.date(month=01, day=01, year=2001)
        self.assertEquals(get_date('date 01/01/2001'), expected)
        self.assertEquals(get_date('date 1/01/2001'), expected)
        self.assertEquals(get_date('date 01/1/2001'), expected)

    def test_month_day_abbr_year(self):
        expected = datetime.date(month=01, day=01, year=2001)
        self.assertEquals(get_date('date 01/01/01'), expected)
        self.assertEquals(get_date('date 1/01/01'), expected)
        self.assertEquals(get_date('date 01/1/01'), expected)


class ValueParsingTest(TestCase):
    def test_type(self):
        self.assertIsInstance(get_value('1'), Decimal)

    def test_get_value(self):
        # Default is negative.
        self.assertEquals(get_value('valor 50'), Decimal(-50))
        self.assertEquals(get_value('valor 50.'), Decimal(-50))
        self.assertEquals(get_value('valor 50.0'), Decimal(-50))
        self.assertEquals(get_value('valor 50.10'), Decimal('-50.10'))
        self.assertEquals(get_value('valor 0.10'), Decimal('-.10'))
        #self.assertEquals(get_value('valor .10'), Decimal('-.10')) # TODO

    def test_get_negative_value(self):
        self.assertEquals(get_value('valor -50'), Decimal(-50))
        self.assertEquals(get_value('valor -50.'), Decimal(-50))
        self.assertEquals(get_value('valor -50.0'), Decimal(-50))
        self.assertEquals(get_value('valor -50.10'), Decimal('-50.10'))
        self.assertEquals(get_value('valor -0.10'), Decimal('-.10'))

    def test_get_positive_value(self):
        self.assertEquals(get_value('valor +50'), Decimal(50))
        self.assertEquals(get_value('valor +50.'), Decimal(50))
        self.assertEquals(get_value('valor +50.0'), Decimal(50))
        self.assertEquals(get_value('valor +50.10'), Decimal('50.10'))
        self.assertEquals(get_value('valor +0.10'), Decimal('.10'))

    def test_get_value_failure(self):
        self.assertEquals(get_value('no value'), None)
