from django.conf.urls import patterns, include, url
from django.utils.translation import ugettext_lazy as _
from django.views.generic import TemplateView

from expenses import views

guide_urls = patterns('',
    url(_(r'^$'), TemplateView.as_view(template_name='guide/guide_index.html'), name='guide'),
)

urlpatterns = patterns('',
    url(_(r'^guia/'), include(guide_urls, namespace='guide')),
    url(r'^$', views.LandingPage.as_view(), name='landing'),
)
