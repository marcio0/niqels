import os

BASE_DIR = os.path.join(os.path.dirname(os.path.realpath(__file__)), '..')

DEBUG = False
TEMPLATE_DEBUG = DEBUG

ADMINS = (
    ('Marcio', 'marc.cr@gmail.com'),
)

MANAGERS = ADMINS

AUTH_USER_MODEL = 'access.User'

LOGIN_URL = 'login'
LOGIN_REDIRECT_URL = '/'

# Hosts/domain names that are valid for this site; required if DEBUG is False
# See https://docs.djangoproject.com/en/1.5/ref/settings/#allowed-hosts
ALLOWED_HOSTS = [
    'localhost',
    '.herokuapp.com',
]

SITE_ID = 1

SITE_NAME = 'Niqels'

TIME_ZONE = 'America/Sao_Paulo'
LANGUAGE_CODE = 'pt-br'
USE_THOUSAND_SEPARATOR = True

ugettext = lambda s: s

LANGUAGES = (
    ('en', ugettext('English')),
    ('pt-br', ugettext('Portuguese')),
)

USE_I18N = True
USE_L10N = True
USE_TZ = True

LOCALE_PATHS = (
    os.path.join(BASE_DIR, 'locale'),
)

LOCALE_CURRENCIES = {
    'pt_BR': 'BRL',
    'pt-br': 'BRL',
    'en_US': 'USD',
    'en-us': 'USD',
}

# Absolute filesystem path to the directory that will hold user-uploaded files.
# Example: "/var/www/example.com/media/"
MEDIA_ROOT = ''

# URL that handles the media served from MEDIA_ROOT. Make sure to use a
# trailing slash.
# Examples: "http://example.com/media/", "http://media.example.com/"
MEDIA_URL = ''

# Absolute path to the directory static files should be collected to.
# Don't put anything in this directory yourself; store your static files
# in apps' "static/" subdirectories and in STATICFILES_DIRS.
# Example: "/var/www/example.com/static/"
STATIC_ROOT = 'staticfiles'

# URL prefix for static files.
# Example: "http://example.com/static/", "http://static.example.com/"
STATIC_URL = '/static/'

STATICFILES_DIRS = (
    os.path.join(BASE_DIR, "static"),
)

# List of finder classes that know how to find static files in
# various locations.
STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
#    'django.contrib.staticfiles.finders.DefaultStorageFinder',
)

# Make this unique, and don't share it with anybody.
SECRET_KEY = 'wwh!9=90v7qls%rgd)372zx#98x&_-xdb=^1#9&v*2)t2k$4e('

# List of callables that know how to import templates from various sources.
TEMPLATE_LOADERS = (
    'django.template.loaders.filesystem.Loader',
    'django.template.loaders.app_directories.Loader',
#     'django.template.loaders.eggs.Loader',
)

MIDDLEWARE_CLASSES = (
    'django.middleware.common.CommonMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'babeldjango.middleware.LocaleMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    # Uncomment the next line for simple clickjacking protection:
    # 'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

TEMPLATE_CONTEXT_PROCESSORS = (
    "django.contrib.auth.context_processors.auth",
    "django.core.context_processors.debug",
    "django.core.context_processors.i18n",
    "django.core.context_processors.media",
    "django.core.context_processors.static",
    "django.core.context_processors.tz",
    "django.contrib.messages.context_processors.messages",
    'expenses.context_processors.global_context',
)

ROOT_URLCONF = 'core.urls'

# Python dotted path to the WSGI application used by Django's runserver.
WSGI_APPLICATION = 'core.wsgi.application'

TEMPLATE_DIRS = (
    os.path.join(BASE_DIR, "templates"),
)

INSTALLED_APPS = (
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.humanize',
    'django.contrib.admin',
    'django.contrib.messages',
    'expenses',
    'access',
    'reminder',
    'api',
    'password_reset',
    'babeldjango',
    'south',
    'tastypie',

    'django.contrib.webdesign',
)

# A sample logging configuration. The only tangible logging
# performed by this configuration is to send an email to
# the site admins on every HTTP 500 error when DEBUG=False.
# See http://docs.djangoproject.com/en/dev/topics/logging for
# more details on how to customize your logging configuration.
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'filters': {
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse'
        }
    },
    'handlers': {
        'mail_admins': {
            'level': 'ERROR',
            'filters': ['require_debug_false'],
            'class': 'django.utils.log.AdminEmailHandler'
        }
    },
    'loggers': {
        'django.request': {
            'handlers': ['mail_admins'],
            'level': 'ERROR',
            'propagate': True,
        },
    }
}

SKIP_SOUTH_TESTS = True

# Parse database configuration from $DATABASE_URL
import dj_database_url

DATABASES = {
    'default': dj_database_url.config()
}

# Honor the 'X-Forwarded-Proto' header for request.is_secure()
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')


TASTYPIE_DEFAULT_FORMATS = ['json']

TASTYPIE_ALLOW_MISSING_SLASH = True

try:
    from core.local_settings import *
except ImportError:
    pass
