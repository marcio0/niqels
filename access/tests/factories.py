import datetime
import factory
from access.models import User


class UserFactory(factory.django.DjangoModelFactory):
    FACTORY_FOR = User

    email = factory.Sequence(lambda x: 'user%d@example.com' % x)
    name = factory.Sequence(lambda x: 'user %d' % x)
    is_active = True
    is_admin = False
    date_joined = datetime.datetime(1970, 1, 1)