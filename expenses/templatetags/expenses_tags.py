import json

from django import template
from django.conf import settings
from django.utils.safestring import mark_safe
from django.utils.encoding import force_text
from django.utils import translation
from babeldjango.templatetags.babel import percentfmt, currencyfmt


register = template.Library()


@register.filter(is_safe=True)
def to_json(value):
    return mark_safe(json.dumps(value, ensure_ascii=False))
