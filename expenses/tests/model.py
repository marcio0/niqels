from decimal import Decimal
import mock
import datetime

import django.forms
from django.test import TestCase

import expenses.models
from expenses.models import Category, Entry
from expenses import forms
from access.models import User

from expenses.calculator import AverageCalculator


class AverageTest(TestCase):
    fixtures = ['AverageTest.yaml']
    
    def test_simple(self):
        user = User.objects.get(pk=1)

        date = datetime.date(2010, 03, 10)

        calc = AverageCalculator(user=user, qty_months=2, start_date=date)

        result = calc.calculate()

        self.assertEquals(result, {
            'base': Decimal('-210'),
            'average': Decimal('-250'),
            'deviation': Decimal('0.190476190476190476190476190')
        })

    def test_full(self):
        user = User.objects.get(pk=1)

        date = datetime.date(2010, 03, 10)

        calc = AverageCalculator(user=user, qty_months=3, start_date=date)

        result = calc.calculate()

        self.assertEquals(result, {
            'base': Decimal('-210'),
            'average': Decimal('30'),
            'deviation': Decimal('-1.142857142857142857142857143')
        })

    def test_no_data(self):
        #TODO test all situations when zerodivision is raised
        # No data on actual month, but data on previous ones.
        user = User.objects.get(pk=1)
        date = datetime.date(2010, 04, 10)
        calc = AverageCalculator(user=user, qty_months=2, start_date=date)
        result = calc.calculate()
        self.assertEquals(result, {
            'base': Decimal('0'),
            'average': Decimal('-210'),
            'deviation': Decimal('1')
        })

        # There are entries on the actual month,
        # but nothing on the on the previous.
        user = User.objects.get(pk=1)
        date = datetime.date(2010, 01, 10)
        calc = AverageCalculator(user=user, qty_months=2, start_date=date)
        result = calc.calculate()
        self.assertEquals(result, {
            'base': Decimal('310'),
            'average': Decimal('0'),
            'deviation': Decimal('1')
        })

        # No entries at all.
        user = User.objects.get(pk=1)
        date = datetime.date(2009, 01, 10)
        calc = AverageCalculator(user=user, qty_months=2, start_date=date)
        result = calc.calculate()
        self.assertEquals(result, {
            'base': Decimal('0'),
            'average': Decimal('0'),
            'deviation': Decimal('0')
        })


class EntryUpToDayTest(TestCase):
    fixtures = ['EntryUpToDayTest.yaml']

    def test_one_month(self):
        start = datetime.date(2010, 03, 10)

        result = Entry.objects.up_to_day(start_date=start)

        self.assertEquals(len(result), 1)
        self.assertEquals(result[0].count(), 2)


    def test_three_months(self):
        start = datetime.date(2010, 03, 10)

        result = Entry.objects.up_to_day(start_date=start, qty_months=3)

        self.assertEquals(len(result), 3)

        self.assertEquals(result[0].count(), 2)
        self.assertEquals(result[1].count(), 3)
        self.assertEquals(result[2].count(), 4)

    def test_default_date(self):
        dt_m = mock.Mock()
        dt_m.date.today.return_value = datetime.date(2010, 01, 03)

        expenses.models.datetime = dt_m

        result = Entry.objects.up_to_day()

        self.assertEquals(len(result), 1)
        self.assertEquals(result[0].count(), 3)


class NegativeDecimalFieldTest(TestCase):
    def test_with_neg_symbol(self):
        field = forms.NegativeDecimalField()
        self.assertEquals(field.to_python('-10'), Decimal('-10'))

    def test_with_pos_symbol(self):
        field = forms.NegativeDecimalField()
        self.assertEquals(field.to_python('+10'), Decimal('+10'))

    def test_without_symbol(self):
        field = forms.NegativeDecimalField()
        self.assertEquals(field.to_python('10'), Decimal('-10'))


class CategoryModelTest(TestCase):
    def test_unicode(self):
        cat = Category(name='test')
        self.assertEquals(str(cat), 'test')


class EntryFormTest(TestCase):
    def test_category_lower(self):
        user = User.objects.create_user('user@expenses.com', 'pass')

        data = {
            'date': '03/03/2010',
            'value': '40',
            'category': 'STUFF'
        }
        form = forms.EntryForm(data)
        form.cleaned_data = data
        form.user = user

        self.assertEquals(form.clean_category().name, 'stuff')


    def test_category_handling_missing(self):
        data = {
            'date': '03/03/2010',
            'value': '40',
            'description': 'desc'
        }
        form = forms.EntryForm(data)

        # is_valid also sets cleaned_data
        self.assertFalse(form.is_valid())

        self.assertRaises(django.forms.ValidationError, form.clean_category)

    def test_category_handling_missing_user(self):
        data = {
            'date': '03/03/2010',
            'value': '40',
            'description': 'desc',
            'category': 'test'
        }
        form = forms.EntryForm(data)

        # is_valid also sets cleaned_data
        self.assertRaises(AttributeError, form.is_valid)

    @mock.patch('expenses.forms.random_color')
    def test_category_handling_with_new_category(self, random_color):
        user = User.objects.create_user('user@expenses.com', 'pass')
        data = {
            'date': '03/03/2010',
            'value': '40',
            'description': 'desc',
            'category': 'test'
        }
        form = forms.EntryForm(data)
        form.user = user

        # is_valid also sets cleaned_data
        self.assertTrue(form.is_valid())

        self.assertTrue(random_color.called)

    @mock.patch('expenses.forms.random_color')
    def test_category_handling_with_existing_category(self, random_color):
        user = User.objects.create_user('user@expenses.com', 'pass')
        Category(
            name='cat',
            user=user,
            color="#111"
        ).save()

        data = {
            'date': '03/03/2010',
            'value': '40',
            'description': 'desc',
            'category': 'cat'
        }
        form = forms.EntryForm(data)
        form.user = user

        # is_valid also sets cleaned_data
        self.assertTrue(form.is_valid())

        self.assertFalse(random_color.called)
