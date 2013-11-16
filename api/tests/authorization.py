from django.test import TestCase
from django.db import models

from mock import Mock
import datetime

from api.authorization import UserObjectsOnlyAuthorization
from access.models import User
from expenses.models import Category, CategoryGroup, Transaction


class AuthorizationTest(TestCase):
    fixtures = ['AuthorizationTest']

    def setUp(self):
        self.user = User.objects.get(pk=1)

        CategoryGroup.objects.create(name='group')

        category = Category.objects.create(name='test', group_id=1)

        for i in [1, 2]:
            [Transaction(user_id=i, category=category, value=0, date=datetime.date.today()).save() for j in [1, 2, 3, 4]]


    def test_read_list(self):
        auth = UserObjectsOnlyAuthorization()
        bundle = Mock()
        bundle.request.user = self.user

        objs = auth.read_list(Transaction.objects.all(), bundle)

        self.assertEquals(objs.count(), 4)

    def test_read_detail_allowed(self):
        auth = UserObjectsOnlyAuthorization()
        bundle = Mock()
        bundle.request.user = self.user
        bundle.obj = Transaction.objects.filter(user_id=1)[0]

        self.assertTrue(auth.read_detail(Transaction.objects.all(), bundle))

    def test_read_detail_not_allowed(self):
        auth = UserObjectsOnlyAuthorization()
        bundle = Mock()
        bundle.request.user = self.user
        bundle.obj = Transaction.objects.filter(user_id=2)[0]

        self.assertFalse(auth.read_detail(Transaction.objects.all(), bundle))

    def test_create_list(self):
        auth = UserObjectsOnlyAuthorization()
        bundle = Mock()

        objs = auth.create_list(Transaction.objects.all(), bundle)

        self.assertEquals(objs.count(), 8)

    def test_create_detail_allowed(self):
        auth = UserObjectsOnlyAuthorization()
        bundle = Mock()
        bundle.request.user = self.user
        bundle.obj = Transaction.objects.filter(user_id=1)[0]

        self.assertTrue(auth.create_detail(Transaction.objects.all(), bundle))

    def test_create_detail_not_allowed(self):
        auth = UserObjectsOnlyAuthorization()
        bundle = Mock()
        bundle.request.user = self.user
        bundle.obj = Transaction.objects.filter(user_id=2)[0]

        self.assertFalse(auth.create_detail(Transaction.objects.all(), bundle))

    def test_update_list(self):
        auth = UserObjectsOnlyAuthorization()
        bundle = Mock()
        bundle.request.user = self.user

        objs = auth.update_list(Transaction.objects.all(), bundle)

        self.assertEquals(len(objs), 4)

    def test_update_detail_allowed(self):
        auth = UserObjectsOnlyAuthorization()
        bundle = Mock()
        bundle.request.user = self.user
        bundle.obj = Transaction.objects.filter(user_id=1)[0]

        self.assertTrue(auth.update_detail(Transaction.objects.all(), bundle))

    def test_update_detail_not_allowed(self):
        auth = UserObjectsOnlyAuthorization()
        bundle = Mock()
        bundle.request.user = self.user
        bundle.obj = Transaction.objects.filter(user_id=2)[0]

        self.assertFalse(auth.update_detail(Transaction.objects.all(), bundle))

    def test_delete_list(self):
        auth = UserObjectsOnlyAuthorization()
        bundle = Mock()
        bundle.request.user = self.user

        objs = auth.delete_list(Transaction.objects.all(), bundle)

        self.assertEquals(len(objs), 4)

    def test_delete_detail_allowed(self):
        auth = UserObjectsOnlyAuthorization()
        bundle = Mock()
        bundle.request.user = self.user
        bundle.obj = Transaction.objects.filter(user_id=1)[0]

        self.assertTrue(auth.delete_detail(Transaction.objects.all(), bundle))

    def test_delete_detail_not_allowed(self):
        auth = UserObjectsOnlyAuthorization()
        bundle = Mock()
        bundle.request.user = self.user
        bundle.obj = Transaction.objects.filter(user_id=2)[0]

        self.assertFalse(auth.delete_detail(Transaction.objects.all(), bundle))
