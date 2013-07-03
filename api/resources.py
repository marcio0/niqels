import datetime
import calendar

import django
from tastypie.constants import ALL, ALL_WITH_RELATIONS
from tastypie.resources import ModelResource, Resource
from tastypie.validation import FormValidation, CleanedDataFormValidation
from tastypie import fields
from tastypie import http
from tastypie.authentication import SessionAuthentication, BasicAuthentication, MultiAuthentication
from tastypie.authorization import Authorization
from tastypie.utils import trailing_slash, dict_strip_unicode_keys
from tastypie.exceptions import BadRequest
from django.conf.urls import url
from django.core.urlresolvers import NoReverseMatch
from django.core.exceptions import ObjectDoesNotExist, MultipleObjectsReturned

from expenses.models import Entry, Category
from expenses.forms import CategoryForm
from access.forms import UserCreationForm
from access.models import User
from api.authorization import UserObjectsOnlyAuthorization
from api.validation import EntryApiForm, RepeatableTransactionApiForm
from expenses import random_color
from expenses.calculator import AverageCalculator
from reminder.models import RepeatableTransaction

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

    def get_month_filter(self, GET=None):
        if not GET:
            return datetime.date.today()

        date = GET.get('date', None)
        date = datetime.datetime.strptime(date, '%Y-%m-%d').date()

        #last_day = calendar.monthrange(date.year, date.month)[1]
        #date = date.replace(day=last_day)

        return date

    def obj_get(self, bundle, **kwargs):
        try:
            date = self.get_month_filter(bundle.request.GET)
        except ValueError:
            raise BadRequest('Invalid date filter')
        
        obj = ReturnData()
        obj.average_balance = AverageCalculator(
            user=bundle.request.user,
            start_date=date,
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

        category, _ = Category.objects.get_or_create(
            name=category_name,
            user=bundle.request.user,
            defaults={'color': random_color()}
        )

        bundle.data['category'] = category

        return bundle


class ReminderResource(ModelResource):
    repeat = fields.CharField('repeat', blank=False, null=False)
    due_date = fields.DateField('due_date', blank=False, null=False)
    category = fields.ForeignKey(CategoryResource, 'category', full=True)

    class Meta:
        queryset = RepeatableTransaction.objects.all()
        always_return_data = True
        excludes = ['user', '_last_date', '_day_of_month', 'date', 'due_date']
        authentication = MultiAuthentication(SessionAuthentication(), BasicAuthentication())
        authorization = UserObjectsOnlyAuthorization()
        validation = FormValidation(form_class=RepeatableTransactionApiForm)
        list_allowed_methods = ['get', 'post']
        detail_allowed_methods = ['get', 'delete', 'post']

    def obj_create(self, bundle, **kwargs):
        return super(ReminderResource, self).obj_create(bundle, user=bundle.request.user)

    def post_detail(self, request, **kwargs):
        # this comes from get_detail:
        basic_bundle = self.build_bundle(request=request)

        try:
            obj = self.cached_obj_get(bundle=basic_bundle, **self.remove_api_resource_names(kwargs))
        except ObjectDoesNotExist:
            return http.HttpNotFound()
        except MultipleObjectsReturned:
            return http.HttpMultipleChoices("More than one resource is found at this URI.")

        # this is original code:
        transaction = obj.create_transaction()
        transaction.save()
        
        # this comes from post_detail:
        transaction_resource = TransactionResource()
        bundle = transaction_resource.build_bundle(obj=transaction, request=request)
        bundle = transaction_resource.full_dehydrate(bundle)
        bundle = transaction_resource.alter_detail_data_to_serialize(request, bundle)
        location = self.get_resource_uri(bundle)
        return transaction_resource.create_response(request, bundle, response_class=http.HttpCreated, location=location)

    def hydrate(self, bundle):
        '''
        Repeat must be set before everything else because of the due_date and last_date properties that depends on it.
        '''
        repeat = bundle.data.get('repeat')

        if not repeat:
            raise BadRequest

        bundle.obj.repeat = repeat
        return bundle

    def hydrate_due_date(self, bundle):
        due_date = bundle.data.get('due_date')

        if not due_date:
            raise BadRequest

        return bundle

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

        category, _ = Category.objects.get_or_create(
            name=category_name,
            user=bundle.request.user,
            defaults={'color': random_color()}
        )

        bundle.data['category'] = category

        return bundle
