import mock

import django.forms

from django.test import TestCase
from expenses.models import Category
from expenses import forms
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
