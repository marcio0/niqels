import datetime
from django.test import TestCase

from access.models import User
from plans.models import Subscription
from freezegun import freeze_time


class SubscriptionModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(email='user@test.com', password="password")

    def test_has_no_subscription(self):
        self.assertFalse(self.user.has_subscription())

    @freeze_time('2010-10-10')
    def test_had_subscription(self):
        # subscription is out of date

        user = self.user

        subscription = Subscription()
        subscription.name = 'name'
        subscription.start_date = datetime.datetime(2010, 10, 01)
        subscription.end_date = datetime.datetime(2010, 10, 04)
        user.subscriptions.add(subscription)

        self.assertFalse(user.has_subscription())

    @freeze_time('2010-10-10')
    def test_will_have_subscription(self):
        # subscription is on a future period
        user = self.user

        subscription = Subscription()
        subscription.name = 'name'
        subscription.start_date = datetime.datetime(2010, 10, 15)
        subscription.end_date = datetime.datetime(2010, 10, 20)
        user.subscriptions.add(subscription)

        self.assertFalse(user.has_subscription())

    @freeze_time('2010-10-10')
    def test_has_subscription(self):
        user = self.user

        subscription = Subscription()
        subscription.name = 'name'
        subscription.start_date = datetime.datetime(2010, 10, 04)
        subscription.end_date = datetime.datetime(2010, 10, 13)
        user.subscriptions.add(subscription)

        self.assertTrue(user.has_subscription())

    @freeze_time('2010-10-10')
    def test_has_two_subscriptions(self):
        # not an ideal scenario, but oh well, shit happens
        user = self.user

        subscription = Subscription()
        subscription.name = 'name'
        subscription.start_date = datetime.datetime(2010, 10, 04)
        subscription.end_date = datetime.datetime(2010, 10, 13)
        user.subscriptions.add(subscription)

        subscription = Subscription()
        subscription.name = 'name1'
        subscription.start_date = datetime.datetime(2010, 10, 01)
        subscription.end_date = datetime.datetime(2010, 10, 20)
        user.subscriptions.add(subscription)

        self.assertTrue(user.has_subscription())

    @freeze_time('2020-10-10')
    def test_has_courtesy_subscription(self):
        # courtesy has no end_date

        user = self.user

        subscription = Subscription()
        subscription.name = 'name'
        subscription.start_date = datetime.datetime(2010, 10, 04)
        user.subscriptions.add(subscription)

        self.assertTrue(user.has_subscription())
