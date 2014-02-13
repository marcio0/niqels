import datetime
import factory
from access.models import User


class UserFactory(factory.django.DjangoModelFactory):
    FACTORY_FOR = User

    email = 'a@a.com'
    name = 'test'
    is_active = True
    is_admin = False
    date_joined = datetime.datetime(1970, 1, 1)