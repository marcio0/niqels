from django.conf.urls import patterns, url
from django.views.generic import TemplateView

urlpatterns = patterns('',
    url(r'^$', TemplateView.as_view(template_name="webapp/index.html"), name="index"),
    url(r'^partials/transaction-list/$', TemplateView.as_view(template_name="webapp/transaction-list.html")),
)
