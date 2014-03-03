from django.db import transaction
from django.db.models import Q
from django.test import TestCase, Client
from django.utils import timezone
from freezegun import freeze_time
from access.models import User
from access.tests.factories import UserFactory
from plans.models import Subscription
import mock
from plans.views import CancelSubscriptionView


class CancelSubscriptionViewTest(TestCase):
    @freeze_time('2010-10-10')
    @mock.patch.object(CancelSubscriptionView, '_send_cancel_notifiation')
    def test_cancel(self, send_notif):
        user = UserFactory.create()
        user.set_password('password')
        user.save()

        subs = Subscription.objects.create(start_date=timezone.datetime(2010, 10, 8), user=user)

        self.assertTrue(user.has_subscription().count() > 0)

        client = Client()
        client.login(email=user.email, password="password")
        client.post('/planos/cancelar', follow=True)

        self.assertTrue(send_notif.called)

        self.assertFalse(user.has_subscription().count() > 0)