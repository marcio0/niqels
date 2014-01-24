import decimal
from django.db import models
from django.utils.translation import ugettext, ugettext_lazy as _
import expenses.models
import access.models


class BaseRestriction(models.Model):
    user = models.ForeignKey(
        'access.User',
        verbose_name=_('user'),
        help_text=_('The owner of this restriction.')
    )
    category = models.ForeignKey(
        'expenses.Category',
        verbose_name=_('category'),
        help_text=_('The category for this restriction.')
    )
    value = models.DecimalField(
        _('value'),
        default=decimal.Decimal(0),
        decimal_places=2,
        max_digits=7,
        help_text=_('The monetary value of this transaction.'
                    'Accepts decimal values.')
    )

    class Meta:
        unique_together = (('category', 'user'), )


class MonthRestriction(models.Model):
    value = models.DecimalField(
        _('value'),
        default=decimal.Decimal(0),
        decimal_places=2,
        max_digits=7,
        help_text=_('The restriction threashold')
    )
    month = models.DateField(
        _('date'),
        help_text=_('For which month this restriction applies.')
    )
    baserestriction = models.ForeignKey(
        BaseRestriction,
        help_text=_('The base restriction from whom this one derives')
    )

    class Meta:
        unique_together = (('month', 'baserestriction'), )


def _create_month_restriction_signal(sender, instance):
    month = instance.date
    month.replace(day=1)
    category = instance.category

    try:
        mr = MonthRestriction.objects.get(month=month,
                                          baserestriction__category=category)
    except Exception, e:
        pass
