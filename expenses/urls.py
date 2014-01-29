from django.conf.urls import patterns, include, url
from django.utils.translation import ugettext_lazy as _
from django.views.generic import TemplateView

from expenses import views

urlpatterns = patterns('',
    url(r'^$', views.LandingPage.as_view(), name='landing'),
)
