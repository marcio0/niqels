import datetime
from django.test import TestCase

from access.models import User
from plans.models import Subscription


class SubscriptionModelTest(TestCase):
    def test_has_subscription(self):
        user = User.objects.create_user(email='user@test.com', password="password")

        self.assertFalse(user.has_subscription())

        subscription = Subscription()
        subscription.name = 'name'
        subscription.start_date = datetime.datetime.now()
        user.subscriptions.add(subscription)

        self.assertTrue(user.has_subscription())



