from core.settings import *

DEBUG = True
TEMPLATE_DEBUG = True

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'postgres',
        'USER': 'postgres',
        'PASSWORD': '',
        'HOST': 'db',
        'PORT': '5432',
    }
}

INSTALLED_APPS += (
    'django_coverage',
)

STATICFILES_DIRS = (
    os.path.join(BASE_DIR, "static", 'src'),
    os.path.join(BASE_DIR, "static", 'test'),
    os.path.join(BASE_DIR, "static", 'bower_components'),
)

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
