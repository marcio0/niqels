import datetime
from django.utils import timezone
import factory
from decimal import Decimal
from access.tests.factories import UserFactory
from expenses.models import CategoryGroup, Category, Transaction


class CategoryGroupFactory(factory.django.DjangoModelFactory):
    FACTORY_FOR = CategoryGroup

    name = factory.Sequence(lambda x: 'category group %d' % x)


class CategoryFactory(factory.django.DjangoModelFactory):
    FACTORY_FOR = Category

    name = factory.Sequence(lambda x: 'category %d' % x)
    is_active = True
    is_negative = True
    group = factory.SubFactory(CategoryGroupFactory)


class TransactionFactory(factory.DjangoModelFactory):
    FACTORY_FOR = Transaction

    value = Decimal("10")
    user = factory.SubFactory(UserFactory)
    date = datetime.date(2010, 10, 10)
    created = timezone.make_aware(datetime.datetime(2010, 01, 01), timezone.utc)