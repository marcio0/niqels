import json
import mock
from babel import Locale
from decimal import Decimal

from django.test import TestCase

from access.models import User
from expenses.models import Category
from expenses.context_processors import global_context


class GlobalsContextProcessorTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email='foo@bla.com',
            password='pass'
        )

    def test_global_context(self):
        request = mock.Mock()
        request.user = self.user
        request.locale = Locale.parse('en_US')

        context = global_context(request)

        self.assertEquals(context, {
            'SITE_NAME': 'Niqels',
            'js_date_format': u'MMM d, yyyy',
            'currency_symbol': u'$',
            'is_debug': False,
            'empty_value_fields': ['password', 'password1', 'password2']
        })

    def test_template_debug_conditions(self):
        request = mock.Mock()
        request.user = self.user
        request.locale = Locale.parse('en_US')

        from django.conf import settings

        settings.DEBUG = False
        settings.TEMPLATE_DEBUG = True

        context = global_context(request)
        self.assertFalse(context['is_debug'])

        settings.DEBUG = True
        settings.TEMPLATE_DEBUG = False

        context = global_context(request)
        self.assertFalse(context['is_debug'])

        settings.DEBUG = False
        settings.TEMPLATE_DEBUG = False

        context = global_context(request)
        self.assertFalse(context['is_debug'])

        settings.DEBUG = True
        settings.TEMPLATE_DEBUG = True

        context = global_context(request)
        self.assertTrue(context['is_debug'])
