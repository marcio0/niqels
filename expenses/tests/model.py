from decimal import Decimal
import mock
import datetime

import django.forms
from django.test import TestCase

import expenses.models
from expenses.models import Category, Entry
from expenses import forms
from access.models import User


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
