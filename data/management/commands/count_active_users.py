from __future__ import division
from decimal import Decimal
from django.core.management.base import BaseCommand, CommandError
from datetime import datetime, timedelta
from django.utils import timezone
from access.models import User
from django.db.models import Count
from data.models import Data


class Command(BaseCommand):
    help = u'Counts the amount of active users'
    indicator = 'active users ratio'

    def handle(self, *args, **kwargs):
        now = timezone.now()
        one_week_ago = now - timedelta(weeks=1)

        total = User.objects.annotate(num_transactions=Count('transaction')).filter(num_transactions__gte=0).count()
        active_users = User.objects.filter(transaction__created__gte=one_week_ago).distinct().count()

        active_users_ratio = Decimal(active_users) / Decimal(total) * 100
        active_users_ratio = '%.2f%%' % active_users_ratio

        return Data.objects.create(indicator=self.indicator, value=active_users_ratio, date=now)

