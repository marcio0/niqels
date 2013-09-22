from tastypie.resources import ModelResource
from tastypie.authentication import SessionAuthentication, BasicAuthentication, MultiAuthentication
from tastypie.authorization import Authorization
from django.core.urlresolvers import NoReverseMatch
from django.utils.translation import ugettext, ugettext_lazy as _

from expenses.models import Transaction, Category
from expenses.forms import CategoryForm
from access.forms import UserCreationForm
from access.models import User


class UserResource(ModelResource):
    class Meta:
        queryset = User.objects.all()
        fields = ['email', 'name']
        authentication = MultiAuthentication(SessionAuthentication(), BasicAuthentication())
        authorization = Authorization()
        list_allowed_methods = []
        detail_allowed_methods = ['get']
        include_resource_uri = False

    def dispatch_list(self, request, **kwargs):
        return self.dispatch_detail(request, **kwargs)

    def obj_get(self, bundle, **kwargs):
        '''
        Always returns the logged in user.
        '''
        return bundle.request.user

    def get_resource_uri(self, bundle_or_obj=None, url_name='api_dispatch_list'):
        bundle_or_obj = None
        try:
            return self._build_reverse_url(url_name, kwargs=self.resource_uri_kwargs(bundle_or_obj))
        except NoReverseMatch:
            return ''
