import datetime
import json

from tastypie.resources import Resource
from tastypie.authentication import SessionAuthentication, BasicAuthentication, MultiAuthentication
from tastypie.exceptions import BadRequest
from django.utils.translation import ugettext, ugettext_lazy as _

from expenses.calculator import BalanceQuery


class BalanceResource(Resource):
    class Meta:
        include_resource_uri = False
        authentication = MultiAuthentication(SessionAuthentication(), BasicAuthentication())
        list_allowed_methods = ['get']
        detail_allowed_methods = []
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

    def get_list(self, request, **kwargs):
        try:
            months = self.get_months(request.GET)
            day = self.get_day(request.GET)
        except ValueError, e:
            raise BadRequest(e)
        
        balance = BalanceQuery(
            months=months,
            day=day
        ).calculate(user=request.user)

        return self.create_response(request, dict(balance))
