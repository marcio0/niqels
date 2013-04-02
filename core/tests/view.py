from django.test import TestCase, Client
import datetime
from decimal import Decimal

from core.views import expense_list
from core.forms import EntryForm
from core.models import Entry, Category

class ExpenseListTest(TestCase):
    def setUp(self):
        category = Category(name='ExpenseListTest')
        category.save()

        entry = Entry()
        entry.date = datetime.date.today()
        entry.value = Decimal()
        entry.category = category
        entry.save()

    def test_get_list(self):
        client = Client()
        ret = client.get('/expenses/')
        self.assertEquals(ret.status_code, 200)

        form = ret.context.get('entry_form')
        self.assertIsInstance(form, EntryForm)

        entries = ret.context.get('entries')
        self.assertEquals(len(entries), 1)

        entries_all = Entry.objects.all()
        self.assertListEqual(list(entries), list(entries_all))

    def test_post_with_new_category(self):
        client = Client()

        previous_categories = Category.objects.count()

        data = {
            'value': 45,
            'date': '03/03/2010',
            'description': 'new category',
            'category': 'new'
        }

        ret = client.post('/expenses/', data)
        self.assertEquals(ret.status_code, 302)
        self.assertEquals(ret.get('location'), 'http://testserver/expenses/')

        exists = Entry.objects.filter(
            value=45,
            date=datetime.date(2010, 03, 03),
            description='new category'
        ).exists()
        self.assertTrue(exists)

        actual_categories = Category.objects.count()

        self.assertEquals(actual_categories, previous_categories+1)

    def test_post_with_existing_category(self):
        client = Client()

        previous_categories = Category.objects.count()

        data = {
            'value': 45,
            'date': '03/03/2010',
            'description': 'new category',
            'category': 'ExpenseListTest'
        }

        ret = client.post('/expenses/', data)
        self.assertEquals(ret.status_code, 302)
        self.assertEquals(ret.get('location'), 'http://testserver/expenses/')

        exists = Entry.objects.filter(
            value=45,
            date=datetime.date(2010, 03, 03),
            description='new category'
        ).exists()
        self.assertTrue(exists)

        actual_categories = Category.objects.count()

        self.assertEquals(actual_categories, previous_categories)

    def test_invalid_form(self):
        client = Client()

        data = {
            'value': 45,
            'date': '03/03/2010',
            'description': 'new category'
        }

        ret = client.post('/expenses/', data)
        self.assertEquals(ret.status_code, 200)

        self.assertNotEquals(ret.content.find('This field is required.'), -1)
