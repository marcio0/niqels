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

    def test_post(self):
        pass
