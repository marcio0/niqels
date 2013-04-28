import mock
from decimal import Decimal

from django.test import TestCase

import expenses.models
from expenses.calculator import AverageCalculator
from expenses.models import Category, Entry
from access.models import User


class AverageTest(TestCase):
    @mock.patch.object(expenses.models.Entry, 'objects')
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

    @mock.patch.object(expenses.models.Entry, 'objects')
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

    @mock.patch.object(expenses.models.Entry, 'objects')
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

    @mock.patch.object(expenses.models.Entry, 'objects')
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

    @mock.patch.object(expenses.models.Entry, 'objects')
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

    @mock.patch.object(expenses.models.Entry, 'objects')
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

    @mock.patch.object(expenses.models.Entry, 'objects')
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

    @mock.patch.object(expenses.models.Entry, 'objects')
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

    @mock.patch.object(expenses.models.Entry, 'objects')
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

    @mock.patch.object(expenses.models.Entry, 'objects')
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

