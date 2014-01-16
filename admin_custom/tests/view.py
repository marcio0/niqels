from django.core.exceptions import ValidationError
from django.test import TestCase
import factory
from access.models import User
from admin_custom.validators import validate_sql
from admin_custom.views import UserQueryForm, EmailInterface


class UserFactory(factory.django.DjangoModelFactory):
    FACTORY_FOR = User
    FACTORY_DJANGO_GET_OR_CREATE = ('email',)

    email = factory.Sequence(lambda n: 'user{0}@example.com'.format(n))
    password = 'password'


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
            form = UserQueryForm({'query': term})
            self.assertFalse(form.is_valid())

            form = UserQueryForm({'query': term.upper()})
            self.assertFalse(form.is_valid())

        form = UserQueryForm({'query': 'select somethin from some table'})
        self.assertTrue(form.is_valid())