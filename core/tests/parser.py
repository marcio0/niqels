from django.test import TestCase
from core.parser import get_value, get_date, get_category, get_description, parse_expense
from core.models import Category
from decimal import Decimal
import datetime


class ExpenseParsingTest(TestCase):
    def test_default_date(self):
        s = 'Light 50'

        expense = parse_expense(s)

        self.assertIsInstance(expense, dict)
        self.assertEquals(expense['value'], Decimal('-50'))
        self.assertEquals(expense['category'], 'Light')
        self.assertEquals(expense['date'], datetime.date.today())


class DescriptionParsingTest(TestCase):
    # For now, description must be at the end.
    # It starts with quotes ('), double quotes (") or sharp (#).
    def test_type(self):
        s = 'cat 40 "lots of stuff'
        self.assertIsInstance(get_description(s), str)

    def test_get_description(self):
        # Double quotes.
        s = 'cat 40 "lots of stuff'
        self.assertEquals(get_description(s), 'lots of stuff')

        # Single quotes.
        s = "cat 40 'lots of stuff"
        self.assertEquals(get_description(s), 'lots of stuff')

        # Special characters.
        s = "cat 40 'lots of stuff 34 $$ .;,~"
        self.assertEquals(get_description(s), 'lots of stuff 34 $$ .;,~')


class CategoryParsingTest(TestCase):
    def test_type(self):
        self.assertIsInstance(get_category('category 50 10/01'), str)

    def test_get_category(self):
        cat = get_category('example 50 10/01')
        self.assertEquals(cat, 'example')

        cat = get_category('50 example 10/01')
        self.assertEquals(cat, 'example')


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


class CategoryModelTest(TestCase):
    def test_unicode(self):
        cat = Category(name='test')
        self.assertEquals(str(cat), 'test')
