import datetime
from decimal import Decimal

from django.test import TestCase, Client

from expenses.forms import EntryForm
from expenses.models import Entry, Category
from access.models import User


class EntryNewTest(TestCase):
    fixtures = ['EntryNewTest']

    def test_post_with_new_category(self):
        client = Client()
        client.login(email='user1@expenses.com', password='pass')

        previous_categories = Category.objects.filter(user__email='user1@expenses.com').count()

        data = {
            'value': 45,
            'date': '03/03/2010',
            'description': 'new category',
            'category': 'new'
        }

        ret = client.post('/entries/new/', data)
        self.assertEquals(ret.status_code, 302)
        self.assertEquals(ret.get('location'), 'http://testserver/entries/')

        exists = Entry.objects.filter(
            value=-45,
            date=datetime.date(2010, 03, 03),
            description='new category',
            user__email='user1@expenses.com'
        ).exists()
        self.assertTrue(exists)

        actual_categories = Category.objects.filter(user__email='user1@expenses.com').count()

        self.assertEquals(actual_categories, previous_categories+1)

    def test_post_with_existing_category(self):
        client = Client()
        client.login(email='user1@expenses.com', password='pass')

        previous_categories = Category.objects.filter(user__email='user1@expenses.com').count()

        data = {
            'value': 45,
            'date': '03/03/2010',
            'description': 'new category',
            'category': 'cat1'
        }

        ret = client.post('/entries/new/', data)
        self.assertEquals(ret.status_code, 302)
        self.assertEquals(ret.get('location'), 'http://testserver/entries/')

        exists = Entry.objects.filter(
            value=-45,
            date=datetime.date(2010, 03, 03),
            description='new category',
            user__email='user1@expenses.com'
        ).exists()
        self.assertTrue(exists)

        actual_categories = Category.objects.filter(user__email='user1@expenses.com').count()

        self.assertEquals(actual_categories, previous_categories)

    def test_invalid_form(self):
        client = Client()
        client.login(email='user1@expenses.com', password='pass')

        data = {
            'value': 45,
            'date': '03/03/2010',
            'description': 'new category'
        }

        ret = client.post('/entries/new/', data)
        self.assertEquals(ret.status_code, 200)

        self.assertNotEquals(ret.content.find('This field is required.'), -1)
    

class EntryListTest(TestCase):
    fixtures = ['ExpenseViewTest']

    def test_get_list(self):
        client = Client()
        client.login(email='user1@expenses.com', password='pass')

        ret = client.get('/')
        self.assertEquals(ret.status_code, 200)

        form = ret.context['entry_form']
        self.assertIsInstance(form, EntryForm)

        entries = ret.context['entries']
        self.assertEquals(len(entries), 2)

        entries_all = Entry.objects.filter(user__email='user1@expenses.com')
        self.assertListEqual(list(entries), list(entries_all))
