from django.test import TestCase
from django.db import models

from mock import Mock

from api.authorization import UserObjectsOnlyAuthorization
from access.models import User
from expenses.models import Category


class AuthorizationTest(TestCase):
    fixtures = ['AuthorizationTest']

    def setUp(self):
        self.user = User.objects.get(pk=1)

        for i in [1, 2]:
            [Category(name=j, user_id=i).save() for j in [1, 2, 3, 4]]


    def test_read_list(self):
        auth = UserObjectsOnlyAuthorization()
        bundle = Mock()
        bundle.request.user = self.user

        objs = auth.read_list(Category.objects.all(), bundle)

        self.assertEquals(objs.count(), 4)

    def test_read_detail_allowed(self):
        auth = UserObjectsOnlyAuthorization()
        bundle = Mock()
        bundle.request.user = self.user
        bundle.obj = Category.objects.filter(user_id=1)[0]

        self.assertTrue(auth.read_detail(Category.objects.all(), bundle))

    def test_read_detail_not_allowed(self):
        auth = UserObjectsOnlyAuthorization()
        bundle = Mock()
        bundle.request.user = self.user
        bundle.obj = Category.objects.filter(user_id=2)[0]

        self.assertFalse(auth.read_detail(Category.objects.all(), bundle))

    def test_create_list(self):
        auth = UserObjectsOnlyAuthorization()
        bundle = Mock()

        objs = auth.create_list(Category.objects.all(), bundle)

        self.assertEquals(objs.count(), 8)

    def test_create_detail_allowed(self):
        auth = UserObjectsOnlyAuthorization()
        bundle = Mock()
        bundle.request.user = self.user
        bundle.obj = Category.objects.filter(user_id=1)[0]

        self.assertTrue(auth.create_detail(Category.objects.all(), bundle))

    def test_create_detail_not_allowed(self):
        auth = UserObjectsOnlyAuthorization()
        bundle = Mock()
        bundle.request.user = self.user
        bundle.obj = Category.objects.filter(user_id=2)[0]

        self.assertFalse(auth.create_detail(Category.objects.all(), bundle))

    def test_update_list(self):
        auth = UserObjectsOnlyAuthorization()
        bundle = Mock()
        bundle.request.user = self.user

        objs = auth.update_list(Category.objects.all(), bundle)

        self.assertEquals(len(objs), 4)

    def test_update_detail_allowed(self):
        auth = UserObjectsOnlyAuthorization()
        bundle = Mock()
        bundle.request.user = self.user
        bundle.obj = Category.objects.filter(user_id=1)[0]

        self.assertTrue(auth.update_detail(Category.objects.all(), bundle))

    def test_update_detail_not_allowed(self):
        auth = UserObjectsOnlyAuthorization()
        bundle = Mock()
        bundle.request.user = self.user
        bundle.obj = Category.objects.filter(user_id=2)[0]

        self.assertFalse(auth.update_detail(Category.objects.all(), bundle))

    def test_delete_list(self):
        auth = UserObjectsOnlyAuthorization()
        bundle = Mock()
        bundle.request.user = self.user

        objs = auth.delete_list(Category.objects.all(), bundle)

        self.assertEquals(len(objs), 4)

    def test_delete_detail_allowed(self):
        auth = UserObjectsOnlyAuthorization()
        bundle = Mock()
        bundle.request.user = self.user
        bundle.obj = Category.objects.filter(user_id=1)[0]

        self.assertTrue(auth.delete_detail(Category.objects.all(), bundle))

    def test_delete_detail_not_allowed(self):
        auth = UserObjectsOnlyAuthorization()
        bundle = Mock()
        bundle.request.user = self.user
        bundle.obj = Category.objects.filter(user_id=2)[0]

        self.assertFalse(auth.delete_detail(Category.objects.all(), bundle))
