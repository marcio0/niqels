from django.test import TestCase
from core.parser import ExpenseRegexParser
from core.models import Category
from decimal import Decimal
import datetime

class ExpenseParsingTest(object):

    # Date parsing:

    def test_default_date(self):
        s = 'Light 50'
        parser = self.parser(s)
        expense = parser.parse_expense()

        self.assertEquals(expense['value'], Decimal('-50'))
        self.assertEquals(expense['category'], 'Light')
        self.assertEquals(expense['date'], datetime.date.today())

    # Description parsing:
    # For now, description must be at the end.
    # It starts with quotes ('), double quotes (") or sharp (#).
    def test_description_type(self):
        s = 'cat 40 "lots of stuff'
        parser = self.parser(s)
        
        self.assertIsInstance(parser.get_description(), str)

    def test_get_description(self):
        # Double quotes.
        s = 'cat 40 "lots of stuff'
        parser = self.parser(s)
        self.assertEquals(parser.get_description(), 'lots of stuff')

        # Single quotes.
        s = "cat 40 'lots of stuff"
        parser = self.parser(s)
        self.assertEquals(parser.get_description(), 'lots of stuff')

        # Special characters.
        s = "cat 40 'lots of stuff 34 $$ .;,~"
        parser = self.parser(s)
        self.assertEquals(parser.get_description(), 'lots of stuff 34 $$ .;,~')

    # Category parsing:

    def test_category_type(self):
        s = 'category 50 10/01'
        parser = self.parser(s)
        self.assertIsInstance(parser.get_category(), str)

    def test_get_category(self):
        s = 'example 50 10/01'
        parser = self.parser(s)
        cat = parser.get_category()
        self.assertEquals(cat, 'example')

    def test_capitalization(self):
        s = 'EXAMPle 50 10/01'
        parser = self.parser(s)
        cat = parser.get_category()
        self.assertEquals(cat, 'EXAMPle')

    # Date parsing:

    def test_date_type(self):
        s = '01/01'
        parser = self.parser(s)
        self.assertIsInstance(parser.get_date(), datetime.date)

    def test_month_day(self):
        # If year is absent, default is actual year.
        expected = datetime.date(month=01, day=01, year=datetime.date.today().year)

        parser = self.parser('date 01/01')
        self.assertEquals(parser.get_date(), expected)

        parser = self.parser('date 1/01')
        self.assertEquals(parser.get_date(), expected)

        parser = self.parser('date 01/1')
        self.assertEquals(parser.get_date(), expected)

    def test_month_day_full_year(self):
        expected = datetime.date(month=01, day=01, year=2001)

        parser = self.parser('date 01/01/2001')
        self.assertEquals(parser.get_date(), expected)

        parser = self.parser('date 1/01/2001')
        self.assertEquals(parser.get_date(), expected)

        parser = self.parser('date 01/1/2001')
        self.assertEquals(parser.get_date(), expected)

    def test_month_day_abbr_year(self):
        expected = datetime.date(month=01, day=01, year=2001)

        parser = self.parser('date 01/01/01')
        self.assertEquals(parser.get_date(), expected)

        parser = self.parser('date 1/01/01')
        self.assertEquals(parser.get_date(), expected)

        parser = self.parser('date 01/1/01')
        self.assertEquals(parser.get_date(), expected)

    # Value parsing:

    def test_value_type(self):
        parser = self.parser('1')
        self.assertIsInstance(parser.get_value(), Decimal)

    def test_get_value(self):
        # Default is negative.
        parser = self.parser('valor 50')
        self.assertEquals(parser.get_value(), Decimal(-50))
        parser = self.parser('valor 50.')
        self.assertEquals(parser.get_value(), Decimal(-50))
        parser = self.parser('valor 50.0')
        self.assertEquals(parser.get_value(), Decimal(-50))
        parser = self.parser('valor 50.10')
        self.assertEquals(parser.get_value(), Decimal('-50.10'))
        parser = self.parser('valor 0.10')
        self.assertEquals(parser.get_value(), Decimal('-.10'))
        #self.assertEquals(get_value('valor .10'), Decimal('-.10')) # TODO

    def test_get_negative_value(self):
        parser = self.parser('valor -50')
        self.assertEquals(parser.get_value(), Decimal(-50))
        parser = self.parser('valor -50.')
        self.assertEquals(parser.get_value(), Decimal(-50))
        parser = self.parser('valor -50.0')
        self.assertEquals(parser.get_value(), Decimal(-50))
        parser = self.parser('valor -50.10')
        self.assertEquals(parser.get_value(), Decimal('-50.10'))
        parser = self.parser('valor -0.10')
        self.assertEquals(parser.get_value(), Decimal('-.10'))

    def test_get_positive_value(self):
        parser = self.parser('valor +50')
        self.assertEquals(parser.get_value(), Decimal(50))
        parser = self.parser('valor +50.')
        self.assertEquals(parser.get_value(), Decimal(50))
        parser = self.parser('valor +50.0')
        self.assertEquals(parser.get_value(), Decimal(50))
        parser = self.parser('valor +50.10')
        self.assertEquals(parser.get_value(), Decimal('50.10'))
        parser = self.parser('valor +0.10')
        self.assertEquals(parser.get_value(), Decimal('.10'))

    def test_get_value_failure(self):
        parser = self.parser('no value')
        self.assertEquals(parser.get_value(), None)


class ExpenseRegexParsingTest(ExpenseParsingTest, TestCase):
    parser = ExpenseRegexParser

    # Category parsing:

    def test_category_order(self):
        s = '50 example 10/01'
        parser = self.parser(s)
        cat = parser.get_category()
        self.assertEquals(cat, 'example')

    # Date parsing:

    def test_value_date_position_conflict(self):
        date = datetime.date(2010, 06, 10)

        s = "40 10/06/2010"
        parser = self.parser(s)
        expense = parser.parse_expense()

        self.assertEquals(expense['value'], Decimal('-40'))
        self.assertEquals(expense['date'], date)

        return
        #TODO fix this
        s = "10/06/2010 40"
        parser = self.parser(s)
        expense = parser.parse_expense()

        self.assertEquals(expense['value'], Decimal('-40'))
        self.assertEquals(expense['date'], date)
