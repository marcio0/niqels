from django.core.urlresolvers import reverse
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

        ret = client.get(reverse('register'))
        self.assertEquals(ret.status_code, 302)
        self.assertEquals(ret.get('location'), 'http://testserver/')

    def test_get(self):
        client = Client()

        ret = client.get(reverse('register'))

        self.assertEquals(ret.status_code, 200)

        self.assertIsInstance(ret.context['register_form'], forms.UserCreationForm)

    def test_post(self):
        data = {
            'name': 'foo',
            'email': 'new@expenses.com',
            'password': 'asdasd',
            'password_confirm': 'asdasd'
        }
        client = Client()

        ret = client.post(reverse('register'), data)

        self.assertEquals(ret.status_code, 302)
        self.assertEquals(ret.get('location'), 'http://testserver/')

        self.assertTrue(
            User.objects.filter(
                email=data['email']
            ).exists()
        )

    @mock.patch('access.views._send_welcome_email')
    def test_send_welcome_mail(self, send_mail):
        data = {
            'name': 'foo',
            'email': 'new@expenses.com',
            'password': 'asdasd',
            'password_confirm': 'asdasd'
        }
        client = Client()
        ret = client.post(reverse('register'), data)

        self.assertEquals(ret.status_code, 302)

        send_mail.assert_called_with(
            'new@expenses.com',
            'foo'
        )


class SendWelcomeEmailTest(TestCase):

    @mock.patch('access.views.send_mail')
    @mock.patch('access.views.get_template')
    def test_send_mail(self, get_template, send_mail):

        get_template().render.return_value = 'email content'

        views._send_welcome_email('email@bla.foo', 'john doe')

        send_mail.assert_called_with(
            _('Welcome to Niqels!'),
            'email content',
            'niqels@niqels.com.br',
            ['email@bla.foo'],
            fail_silently=False
        )

    @mock.patch('access.views.send_mail')
    @mock.patch.object(logging.Logger, 'warning')
    def test_send_mail_logs_exception(self, warning, send_mail):
        send_mail.side_effect = Exception('oh noes')

        views._send_welcome_email('email@bla.foo', 'john doe')

        warning.assert_called_with(
            'Error sending email: oh noes'
        )
