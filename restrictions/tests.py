from django.test import TestCase
import django.db
import factory.django
import access.models
import restrictions.models
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
    FACTORY_FOR = restrictions.models.BaseRestriction

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

        restr = restrictions.models.BaseRestriction()
        restr.user = user
        restr.category = category
        restr.value = 123.45
        restr.save()

        restr2 = restrictions.models.BaseRestriction()
        restr2.user = user
        restr2.category = category
        restr.value = 2231.11

        self.assertRaises(django.db.IntegrityError, restr2.save)

    def test_unique_month_restriction(self):
        base = BaseRestrictionFactory.create()
        m1 = restrictions.models.MonthRestriction()
        m1.baserestriction = base
        m1.month = datetime.date(2014, 1, 1)
        m1.value = 500
        m1.save()

        m2 = restrictions.models.MonthRestriction()
        m2.baserestriction = base
        m2.month = datetime.date(2014, 1, 1)
        m2.value = 330

        self.assertRaises(django.db.IntegrityError, m2.save)


class MonthRestrictionCreationTest(TestCase):
    def test_signal_method(self):
        pass
