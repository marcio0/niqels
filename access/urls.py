from django.conf.urls import patterns, include, url
from django.conf import settings
from django.contrib.auth.views import password_change

from access import views
from password_reset import views as pr_views

urlpatterns = patterns('',
    url(r'^login/$', 'django.contrib.auth.views.login', {'template_name': 'access/login.html'}, name="login"),
    url(r'^logout/$', 'django.contrib.auth.views.logout_then_login', {'login_url': '/'}, name='logout'),
    url(r'^register/$', views.register, name='register'),

    url(r'^change_password/$', views.notify(password_change), {
        'template_name': 'access/change_password.html',
        'post_change_redirect': '/'
    }, name="change_password"),

    # django-password-reset overrides
    url(r'^recover/$', views.Recover.as_view(), name='password_reset_recover'),
    url(r'^reset/done/$', pr_views.reset_done, name='password_reset_done'),
    url(r'^reset/(?P<token>[\w:-]+)/$', views.Reset.as_view(), name='password_reset_reset'),

    url(r'^', include('password_reset.urls')),
)

if settings.DEBUG:
    urlpatterns += (url(r'^test_login/$', views.test_login),)
