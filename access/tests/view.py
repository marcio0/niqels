import mock
import unittest
import logging

from django.test import TestCase, Client
from django.utils.translation import ugettext, ugettext_lazy as _

from access import views
from access.models import User
from access import forms


class UserNotifyPasswordChangeTest(TestCase):
    @mock.patch('access.views.messages')
    def test_calls_message(self, msg):
        def my_view(*args, **kwargs):
            r = mock.Mock()
            r.status_code = 302
            return r

        view = views.notify(my_view)

        view(mock.Mock())
        self.assertTrue(msg.success.called)

    @mock.patch('access.views.messages')
    def test_dont_call(self, msg):
        def my_view(*args, **kwargs):
            r = mock.Mock()
            r.status_code = 200
            return r

        view = views.notify(my_view)

        view(mock.Mock())
        self.assertFalse(msg.success.called)


class LoginViewTest(TestCase):
    @unittest.expectedFailure
    def test_already_authenticated_user(self):
        user = User.objects.create_user(
            email='register@expenses.com',
            password='test'
        )

        client = Client()
        client.login(
            email=user.email,
            password='test'
        )

        ret = client.get('/login/')
        self.assertEquals(ret.status_code, 302)
        self.assertEquals(ret.get('location'), 'http://testserver/')

class RegisterViewTest(TestCase):
    def test_already_authenticated_user(self):
        user = User.objects.create_user(
            email='register@expenses.com',
            password='test'
        )

        client = Client()
        client.login(
            email=user.email,
            password='test'
        )

        ret = client.get('/register/')
        self.assertEquals(ret.status_code, 302)
        self.assertEquals(ret.get('location'), 'http://testserver/')

    def test_get(self):
        client = Client()

        ret = client.get('/register/')

        self.assertEquals(ret.status_code, 200)

        self.assertIsInstance(ret.context['register_form'], forms.UserCreationForm)

    def test_post(self):
        data = {
            'name': 'foo',
            'email': 'new@expenses.com',
            'password1': 'asdasd',
            'password2': 'asdasd'
        }
        client = Client()

        ret = client.post('/register/', data)

        self.assertEquals(ret.status_code, 302)
        self.assertEquals(ret.get('location'), 'http://testserver/')

        self.assertTrue(
            User.objects.filter(
                email=data['email']
            ).exists()
        )

    @mock.patch('access.views.send_mail')
    @mock.patch('access.views.get_template')
    def test_send_mail(self, get_template, send_mail):
        data = {
            'name': 'foo',
            'email': 'new@expenses.com',
            'password1': 'asdasd',
            'password2': 'asdasd'
        }
        client = Client()
        ret = client.post('/register/', data)

        get_template.return_value('email content')

        self.assertEquals(ret.status_code, 302)

        send_mail.asset_called_with(
            _('Welcome to Niqels!'),
            'email_content',
            'niqels@niqels.com',
            data['email']
        )

    @mock.patch('access.views.send_mail')
    @mock.patch.object(logging.Logger, 'warning')
    def test_send_mail_logs_exception(self, warning, send_mail):
        data = {
            'name': 'foo',
            'email': 'new@expenses.com',
            'password1': 'asdasd',
            'password2': 'asdasd'
        }
        client = Client()

        send_mail.side_effect = Exception('oh noes')

        ret = client.post('/register/', data)

        self.assertEquals(ret.status_code, 302)

        warning.assert_called_with(
            'Error sending email: oh noes'
        )
