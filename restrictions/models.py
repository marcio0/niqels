from django.db import models
from django.db.models import Sum
from django.utils.translation import ugettext, ugettext_lazy as _
from django.db.models.signals import post_save
import expenses.models
import decimal
import datetime



class BaseCategoryRestriction(models.Model):
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


class MonthlyCategoryRestriction(models.Model):
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
        BaseCategoryRestriction,
        help_text=_('The base restriction from whom this one derives'),
        related_name="monthly_restrictions"
    )

    @property
    def spent(self):
        min_date = self.month
        max_date = (self.month + datetime.timedelta(days=32)).replace(day=1)
        Transaction = expenses.models.Transaction
        t = Transaction.objects.filter(date__gte=min_date,
                                       date__lt=max_date,
                                       user=self.baserestriction.user,
                                       category=self.baserestriction.category)
        result = t.aggregate(Sum('value'))

        spent = decimal.Decimal(result['value__sum']) if result['value__sum'] else decimal.Decimal(0)

        return spent

    def __unicode__(self):
        return _('Restriction: %d of %d on %s') % (self.spent, self.value, self.baserestriction.category.name)

    class Meta:
        unique_together = (('month', 'baserestriction'), )


def _create_month_restriction_signal(sender, instance, **kwargs):
    """
    Signal plugged-in Transaction object

    This method creates a MonthlyCategoryRestriction everytime a transaction
    is created in a given month, and there's a BaseCategoryRestriction for
    the user creating it.
    """
    month = instance.date.replace(day=1)
    category = instance.category
    user = instance.user

    try:
        mr = MonthlyCategoryRestriction.objects.get(month=month,
                                          baserestriction__user=user,
                                          baserestriction__category=category)
        return
    except MonthlyCategoryRestriction.DoesNotExist:
        mr = None

    try:
        categ_rest = BaseCategoryRestriction.objects.get(category=category,
                                                 user=user)
        mr = MonthlyCategoryRestriction(month=month, value=categ_rest.value,
                              baserestriction=categ_rest)
        mr.save()
    except BaseCategoryRestriction.DoesNotExist:
        return

post_save.connect(_create_month_restriction_signal,
                  sender=expenses.models.Transaction)
