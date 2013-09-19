import mock
from decimal import Decimal

from django.test import TestCase

import expenses.models
from expenses.calculator import AverageCalculator, BalanceQuery
from expenses.models import Category, Transaction
from access.models import User


class BalanceQueryTest(TestCase):
    fixtures = ['BalanceQueryTest']

    def test_requires_at_least_one_month(self):
        self.assertRaises(TypeError, BalanceQuery);
        self.assertRaises(TypeError, BalanceQuery, **{'months': 'not_a_list'});

    def test_calculate_simple(self):
        months = ['2010-01']

        calc = BalanceQuery(months)

        result = calc.calculate()

        self.assertEquals(result, {
            '2010-01': {
                'renevues': 450,
                'expenses': -300
            }
        })

    def test_calculate_three_months(self):
        months = ['2010-01', '2010-02', '2010-03']

        calc = BalanceQuery(months)

        result = calc.calculate()

        self.assertEquals(result, {
            '2010-01': {
                'renevues': 450,
                'expenses': -300
            },
            '2010-02': {
                'renevues': 480,
                'expenses': -360
            },
            '2010-03': {
                'renevues': 600,
                'expenses': -450
            }
        })

    def test_no_data(self):
        months = ['2010-01', '2010-04']

        calc = BalanceQuery(months)

        result = calc.calculate()

        self.assertEquals(result, {
            '2010-01': {
                'renevues': 450,
                'expenses': -300
            },
            '2010-04': {
                'renevues': 0,
                'expenses': 0
            }
        })

    def test_calculate_three_months_and_day(self):
        months = ['2010-01', '2010-02', '2010-03']
        day = 10

        calc = BalanceQuery(months=months, day=day)

        result = calc.calculate()

        self.assertEquals(result, {
            '2010-01': {
                'renevues': 150,
                'expenses': -300
            },
            '2010-02': {
                'renevues': 160,
                'expenses': -360
            },
            '2010-03': {
                'renevues': 200,
                'expenses': -150
            }
        })
