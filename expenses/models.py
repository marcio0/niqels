import datetime
import decimal
from dateutil.relativedelta import relativedelta

from django.db import models
from django.utils.translation import ugettext, ugettext_lazy as _


class Category(models.Model):
    name = models.CharField(_('name'),
        max_length=20,
        help_text=_('The category of a transaction. Ex.: "Groceries", "Medical".')
    )
    color = models.CharField(_('color'),
        max_length=7,
        default="#999999",
        help_text=_('The color of this category, to make it visually identifiable. Accepts HEX values only.')
    )
    user = models.ForeignKey('access.User',
        verbose_name=_("user"),
        help_text=_('The owner of this category.')
    )
    active = models.BooleanField(default=True)

    def __unicode__(self):
        return "Category: %s" % self.name


class TransactionManager(models.Manager):
    def up_to_day(self, start_date=None, qty_months=1, **kwargs):
        if not start_date:
            start_date = datetime.date.today()

        result = ()

        for i in range(0, qty_months):
            end = start_date - relativedelta(months=i)
            start = end.replace(day=1)

            result = result + (self.get_query_set().filter(date__range=(start, end), **kwargs),)

        return result


class Transaction(models.Model):
    value = models.DecimalField(_('value'),
        default=decimal.Decimal(0),
        decimal_places=2,
        max_digits=7,
        help_text=_('The monetary value of this transaction. Accepts decimal values.')
    )
    description = models.TextField(_('description'),
        null=True,
        blank=True,
        help_text=_('The description for this transaction. Ex.: "Lunch with friends".')
    )
    date = models.DateField(_('date'),
        help_text=_('The date when this transaction happened. Ex.: 10/21/2010.')
    )
    category = models.ForeignKey(Category,
        verbose_name=_('category'),
        help_text=_('The category for this transaction.')
    )
    user = models.ForeignKey('access.User',
        verbose_name=_('user'),
        help_text=_('The owner of this transaction.')
    )

    repeatable = models.ForeignKey('reminder.RepeatableTransaction',
        blank=True, null=True,
        on_delete=models.SET_NULL
    )

    '''
    Marks the time of the day this Transaction was saved.
    Used to order the entries inside a day by last_edition.
    '''
    last_edited_time = models.TimeField(auto_now=True)

    objects = TransactionManager()

    def __unicode__(self):
        return 'Transaction: %d of %s on %s' % (
            self.value,
            self.category,
            self.date
        )

    class Meta:
        ordering = ['-date', '-last_edited_time']
