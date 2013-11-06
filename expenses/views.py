import datetime

from django.utils.translation import ugettext, ugettext_lazy as _
from django.shortcuts import redirect, get_object_or_404
from django.core.urlresolvers import reverse
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.views.generic.base import TemplateView, View
from django.views.generic.edit import FormView, DeletionMixin
from django.http import HttpResponseRedirect
from django.contrib import messages

from access.views import AutenticationRequiredMixin
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
    template_name = "index.html"

    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated():
            return WebAppView.as_view()(request)
        else:
            return super(LandingPage, self).get(request, *args, **kwargs)

    def get_context_data(self):
        context = super(LandingPage, self).get_context_data()
        context['register_form'] = UserCreationForm()
        return context
