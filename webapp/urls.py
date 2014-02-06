from django.conf.urls import patterns, url
from django.views.generic import TemplateView

from views import WebAppView

urlpatterns = patterns('',
    url(r'^partials/category-list/$', TemplateView.as_view(template_name="webapp/settings/category-list.html")),
    url(r'^partials/reports/top-categories$', TemplateView.as_view(template_name="webapp/reports/top-categories.html")),
    url(r'^partials/reports/category-comparison$', TemplateView.as_view(template_name="webapp/reports/category-comparison.html")),
    url(r'^partials/transactions/transaction-edit', TemplateView.as_view(template_name="webapp/transactions/transaction-edit.html")),

    url(r'^$', WebAppView.as_view(), name="index"),
)
