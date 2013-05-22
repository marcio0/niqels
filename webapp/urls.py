from django.conf.urls import patterns
from django.views.generic import TemplateView

urlpatterns = patterns('',
    (r'^$', TemplateView.as_view(template_name="webapp/index.html")),
    (r'^transaction-list/$', TemplateView.as_view(template_name="webapp/transaction-list.html")),
)
