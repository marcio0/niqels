import datetime
from decimal import Decimal

from django.test import TestCase, Client

from expenses.forms import EntryForm
from expenses.models import Entry, Category
from access.models import User


class DeleteEntryViewTest(TestCase):
    def setUp(self):
        user = User.objects.create_user(
            email='delete@expenses.com',
            password='delete')

        cat = Category(name='delete', user=user)
        cat.save()

        self.entry = Entry(
            value=Decimal(1),
            date=datetime.date.today(),
            category=cat,
            user=user)
        self.entry.save()

        self.entry2 = Entry(
            value=Decimal(1),
            date=datetime.date.today(),
            category=cat,
            user=user)
        self.entry2.save()

    def test_not_logged_in(self):
        client = Client()

        ret = client.post('/entries/%d/delete/' % self.entry.id)

        self.assertEquals(ret.status_code, 302)
        self.assertEquals(ret.get('location'), 'http://testserver/login/?next=/entries/%d/delete/' % self.entry.id)

    def test_deletion(self):
        client = Client()
        client.login(email='delete@expenses.com', password='delete')

        ret = client.post('/entries/%d/delete/' % self.entry.id)

        self.assertEquals(ret.status_code, 302)
        self.assertEquals(ret.get('location'), 'http://testserver/entries/')

        self.assertTrue(
            Entry.objects.filter(pk=self.entry2.id).exists())


class CreateEntryTest(TestCase):
    fixtures = ['CreateEntryTest']

    def test_not_logged_in(self):
        client = Client()

        data = {
            'value': 45,
            'date': '03/03/2010',
            'description': 'new category',
            'category': 'new'
        }
        ret = client.get('/entries/new/')

        self.assertEquals(ret.status_code, 302)
        self.assertEquals(ret.get('location'), 'http://testserver/login/?next=/entries/new/')

    def test_get_does_nothing(self):
        client = Client()
        client.login(email='user1@expenses.com', password='pass')

        ret = client.get('/entries/new/')
        self.assertEquals(ret.status_code, 302)
        self.assertEquals(ret.get('location'), 'http://testserver/')

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

    def test_category_name_strip(self):
        client = Client()
        client.login(email='user1@expenses.com', password='pass')

        previous_categories = Category.objects.filter(user__email='user1@expenses.com').count()

        data = {
            'value': 45,
            'date': '03/03/2010',
            'description': 'new category',
            'category': 'cat1 '
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
    

class ListEntrytTest(TestCase):
    fixtures = ['ListEntryTest']

    def test_get_list(self):
        client = Client()
        client.login(email='user1@expenses.com', password='pass')

        ret = client.get('/entries/')
        self.assertEquals(ret.status_code, 200)

        form = ret.context['entry_form']
        self.assertIsInstance(form, EntryForm)

        entries = ret.context['entries']
        self.assertEquals(len(entries), 2)

        entries_all = Entry.objects.filter(user__email='user1@expenses.com')
        self.assertListEqual(list(entries), list(entries_all))
