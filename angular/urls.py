from django.conf.urls import patterns, include, url
from django.views.generic import TemplateView


urlpatterns = patterns('',
    url(r'^$', TemplateView.as_view(template_name="angular/index.html")),
    url(r'^list.html$', TemplateView.as_view(template_name="angular/list.html")),
)
