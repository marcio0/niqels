from django.conf.urls import patterns, include, url
from django.views.generic import TemplateView

urlpatterns = patterns('',
    url(r'^email-interface/$', TemplateView.as_view(template_name='admin/email_interface/index.html'), name="email_interface")
)
