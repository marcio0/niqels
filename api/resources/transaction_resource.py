from tastypie.constants import ALL
from tastypie.resources import ModelResource
from tastypie.validation import FormValidation
from tastypie import fields
from tastypie import http
from tastypie.authentication import SessionAuthentication, BasicAuthentication, MultiAuthentication
from tastypie.authorization import Authorization
from tastypie.exceptions import BadRequest
from django.conf.urls import url
from django.utils.translation import ugettext, ugettext_lazy as _

from expenses.models import Transaction, Category
from api.authorization import UserObjectsOnlyAuthorization
from api.validation import TransactionApiForm
from api.resources import CategoryResource

from babel.numbers import parse_decimal


class TransactionResource(ModelResource):
    #category = fields.ForeignKey(CategoryResource, 'category', full=True)

    class Meta:
        queryset = Transaction.objects.all()
        always_return_data = True
        excludes = ['created']
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

