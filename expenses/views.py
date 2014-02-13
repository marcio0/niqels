from django.views.generic.base import TemplateView

from access.forms import UserCreationForm
from webapp.views import WebAppView


class PresentationView(TemplateView):
    template_name = "presentation.html"

    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated():
            return WebAppView.as_view()(request)
        else:
            return super(PresentationView, self).get(request, *args, **kwargs)

    def get_context_data(self):
        context = super(PresentationView, self).get_context_data()
        context['register_form'] = UserCreationForm()
        return context

class LandingPage(TemplateView):
    template_name = "landing.html"

    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated():
            return WebAppView.as_view()(request)
        else:
            return super(LandingPage, self).get(request, *args, **kwargs)

    def get_context_data(self):
        context = super(LandingPage, self).get_context_data()
        context['register_form'] = UserCreationForm()
        return context
