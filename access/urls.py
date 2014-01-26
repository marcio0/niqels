from django.conf.urls import patterns, include, url
from django.conf import settings
from django.contrib.auth.views import password_change
from django.utils.translation import ugettext_lazy as _

from access import views
from password_reset import views as pr_views

urlpatterns = patterns('',
    url(_(r'^entrar/$'), 'django.contrib.auth.views.login', {'template_name': 'access/login.html'}, name="login"),
    url(_(r'^sair/$'), 'django.contrib.auth.views.logout_then_login', {'login_url': '/'}, name='logout'),
    url(_(r'^registrar/$'), views.register, name='register'),

    url(_(r'^mudar-senha/$'), views.notify(password_change), {
        'template_name': 'access/change_password.html',
        'post_change_redirect': '/'
    }, name="change_password"),
)

# overriding django-password urls to translate
password_reset_urls = patterns('',
    url(_(r'^recuperar-senha/(?P<signature>.+)/$'), pr_views.recover_done, name='password_reset_sent'),
    url(_(r'^recuperar-senha/$'), views.Recover.as_view(), name='password_reset_recover'),
    url(_(r'^restaurar-senha/finalizado/$'), pr_views.reset_done, name='password_reset_done'),
    url(_(r'^restaurar-senha/(?P<token>[\w:-]+)/$'), views.Reset.as_view(), name='password_reset_reset'),
)

urlpatterns += password_reset_urls

if settings.DEBUG:
    urlpatterns += (url(r'^test_login/$', views.test_login),)
