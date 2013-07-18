from django.test import TestCase
from django import forms

from api.validation import EntryApiForm


class EntryApiFormTest(TestCase):
    def test_clean_category(self):
        data = {'category': 'cat'}

        form = EntryApiForm()
        form.cleaned_data = data

        self.assertEquals(form.clean_category(), 'cat')

    def test_clean_category_empty(self):
        data = {'category': ''}

        form = EntryApiForm()
        form.cleaned_data = data

        self.assertRaises(forms.ValidationError, form.clean_category)

    def test_clean_category_absent(self):
        data = {}

        form = EntryApiForm()
        form.cleaned_data = data

        self.assertRaises(forms.ValidationError, form.clean_category)
