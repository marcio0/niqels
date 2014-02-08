import datetime
import factory
from decimal import Decimal
from time import timezone
from access.models import User
from expenses.models import Category
from restrictions.models import BaseCategoryRestriction


class CategoryFactory(factory.DjangoModelFactory):
    FACTORY_FOR = Category

    name = factory.Sequence(lambda n: 'category%d' % n)
    group_id = 1


class UserFactory(factory.django.DjangoModelFactory):
    FACTORY_FOR = User
    FACTORY_DJANGO_GET_OR_CREATE = ('email',)

    email = factory.Sequence(lambda n: 'user%d@example.com' % n)
    password = 'password'


class BaseCategoryRestrictionFactory(factory.DjangoModelFactory):
    FACTORY_FOR = BaseCategoryRestriction

    value = Decimal("10")
    user = factory.SubFactory(UserFactory)

