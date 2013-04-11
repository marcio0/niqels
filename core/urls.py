from django.conf.urls import patterns, include, url
from django.contrib import admin

admin.autodiscover()

urlpatterns = patterns('',
    url(r'^', include('expenses.urls')),
    url(r'^', include('access.urls')),

    url(r'^admin/', include(admin.site.urls)),
)
