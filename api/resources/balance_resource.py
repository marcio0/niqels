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

    def get_list(self, request, **kwargs):
        try:
            date_start = request.GET.get('date_start')
            date_start = datetime.datetime.strptime(date_start, '%Y-%m-%d')
        except TypeError:
            raise BadRequest(_("The 'date_start' parameter is required."))
        except ValueError:
            raise BadRequest(_("The 'date_start' parameter has an invalid format. Must be on YYYY-MM-DD format."))

        try:
            date_end = request.GET.get('date_end')
            date_end = datetime.datetime.strptime(date_end, '%Y-%m-%d')
        except TypeError:
            raise BadRequest(_("The 'date_end' parameter is required."))
        except ValueError:
            raise BadRequest(_("The 'date_end' parameter has an invalid format. Must be on YYYY-MM-DD format."))

        try:
            day = int(request.GET.get('day'))
        except ValueError:
            raise BadRequest(_("The `day` parameter must be an integer."))
        except TypeError:
            day = None
        
        balance = BalanceQuery(
            date_start=date_start,
            date_end=date_end,
            day=day
        ).calculate(user=request.user)

        return self.create_response(request, list(balance))
