from django.conf.urls import patterns, url
from django.views.generic import TemplateView

from views import WebAppView

urlpatterns = patterns('',
    url(r'^$', WebAppView.as_view(), name="index"),
    url(r'^partials/transaction-list/$', TemplateView.as_view(template_name="webapp/transaction-list.html")),
    url(r'^partials/settings/$', TemplateView.as_view(template_name="webapp/settings.html")),
    url(r'^partials/category-list/$', TemplateView.as_view(template_name="webapp/settings/category-list.html")),
)
