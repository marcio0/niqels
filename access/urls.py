from django.conf.urls import patterns, include, url

from access import views

urlpatterns = patterns('',
    url(r'^login/$', 'django.contrib.auth.views.login', {'template_name': 'access/login.html'}, name="login"),
    url(r'^logout/$', 'django.contrib.auth.views.logout_then_login', {'login_url': '/'}, name='logout'),
    url(r'^register/$', views.register, name='register'),

    url(r'^recover/$', views.Recover.as_view(), name='password_reset_recover'),
    url(r'^', include('password_reset.urls')),
)
