import json
import mock
from babel import Locale
from decimal import Decimal

from django.test import TestCase

from access.models import User
from expenses.models import Category
from expenses.templatetags.expenses_tags import to_json
from expenses.context_processors import global_context


class ExpensesTemplateTagsTest(TestCase):
    def test_to_json(self):
        value = [1, 2, 3]

        expected = '[1, 2, 3]'

        self.assertEquals(to_json(value), expected)


class GlobalsContextProcessorTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email='foo@bla.com',
            password='pass'
        )

        dummy = User.objects.create_user(
            email='dummy@bla.com',
            password='pass'
        )

        self.c1 = Category(
            name='one',
            user=self.user
        )
        self.c1.save()

        self.c2 = Category(
            name='two',
            user=self.user
        )
        self.c2.save()

        Category(
            name='three',
            user=dummy
        ).save()

    def test_global_context(self):
        request = mock.Mock()
        request.user = self.user
        request.locale = Locale.parse('en_US')

        context = global_context(request)

        self.assertEquals(context, {
            'SITE_NAME': 'SpentWise beta',
            'js_date_format': u'MMM d, yyyy',
            'currency_symbol': u'$',
            'user_categories': ['One', 'Two'],
            'empty_value_fields': ['password', 'password1', 'password2']
        })

