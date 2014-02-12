from django.conf.urls import patterns, include, url
from django.views.generic.base import TemplateView, View

urlpatterns = patterns('',
    url(r'^$', TemplateView.as_view(template_name='plans/plans-index.html'), name='index')
)
