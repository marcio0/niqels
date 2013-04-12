from django.conf.urls import patterns, include, url
from expenses import views

urlpatterns = patterns('',
    url(r'^$', views.expense_list, name='index'),
    url(r'^entries/$', views.expense_list, name='entry_list'),
    url(r'^entries/new/$', views.new_entry, name='new_entry'),
)
