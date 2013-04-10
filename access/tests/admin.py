from django.test import TestCase
from django import forms

from access.admin import UserCreationForm, UserChangeForm


class AdminUserCreationFormTest(TestCase):
    def test_clean_password2_is_equal(self):
        data = {
            'email': 'admin@admin.com',
            'password1': 'pass',
            'password2': 'pass'
        }
        form = UserCreationForm()
        form.cleaned_data = data

        self.assertEquals(form.clean_password2(), 'pass')

    def test_clean_password2_differs(self):
        data = {
            'email': 'admin@admin.com',
            'password1': 'pass',
            'password2': 'word'
        }
        form = UserCreationForm(data)
        form.cleaned_data = data

        self.assertRaises(forms.ValidationError, form.clean_password2)

    def test_save(self):
        data = {
            'email': 'admin@admin.com',
            'password1': 'pass',
            'password2': 'pass'
        }
        form = UserCreationForm(data)
        form.cleaned_data = data

        user = form.save()
        self.assertTrue(user.check_password('pass'))

    def test_save_not_committing(self):
        data = {
            'email': 'admin@admin.com',
            'password1': 'pass',
            'password2': 'pass'
        }
        form = UserCreationForm(data)
        form.cleaned_data = data

        user = form.save(commit=False)
        self.assertFalse(user.id)

class AdminUserChangeFormTest(TestCase):
    def test_clean_password(self):
        data = {
            'email': 'admin@admin.com',
            'password': 'pass',
        }
        form = UserChangeForm(initial=data)
        form.password = 'word'

        self.assertEquals(form.clean_password(), 'pass')
