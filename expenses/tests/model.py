from decimal import Decimal
import mock
import datetime

import django.forms
from django.test import TestCase

import expenses.models
from expenses.models import Category, Entry
from expenses import forms
from access.models import User

from expenses.calculator import AverageCalculator


class AverageTest(TestCase):
    @mock.patch.object(expenses.models.Entry, 'objects')
    def test_positive_avg__positive_actual__positive_diff(self, mgr):
        '''
            |             30 (base)
            |
           0|       20
            |------------ 17.5 (average)
            | 15
            |_________________
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
           0|       20
            |------------ 17.5 (average)
            | 15
            |             10
            |_________________
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


class EntryUpToDayTest(TestCase):
    fixtures = ['EntryUpToDayTest.yaml']

    def test_one_month(self):
        start = datetime.date(2010, 03, 10)

        result = Entry.objects.up_to_day(start_date=start)

        self.assertEquals(len(result), 1)
        self.assertEquals(result[0].count(), 2)


    def test_three_months(self):
        start = datetime.date(2010, 03, 10)

        result = Entry.objects.up_to_day(start_date=start, qty_months=3)

        self.assertEquals(len(result), 3)

        self.assertEquals(result[0].count(), 2)
        self.assertEquals(result[1].count(), 3)
        self.assertEquals(result[2].count(), 4)

    def test_default_date(self):
        dt_m = mock.Mock()
        dt_m.date.today.return_value = datetime.date(2010, 01, 03)

        expenses.models.datetime = dt_m

        result = Entry.objects.up_to_day()

        self.assertEquals(len(result), 1)
        self.assertEquals(result[0].count(), 3)


class NegativeDecimalFieldTest(TestCase):
    def test_with_neg_symbol(self):
        field = forms.NegativeDecimalField()
        self.assertEquals(field.to_python('-10'), Decimal('-10'))

    def test_with_pos_symbol(self):
        field = forms.NegativeDecimalField()
        self.assertEquals(field.to_python('+10'), Decimal('+10'))

    def test_without_symbol(self):
        field = forms.NegativeDecimalField()
        self.assertEquals(field.to_python('10'), Decimal('-10'))


class CategoryModelTest(TestCase):
    def test_unicode(self):
        cat = Category(name='test')
        self.assertEquals(str(cat), 'test')


class EntryFormTest(TestCase):
    def test_category_lower(self):
        user = User.objects.create_user('user@expenses.com', 'pass')

        data = {
            'date': '03/03/2010',
            'value': '40',
            'category': 'STUFF'
        }
        form = forms.EntryForm(data)
        form.cleaned_data = data
        form.user = user

        self.assertEquals(form.clean_category().name, 'stuff')


    def test_category_handling_missing(self):
        data = {
            'date': '03/03/2010',
            'value': '40',
            'description': 'desc'
        }
        form = forms.EntryForm(data)

        # is_valid also sets cleaned_data
        self.assertFalse(form.is_valid())

        self.assertRaises(django.forms.ValidationError, form.clean_category)

    def test_category_handling_missing_user(self):
        data = {
            'date': '03/03/2010',
            'value': '40',
            'description': 'desc',
            'category': 'test'
        }
        form = forms.EntryForm(data)

        # is_valid also sets cleaned_data
        self.assertRaises(AttributeError, form.is_valid)

    @mock.patch('expenses.forms.random_color')
    def test_category_handling_with_new_category(self, random_color):
        user = User.objects.create_user('user@expenses.com', 'pass')
        data = {
            'date': '03/03/2010',
            'value': '40',
            'description': 'desc',
            'category': 'test'
        }
        form = forms.EntryForm(data)
        form.user = user

        # is_valid also sets cleaned_data
        self.assertTrue(form.is_valid())

        self.assertTrue(random_color.called)

    @mock.patch('expenses.forms.random_color')
    def test_category_handling_with_existing_category(self, random_color):
        user = User.objects.create_user('user@expenses.com', 'pass')
        Category(
            name='cat',
            user=user,
            color="#111"
        ).save()

        data = {
            'date': '03/03/2010',
            'value': '40',
            'description': 'desc',
            'category': 'cat'
        }
        form = forms.EntryForm(data)
        form.user = user

        # is_valid also sets cleaned_data
        self.assertTrue(form.is_valid())

        self.assertFalse(random_color.called)
