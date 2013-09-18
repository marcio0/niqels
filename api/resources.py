import datetime
import calendar
import json

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
from django.utils.translation import ugettext, ugettext_lazy as _

from expenses.models import Transaction, Category
from expenses.forms import CategoryForm
from access.forms import UserCreationForm
from access.models import User
from api.authorization import UserObjectsOnlyAuthorization
from api.validation import TransactionApiForm, RepeatableTransactionApiForm
from expenses import random_color
from expenses.calculator import AverageCalculator, BalanceQuery
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

    def get_months(self, GET=None):
        if not GET or not GET.get('months'):
            today = datetime.date.today()
            return [today.strftime('%Y-%m')]

        try:
            months = json.loads(GET['months'])

            if not isinstance(months, list):
                raise ValueError

        except ValueError:
            raise ValueError('Invalid month format.')
            
        return months

    def get_day(self, GET=None):
        if not GET or not GET.get('up_to_day'):
            return None

        try:
            day = int(GET['up_to_day'])
        except ValueError:
            raise ValueError('Invalid day format.')

        return day

    def obj_get(self, bundle, **kwargs):
        try:
            months = self.get_months(bundle.request.GET)
            day = self.get_day(bundle.request.GET)
        except ValueError, e:
            raise BadRequest(e)
        
        obj = ReturnData()
        obj.balance = BalanceQuery(
            months=months,
            day=day
        ).calculate(user=bundle.request.user)

        return obj

    def full_dehydrate(self, bundle, for_list=False):
        bundle = super(BalanceResource, self).full_dehydrate(bundle, for_list)
        bundle.data = bundle.obj.balance
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
    class Meta:
        queryset = Category.objects.filter(active=True)
        excludes = ['active']
        authentication = MultiAuthentication(SessionAuthentication(), BasicAuthentication())
        authorization = UserObjectsOnlyAuthorization()
        validation = FormValidation(form_class=CategoryForm)
        always_return_data = True
        list_allowed_methods = ['get', 'post']
        detail_allowed_methods = ['get', 'put', 'delete']
        filtering = {
            'name': ALL
        }

    def obj_delete(self, bundle, **kwargs):
        """
        When deletion of a category is requested, it's active attribute is set to False.
        """
        if not hasattr(bundle.obj, 'delete'):
            try:
                bundle.obj = self.obj_get(bundle=bundle, **kwargs)
            except ObjectDoesNotExist:
                raise NotFound("A model instance matching the provided arguments could not be found.")

        self.authorized_delete_detail(self.get_object_list(bundle.request), bundle)
        bundle.obj.active = False
        bundle.obj.save()

    def obj_create(self, bundle, **kwargs):
        """
        Creating a inactive category will reactivate it.
        """
        try:
            bundle.obj = self._meta.object_class.objects.get(name=bundle.data.get('name'), user=bundle.request.user)
        except self._meta.object_class.DoesNotExist:
            bundle.obj = self._meta.object_class()

        bundle.obj.active = True
        bundle.obj.user = bundle.request.user

        for key, value in kwargs.items():
            setattr(bundle.obj, key, value)

        self.authorized_create_detail(self.get_object_list(bundle.request), bundle)
        bundle = self.full_hydrate(bundle)
        return self.save(bundle)


class TransactionResource(ModelResource):
    category = fields.ForeignKey(CategoryResource, 'category', full=True)

    class Meta:
        queryset = Transaction.objects.all()
        always_return_data = True
        excludes = ['add_date']
        authentication = MultiAuthentication(SessionAuthentication(), BasicAuthentication())
        authorization = UserObjectsOnlyAuthorization()
        validation = FormValidation(form_class=TransactionApiForm)
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


