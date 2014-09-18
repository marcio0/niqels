from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.utils.translation import ugettext_lazy as _

admin.autodiscover()

js_info_dict = {
    'packages': ('expenses',),
}

urlpatterns = patterns('',
    url(r'^jsi18n/$', 'django.views.i18n.javascript_catalog', js_info_dict),

    url(r'^', include('expenses.urls')),
    url(r'^', include('access.urls')),
    url(r'^api/', include('api.urls')),

    url(r'^admin panel/', include('admin_custom.urls', namespace="admin_custom", app_name="admin_custom")),
    url(r'^admin panel/', include(admin.site.urls)),

    # webapp must be the last one
    # the fallback url goes to the webapp so the locationProvider can work on html5Mode
    url(r'^', include('webapp.urls')),
)
