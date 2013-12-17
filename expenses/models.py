import datetime
import calendar
import decimal

from django.db import models
from django.utils.translation import ugettext, ugettext_lazy as _
from django.utils import timezone


class SplitTransaction(models.Model):
    def get_total_value(self):
        return sum(transaction.value for transaction in self.transactions)


class CategoryGroupManager(models.Manager):
    def get_by_natural_key(self, name):
        return self.get(name=name)


class CategoryGroup(models.Model):
    name = models.CharField(_('name'),
        max_length=40,
        unique=True
    )

    objects = CategoryGroupManager()

    def natural_key(self):
        return self.name

    def __unicode__(self):
        return self.name

    class Meta:
        verbose_name = _('Category group')
        verbose_name_plural = _('Category groups')


class CategoryManager(models.Manager):
    def get_by_natural_key(self, group, name):
        return self.get(name=name, group__name=group)


class Category(models.Model):
    name = models.CharField(_('name'),
        max_length=40,
        help_text=_('The category of a transaction. Ex.: "Groceries", "Medical".')
    )
    is_active = models.BooleanField(_('is active'),
        help_text=_("If this category is enabled."),
        default=True
    )
    is_negative = models.BooleanField(_('is negative'),
        help_text=_("If transactions on this category has negative values by default."),
        default=True
    )


    group = models.ForeignKey(CategoryGroup,
        verbose_name=_('category group'),
        help_text=_('The group this category belongs.'),
        related_name="categories"
    )

    objects = CategoryManager()

    def natural_key(self):
        return self.group.name, self.name
    natural_key.dependencies = ['expenses.CategoryGroup']

    def __unicode__(self):
        return self.name

    class Meta:
        verbose_name = _('Category')
        verbose_name_plural = _('Categories')


class CategoryConfig():
    category = models.ForeignKey(Category,
        verbose_name=_('category'),
        related_name="+"
    )
    user = models.ForeignKey('access.User',
        verbose_name=_("user")
    )
    color = models.CharField(_('color'),
        max_length=7,
        default="#999999",
        help_text=_('The color of this category, to make it visually identifiable. Accepts HEX values only.')
    )
    category_active = models.BooleanField(_('active'), default=True)

    def __unicode__(self):
        return _("Config for %(category_name)s" % dict(category_name=unicode(self.category)))


class TransactionManager(models.Manager):
    def up_to_day(self, months=None, day=None, **kwargs):
        """
        Returns every transaction for each month in `months`, up to `day`.
        By default, `months` is the actual month; and `day` is the last day of month.
        """
        if not months:
            today = datetime.date.today()
            months = [today.strftime('%Y-%m')]

        result = {}

        for month in months:
            start_date = datetime.datetime.strptime(month, '%Y-%m')

            if not day:
                last_day = calendar.monthrange(start_date.year, start_date.month)[1]
            else:
                if day > calendar.mdays[start_date.month]:
                    last_day = calendar.mdays[start_date.month]
                else:
                    last_day = day

            end_date = start_date.replace(day=last_day)
            result[month] = self.get_query_set().filter(date__range=(start_date, end_date), **kwargs)

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
    user = models.ForeignKey('access.User',
        verbose_name=_('user'),
        help_text=_('The owner of this transaction.')
    )
    category = models.ForeignKey(Category,
        verbose_name=_('category'),
        help_text=_('The category for this transaction.')
    )

    created = models.DateTimeField(_('creation date'),
        help_text=_("When this transaction was created."),
        default=timezone.now())

    installment_of = models.ForeignKey(SplitTransaction,
        verbose_name=_('installment of'),
        help_text=_('Which transaction this is a installment of.'),
        null=True,
        blank=True,
        related_name="transactions")

    objects = TransactionManager()

    def __unicode__(self):
        return 'Transaction: %d of %s on %s' % (
            self.value,
            self.category.name,
            self.date
        )

    class Meta:
        ordering = ['-date', '-created']
        verbose_name = _('Transaction')
        verbose_name_plural = _('Transactions')
