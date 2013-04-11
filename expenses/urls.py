from django.conf.urls import patterns, include, url
from expenses import views

urlpatterns = patterns('',
    url(r'^$', views.expense_list, name='index'),
)
