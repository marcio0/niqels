import mock

from django.test import TestCase

from expenses.management.commands import setup_categories
from expenses.models import Category, CategoryGroup

class SetupCategoriesTest(TestCase):
    def test_simple(self):
        self.assertEquals(Category.objects.count(), 0)
        self.assertEquals(CategoryGroup.objects.count(), 0)

        setup_categories.categories = [
            {'name': 'group1', 'categories': [
                {'name': 'category1'},
                {'name': 'category2'},
                {'name': 'category3'},
            ]},
            {'name': 'group2', 'categories': [
                {'name': 'category4'},
                {'name': 'category5'}
            ]}
        ]

        command = setup_categories.Command()
        command.stdout = mock.Mock()
        command.handle()

        self.assertEquals(Category.objects.count(), 5)
        self.assertEquals(CategoryGroup.objects.count(), 2)
