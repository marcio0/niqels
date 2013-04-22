from decimal import Decimal

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

        for month_qs in qss:
            value = month_qs.aggregate(Sum('value'))['value__sum']
            if not value:
                value = 0
            data.append(value)

        base = data.pop(0)

        average = sum(data) / len(data)

        try:
            deviation = (average / base) - 1
        except ZeroDivisionError:
            if base > average:
                deviation = Decimal(1)
            elif base < average:
                deviation = Decimal(-1)
            else:
                deviation = 0

        return dict(base=base, average=average, deviation=deviation)
