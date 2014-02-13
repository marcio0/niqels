from django.core.exceptions import ValidationError
from django.http import HttpRequest
from django.test import TestCase
import mock
from smtplib import SMTPException
from access.models import User
from access.tests.factories import UserFactory
from admin_custom.validators import validate_sql
from admin_custom.views import UserQueryForm, EmailInterface
from django.conf import settings


class SqlValidatorTest(TestCase):
    def test_no_edit(self):
        # no error
        validate_sql('select * foo bla')

        self.assertRaises(ValidationError, validate_sql, 'stuff update table')
        self.assertRaises(ValidationError, validate_sql, 'blado drop table')
        self.assertRaises(ValidationError, validate_sql, 'bla delete from table')
        self.assertRaises(ValidationError, validate_sql, 'lero alter table')
        self.assertRaises(ValidationError, validate_sql, 'lero insert table')
        self.assertRaises(ValidationError, validate_sql, 'foo create table')
        self.assertRaises(ValidationError, validate_sql, 'STUFF UPDATE TABLE')
        self.assertRaises(ValidationError, validate_sql, 'BLADO DROP TABLE')
        self.assertRaises(ValidationError, validate_sql, 'BLA DELETE FROM TABLE')
        self.assertRaises(ValidationError, validate_sql, 'LERO ALTER TABLE')
        self.assertRaises(ValidationError, validate_sql, 'LERO INSERT TABLE')
        self.assertRaises(ValidationError, validate_sql, 'FOO CREATE TABLE')


class EmailInterfaceViewTest(TestCase):
    def test_select(self):
        UserFactory.create_batch(3)

        data = {
            'query': 'select * from access_user'
        }

        form = UserQueryForm(data)
        view = EmailInterface()

        self.assertTrue(view.execute_sql(form))
        self.assertEquals(form.data['result'], 3)

    def test_database_error(self):
        data = {
            'query': 'asdaddsd'
        }

        form = UserQueryForm(data)
        view = EmailInterface()

        self.assertFalse(view.execute_sql(form))
        self.assertEquals(form.data['result'], 0)
        self.assertTrue('__all__' in form.errors)

    def test_sql_validation(self):
        terms = ['update', 'drop', 'delete', 'alter', 'insert', 'create']

        for term in terms:
            form = UserQueryForm({'query': term, 'title': 'foo', 'content': 'bla'})
            self.assertFalse(form.is_valid())

            form = UserQueryForm({'query': term.upper(), 'title': 'foo', 'content': 'bla'})
            self.assertFalse(form.is_valid())

        form = UserQueryForm({'query': 'select somethin from some table', 'title': 'foo', 'content': 'bla'})
        self.assertTrue(form.is_valid())

    @mock.patch.object(EmailInterface, 'form_valid')
    @mock.patch.object(EmailInterface, 'execute_sql')
    @mock.patch.object(EmailInterface, 'get_form')
    def test_post_ignore_email_fields_on_sql_test(self, get_form, execute_sql, form_valid):
        request = HttpRequest()
        request.POST['_test'] = 'yes'
        view = EmailInterface()
        view.request = request

        view.post(request)

        get_form().errors.pop.assert_any_call('title', None)
        get_form().errors.pop.assert_any_call('content', None)
        self.assertTrue(form_valid.called)

    @mock.patch.object(EmailInterface, 'form_invalid')
    @mock.patch.object(EmailInterface, 'execute_sql')
    def test_post_invalid_email_form(self, execute_sql, form_invalid):
        request = HttpRequest()
        request.POST['_submit'] = 'yes'
        view = EmailInterface()
        view.request = request

        view.post(request)

        self.assertTrue(form_invalid.called)

    @mock.patch.object(EmailInterface, 'email_users')
    @mock.patch.object(EmailInterface, 'form_valid')
    @mock.patch.object(EmailInterface, 'execute_sql')
    def test_post_valid_email_form(self, execute_sql, form_valid, email_users):
        request = HttpRequest()
        request.POST['_submit'] = 'yes'
        request.POST['query'] = 'sddasd'
        request.POST['title'] = 'oba'
        request.POST['content'] = 'foo'
        request.method = 'POST'
        view = EmailInterface()
        view.request = request

        view.post(request)

        self.assertTrue(form_valid.called)
        self.assertTrue(email_users.called)

    @mock.patch('admin_custom.views.send_mass_mail')
    def test_email_users(self, send_mass_mail):
        data = {
            'title': 'yeah',
            'content': 'message'
        }
        form = UserQueryForm(data)

        user_1 = User(email='1@1.com')
        user_2 = User(email='2@2.com')
        user_3 = User(email='3@3.com')

        view = EmailInterface()
        view.users_result = [user_1, user_2, user_3]

        view.email_users(form)

        admin_emails = []
        for admin in settings.ADMINS:
            admin_emails.append(admin[1])

        messages = [
            (data['title'], data['content'], 'niqels@niqels.com.br', [user_1.email]),
            (data['title'], data['content'], 'niqels@niqels.com.br', [user_2.email]),
            (data['title'], data['content'], 'niqels@niqels.com.br', [user_3.email]),

            (data['title'] + ' (sent from admin panel)', data['content'], 'niqels@niqels.com.br', admin_emails)
        ]

        send_mass_mail.assert_called_with(messages)

    @mock.patch('admin_custom.views.send_mass_mail')
    def test_email_error(self, mass_mail):
        data = {
            'title': 'yeah',
            'content': 'message'
        }
        form = UserQueryForm(data)

        user_1 = User(email='1@1.com')

        view = EmailInterface()
        view.users_result = [user_1]

        mass_mail.side_effect = SMTPException('fail')

        view.email_users(form)

        self.assertEquals(form.errors['__all__'], 'error sending email: fail')



