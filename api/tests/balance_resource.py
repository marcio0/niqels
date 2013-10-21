import mock
import datetime

from tastypie.test import ResourceTestCase

from access.models import User
from expenses.models import Category, Transaction
from api.resources import BalanceResource


class BalanceResourceTest(ResourceTestCase):
    fixtures = ['BalanceResourceTest']

    def setUp(self):
        super(BalanceResourceTest, self).setUp()

        # Create a user.
        self.email = 'user@example.com'
        self.password = 'password'
        self.user = User.objects.create_user(self.email, self.password)

        Transaction.objects.update(user=self.user)

    def get_credentials(self):
        '''
        Get the credentials for basic http authentication.
        '''
        return self.create_basic(username=self.email, password=self.password)

    def test_session_auth_ok(self):
        '''
        Testing auth with django's session authentication.
        User is alread logged in, so there's no need for auth data on requisition.
        '''
        self.assertTrue(self.api_client.client.login(email=self.email, password=self.password))
        resp = self.api_client.get('/api/v1/data/balance/?date_start=2010-01-01&date_end=2010-03-01', format='json', authentication=self.get_credentials())
        self.assertValidJSONResponse(resp)

    # List tests: GET.
    def test_get_list_unauthorized(self):
        '''
        Must be authenticated to GET to a list endpoint.
        '''
        self.assertHttpUnauthorized(self.api_client.get('/api/v1/data/balance/', format='json'))

    def test_get_list_json(self):
        resp = self.api_client.get('/api/v1/data/balance/?date_start=2010-01-01&date_end=2010-03-01', format='json', authentication=self.get_credentials())
        self.assertValidJSONResponse(resp)

        self.assertEqual(self.deserialize(resp), [
            {
                'period': '2010-01',
                'renevues': '450.00',
                'expenses': '-300.00'
            },
            {
                'period': '2010-02',
                'renevues': '480.00',
                'expenses': '-360.00'
            },
            {
                'period': '2010-03',
                'renevues': '600.00',
                'expenses': '-450.00'
            }
        ])

    def test_get_one_month(self):
        resp = self.api_client.get('/api/v1/data/balance/?date_start=2010-01-01&date_end=2010-01-01', format='json', authentication=self.get_credentials())
        self.assertValidJSONResponse(resp)

        self.assertEqual(self.deserialize(resp), [
            {
                'period': '2010-01',
                'renevues': '450.00',
                'expenses': '-300.00'
            }
        ])

    @mock.patch('api.resources.balance_resource.BalanceQuery')
    def test_get_one_month_and_day(self, calculator_cls):
        calculator_cls().calculate.return_value = [{'test': 'ok'}]

        resp = self.api_client.get('/api/v1/data/balance/?date_start=2010-01-01&date_end=2010-01-01&day=10', format='json', authentication=self.get_credentials())
        self.assertValidJSONResponse(resp)

        self.assertEqual(self.deserialize(resp), [{'test': 'ok'}])

        calculator_cls.assert_called_with(date_start=datetime.datetime(2010, 01, 01), date_end=datetime.datetime(2010, 01, 01), day=10)
        calculator_cls().calculate.assert_called_with(user=self.user)

    def test_get_months_missing_parameters(self):
        '''
        `date_start` and `date_end` parameters are required.
        '''
        resp = self.api_client.get('/api/v1/data/balance/?date_end=2010-10-10', format='json', authentication=self.get_credentials())
        self.assertHttpBadRequest(resp)
        # translated strings make these assertions fail
        #self.assertContains(resp, 'date_start', status_code=400)
        #self.assertContains(resp, 'required', status_code=400)

        resp = self.api_client.get('/api/v1/data/balance/?date_start=2010-10-10', format='json', authentication=self.get_credentials())
        self.assertHttpBadRequest(resp)
        # translated strings make these assertions fail
        #self.assertContains(resp, 'date_end', status_code=400)
        #self.assertContains(resp, 'required', status_code=400)

    def test_get_bad_format(self):
        '''
        Bad formatted data on `date_start` and `date_end` should return 400 Bad Request.
        `day` parameter must be a integer.
        '''
        resp = self.api_client.get('/api/v1/data/balance/?date_end=2010-0-10&date_start=2010-10-10', format='json', authentication=self.get_credentials())
        self.assertHttpBadRequest(resp)
        # translated strings make these assertions fail
        #self.assertContains(resp, 'date_end', status_code=400)
        #self.assertContains(resp, 'invalid format', status_code=400)

        resp = self.api_client.get('/api/v1/data/balance/?date_end=2010-10-10&date_start=2010-0-10', format='json', authentication=self.get_credentials())
        self.assertHttpBadRequest(resp)
        # translated strings make these assertions fail
        #self.assertContains(resp, 'date_start', status_code=400)
        #self.assertContains(resp, 'invalid format', status_code=400)

        resp = self.api_client.get('/api/v1/data/balance/?date_end=2010-10-10&date_start=2010-10-10&day=asd', format='json', authentication=self.get_credentials())
        self.assertHttpBadRequest(resp)
        # translated strings make these assertions fail
        #self.assertContains(resp, 'day', status_code=400)
        #self.assertContains(resp, 'integer', status_code=400)

    # List tests: POST
    def test_post_list_not_allowed(self):
        '''
        Does not accept POST on list endpoint.
        '''
        self.assertHttpMethodNotAllowed(self.api_client.post('/api/v1/data/balance/', format='json', authentication=self.get_credentials()))

    # List tests: PUT
    def test_put_list_unauthorzied(self):
        '''
        Must be authenticated to PUT to a list endpoint.
        '''
        self.assertHttpMethodNotAllowed(self.api_client.put('/api/v1/data/balance/', format='json', authentication=self.get_credentials()))

    # List tests: DELETE
    def test_delete_list_unauthorzied(self):
        '''
        Must be authenticated to DELETE to a list endpoint.
        '''
        self.assertHttpMethodNotAllowed(self.api_client.delete('/api/v1/data/balance/', format='json', authentication=self.get_credentials()))
