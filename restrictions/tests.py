from django.test import TestCase
import django.db
import factory.django
import access.models
from restrictions.models import BaseRestriction, MonthRestriction
import expenses.models
import datetime


class UserFactory(factory.django.DjangoModelFactory):
    FACTORY_FOR = access.models.User

    email = 'a@a.com'
    name = 'test'
    is_active = True
    is_admin = False
    date_joined = datetime.datetime(1970, 1, 1)


class CategoryGroupFactory(factory.django.DjangoModelFactory):
    FACTORY_FOR = expenses.models.CategoryGroup

    name = 'test categ group'


class CategoryFactory(factory.django.DjangoModelFactory):
    FACTORY_FOR = expenses.models.Category

    name = 'test category'
    is_active = True
    is_negative = True
    group = factory.SubFactory(CategoryGroupFactory)


class BaseRestrictionFactory(factory.django.DjangoModelFactory):
    FACTORY_FOR = BaseRestriction

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

        restr = BaseRestriction()
        restr.user = user
        restr.category = category
        restr.value = 123.45
        restr.save()

        restr2 = BaseRestriction()
        restr2.user = user
        restr2.category = category
        restr.value = 2231.11

        self.assertRaises(django.db.IntegrityError, restr2.save)

    def test_unique_month_restriction(self):
        base = BaseRestrictionFactory.create()
        m1 = MonthRestriction()
        m1.baserestriction = base
        m1.month = datetime.date(2014, 1, 1)
        m1.value = 500
        m1.save()

        m2 = MonthRestriction()
        m2.baserestriction = base
        m2.month = datetime.date(2014, 1, 1)
        m2.value = 330

        self.assertRaises(django.db.IntegrityError, m2.save)


class MonthRestrictionCreationTest(TestCase):

    def test_signal_method_create_restriction(self):
        base = BaseRestrictionFactory.create()
        user = base.user
        categ = base.category

        self.assertEquals(MonthRestriction.objects.count(), 0)

        t = expenses.models.Transaction()
        t.value = 10
        t.user = user
        t.category = categ
        t.date = datetime.date(2013, 12, 23)
        t.save()

        mr = MonthRestriction.objects.get()
        self.assertEquals(mr.month, datetime.date(2013, 12, 1))
        self.assertEquals(mr.value, base.value)
        self.assertEquals(mr.baserestriction, base)

    def test_signal_creates_only_one_month_restriction(self):
        base = BaseRestrictionFactory.create()
        user = base.user
        categ = base.category

        self.assertEquals(MonthRestriction.objects.count(), 0)

        t = expenses.models.Transaction(value=10, user=user, category=categ,
                                        date=datetime.date(2013, 12, 23))
        t.save()

        t = expenses.models.Transaction(value=23, user=user, category=categ,
                                        date=datetime.date(2013, 12, 11))
        t.save()

        self.assertEquals(MonthRestriction.objects.count(), 1)
        mr = MonthRestriction.objects.get()
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

        self.assertEquals(MonthRestriction.objects.count(), 0)

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

        self.assertEquals(MonthRestriction.objects.count(), 1)
        mr = MonthRestriction.objects.get()
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

        mr = MonthRestriction.objects.get()
        self.assertEquals(mr.spent, 44)
