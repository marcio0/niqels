import mock
import datetime

from tastypie.test import ResourceTestCase

from access.models import User
from expenses.models import Category
from api.resources import Top10CategoriesResource


class Top10CategoriesResourceTest(ResourceTestCase):
    fixtures = ['Top10CategoriesResourceTest.yaml']

    def setUp(self):
        super(Top10CategoriesResourceTest, self).setUp()

        # Create a user.
        self.email = 'user@example.com'
        self.password = 'password'
        self.user = User.objects.create_user(self.email, self.password)

        self.url = '/api/v1/data/top10categories/'

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
        resp = self.api_client.get(self.url, format='json', authentication=self.get_credentials())
        self.assertValidJSONResponse(resp)

    def test_session_auth_ok(self):
        '''
        Testing auth with django's session authentication.
        User is alread logged in, so there's no need for auth data on requisition.
        '''
        self.assertTrue(self.api_client.client.login(email=self.email, password=self.password))
        resp = self.api_client.get(self.url, format='json')
        self.assertValidJSONResponse(resp)

    # List tests: GET.
    def test_get_list_unauthorized(self):
        '''
        Must be authenticated to GET to a list endpoint.
        '''
        self.assertHttpUnauthorized(self.api_client.get(self.url, format='json'))

    def test_get_list_json(self):
        '''
        Successful GET to a list endpoint.
        '''
        data = {
            'date_start': '2010-08-01',
            'date_end': '2010-10-30'
        }
        resp = self.api_client.get(self.url, data=data, format='json', authentication=self.get_credentials())
        self.assertValidJSONResponse(resp)

        expected = [
            {
                u'name': u'groceries',
                'total': 3,
                'sum': u'600'
            },
            {
                'name': u'stuff',
                'total': 3,
                'sum': u'900'
            },
            {
                'name': u'income',
                'total': 3,
                'sum': u'1400'
            },
            {
                'name': u'other',
                'total': 3,
                'sum': u'-500'
            }
        ]
        from pprint import pprint
        pprint(self.deserialize(resp))
        pprint(expected)

        self.assertEqual(self.deserialize(resp), expected)

