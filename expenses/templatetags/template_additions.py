from django.conf import settings
from django import template
from django.utils.html import strip_spaces_between_tags

register = template.Library()

class SmartSpacelessNode(template.Node):
    def __init__(self, nodelist):
        self.nodelist = nodelist

    def render(self, context):
        content = self.nodelist.render(context)
        return content if settings.TEMPLATE_DEBUG else strip_spaces_between_tags(content.strip())

@register.tag
def smart_spaceless(parser, token):
    """
    Removes whitespace between HTML tags, including tab and newline characters,
    but only if settings.TEMPLATE_DEBUG = False

    Example usage:
        {% load template_additions %}
        {% smart_spaceless %}
            <p>
                <a href="foo/">Foo</a>
            </p>
        {% end_smart_spaceless %}

    This example would return this HTML:

        <p><a href="foo/">Foo</a></p>

    Only space between *tags* is normalized -- not space between tags and text.
    In this example, the space around ``Hello`` won't be stripped:

        {% smart_spaceless %}
            <strong>
                Hello
            </strong>
        {% end_smart_spaceless %}
    """
    nodelist = parser.parse(('end_smart_spaceless',))
    parser.delete_first_token()
    return SmartSpacelessNode(nodelist)
