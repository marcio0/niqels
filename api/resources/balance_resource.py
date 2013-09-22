import datetime
import json

from tastypie.resources import Resource
from tastypie.authentication import SessionAuthentication, BasicAuthentication, MultiAuthentication
from tastypie.exceptions import BadRequest
from django.utils.translation import ugettext, ugettext_lazy as _

from expenses.calculator import BalanceQuery


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
