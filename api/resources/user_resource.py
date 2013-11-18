from tastypie.resources import ModelResource
from tastypie.authentication import SessionAuthentication, BasicAuthentication, MultiAuthentication
from tastypie.authorization import Authorization
from django.core.urlresolvers import NoReverseMatch
from django.utils.translation import ugettext, ugettext_lazy as _
from tastypie.validation import FormValidation

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
        validation = FormValidation(form_class=UserCreationForm)
        list_allowed_methods = []
        detail_allowed_methods = ['get', 'post']
        include_resource_uri = False

    def dispatch_list(self, request, **kwargs):
        '''
        Rewiring dispath_list to dispatch_detail because the list endpoint returns only one instance.
        '''
        return self.dispatch_detail(request, **kwargs)

    def post_detail(self, request, **kwargs):
        '''
        Rewiring post_detail to post_list because of reasons.
        '''
        return super(UserResource, self).post_list(request, **kwargs)
        
    def obj_get(self, bundle, **kwargs):
        '''
        Always returns the logged in user.
        '''
        return bundle.request.user

    def alter_deserialized_detail_data(self, request, deserialized):
        '''
        Mimicking form behavior to use in the UserCreationForm.
        '''
        deserialized['password'] = deserialized.get('password')
        deserialized['password_confirm'] = deserialized.get('password')

        return deserialized

    def hydrate(self, bundle):
        bundle.obj.set_password(bundle.data.get('password'))
        return bundle

    def get_resource_uri(self, bundle_or_obj=None, url_name='api_dispatch_list'):
        bundle_or_obj = None
        try:
            return self._build_reverse_url(url_name, kwargs=self.resource_uri_kwargs(bundle_or_obj))
        except NoReverseMatch:
            return ''
