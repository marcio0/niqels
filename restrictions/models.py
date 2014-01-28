import decimal
from django.db import models
from django.utils.translation import ugettext, ugettext_lazy as _
from django.db.models.signals import post_save
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


def _create_month_restriction_signal(sender, instance, **kwargs):
    """
    Signal plugged-in Transaction object

    This method creates a MonthRestriction everytime a transaction
    is created in a given month, and there's a BaseRestriction for
    the user creating it.
    """
    month = instance.date.replace(day=1)
    category = instance.category
    user = instance.user

    try:
        mr = MonthRestriction.objects.get(month=month,
                                          baserestriction__user=user,
                                          baserestriction__category=category)
        return
    except MonthRestriction.DoesNotExist:
        mr = None

    try:
        categ_rest = BaseRestriction.objects.get(category=category,
                                                 user=user)
        mr = MonthRestriction(month=month, value=categ_rest.value,
                              baserestriction=categ_rest)
        mr.save()
    except BaseRestriction.DoesNotExist:
        return

post_save.connect(_create_month_restriction_signal,
                  sender=expenses.models.Transaction)
