import mock

from tastypie.test import ResourceTestCase

from access.models import User
from expenses.models import Category


class BalanceResourceTest(ResourceTestCase):
    def setUp(self):
        super(BalanceResourceTest, self).setUp()

        # Create a user.
        self.email = 'user@example.com'
        self.password = 'password'
        self.user = User.objects.create_user(self.email, self.password)

    def get_credentials(self):
        '''
        Get the credentials for basic http authentication.
        '''
        return self.create_basic(username=self.email, password=self.password)

    # General tests.
    def test_basic_auth_ok(self):
        '''
        Testing auth with basic HTTP authentication.
        '''
        resp = self.api_client.get('/api/v1/data/balance/', format='json', authentication=self.get_credentials())
        self.assertValidJSONResponse(resp)

    def test_session_auth_ok(self):
        '''
        Testing auth with django's session authentication.
        User is alread logged in, so there's no need for auth data on requisition.
        '''
        self.assertTrue(self.api_client.client.login(email=self.email, password=self.password))
        resp = self.api_client.get('/api/v1/data/balance/', format='json')
        self.assertValidJSONResponse(resp)

    # List tests: GET.
    def test_get_list_unauthorized(self):
        '''
        Must be authenticated to GET to a list endpoint.
        '''
        self.assertHttpUnauthorized(self.api_client.get('/api/v1/data/balance/', format='json'))

    @mock.patch('api.resources.AverageCalculator')
    def test_get_list_json(self, calculator_cls):
        '''
        Successful GET to a list endpoint.
        '''
        calculator_cls().calculate.return_value = {'attr': 'val'}

        resp = self.api_client.get('/api/v1/data/balance/', format='json', authentication=self.get_credentials())
        self.assertValidJSONResponse(resp)

        # Here, we're checking an entire structure for the expected data.
        self.assertEqual(self.deserialize(resp), {
            u'balance': {'attr': 'val'}
        })
        self.assertTrue(calculator_cls().calculate.called)

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