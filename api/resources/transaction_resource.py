from django import forms
from tastypie.constants import ALL
from tastypie.resources import ModelResource, Resource
from tastypie.validation import FormValidation
from tastypie import fields
from tastypie import http
from tastypie.authentication import SessionAuthentication, BasicAuthentication, MultiAuthentication
from tastypie.authorization import Authorization
from tastypie.exceptions import BadRequest
from django.conf.urls import url
from django.utils.translation import ugettext, ugettext_lazy as _
from django.db.models import Count, Sum
from django.db import connections

from expenses.models import Transaction, Category
from api.authorization import UserObjectsOnlyAuthorization
from api.resources import CategoryResource

from babel.numbers import parse_decimal


class TransactionApiForm(forms.ModelForm):
    def full_clean(self):
        '''
        Converting Tastypie's uri to the model pk.
        '''
        category = self.data.get('category')

        if category and isinstance(category, basestring):
            self.data['category'] = CategoryResource().get_via_uri(category).pk

        super(TransactionApiForm, self).full_clean()


    class Meta:
        model = Transaction
        exclude = ('user',)


class TransactionResource(ModelResource):
    category = fields.ForeignKey(CategoryResource, 'category', full=True)

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

    def dispatch_list(self, request, **kwargs):
        if hasattr(request, 'GET') and request.GET.get('group_by'):
            return GroupedTransactionResource().dispatch_list(request, **kwargs)
        return super(TransactionResource, self).dispatch_list(request, **kwargs)

    def obj_create(self, bundle, **kwargs):
        return super(TransactionResource, self).obj_create(bundle, user=bundle.request.user)

    def put_detail(self, *args, **kwargs):
        return http.HttpNotImplemented()

    def hydrate_value(self, bundle):
        value = bundle.data.get('value', None)

        if value:
            bundle.data['value'] = parse_decimal(str(value), locale=bundle.request.locale)

        return bundle

class GroupedTransactionResource(Resource):
    class Meta:
        authentication = MultiAuthentication(SessionAuthentication(), BasicAuthentication())
        list_allowed_methods = ['get']
        detail_allowed_methods = []
        filtering = {
            'date': ALL
        }

    def get_list(self, request, **kwargs):
        groups = request.GET.get('group_by')

        user = request.user

        if isinstance(groups, unicode):
            groups = [groups]

        values = []

        qs = Transaction.objects.all()

        for group in groups:
            if group.startswith('date'):
                try:
                    attr = group.split('__')[1]
                except:
                    attr = 'month'

                truncate_date = connections[Transaction.objects.db].ops.date_trunc_sql(attr, 'date')
                qs = qs.extra({group: truncate_date})

            values.append(group)

        qs = qs.values(*values).annotate(total=Count('pk'), sum=Sum('value')).order_by(*values)

        return self.create_response(request, list(qs))
