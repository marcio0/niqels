from django import forms

from django.test import TestCase
from expenses.models import Category
from expenses.forms import EntryForm
from access.models import User


class CategoryModelTest(TestCase):
    def test_unicode(self):
        cat = Category(name='test')
        self.assertEquals(str(cat), 'test')


class EntryFormTest(TestCase):
    def test_category_handling_missing(self):
        data = {
            'date': '03/03/2010',
            'value': '40',
            'description': 'desc'
        }
        form = EntryForm(data)

        # is_valid also sets cleaned_data
        self.assertFalse(form.is_valid())

        self.assertRaises(forms.ValidationError, form.clean_category)

    def test_category_handling_missing_user(self):
        data = {
            'date': '03/03/2010',
            'value': '40',
            'description': 'desc',
            'category': 'test'
        }
        form = EntryForm(data)

        # is_valid also sets cleaned_data
        self.assertRaises(AttributeError, form.is_valid)

    def test_category_handling_ok(self):
        user = User.objects.create_user('user@expenses.com', 'pass')
        data = {
            'date': '03/03/2010',
            'value': '40',
            'description': 'desc',
            'category': 'test'
        }
        form = EntryForm(data)
        form.user = user

        # is_valid also sets cleaned_data
        form.is_valid()
