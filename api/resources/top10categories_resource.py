import datetime
import json

from tastypie.resources import Resource
from tastypie import fields
from tastypie.authentication import SessionAuthentication, BasicAuthentication, MultiAuthentication
from tastypie.exceptions import BadRequest
from django.utils.translation import ugettext, ugettext_lazy as _
from django.db.models import Sum, Count

from expenses.models import Category


class Top10CategoriesResource(Resource):
    class Meta:
        include_resource_uri = False
        authentication = MultiAuthentication(SessionAuthentication(), BasicAuthentication())
        list_allowed_methods = ['get']
        detail_allowed_methods = []
        resource_name = 'data/top10categories'

    def get_list(self, request, **kwargs):
        user = request.user

        date_start = request.GET.get('date_start')
        if not date_start:
            raise BadRequest(_("The 'date_start' parameter is required."))

        date_end = request.GET.get('date_end')
        if not date_end:
            raise BadRequest(_("The 'date_end' parameter is required."))

        categories = Category.objects\
            .filter(transaction__user=user, transaction__date__range=(date_start, date_end))\
            .annotate(total=Count('transaction'), sum=Sum('transaction__value'))\
            .order_by('-sum')\
            .values('name', 'sum', 'total')

        return self.create_response(request, list(categories))

    def _dispatch_list(self, request, **kwargs):
        return self.dispatch_detail(request, **kwargs)
