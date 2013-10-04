from decimal import Decimal, InvalidOperation
import datetime
import calendar

from dateutil import rrule
from django.db.models import Sum

from expenses.models import Transaction 
from access.models import User


class BalanceQuery(object):
    """
    Returns renevues and expenses for the informed period.
    Optionally filters the queries up to the specified day.
    """
    periods = ['month']

    def __init__(self, date_start, date_end, day=None, period='month'):
        self.date_start = date_start
        self.date_end = date_end
        self.day = day
        self.period = period

    def calculate(self, **kwargs):
        result = []

        for month in rrule.rrule(rrule.MONTHLY, dtstart=self.date_start, until=self.date_end, bymonthday=(1, -1), bysetpos=1):
            month_end = calendar.monthrange(month.year, month.month)[1]
            month_end = month.replace(day=self.day or month_end)

            qs = Transaction.objects.filter(date__range=(month, month_end), **kwargs)
            renevues = qs.filter(value__gte=0).aggregate(Sum('value'))['value__sum'] or 0
            expenses = qs.filter(value__lte=0).aggregate(Sum('value'))['value__sum'] or 0
            month_str = month.strftime('%Y-%m')

            result.append(dict(period=month_str, renevues=renevues, expenses=expenses))

        return result
 

class AverageCalculator(object):
    def __init__(self, user, qty_months, start_date):
        self.user = user
        self.qty_months = qty_months
        self.start_date = start_date

    def calculate(self):
        qss = Transaction.objects.up_to_day(
            qty_months=self.qty_months,
            start_date=self.start_date,
            user=self.user)

        data = []
        found_first = False
        for month_qs in reversed(qss):
            '''
                None values before the first not None value means months without data.
                None values after the first not None value count as zero.
                Example:
                    [None, None, 4, 5, None 6]
                The result data should be:
                    [4, 5, 0, 6]
            '''
            value = month_qs.aggregate(Sum('value'))['value__sum']

            if value is None and found_first:
                value = Decimal(0)
            elif value is None and not found_first:
                continue

            found_first = True
            data.append(value)

        try:
            base = data.pop(-1)
        except IndexError:
            base = Decimal(0)

        try:
            average = sum(data) / len(data)
            diff = base - average
            deviation = diff / abs(average)
        except (ZeroDivisionError, InvalidOperation):
            average = Decimal(0)
            deviation = Decimal(0)

        return dict(base=base, average=average, deviation=deviation)
