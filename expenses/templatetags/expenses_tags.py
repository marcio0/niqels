from django import template
from django.utils.safestring import mark_safe


register = template.Library()


@register.filter(is_safe=True)
def as_category(value):
    # TODO: check for auto escaping:
    # https://docs.djangoproject.com/en/dev/howto/custom-template-tags/#filters-and-auto-escaping
    return mark_safe('<span class="label">%s</span>' % value)
