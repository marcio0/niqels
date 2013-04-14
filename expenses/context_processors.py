from django.conf import settings
from expenses.models import Category

# Defines some global values to be available on the templates.
def globals(request):
    context = {
        # Name of site, because it wasn't decided yet.
        'SITE_NAME': settings.SITE_NAME,

        # Form fields that wont have it's value repopulated in case of
        # error.
        # Usually password fields.
        'empty_value_fields': ['password', 'password1', 'password2']
    }

    if request.user.is_authenticated:
        context['user_categories'] = [c.name.capitalize() for c in Category.objects.filter(user_id=request.user.pk)]

    return context

