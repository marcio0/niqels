from django.views.generic import TemplateView


class WebAppView(TemplateView):
    template_name="webapp/index.html"
