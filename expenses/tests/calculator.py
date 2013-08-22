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
                'income': 450,
                'outcome': -300
            }
        })

    def test_calculate_three_months(self):
        months = ['2010-01', '2010-02', '2010-03']

        calc = BalanceQuery(months)

        result = calc.calculate()

        self.assertEquals(result, {
            '2010-01': {
                'income': 450,
                'outcome': -300
            },
            '2010-02': {
                'income': 480,
                'outcome': -360
            },
            '2010-03': {
                'income': 600,
                'outcome': -450
            }
        })

    def test_calculate_three_months_and_day(self):
        months = ['2010-01', '2010-02', '2010-03']
        day = 10

        calc = BalanceQuery(months=months, day=day)

        result = calc.calculate()

        self.assertEquals(result, {
            '2010-01': {
                'income': 150,
                'outcome': -300
            },
            '2010-02': {
                'income': 160,
                'outcome': -360
            },
            '2010-03': {
                'income': 200,
                'outcome': -150
            }
        })


class AverageTest():
    @mock.patch.object(expenses.models.Transaction, 'objects')
    def test_no_data_at_all(self, mgr):
        '''
            |
           0|_________________
            |Jan   Feb   Mar
            |
            No data.
        '''
        user = mock.Mock()
        date = mock.Mock()

        mar = mock.Mock()
        mar.aggregate.return_value = {'value__sum': None}
        feb = mock.Mock()
        feb.aggregate.return_value = {'value__sum': None}
        jan = mock.Mock()
        jan.aggregate.return_value = {'value__sum': None}

        mgr.up_to_day.return_value = (mar, feb, jan)

        calc = AverageCalculator(user=user, qty_months=3, start_date=date)
        result = calc.calculate()

        mgr.up_to_day.assert_called_with(user=user, qty_months=3, start_date=date)

        self.assertDictEqual(result, {
            'base': Decimal('0'),
            'average': Decimal('0'),
            'deviation': Decimal('0')
        })

    @mock.patch.object(expenses.models.Transaction, 'objects')
    def test_no_data_for_average(self, mgr):
        '''
            |             30 (base)
            |
           0|_________________
            |Jan   Feb   Mar
            |
            No enough data to tell if its profit or loss.
        '''
        user = mock.Mock()
        date = mock.Mock()

        mar = mock.Mock()
        mar.aggregate.return_value = {'value__sum': Decimal(30)}
        feb = mock.Mock()
        feb.aggregate.return_value = {'value__sum': None}
        jan = mock.Mock()
        jan.aggregate.return_value = {'value__sum': None}

        mgr.up_to_day.return_value = (mar, feb, jan)

        calc = AverageCalculator(user=user, qty_months=3, start_date=date)
        result = calc.calculate()

        mgr.up_to_day.assert_called_with(user=user, qty_months=3, start_date=date)

        self.assertDictEqual(result, {
            'base': Decimal('30'),
            'average': Decimal('0'),
            'deviation': Decimal('0')
        })

    @mock.patch.object(expenses.models.Transaction, 'objects')
    def test_no_data_for_base__positive_average(self, mgr):
        '''
            |
            |       20
            |------------ 17.5 (average)
            | 15
           0|_________________
            |Jan   Feb   Mar
            |
            User is on loss.
        '''
        user = mock.Mock()
        date = mock.Mock()

        mar = mock.Mock()
        mar.aggregate.return_value = {'value__sum': None}
        feb = mock.Mock()
        feb.aggregate.return_value = {'value__sum': Decimal(20)}
        jan = mock.Mock()
        jan.aggregate.return_value = {'value__sum': Decimal(15)}

        mgr.up_to_day.return_value = (mar, feb, jan)

        calc = AverageCalculator(user=user, qty_months=3, start_date=date)
        result = calc.calculate()

        mgr.up_to_day.assert_called_with(user=user, qty_months=3, start_date=date)

        self.assertDictEqual(result, {
            'base': Decimal('0'),
            'average': Decimal('17.5'),
            'deviation': Decimal('-1')
        })

        self.assertEquals(abs(result['average']) * result['deviation'] + result['average'], result['base'])

    @mock.patch.object(expenses.models.Transaction, 'objects')
    def test_no_data_for_base__negative_average(self, mgr):
        '''
            |Jan   Feb   Mar 
           0|_________________
            |
            |-15
            |----------- -17.5 
            |      -20
            |
            User is on profit.
        '''
        user = mock.Mock()
        date = mock.Mock()

        mar = mock.Mock()
        mar.aggregate.return_value = {'value__sum': None}
        feb = mock.Mock()
        feb.aggregate.return_value = {'value__sum': Decimal(-20)}
        jan = mock.Mock()
        jan.aggregate.return_value = {'value__sum': Decimal(-15)}

        mgr.up_to_day.return_value = (mar, feb, jan)

        calc = AverageCalculator(user=user, qty_months=3, start_date=date)
        result = calc.calculate()

        mgr.up_to_day.assert_called_with(user=user, qty_months=3, start_date=date)

        self.assertDictEqual(result, {
            'base': Decimal('0'),
            'average': Decimal('-17.5'),
            'deviation': Decimal('1')
        })

        self.assertEquals(abs(result['average']) * result['deviation'] + result['average'], result['base'])

    @mock.patch.object(expenses.models.Transaction, 'objects')
    def test_positive_avg__positive_actual__positive_diff(self, mgr):
        '''
            |             30 (base)
            |
            |       20
            |------------ 17.5 (average)
            | 15
           0|_________________
            |Jan   Feb   Mar
            |
            All values are positive.
            User is on profit.
        '''
        user = mock.Mock()
        date = mock.Mock()

        mar = mock.Mock()
        mar.aggregate.return_value = {'value__sum': Decimal(30)}
        feb = mock.Mock()
        feb.aggregate.return_value = {'value__sum': Decimal(20)}
        jan = mock.Mock()
        jan.aggregate.return_value = {'value__sum': Decimal(15)}

        mgr.up_to_day.return_value = (mar, feb, jan)

        calc = AverageCalculator(user=user, qty_months=3, start_date=date)
        result = calc.calculate()

        mgr.up_to_day.assert_called_with(user=user, qty_months=3, start_date=date)

        self.assertDictEqual(result, {
            'base': Decimal('30'),
            'average': Decimal('17.5'),
            'deviation': Decimal('0.7142857142857142857142857143')
        })

        self.assertEquals(abs(result['average']) * result['deviation'] + result['average'], result['base'])

    @mock.patch.object(expenses.models.Transaction, 'objects')
    def test_positive_avg__positive_actual__negative_diff(self, mgr):
        '''
            |
            |       20
            |------------ 17.5 (average)
            | 15
            |             10
           0|_________________
            |Jan   Feb   Mar
            |
            All values are positive.
            Base month is below average.
            User is on loss.
        '''
        user = mock.Mock()
        date = mock.Mock()

        mar = mock.Mock()
        mar.aggregate.return_value = {'value__sum': Decimal(10)}
        feb = mock.Mock()
        feb.aggregate.return_value = {'value__sum': Decimal(20)}
        jan = mock.Mock()
        jan.aggregate.return_value = {'value__sum': Decimal(15)}

        mgr.up_to_day.return_value = (mar, feb, jan)

        calc = AverageCalculator(user=user, qty_months=3, start_date=date)
        result = calc.calculate()

        mgr.up_to_day.assert_called_with(user=user, qty_months=3, start_date=date)

        self.assertDictEqual(result, {
            'base': Decimal('10'),
            'average': Decimal('17.5'),
            'deviation': Decimal('-0.4285714285714285714285714286')
        })

        self.assertEquals(abs(result['average']) * result['deviation'] + result['average'], result['base'])

    @mock.patch.object(expenses.models.Transaction, 'objects')
    def test_negative_avg__negative_actual__negative_diff(self, mgr):
        '''
            |Jan   Feb   Mar 
           0|_________________
            |
            |-15
            |----------- -17.5 
            |      -20
            |
            |            -30 (base)
            All values are negative.
            User is on loss.
        '''
        user = mock.Mock()
        date = mock.Mock()

        mar = mock.Mock()
        mar.aggregate.return_value = {'value__sum': Decimal(-30)}
        feb = mock.Mock()
        feb.aggregate.return_value = {'value__sum': Decimal(-20)}
        jan = mock.Mock()
        jan.aggregate.return_value = {'value__sum': Decimal(-15)}

        mgr.up_to_day.return_value = (mar, feb, jan)

        calc = AverageCalculator(user=user, qty_months=3, start_date=date)
        result = calc.calculate()

        mgr.up_to_day.assert_called_with(user=user, qty_months=3, start_date=date)

        self.assertDictEqual(result, {
            'base': Decimal('-30'),
            'average': Decimal('-17.5'),
            'deviation': Decimal('-0.7142857142857142857142857143')
        })

        self.assertEquals(abs(result['average']) * result['deviation'] + result['average'], result['base'])

    @mock.patch.object(expenses.models.Transaction, 'objects')
    def test_negative_avg__positive_actual(self, mgr):
        '''
            |
            |       20
            |----------- -17.5 (average)
            | 15
           0|_________________
            |Jan   Feb   Mar
            |
            |
            |
            |
            |             30 (base)
            Average is negative, actual month is positive.
            User is on profit.
        '''
        user = mock.Mock()
        date = mock.Mock()

        mar = mock.Mock()
        mar.aggregate.return_value = {'value__sum': Decimal(30)}
        feb = mock.Mock()
        feb.aggregate.return_value = {'value__sum': Decimal(-20)}
        jan = mock.Mock()
        jan.aggregate.return_value = {'value__sum': Decimal(-15)}

        mgr.up_to_day.return_value = (mar, feb, jan)

        calc = AverageCalculator(user=user, qty_months=3, start_date=date)
        result = calc.calculate()

        mgr.up_to_day.assert_called_with(user=user, qty_months=3, start_date=date)

        self.assertDictEqual(result, {
            'base': Decimal('30'),
            'average': Decimal('-17.5'),
            'deviation': Decimal('2.714285714285714285714285714')
        })

        self.assertEquals(abs(result['average']) * result['deviation'] + result['average'], result['base'])

    @mock.patch.object(expenses.models.Transaction, 'objects')
    def test_positive_avg__negative_actual(self, mgr):
        '''
            |
            |             30 (base)
            |
            |
            |
            |Jan   Feb   Mar 
           0|_________________
            |
            |-15
            |----------- -17.5 
            |      -20
            |
            Average is positive, actual month is negative.
            User is on loss.
        '''
        user = mock.Mock()
        date = mock.Mock()

        mar = mock.Mock()
        mar.aggregate.return_value = {'value__sum': Decimal(-30)}
        feb = mock.Mock()
        feb.aggregate.return_value = {'value__sum': Decimal(20)}
        jan = mock.Mock()
        jan.aggregate.return_value = {'value__sum': Decimal(15)}

        mgr.up_to_day.return_value = (mar, feb, jan)

        calc = AverageCalculator(user=user, qty_months=3, start_date=date)
        result = calc.calculate()

        mgr.up_to_day.assert_called_with(user=user, qty_months=3, start_date=date)

        self.assertDictEqual(result, {
            'base': Decimal('-30'),
            'average': Decimal('17.5'),
            'deviation': Decimal('-2.714285714285714285714285714')
        })

        self.assertEquals(abs(result['average']) * result['deviation'] + result['average'], result['base'])

    @mock.patch.object(expenses.models.Transaction, 'objects')
    def test_negative_avg__negative_actual__pos_diff(self, mgr):
        '''
            |Jan   Feb   Mar 
           0|_________________
            |            -10 (base) 
            |-15         
            |----------- -17.5 (average)
            |      -20
            |
            Average is negative, actual month is negative.
            Actual month is above average.
            User is on profit.
        '''
        user = mock.Mock()
        date = mock.Mock()

        mar = mock.Mock()
        mar.aggregate.return_value = {'value__sum': Decimal(-10)}
        feb = mock.Mock()
        feb.aggregate.return_value = {'value__sum': Decimal(-20)}
        jan = mock.Mock()
        jan.aggregate.return_value = {'value__sum': Decimal(-15)}

        mgr.up_to_day.return_value = (mar, feb, jan)

        calc = AverageCalculator(user=user, qty_months=3, start_date=date)
        result = calc.calculate()

        mgr.up_to_day.assert_called_with(user=user, qty_months=3, start_date=date)

        self.assertDictEqual(result, {
            'base': Decimal('-10'),
            'average': Decimal('-17.5'),
            'deviation': Decimal('0.4285714285714285714285714286')
        })

        self.assertEquals(abs(result['average']) * result['deviation'] + result['average'], result['base'])

    @mock.patch.object(expenses.models.Transaction, 'objects')
    def test_too_few_data_for_average(self, mgr):
        '''
            |Jan   Feb   Mar 
           0|_________________
            |            -10 (base) 
            |         
            |
            |----- -20-- -20 (average)
            |
            There is data for only one month.
        '''
        user = mock.Mock()
        date = mock.Mock()

        mar = mock.Mock()
        mar.aggregate.return_value = {'value__sum': Decimal(-10)}
        feb = mock.Mock()
        feb.aggregate.return_value = {'value__sum': Decimal(-20)}
        jan = mock.Mock()
        jan.aggregate.return_value = {'value__sum': None}

        mgr.up_to_day.return_value = (mar, feb, jan)

        calc = AverageCalculator(user=user, qty_months=3, start_date=date)
        result = calc.calculate()

        mgr.up_to_day.assert_called_with(user=user, qty_months=3, start_date=date)

        self.assertDictEqual(result, {
            'base': Decimal('-10'),
            'average': Decimal('-20'),
            'deviation': Decimal('0.5')
        })

        self.assertEquals(abs(result['average']) * result['deviation'] + result['average'], result['base'])

    @mock.patch.object(expenses.models.Transaction, 'objects')
    def test_empty_month_on_the_middle(self, mgr):
        '''
            |Jan   Feb   Mar 
           0|_________________
            |            -10 (base) 
            |         
            |----------- -15 (average)
            |
            |-30
            |
            No data for February.
            Since there ara data before Feb, it should count as zero.
        '''
        user = mock.Mock()
        date = mock.Mock()

        mar = mock.Mock()
        mar.aggregate.return_value = {'value__sum': Decimal(-10)}
        feb = mock.Mock()
        feb.aggregate.return_value = {'value__sum': None}
        jan = mock.Mock()
        jan.aggregate.return_value = {'value__sum': Decimal(-30)}

        mgr.up_to_day.return_value = (mar, feb, jan)

        calc = AverageCalculator(user=user, qty_months=3, start_date=date)
        result = calc.calculate()

        mgr.up_to_day.assert_called_with(user=user, qty_months=3, start_date=date)

        self.assertDictEqual(result, {
            'base': Decimal('-10'),
            'average': Decimal('-15'),
            'deviation': Decimal('0.3333333333333333333333333333')
        })

        self.assertEquals(abs(result['average']) * result['deviation'] + result['average'], result['base'])

