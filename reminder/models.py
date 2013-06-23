import datetime

from django.db import models
from django.utils.translation import gettext_noop, ugettext_lazy as _

from expenses.models import Entry, Category

class RepeatableTransaction(models.Model):
    value = models.DecimalField(_('value'),
        decimal_places=2,
        max_digits=7,
        blank=True, null=True,
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

    last_date = models.DateField(_('last occurence'),
        help_text=_('The last occurrence of this transaction.')
    )

    user = models.ForeignKey('access.User',
        verbose_name=_('user'),
        help_text=_('The owner of this transaction.')
    )

    def update_last_date(self):
        delta = datetime.timedelta(weeks=1)
        self.last_date += delta
    
    def create_transaction(self, **kwargs):
        entry = Entry()
        entry.category = self.category
        entry.user = self.user

        entry.date = kwargs.get('date', datetime.date.today())
        entry.description = kwargs.get('description', self.description)

        entry.value = kwargs.get('value', self.value)
        if not entry.value:
            raise ValueError(_('A value is required.'))

        return entry
