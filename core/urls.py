from django.conf.urls import patterns, include, url
from core import views

urlpatterns = patterns('',
    url(r'^expenses/$', views.expense_list, name='expense_list'),
    # Examples:
    # url(r'^$', 'expenses.views.home', name='home'),
    # url(r'^expenses/', include('expenses.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
)
