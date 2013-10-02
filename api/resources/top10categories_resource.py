import datetime
import json

from tastypie.resources import Resource
from tastypie import fields
from tastypie.authentication import SessionAuthentication, BasicAuthentication, MultiAuthentication
from tastypie.exceptions import BadRequest
from django.utils.translation import ugettext, ugettext_lazy as _
from django.db.models import Sum, Count

from expenses.models import Category, Transaction


class ReturnData(object):
    pass


class Top10CategoriesResource(Resource):
    class Meta:
        #object_class = ReturnData
        include_resource_uri = False
        authentication = MultiAuthentication(SessionAuthentication(), BasicAuthentication())
        list_allowed_methods = ['get']
        detail_allowed_methods = []
        resource_name = 'data/top10categories'

    def get_list(self, request, **kwargs):
        user = request.user

        date_start = request.GET.get('date_start')
        date_end = request.GET.get('date_end')

        categories = Category.objects\
            .filter(transaction__user=user, transaction__date__range=(date_start, date_end))\
            .annotate(total=Count('transaction'), sum=Sum('transaction__value'))\
            .values('name', 'sum', 'total')

        return self.create_response(request, list(categories))

    def _dispatch_list(self, request, **kwargs):
        return self.dispatch_detail(request, **kwargs)
