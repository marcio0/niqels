import factory
from decimal import Decimal
from access.tests.factories import UserFactory
from restrictions.models import BaseCategoryRestriction, MonthlyCategoryRestriction


class BaseCategoryRestrictionFactory(factory.DjangoModelFactory):
    FACTORY_FOR = BaseCategoryRestriction

    value = Decimal("10")
    user = factory.SubFactory(UserFactory)


#class MonthlyCategoryRestrictionFactory(factory.DjangoModelFactory):
#    FACTORY_FOR = MonthlyCategoryRestriction

#    value = factory.LazyAttribute(lambda self: self.baserestriction.value)
#    baserestriction = factory.SubFactory(BaseCategoryRestrictionFactory)

