from django.conf.urls import patterns, include, url

from access import views

urlpatterns = patterns('',
    #url(r'^login/$', views.user_login, name='login'),
    url(r'^login/$', 'django.contrib.auth.views.login', {'template_name': 'access/login.html'}, name="login"),
    url(r'^logout/$', 'django.contrib.auth.views.logout_then_login', name='logout'),
)
