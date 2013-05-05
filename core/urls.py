from django.conf.urls import patterns, include, url
from django.contrib import admin

admin.autodiscover()

js_info_dict = {
    'packages': ('expenses',),
}

urlpatterns = patterns('',
)

urlpatterns = patterns('',
    url(r'^jsi18n/$', 'django.views.i18n.javascript_catalog', js_info_dict),

    url(r'^', include('expenses.urls')),
    url(r'^', include('access.urls')),

    url(r'^admin/', include(admin.site.urls)),
)
