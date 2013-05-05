import json

from django import template
from django.conf import settings
from django.utils.safestring import mark_safe
from django.utils.encoding import force_text
from django.utils import translation
from babeldjango.templatetags.babel import percentfmt, currencyfmt


register = template.Library()


@register.filter(is_safe=True)
def as_category(value):
    label_html_tag = '<span class="category-label" style="background-color: %s;">%s</span>'
    # TODO: check for auto escaping:
    # https://docs.djangoproject.com/en/dev/howto/custom-template-tags/#filters-and-auto-escaping
    return mark_safe(label_html_tag % (value.color, value.name.capitalize()))


@register.filter(is_safe=True)
def as_value(value, currency_symbol='$'):
    label_html_tag = '<span class="text-%s">%s</span>'
    fmt_value = currencyfmt(value, settings.LOCALE_CURRENCIES[translation.get_language()])
    fmt_value = fmt_value.replace(')', '') \
                .replace('(', '- ')
    
    if value < 0:
        color = 'error'
    else:
        color = 'success'

    # TODO: check for auto escaping:
    # https://docs.djangoproject.com/en/dev/howto/custom-template-tags/#filters-and-auto-escaping
    return mark_safe(label_html_tag % (color, fmt_value))


@register.filter(is_safe=True)
def as_deviation(deviation):
    label_html_tag = '<span class="text-%(color)s">(%(plus)s%(value)s<i class="%(icon)s icon-large"></i>)</span>'
    fmt_value = percentfmt(deviation, format='#,##0.00%')

    if deviation == 0:
        color = ''
        icon = ''
        plus = ''
    elif deviation < 0:
        plus = ''
        color = 'error'
        icon = 'icon-caret-down'
    else:
        plus = '+'
        color = 'success'
        icon = 'icon-caret-up'

    # TODO: check for auto escaping:
    # https://docs.djangoproject.com/en/dev/howto/custom-template-tags/#filters-and-auto-escaping
    return mark_safe(label_html_tag % {'color': color, 'icon': icon, 'value': fmt_value, 'plus': plus})


@register.filter(is_safe=True)
def to_json(value):
    return mark_safe(json.dumps(value, ensure_ascii=False))
