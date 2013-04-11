from django import template

register = template.Library()

def as_category(value):
    return '<span class="label">%s</span>' % value