class ReminderResource(ModelResource):
    repeat = fields.CharField('repeat')
    category = fields.ForeignKey(CategoryResource, 'category', full=True)
    due_date = fields.CharField('_due_date')

    class Meta:
        queryset = RepeatableTransaction.objects.all()
        always_return_data = True
        excludes = ['user', '_day_of_month', '_due_date']
        authentication = MultiAuthentication(SessionAuthentication(), BasicAuthentication())
        authorization = UserObjectsOnlyAuthorization()
        validation = FormValidation(form_class=RepeatableTransactionApiForm)
        list_allowed_methods = ['get', 'post']
        detail_allowed_methods = ['get', 'delete', 'post']
        transaction_allowed_methods = ['post']
        skip_allowed_methods = ['post']
        filtering = {
            'due_date': ALL
        }

    def obj_create(self, bundle, **kwargs):
        return super(ReminderResource, self).obj_create(bundle, user=bundle.request.user)

    def post_skip(self, request, **kwargs):
        # this comes from get_detail:
        basic_bundle = self.build_bundle(request=request)

        try:
            obj = self.cached_obj_get(bundle=basic_bundle, **self.remove_api_resource_names(kwargs))
        except ObjectDoesNotExist:
            return http.HttpNotFound()
        except MultipleObjectsReturned:
            return http.HttpMultipleChoices("More than one resource is found at this URI.")

        obj.due_date = obj.next_due_date
        obj.save()
        
        return http.HttpNoContent()

    def post_transaction(self, request, **kwargs):
        # this comes from get_detail:
        basic_bundle = self.build_bundle(request=request)

        try:
            obj = self.cached_obj_get(bundle=basic_bundle, **self.remove_api_resource_names(kwargs))
        except ObjectDoesNotExist:
            return http.HttpNotFound()
        except MultipleObjectsReturned:
            return http.HttpMultipleChoices("More than one resource is found at this URI.")

        # this comes from post_list
        if django.VERSION >= (1, 4):
            body = request.body
        else:
            body = request.raw_post_data
        deserialized = self.deserialize(request, body, format=request.META.get('CONTENT_TYPE', 'application/json'))
        deserialized = self.alter_deserialized_detail_data(request, deserialized)
        bundle = self.build_bundle(data=dict_strip_unicode_keys(deserialized), request=request)

        # this is original code:
        transaction = obj.create_transaction()

        '''
        Holy shit this is some ugly code!
        It's necessary because the default flow of TransactionResource's hydrating was
        raising BadRequestException.
        So I go directly to it's fields and hydrating manually. Exceptions were supressed.
        '''
        transaction_resource = TransactionResource()
        try:
            # this is a bug on tastypie, django's DateField's are mapped to a api's DateTimeField://github.com/toastdriven/django-tastypie/issues/591:
            # https://github.com/toastdriven/django-tastypie/issues/591
            date = transaction_resource.fields['date'].hydrate(bundle).date()
            if date:
                transaction.date = date
        except Exception, e:
            pass

        try:
            value = transaction_resource.fields['value'].hydrate(bundle)
            if value:
                transaction.value = value
        except Exception, e:
            pass

        try:
            description = transaction_resource.fields['description'].hydrate(bundle)
            if description is not None:
                transaction.description = description
        except Exception, e:
            pass

        transaction.save()
        obj.due_date = obj.next_due_date
        obj.save()
        
        # this comes from post_list:
        transaction_resource = TransactionResource()
        bundle = transaction_resource.build_bundle(obj=transaction, request=request)
        bundle = transaction_resource.full_dehydrate(bundle)
        bundle = transaction_resource.alter_detail_data_to_serialize(request, bundle)
        location = self.get_resource_uri(bundle)
        return transaction_resource.create_response(request, bundle, response_class=http.HttpCreated, location=location)

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

    def prepend_urls(self):
        return [
            url(r"^(?P<resource_name>%s)/(?P<pk>\w[\w/-]*)/transaction%s$" % (self._meta.resource_name, trailing_slash()), self.wrap_view('dispatch_transaction'), name="api_create_repeatable_transaction"),
            url(r"^(?P<resource_name>%s)/(?P<pk>\w[\w/-]*)/skip%s$" % (self._meta.resource_name, trailing_slash()), self.wrap_view('dispatch_skip'), name="api_skip_transacion"),
        ]

    def dispatch_transaction(self, request, **kwargs):
        """
        A view for handling the creation of a transaction.

        Relies on ``Resource.dispatch`` for the heavy-lifting.
        """
        return self.dispatch('transaction', request, **kwargs)

    def dispatch_skip(self, request, **kwargs):
        """
        A view for handling the skipping of a reminder period.

        Relies on ``Resource.dispatch`` for the heavy-lifting.
        """
        return self.dispatch('skip', request, **kwargs)
