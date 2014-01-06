from tastypie.test import ResourceTestCase

from access.models import User
from expenses.models import Category


class CategoryResourceTest(ResourceTestCase):
    fixtures = ['CategoryResourceTest']

    def setUp(self):
        super(CategoryResourceTest, self).setUp()

        # Create a user.
        self.email = 'user@example.com'
        self.password = 'password'
        self.user = User.objects.create_user(self.email, self.password)

        self.category = Category.objects.get(name="Groceries")

        # We also build a detail URI, since we will be using it all over.
        # DRY, baby. DRY.
        self.detail_url = '/api/v1/category/{0}'.format(self.category.pk)

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
        resp = self.api_client.get('/api/v1/category/', format='json', authentication=self.get_credentials())
        self.assertValidJSONResponse(resp)

    def test_session_auth_ok(self):
        """
        Testing auth with django's session authentication.
        User is alread logged in, sho theres no need for auth data on requisition.
        """
        self.assertTrue(self.api_client.client.login(email=self.email, password=self.password))
        resp = self.api_client.get('/api/v1/category/', format='json')
        self.assertValidJSONResponse(resp)

    # List tests: GET.
    def test_get_list_unauthorzied(self):
        """
        Must be authenticated to GET a list.
        """
        self.assertHttpUnauthorized(self.api_client.get('/api/v1/category/', format='json'))

    def test_get_list(self):
        """
        GET to a list endpoint.
        Must return all objects.
        """
        resp = self.api_client.get('/api/v1/category/', format='json', authentication=self.get_credentials())
        self.assertValidJSONResponse(resp)

        self.assertEqual(len(self.deserialize(resp)['objects']), 4)

        self.assertEqual(self.deserialize(resp)['objects'][0], {
            u'id': self.category.pk,
            u'name': self.category.name,
            u'is_negative': False,
            u'resource_uri': u'/api/v1/category/%d' % self.category.id,
            u'group': u'group',
            u'position': 1
        })

    # List tests: POST
    def test_unauthorized_methods(self):
        """
        POST, PUT and DELETE to both detail and list enpoints are not aloowed.
        """
        self.assertHttpMethodNotAllowed(self.api_client.post('/api/v1/category/', format='json', authentication=self.get_credentials()))
        self.assertHttpMethodNotAllowed(self.api_client.put('/api/v1/category/', format='json', authentication=self.get_credentials()))
        self.assertHttpMethodNotAllowed(self.api_client.delete('/api/v1/category/', format='json', authentication=self.get_credentials()))
        self.assertHttpMethodNotAllowed(self.api_client.post(self.detail_url, format='json', authentication=self.get_credentials()))
        self.assertHttpMethodNotAllowed(self.api_client.delete('/api/v1/category/1/', format='json', authentication=self.get_credentials()))
        self.assertHttpMethodNotAllowed(self.api_client.put(self.detail_url, format='json', data={}, authentication=self.get_credentials()))

    # Detail tests: GET.
    def test_get_detail_unauthorized(self):
        """
        Must be authenticated to GET to a detailt endpoint.
        """
        self.assertHttpUnauthorized(self.api_client.get(self.detail_url, format='json'))

    def test_get_detail(self):
        """
        Retrieving a category.
        """
        resp = self.api_client.get(self.detail_url, format='json', authentication=self.get_credentials())
        self.assertValidJSONResponse(resp)

        # We use ``assertKeys`` here to just verify the keys, not all the data.
        self.assertKeys(self.deserialize(resp), ['name', 'id', 'resource_uri', 'group', 'is_negative', 'position'])
        self.assertEqual(self.deserialize(resp)['name'], 'Groceries')
