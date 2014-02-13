import factory
from decimal import Decimal
from access.tests.factories import UserFactory
from restrictions.models import BaseCategoryRestriction


class BaseCategoryRestrictionFactory(factory.DjangoModelFactory):
    FACTORY_FOR = BaseCategoryRestriction

    value = Decimal("10")
    user = factory.SubFactory(UserFactory)