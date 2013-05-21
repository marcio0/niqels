from django.conf.urls import patterns, include, url
from django.views.generic import TemplateView


urlpatterns = patterns('',
    url(r'^$', TemplateView.as_view(template_name="angular/index.html")),
    url(r'^category-list.html$', TemplateView.as_view(template_name="angular/category-list.html")),
    url(r'^category-detail.html$', TemplateView.as_view(template_name="angular/category-detail.html")),
)
