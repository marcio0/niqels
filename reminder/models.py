import datetime
from decimal import Decimal
from dateutils import relativedelta

from django.db import models
from django.db.models.query import QuerySet
from django.utils.translation import gettext_noop, ugettext_lazy as _

from expenses.models import Entry, Category


class RepeatableTransactionQueryset(QuerySet):
    def get_on_warning_range(self, *args, **kwargs):
        start = datetime.date.today() + relativedelta(days=5)
        return self.filter(_last_date__lte=start, *args, **kwargs)


class RepeatableTransactionManager(models.Manager):
    def get_query_set(self):
        return RepeatableTransactionQueryset(self.model)

    def get_on_warning_range(self, *args, **kwargs):
        return self.get_query_set().get_on_warning_range(*args, **kwargs)


class RepeatableTransaction(models.Model):
    objects = RepeatableTransactionManager()

    value = models.DecimalField(_('value'),
        decimal_places=2,
        max_digits=7,
        default=Decimal(),
        help_text=_('The monetary value of this transaction. Accepts decimal values. Optional.')
    )
    description = models.TextField(_('description'),
        null=True,
        blank=True,
        help_text=_('The description for this transaction. Ex.: "Lunch with friends". Optional.')
    )
    category = models.ForeignKey('expenses.Category',
        verbose_name=_('category'),
        help_text=_('The category for this transaction.')
    )

    repeat = models.CharField(_('repeat'),
        max_length=10,
        help_text=_('How this transaction repeats.')
    )

    user = models.ForeignKey('access.User',
        verbose_name=_('user'),
        help_text=_('The owner of this transaction.')
    )

    _last_date = models.DateField(_('last occurence'),
        help_text=_('The last occurrence of this transaction.')
    )
    _day_of_month = models.IntegerField(_('day of month'),
        help_text=_('The day of month this transaction must happen.')
    )

    def get_last_date(self):
        return self._last_date

    def set_last_date(self, date):
        self._last_date = date
        self._day_of_month = date.day

    last_date = property(get_last_date, set_last_date)

    def get_due_date(self):
        PERIODS = {
            'daily': {'days': 1},
            'weekly': {'weeks': 1},
            'biweekly': {'weeks': 2},
            'monthly': {'months': 1}
        }
        delta = relativedelta(**PERIODS[self.repeat])

        if self.repeat is 'monthly':
            delta += relativedelta(day=self._day_of_month)

        return self.last_date + delta

    def set_due_date(self, due_date):
        PERIODS = {
            'daily': {'days': 1},
            'weekly': {'weeks': 1},
            'biweekly': {'weeks': 2},
            'monthly': {'months': 1}
        }
        delta = relativedelta(**PERIODS[self.repeat])

        if self.repeat is 'monthly':
            delta += relativedelta(day=self._day_of_month)

        self.last_date = due_date + (delta * -1)

    due_date = property(get_due_date, set_due_date)

    def update_last_date(self):
        self._last_date = self.due_date

        return self.last_date
    
    def create_transaction(self, **kwargs):
        entry = Entry()
        entry.category = self.category
        entry.user = self.user

        entry.date = kwargs.get('date', datetime.date.today())
        entry.description = kwargs.get('description', self.description)

        entry.value = kwargs.get('value', self.value)
        if not entry.value:
            raise ValueError(_('A value is required.'))

        entry.repeatable = self

        return entry
