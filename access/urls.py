from django.conf.urls import patterns, include, url

from access import views
from password_reset import views as pr_views

urlpatterns = patterns('',
    url(r'^login/$', 'django.contrib.auth.views.login', {'template_name': 'access/login.html'}, name="login"),
    url(r'^logout/$', 'django.contrib.auth.views.logout_then_login', {'login_url': '/'}, name='logout'),
    url(r'^register/$', views.register, name='register'),

    # django-password-reset overrides
    url(r'^recover/$', views.Recover.as_view(), name='password_reset_recover'),
    url(r'^reset/done/$', pr_views.reset_done, name='password_reset_done'),
    url(r'^reset/(?P<token>[\w:-]+)/$', views.Reset.as_view(), name='password_reset_reset'),

    url(r'^', include('password_reset.urls')),
)
