import json

from django import template
from django.utils.safestring import mark_safe
from django.utils.encoding import force_text


register = template.Library()


@register.filter(is_safe=True)
def as_category(value):
    label_html_tag = '<span class="category-label" style="background-color: %s;">%s</span>'
    # TODO: check for auto escaping:
    # https://docs.djangoproject.com/en/dev/howto/custom-template-tags/#filters-and-auto-escaping
    return mark_safe(label_html_tag % (value.color, value.name.capitalize()))


@register.filter(is_safe=True)
def as_value(value, currency_symbol='$'):
    label_html_tag = '<span class="text-%s">%s%.2f</span>'
    
    if value < 0:
        color = 'error'
    else:
        color = 'success'

    # TODO: check for auto escaping:
    # https://docs.djangoproject.com/en/dev/howto/custom-template-tags/#filters-and-auto-escaping
    return mark_safe(label_html_tag % (color, currency_symbol, value))


@register.filter(is_safe=True)
def as_deviation(deviation):
    label_html_tag = '<span class="text-%(color)s">(%(value).2f%% <i class="%(icon)s"></i>)</span>'


    if deviation < 1:
        color = 'error'
        icon = 'icon-caret-down'
    else:
        color = 'success'
        icon = 'icon-caret-up'

    deviation = deviation * 100

    # TODO: check for auto escaping:
    # https://docs.djangoproject.com/en/dev/howto/custom-template-tags/#filters-and-auto-escaping
    return mark_safe(label_html_tag % {'color': color, 'icon': icon, 'value': deviation})


@register.filter(is_safe=True)
def to_json(value):
    return mark_safe(json.dumps(value, ensure_ascii=False))
