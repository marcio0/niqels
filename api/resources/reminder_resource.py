import django
from tastypie.constants import ALL
from tastypie.resources import ModelResource
from tastypie.validation import FormValidation
from tastypie import fields
from tastypie import http
from tastypie.authentication import SessionAuthentication, BasicAuthentication, MultiAuthentication
from tastypie.authorization import ReadOnlyAuthorization
from tastypie.utils import trailing_slash, dict_strip_unicode_keys
from tastypie.exceptions import BadRequest
from django.conf.urls import url
from django.core.exceptions import ObjectDoesNotExist, MultipleObjectsReturned
from django.utils.translation import ugettext, ugettext_lazy as _

from api.authorization import UserObjectsOnlyAuthorization
from api.validation import RepeatableTransactionApiForm
from reminder.models import RepeatableTransaction

from babel.numbers import parse_decimal


#class ReminderResource(ModelResource):
class ReminderResource():
    repeat = fields.CharField('repeat')
    #category = fields.ForeignKey(CategoryResource, 'category', full=True)
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
