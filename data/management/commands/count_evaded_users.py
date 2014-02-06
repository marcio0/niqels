from __future__ import division
from decimal import Decimal
from django.core.management.base import BaseCommand, CommandError
from datetime import timedelta
from django.utils import timezone
from access.models import User
from django.db.models import Count, Q
from data.models import Data


class Command(BaseCommand):
    help = u'Counts the ratio of evaded users'
    indicator = 'evaded users ratio'

    def handle(self, *args, **kwargs):
        now = timezone.now()
        one_week_ago = now - timedelta(weeks=1)
        three_weeks_ago = now - timedelta(weeks=3)

        with_activity = User.objects.filter(transactions__date__gte=three_weeks_ago).distinct().count()
        evaded = User.objects.filter(transactions__date__gte=three_weeks_ago).filter(~Q(transactions__date__gt=one_week_ago)).distinct().count()

        evaded_users_ratio = Decimal(evaded) / Decimal(with_activity) * 100
        evaded_users_ratio = '%.2f%%' % evaded_users_ratio

        Data.objects.create(indicator=self.indicator, value=evaded_users_ratio, date=now)