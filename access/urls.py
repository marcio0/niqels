from django.conf.urls import patterns, include, url

from access import views

urlpatterns = patterns('',
    url(r'^login/$', 'django.contrib.auth.views.login', {'template_name': 'access/login.html'}, name="login"),
    url(r'^logout/$', 'django.contrib.auth.views.logout_then_login', {'login_url': '/'}, name='logout'),
    url(r'^register/$', views.register, name='register'),
)
