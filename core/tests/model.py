from django import forms

from django.test import TestCase
from core.models import Category
from core.forms import EntryForm


class CategoryModelTest(TestCase):
    def test_unicode(self):
        cat = Category(name='test')
        self.assertEquals(str(cat), 'test')


class EntryFormTest(TestCase):
    def test_category_handling(self):
        data = {
            'date': '03/03/2010',
            'value': '40',
            'description': 'desc'
        }
        form = EntryForm(data)

        # is_valid also sets cleaned_data
        self.assertFalse(form.is_valid())

        self.assertRaises(forms.ValidationError, form.clean_category)
