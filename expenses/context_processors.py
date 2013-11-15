from django.conf import settings
from expenses.models import Category


# Defines some global values to be available on the templates.
def global_context(request):
    locale_currency = settings.LOCALE_CURRENCIES.get(str(request.locale), 'USD')

    context = {
        # Name of site, because it wasn't decided yet.
        'SITE_NAME': settings.SITE_NAME,

        "is_debug": settings.DEBUG and settings.TEMPLATE_DEBUG,

        # used to load the ga script only on the production instance
        "USE_GA": settings.USE_GA
    }

    return context
