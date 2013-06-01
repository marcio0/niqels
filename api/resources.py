from tastypie.constants import ALL, ALL_WITH_RELATIONS
from tastypie.resources import ModelResource, Resource
from tastypie.validation import FormValidation, CleanedDataFormValidation
from tastypie import fields
from tastypie import http
from tastypie.authentication import SessionAuthentication, BasicAuthentication, MultiAuthentication
from tastypie.authorization import Authorization
from tastypie.utils import trailing_slash
from django.conf.urls import url
from django.core.urlresolvers import NoReverseMatch

from expenses.models import Entry, Category
from expenses.forms import CategoryForm, EntryForm
from access.forms import UserCreationForm
from access.models import User
from api.authorization import UserObjectsOnlyAuthorization
from api.validation import EntryApiForm
from expenses import random_color

from babel.numbers import parse_decimal


class MonthlyBalanceResource(Resource):
    class Meta:
        include_resource_uri = False
        authentication = MultiAuthentication(SessionAuthentication(), BasicAuthentication())
        list_allowed_methods = ['get']
        detail_allowed_methods = []
        resource_name = 'data/balance'

    def get_obj(self, bundle, **kwargs):
        return {'name': 'ok'}

    def base_urls(self):
        return [
            url(r"^(?P<resource_name>%s)%s$" % (self._meta.resource_name, trailing_slash()), self.wrap_view('dispatch_detail'), name="api_dispatch_list"),
            url(r"^(?P<resource_name>%s)/schema%s$" % (self._meta.resource_name, trailing_slash()), self.wrap_view('get_schema'), name="api_get_schema")
        ]


class UserResource(ModelResource):
    class Meta:
        queryset = User.objects.all()
        fields = ['email', 'name']
        authentication = MultiAuthentication(SessionAuthentication(), BasicAuthentication())
        authorization = Authorization()
        list_allowed_methods = []
        detail_allowed_methods = ['get']

    def base_urls(self):
        '''
        The list endpoint behaves as the detail endpoint.
        '''
        return [
            url(r"^(?P<resource_name>%s)%s$" % (self._meta.resource_name, trailing_slash()), self.wrap_view('dispatch_detail'), name="api_dispatch_list"),
            url(r"^(?P<resource_name>%s)/schema%s$" % (self._meta.resource_name, trailing_slash()), self.wrap_view('get_schema'), name="api_get_schema")
        ]

    def obj_get(self, bundle, **kwargs):
        '''
        Always returns the logged in user.
        '''
        return bundle.request.user

    def get_resource_uri(self, bundle_or_obj=None, url_name='api_dispatch_detail'):
        bundle_or_obj = None
        try:
            return self._build_reverse_url(url_name, kwargs=self.resource_uri_kwargs(bundle_or_obj))
        except NoReverseMatch:
            return ''


class CategoryResource(ModelResource):
    def obj_create(self, bundle, **kwargs):
        # TODO: unnittest this
        return super(CategoryResource, self).obj_create(bundle, user=bundle.request.user)

    class Meta:
        queryset = Category.objects.all()
        authentication = MultiAuthentication(SessionAuthentication(), BasicAuthentication())
        authorization = UserObjectsOnlyAuthorization()
        validation = FormValidation(form_class=CategoryForm)
        list_allowed_methods = ['get', 'post']
        detail_allowed_methods = ['get', 'put', 'delete']
        filtering = {
            'name': ALL
        }

    def delete_detail(self, *args, **kwargs):
        return http.HttpNotImplemented()


class TransactionResource(ModelResource):
    category = fields.ForeignKey(CategoryResource, 'category', full=True)

    class Meta:
        queryset = Entry.objects.all()
        always_return_data = True
        excludes = ['last_edited_time']
        authentication = MultiAuthentication(SessionAuthentication(), BasicAuthentication())
        authorization = UserObjectsOnlyAuthorization()
        validation = FormValidation(form_class=EntryApiForm)
        list_allowed_methods = ['get', 'post']
        detail_allowed_methods = ['get', 'put', 'delete']


    def obj_create(self, bundle, **kwargs):
        return super(TransactionResource, self).obj_create(bundle, user=bundle.request.user)

    def put_detail(self, *args, **kwargs):
        return http.HttpNotImplemented()

    def hydrate_value(self, bundle):
        value = bundle.data.get('value', None)

        if value:
            bundle.data['value'] = parse_decimal(value, locale=bundle.request.locale)

        return bundle

    def hydrate_category(self, bundle):
        # TODO: unnittest this
        category_name = bundle.data.get('category', None)

        if not category_name:
            bundle.data['category'] = category_name
            return bundle

        category_name = category_name.strip()

        try:
            category = Category.objects.get(
                name=category_name,
                user=bundle.request.user
            )
        except Category.DoesNotExist:
            category = Category(
                name=category_name,
                user=bundle.request.user,
                color=random_color()
            )
            category.save()

        bundle.data['category'] = category

        return bundle

    #def dehydrate_category(self, bundle):
    #    return bundle.obj.category.name

