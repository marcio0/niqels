# encoding: utf-8

import datetime
from django import forms
from django.conf.urls import url
from django.core.exceptions import ValidationError
from django.db import IntegrityError
from django.utils.translation import gettext as _
from tastypie import fields
from tastypie.authentication import MultiAuthentication, BasicAuthentication, SessionAuthentication
from tastypie.exceptions import BadRequest
from tastypie.resources import ModelResource
from tastypie.utils.urls import trailing_slash
from tastypie.validation import FormValidation
from api.authorization import UserObjectsOnlyAuthorization, MonthlyCategoryRestrictionAuthorization
from api.resources import CategoryResource
from restrictions.models import BaseCategoryRestriction, MonthlyCategoryRestriction




'''
class MonthlyCategoryRestrictionResource(ModelResource):
    spent = fields.DecimalField(attribute='spent', readonly=True, null=True, blank=True)
    value = fields.DecimalField(attribute='value')
    month = fields.DateField(attribute='month')

    class Meta:
        queryset = MonthlyCategoryRestriction.objects.all()
        always_return_data = True
        authentication = MultiAuthentication(SessionAuthentication(), BasicAuthentication())
        authorization = MonthlyCategoryRestrictionAuthorization()
        #validation = FormValidation(form_class=BaseCategoryRestrictionApiForm)
        list_allowed_methods = ['get', 'post']
        detail_allowed_methods = ['get', 'put', 'delete']
        resource_name = "restriction"

    def prepend_urls(self):
        return [
            url(r"^(?P<resource_name>%s)/(?P<month>\d{4}-\d{2})%s$" % (self._meta.resource_name, trailing_slash()), self.wrap_view('dispatch_list'), name="api_dispatch_list"),
            url(r"^(?P<resource_name>%s)/(?P<month>\d{4}-\d{2})/(?P<baserestriction__category__name>\w+)%s$" % (self._meta.resource_name, trailing_slash()), self.wrap_view('dispatch_detail'), name="api_dispatch_detail"),
        ]

    def _parse_month(self, month_str):
        return datetime.datetime.strptime(month_str, '%Y-%m')

    def build_filters(self, filters=None):
        month_str = filters.pop('month')[0]

        qs_filters = super(MonthlyCategoryRestrictionResource, self).build_filters(filters)

        filters.update({'month': self._parse_month(month_str)})
        return qs_filters

    def obj_get(self, bundle, **kwargs):
        month_str = kwargs.pop('month')
        kwargs['month'] = self._parse_month(month_str)
        kwargs['baserestriction__user'] = bundle.request.user

        return super(MonthlyCategoryRestrictionResource, self).obj_get(bundle, **kwargs)

    def hydrate_month(self, bundle):
        return bundle
'''








class BaseCategoryRestrictionApiForm(forms.ModelForm):
    def full_clean(self):
        """
        Converting Tastypie's uri to the model pk.
        """
        category = self.data.get('category')

        if category:
            if isinstance(category, basestring):
                category = CategoryResource().get_via_uri(category)
                self.data['category'] = category.pk

        super(BaseCategoryRestrictionApiForm, self).full_clean()

    class Meta:
        model = BaseCategoryRestriction
        exclude = ('user',)




class BaseCategoryRestrictionResource(ModelResource):
    category = fields.ForeignKey(CategoryResource, 'category', null=False, blank=False, full=True, readonly=True)
    value = fields.DecimalField(attribute='value')

    class Meta:
        queryset = BaseCategoryRestriction.objects.all()
        always_return_data = True
        authentication = MultiAuthentication(SessionAuthentication(), BasicAuthentication())
        authorization = UserObjectsOnlyAuthorization()
        validation = FormValidation(form_class=BaseCategoryRestrictionApiForm)
        list_allowed_methods = ['get', 'post']
        detail_allowed_methods = ['get', 'put', 'delete']
        resource_name = "threshold/category"

    def hydrate_category(self, bundle):
        if not 'category' in bundle.data and bundle.request.method == "POST":
            bundle.data['category'] = None
        return bundle

    def obj_create(self, bundle, **kwargs):
        return super(BaseCategoryRestrictionResource, self).obj_create(bundle, user=bundle.request.user)

    def save(self, *args, **kwargs):
        try:
            return super(BaseCategoryRestrictionResource, self).save(*args, **kwargs)
        except IntegrityError, e:
            if 'not unique' in unicode(e):
                raise BadRequest(_(u'Já existe um limite de gastos para este mês'))