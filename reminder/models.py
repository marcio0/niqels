import datetime
from decimal import Decimal
from dateutils import relativedelta

from django.db import models
from django.db.models.query import QuerySet
from django.utils.translation import gettext_noop, ugettext_lazy as _

from expenses.models import Transaction, Category


class RepeatableTransaction(models.Model):
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

    _due_date = models.DateField(_('due date'),
        help_text=_('The due date for this transaction.')
    )
    _day_of_month = models.IntegerField(_('day of month'),
        help_text=_('The day of month this transaction must happen.'),
        default=0
    )

    def get_due_date(self):
        return self._due_date

    def set_due_date(self, date):
        self._due_date = date
        if self._day_of_month is 0:
            self._day_of_month = date.day

    due_date = property(get_due_date, set_due_date)

    @property
    def next_due_date(self):
        PERIODS = {
            'daily': {'days': 1},
            'weekly': {'weeks': 1},
            'biweekly': {'weeks': 2},
            'monthly': {'months': 1}
        }
        delta = relativedelta(**PERIODS[self.repeat])

        if self.repeat is 'monthly':
            delta += relativedelta(day=self._day_of_month)

        return self.due_date + delta
    
    def create_transaction(self, **kwargs):
        entry = Transaction()
        entry.category = self.category
        entry.user = self.user

        entry.date = kwargs.get('date', datetime.date.today())
        entry.description = kwargs.get('description', self.description)

        entry.value = kwargs.get('value', self.value)
        if entry.value is None:
            raise ValueError(_('A value is required.'))

        entry.repeatable = self

        return entry
