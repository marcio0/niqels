import datetime
from dateutil.relativedelta import relativedelta

from django.db import models


def up_to_day(start_date=None, qty_months=1, *args, **kwargs):
    if not start_date:
        start_date = datetime.date.today()

    result = {}

    for i in range(0, qty_months):
        end = start_date - relativedelta(months=i)
        start = end.replace(day=1)

        result[(end.year, end.month)] = Entry.objects.filter(date__range=(start, end))

    return result


class Category(models.Model):
    name = models.CharField(max_length=20)
    user = models.ForeignKey('access.User')
    color = models.CharField(max_length=7, default="#999999")

    def __unicode__(self):
        return self.name


class Entry(models.Model):
    value = models.DecimalField(decimal_places=2, max_digits=7)
    description = models.TextField(null=True, blank=True)
    date = models.DateField()
    category = models.ForeignKey(Category)
    user = models.ForeignKey('access.User')

    '''
    Marks the time of the day this entry was saved.
    Used to order the entries inside a day by last_edition.
    '''
    last_edited_time = models.TimeField(auto_now=True)

    def __unicode__(self):
        return '%d of %s on %s' % (
            self.value,
            self.category,
            self.date
        )

    class Meta:
        ordering = ['-date', '-last_edited_time']
