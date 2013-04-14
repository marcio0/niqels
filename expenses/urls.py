from django.conf.urls import patterns, include, url
from expenses import views

urlpatterns = patterns('',
    url(r'^$', views.ListEntryView.as_view(), name='index'),
    url(r'^entries/$', views.ListEntryView.as_view(), name='entry_list'),
    url(r'^entries/new/$', views.CreateEntryView.as_view(), name='new_entry'),
    url(r'^entries/(?P<id>\d+)/delete/$', views.DeleteEntryView.as_view(), name='delete_entry'),
)
