import os
import sys

from core.settings import *

BASE_DIR = os.path.join(os.path.dirname(os.path.realpath(__file__)), '..')

DEBUG = True
TEMPLATE_DEBUG = True

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': '/home/vagrant/expenses.db',
        # The following settings are not used with sqlite3:
        'USER': '',
        'PASSWORD': '',
        'HOST': '',                      # Empty for localhost through domain sockets or '127.0.0.1' for localhost through TCP.
        'PORT': '',                      # Set to empty string for default.
    }
}

INSTALLED_APPS += (
    'django_coverage',
)

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

TEST_SUITE_NAME = 'testvision'

TEST_SUITE_DIR = os.path.join(BASE_DIR, '..', '..', TEST_SUITE_NAME)

STATICFILES_DIRS += (TEST_SUITE_DIR, )
