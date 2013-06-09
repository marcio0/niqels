from django.conf.urls import patterns, include, url

from expenses import views

urlpatterns = patterns('',
    url(r'^$', views.PresentationView.as_view(), name='landing')
)
