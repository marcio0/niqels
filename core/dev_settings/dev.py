from core.settings import *

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

STATICFILES_DIRS = (
    os.path.join(BASE_DIR, "static", 'src'),
    os.path.join(BASE_DIR, "static", 'test'),
    os.path.join(BASE_DIR, "static", 'bower_components'),
)

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
