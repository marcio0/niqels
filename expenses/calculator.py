from decimal import Decimal, InvalidOperation

from django.db.models import Sum

from expenses.models import Entry


class AverageCalculator(object):
    def __init__(self, user, qty_months, start_date):
        self.user = user
        self.qty_months = qty_months
        self.start_date = start_date

    def calculate(self):
        qss = Entry.objects.up_to_day(
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
