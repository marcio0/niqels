import json

from django.test import TestCase

from expenses.models import Category
from expenses.templatetags.expenses_tags import as_category, as_value, to_json

class ExpensesTemplateTagsTest(TestCase):
    def test_as_category(self):
        cat = Category()
        cat.name = 'category'
        cat.color = '#000000'

        tag = as_category(cat)
        self.assertEquals(tag,
            '<span class="label" style="background-color: #000000;">Category</span>')

    def test_as_value_negative(self):
        tag = as_value(-1)

        self.assertEquals(tag, '<span class="text-error">$ -1</span>')

    def test_as_value_positive(self):
        self.assertEquals(as_value(1), '<span class="text-success">$ 1</span>')
        self.assertEquals(as_value(0), '<span class="text-success">$ 0</span>')

    def test_to_json(self):
        value = [1, 2, 3]

        expected = '[1, 2, 3]'

        self.assertEquals(to_json(value), expected)

