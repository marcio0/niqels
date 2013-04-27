import json
import mock
from babel import Locale

from django.test import TestCase

from access.models import User
from expenses.models import Category
from expenses.templatetags.expenses_tags import as_category, as_value, to_json
from expenses.context_processors import global_context


class ExpensesTemplateTagsTest(TestCase):
    def test_as_category(self):
        cat = Category()
        cat.name = 'category'
        cat.color = '#000000'

        tag = as_category(cat)
        self.assertEquals(tag,
            '<span class="category-label" style="background-color: #000000;">Category</span>')

    def test_as_value_negative(self):
        tag = as_value(-1)

        self.assertEquals(tag, '<span class="text-error">$1</span>')

    def test_as_value_positive(self):
        self.assertEquals(as_value(1), '<span class="text-success">$1</span>')
        self.assertEquals(as_value(0), '<span class="text-success">$0</span>')

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
            'SITE_NAME': 'SpentWise',
            'js_date_format': u'MMM d, yyyy',
            'currency_symbol': u'$',
            'user_categories': ['One', 'Two'],
            'empty_value_fields': ['password', 'password1', 'password2']
        })

