from django.test import TestCase
import django.db
import factory.django
from decimal import Decimal
from api.tests import UserFactory
from expenses.tests.factories import CategoryFactory, CategoryGroupFactory
from restrictions.models import BaseCategoryRestriction, MonthlyCategoryRestriction
import expenses.models
import datetime
from restrictions.tests.factories import MonthlyCategoryRestrictionFactory


class BaseRestrictionFactory(factory.django.DjangoModelFactory):
    FACTORY_FOR = BaseCategoryRestriction

    user = factory.SubFactory(UserFactory)
    category = factory.SubFactory(CategoryFactory)
    value = 500


class IntegrityTest(TestCase):
    """
    Checks integrity and consistency between relations
    """
    def test_unique_base_restriction(self):
        user = UserFactory.create()
        category = CategoryFactory.create()

        restr = BaseCategoryRestriction()
        restr.user = user
        restr.category = category
        restr.value = 123.45
        restr.save()

        restr2 = BaseCategoryRestriction()
        restr2.user = user
        restr2.category = category
        restr.value = 2231.11

        self.assertRaises(django.db.IntegrityError, restr2.save)

    def test_unique_month_restriction(self):
        base = BaseRestrictionFactory.create()
        m1 = MonthlyCategoryRestriction()
        m1.baserestriction = base
        m1.month = datetime.date(2014, 1, 1)
        m1.value = 500
        m1.save()

        m2 = MonthlyCategoryRestriction()
        m2.baserestriction = base
        m2.month = datetime.date(2014, 1, 1)
        m2.value = 330

        self.assertRaises(django.db.IntegrityError, m2.save)


class MonthRestrictionCreationTest(TestCase):

    def test_signal_method_create_restriction(self):
        base = BaseRestrictionFactory.create()
        user = base.user
        categ = base.category

        self.assertEquals(MonthlyCategoryRestriction.objects.count(), 0)

        t = expenses.models.Transaction()
        t.value = 10
        t.user = user
        t.category = categ
        t.date = datetime.date(2013, 12, 23)
        t.save()

        mr = MonthlyCategoryRestriction.objects.get()
        self.assertEquals(mr.month, datetime.date(2013, 12, 1))
        self.assertEquals(mr.value, base.value)
        self.assertEquals(mr.baserestriction, base)

    def test_signal_creates_only_one_month_restriction(self):
        base = BaseRestrictionFactory.create()
        user = base.user
        categ = base.category

        self.assertEquals(MonthlyCategoryRestriction.objects.count(), 0)

        t = expenses.models.Transaction(value=10, user=user, category=categ,
                                        date=datetime.date(2013, 12, 23))
        t.save()

        t = expenses.models.Transaction(value=23, user=user, category=categ,
                                        date=datetime.date(2013, 12, 11))
        t.save()

        self.assertEquals(MonthlyCategoryRestriction.objects.count(), 1)
        mr = MonthlyCategoryRestriction.objects.get()
        self.assertEquals(mr.month, datetime.date(2013, 12, 1))
        self.assertEquals(mr.value, base.value)
        self.assertEquals(mr.baserestriction, base)

    def test_signal_skip_empty_base(self):
        user = UserFactory.create(email='foo@bla.com')
        cg = CategoryGroupFactory.create(name='noog')
        categ = CategoryFactory.create(name='nooo', group=cg)

        t = expenses.models.Transaction(value=10, user=user, category=categ,
                                        date=datetime.date(2013, 12, 23))
        t.save()

        t = expenses.models.Transaction(value=23, user=user, category=categ,
                                        date=datetime.date(2013, 12, 11))
        t.save()

        self.assertEquals(MonthlyCategoryRestriction.objects.count(), 0)

    def test_signal_multi_users_and_categs(self):
        base1 = BaseRestrictionFactory.create()
        user1 = base1.user
        categ1 = base1.category

        user = UserFactory.create(email='foo@bla.com')
        cg = CategoryGroupFactory.create(name='noog')
        categ = CategoryFactory.create(name='nooo', group=cg)
        base = BaseRestrictionFactory.create(user=user,
                                             category=categ,
                                             value=50)
        t = expenses.models.Transaction(value=10, user=user, category=categ,
                                        date=datetime.date(2013, 12, 23))
        t.save()

        t = expenses.models.Transaction(value=23, user=user, category=categ,
                                        date=datetime.date(2013, 12, 11))
        t.save()

        self.assertNotEquals(base1, base)
        self.assertNotEquals(categ1, categ)
        self.assertNotEquals(user1, user)

        self.assertEquals(MonthlyCategoryRestriction.objects.count(), 1)
        mr = MonthlyCategoryRestriction.objects.get()
        self.assertEquals(mr.month, datetime.date(2013, 12, 1))
        self.assertEquals(mr.value, base.value)
        self.assertEquals(mr.baserestriction, base)


class RestrictionSpentCalculationTest(TestCase):

    def test_simple_sum(self):
        base = BaseRestrictionFactory.create()
        user = base.user
        categ = base.category

        t = expenses.models.Transaction(value=10, user=user, category=categ,
                                        date=datetime.date(2013, 12, 1))
        t.save()

        t = expenses.models.Transaction(value=11, user=user, category=categ,
                                        date=datetime.date(2013, 12, 15))
        t.save()

        t = expenses.models.Transaction(value=23, user=user, category=categ,
                                        date=datetime.date(2013, 12, 31))
        t.save()

        mr = MonthlyCategoryRestriction.objects.get()
        self.assertEquals(mr.spent, 44)

    def test_nothing_spent(self):
        base = BaseRestrictionFactory.create()
        user = base.user
        categ = base.category

        restriction = MonthlyCategoryRestrictionFactory.create(baserestriction=base, month=datetime.date.today())

        mr = MonthlyCategoryRestriction.objects.get()
        self.assertEquals(mr.spent, Decimal(0))
