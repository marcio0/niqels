from django.test import TestCase
from django import forms

from access.admin import UserCreationForm, UserChangeForm
from access.managers import UserManager
from access.models import User


class UserTest(TestCase):
    def test_properties(self):
        user = User()
        user.email = "user@expenses.com"

        self.assertEquals(user.get_full_name(), user.email)
        self.assertEquals(user.get_short_name(), user.email)
        self.assertEquals(unicode(user), user.email)

    def test_admin_staff_status(self):
        user = User()
        
        self.assertFalse(user.is_staff)

        user.is_admin = True
        self.assertTrue(user.is_staff)


class UserManagerTest(TestCase):
    def test_create_user(self):
        m = UserManager()
        m.model = User

        u = m.create_user(
            email="new_user@expenses.com",
            password="pass"
        )

        self.assertTrue(u.check_password('pass'))

    def test_create_user_without_email_raises(self):
        m = UserManager()
        m.model = User

        self.assertRaises(
            ValueError,
            m.create_user,
            None,
            password="pass"
        )

    def test_create_superuser(self):
        m = UserManager()
        m.model = User

        u = m.create_superuser(
            email="new_user@expenses.com",
            password="pass"
        )

        self.assertTrue(u.is_admin)
        self.assertTrue(u.is_superuser)


class UserCreationFormTest(TestCase):
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

class UserChangeFormTest(TestCase):
    def test_clean_password(self):
        data = {
            'email': 'admin@admin.com',
            'password': 'pass',
        }
        form = UserChangeForm(initial=data)
        form.password = 'word'

        self.assertEquals(form.clean_password(), 'pass')
