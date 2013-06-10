import datetime

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
from expenses.forms import CategoryForm
from access.forms import UserCreationForm
from access.models import User
from api.authorization import UserObjectsOnlyAuthorization
from api.validation import EntryApiForm
from expenses import random_color
from expenses.calculator import AverageCalculator

from babel.numbers import parse_decimal

class ReturnData(object):
    pass

class BalanceResource(Resource):
    class Meta:
        object_class = ReturnData
        include_resource_uri = False
        authentication = MultiAuthentication(SessionAuthentication(), BasicAuthentication())
        list_allowed_methods = ['get']
        detail_allowed_methods = ['get']
        resource_name = 'data/balance'

    def obj_get(self, bundle, **kwargs):
        obj = ReturnData()
        obj.average_balance = AverageCalculator(
            user=bundle.request.user,
            start_date=datetime.date.today(),
            qty_months=3).calculate()
        return obj

    def full_dehydrate(self, bundle, for_list=False):
        bundle = super(BalanceResource, self).full_dehydrate(bundle, for_list)
        bundle.data['balance'] = bundle.obj.average_balance
        return bundle

    def dispatch_list(self, request, **kwargs):
        return self.dispatch_detail(request, **kwargs)


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
        filtering = {
            'date': ALL
        }


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

