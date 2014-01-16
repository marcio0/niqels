from django.core.exceptions import ValidationError
from django.test import TestCase
import mock
from access.models import User
from admin_custom.views import UserQueryForm, EmailInterface, validate_sql


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
    @mock.patch.object(User, 'objects')
    def test_ok(self, objs):
        data = {
            'query': 'select *'
        }

        objs.raw.return_value = [1, 2]

        view = EmailInterface()
        view.request = mock.Mock()

        form = UserQueryForm(data)
        view.form_valid(form)

        objs.raw.assert_called_with(data['query'])
        self.assertEquals(form.data['result'], 2)