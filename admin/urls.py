from django.conf.urls import patterns, include, url
from admin import views

urlpatterns = patterns('',
    url(r'^email-interface/$', views.EmailInterface.as_view(), name="email_interface")
)
