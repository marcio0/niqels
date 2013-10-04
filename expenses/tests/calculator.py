import mock
from decimal import Decimal
import datetime

from django.test import TestCase

import expenses.models
from expenses.calculator import AverageCalculator, BalanceQuery
from expenses.models import Category, Transaction
from access.models import User


class BalanceQueryTest(TestCase):
    fixtures = ['BalanceQueryTest']

    def test_calculate_simple(self):
        date_start = datetime.datetime(2010, 1, 1)
        date_end = datetime.datetime(2010, 1, 1)

        calc = BalanceQuery(date_start=date_start, date_end=date_end)

        result = calc.calculate()

        self.assertEquals(result, [
            {
                'period': '2010-01',
                'renevues': Decimal(450),
                'expenses': Decimal(-300)
            }
        ])

    def test_calculate_three_months(self):
        date_start=datetime.datetime(2010, 01, 01)
        date_end=datetime.datetime(2010, 03, 03)

        calc = BalanceQuery(date_start=date_start, date_end=date_end)

        result = calc.calculate()

        self.assertEquals(result, [
            {
                'period': '2010-01',
                'renevues': Decimal(450),
                'expenses': Decimal(-300)
            },
            {
                'period': '2010-02',
                'renevues': Decimal(480),
                'expenses': Decimal(-360)
            },
            {
                'period': '2010-03',
                'renevues': Decimal(600),
                'expenses': Decimal(-450)
            }
        ])

    def test_no_data(self):
        date_start=datetime.datetime(2010, 04, 01)
        date_end=datetime.datetime(2010, 05, 03)

        calc = BalanceQuery(date_start, date_end)

        result = calc.calculate()

        self.assertEquals(result, [
            {
                'period': '2010-04',
                'renevues': Decimal(0),
                'expenses': Decimal(0)
            },
            {
                'period': '2010-05',
                'renevues': Decimal(0),
                'expenses': Decimal(0)
            }
        ])

    def test_calculate_three_months_and_day(self):
        date_start=datetime.datetime(2010, 01, 01)
        date_end=datetime.datetime(2010, 03, 03)

        calc = BalanceQuery(date_start, date_end, day=10)

        result = calc.calculate()

        self.assertEquals(result, [
            {
                'period': '2010-01',
                'renevues': Decimal(150),
                'expenses': Decimal(-300)
            },
            {
                'period': '2010-02',
                'renevues': Decimal(160),
                'expenses': Decimal(-360)
            },
            {
                'period': '2010-03',
                'renevues': Decimal(200),
                'expenses': Decimal(-150)
            }
        ])
