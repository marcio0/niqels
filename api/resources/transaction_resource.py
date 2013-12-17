from decimal import Decimal
import datetime
from django import forms
from tastypie.constants import ALL
from tastypie.resources import ModelResource
from tastypie.validation import FormValidation
from tastypie import fields
from tastypie import http
from tastypie.authentication import SessionAuthentication, BasicAuthentication, MultiAuthentication
from tastypie.exceptions import BadRequest
from django.utils.translation import ugettext_lazy as _
from django.db.models import Count, Sum
from django.db import connections
from babel.numbers import parse_decimal

from expenses.models import Transaction
from api.authorization import UserObjectsOnlyAuthorization
from api.resources import CategoryResource


class TransactionApiForm(forms.ModelForm):
    def full_clean(self):
        """
        Converting Tastypie's uri to the model pk.
        """
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

    def full_hydrate(self, bundle):
        bundle = super(TransactionResource, self).full_hydrate(bundle)

        # this must happen after all hydrations because order isn't garanteed
        value = bundle.data.get('value')
        if value:
            # casting value to str to avoid repeating decimals
            value = Decimal(str(value)).copy_abs()

            if bundle.obj.category.is_negative:
                value = value.copy_negate()

            bundle.data['value'] = value

        return bundle


def _truncate_date_tzinfo(objects):
    for obj in objects:
        attr = None
        if 'date__day' in obj:
            attr = 'date__day'
        if 'date__month' in obj:
            attr = 'date__month'
        if 'date__year' in obj:
            attr = 'date__year'

        if not attr:
            continue

        if isinstance(obj[attr], unicode):
            obj[attr] = obj[attr].split(' ')[0]
        elif isinstance(obj[attr], datetime.datetime):
            obj[attr] = obj[attr].replace(tzinfo=None)


class GroupedTransactionResource(ModelResource):
    class Meta:
        authentication = MultiAuthentication(SessionAuthentication(), BasicAuthentication())
        list_allowed_methods = ['get']
        detail_allowed_methods = []
        filtering = {
            'date': ALL
        }
        grouping = [
            'category__name',
            'date__month',
            'date__day',
            'date__year'
        ]
        queryset = Transaction.objects.all()
        limit = 100
        annotations = {
            'total': Count('pk'),
            'sum': Sum('value')
        }

    def get_list(self, request, **kwargs):
        groups = request.GET.get('group_by')

        base_bundle = self.build_bundle(request=request)
        objects = self.obj_get_list(bundle=base_bundle, **self.remove_api_resource_names(kwargs))
        objects = objects.filter(user=request.user)

        if isinstance(groups, unicode):
            groups = groups.split(',')

        values = []

        must_truncate_date = False

        for group in groups:
            if group not in self._meta.grouping:
                raise BadRequest(_("This resource does not allow grouping by %s.") % group)

            if group.startswith('date'):
                must_truncate_date = True
                attr = group.split('__')[1]

                truncate_date = connections[objects.model.objects.db].ops.date_trunc_sql(attr, 'date')
                objects = objects.extra({group: truncate_date})

            values.append(group)

        objects = objects.values(*values).annotate(**self._meta.annotations).order_by(*values)

        if must_truncate_date:
            _truncate_date_tzinfo(objects)

        sorted_objects = self.apply_sorting(objects, options=request.GET)
        paginator = self._meta.paginator_class(request.GET, sorted_objects, resource_uri=self.get_resource_uri(), limit=self._meta.limit, max_limit=self._meta.max_limit, collection_name=self._meta.collection_name)
        to_be_serialized = paginator.page()

        to_be_serialized[self._meta.collection_name] = list(sorted_objects)

        return self.create_response(request, to_be_serialized)
