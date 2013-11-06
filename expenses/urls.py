from django.conf.urls import patterns, include, url

from expenses import views

urlpatterns = patterns('',
    url(r'^$', views.LandingPage.as_view(), name='landing')
)
