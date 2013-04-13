from django import template
from django.utils.safestring import mark_safe


register = template.Library()


@register.filter(is_safe=True)
def as_category(value):
    label_html_tag = '<span class="label" style="background-color: %s;">%s</span>'
    # TODO: check for auto escaping:
    # https://docs.djangoproject.com/en/dev/howto/custom-template-tags/#filters-and-auto-escaping
    return mark_safe(label_html_tag % (value.color, value.name.capitalize()))


@register.filter(is_safe=True)
def as_value(value):
    # TODO: usar a moeda do locale
    label_html_tag = '<span class="text-%s">$ %d</span>'
    
    if value < 0:
        color = 'error'
    else:
        color = 'success'

    # TODO: check for auto escaping:
    # https://docs.djangoproject.com/en/dev/howto/custom-template-tags/#filters-and-auto-escaping
    return mark_safe(label_html_tag % (color, value))
