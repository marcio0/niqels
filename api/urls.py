from django.conf.urls import patterns, include, url
from tastypie.api import Api

from api import resources

v1_api = Api(api_name='v1')
v1_api.register(resources.TransactionResource())
v1_api.register(resources.CategoryResource())
v1_api.register(resources.UserResource())
v1_api.register(resources.BalanceResource())
v1_api.register(resources.SplitTransactionResource())
v1_api.register(resources.BaseCategoryRestrictionResource())

urlpatterns = patterns('',
    (r'^', include(v1_api.urls)),
)
