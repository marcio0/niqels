from django.conf import settings


# Defines some global values to be available on the templates.
def globals(request):
    return {
        # Name of site, because it wasn't decided yet.
        'SITE_NAME': settings.SITE_NAME,

        # Form fields that wont have it's value repopulated in case of
        # error.
        # Usually password fields.
        'empty_value_fields': ['password', 'password1', 'password2']
    }
