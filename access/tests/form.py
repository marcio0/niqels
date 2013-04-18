import mock

from django.test import TestCase
from django import forms

from access.models import User
from access.forms import UserCreationForm


class UserCreationFormTest(TestCase):
    def test_clean_email_exists(self):
        user = User.objects.create_user(
            email='existing@expenses.com',
            password='pass')
        
        data = {
            'name': 'foo',
            'email': 'existing@expenses.com',
            'password1': u'asd',
            'password2': u'asd'
        }

        form = UserCreationForm()
        form.cleaned_data = data

        self.assertRaises(forms.ValidationError, form.clean_email)

    def test_clean_email_new(self):
        data = {
            'name': 'foo',
            'email': 'existing@expenses.com',
            'password1': 'asd',
            'password2': 'asd'
        }

        form = UserCreationForm(data)

        self.assertTrue(form.is_valid())

        self.assertEquals(form.clean_email(), data['email'])

    def test_clean_password2_match(self):
        data = {
            'name': 'foo',
            'email': 'existing@expenses.com',
            'password1': u'asd',
            'password2': u'asd'
        }

        form = UserCreationForm(data)
        form.cleaned_data = data

        self.assertTrue(form.is_valid())

        self.assertEquals(form.clean_password2(), data['password2'])

    def test_clean_password2_differs(self):
        data = {
            'email': 'existing@expenses.com',
            'password1': u'qwe',
            'password2': u'asd'
        }

        form = UserCreationForm()
        form.cleaned_data = data

        self.assertRaises(forms.ValidationError, form.clean_password2)

    @mock.patch.object(User, 'set_password')
    def test_save(self, set_password):
        data = {
            'name': 'foo',
            'email': 'existing@expenses.com',
            'password1': u'asd',
            'password2': u'asd'
        }

        form = UserCreationForm(data)
        form.save()

        set_password.assert_called_with(data['password1'])

        self.assertTrue(
            User.objects.filter(email='existing@expenses.com').exists()
        )
        
    @mock.patch.object(User, 'set_password')
    def test_save_commit_false(self, set_password):
        data = {
            'name': 'foo',
            'email': 'existing@expenses.com',
            'password1': u'asd',
            'password2': u'asd'
        }

        form = UserCreationForm(data)
        form.save(commit=False)

        set_password.assert_called_with(data['password1'])

        self.assertFalse(
            User.objects.filter(email='existing@expenses.com').exists()
        )
