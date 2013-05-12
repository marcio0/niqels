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
        '''
        Testing auth with session authentication.
        User is alread logged in, sho theres no need for auth data on requisition.
        '''
        self.assertTrue(self.api_client.client.login(email=self.email, password=self.password))
        resp = self.api_client.get('/api/v1/category/', format='json')
        self.assertValidJSONResponse(resp)


    # List tests.
    def test_get_list_unauthorzied(self):
        '''
        Must be authenticated to GET a list.
        '''
        self.assertHttpUnauthorized(self.api_client.get('/api/v1/category/', format='json'))

    def test_post_list_unauthorzied(self):
        '''
        Cannot POST to a list.
        '''
        self.assertHttpMethodNotAllowed(self.api_client.post('/api/v1/category/', format='json', authentication=self.get_credentials()))

    def test_put_list_unauthorzied(self):
        '''
        Cannot PUT to a list.
        '''
        self.assertHttpMethodNotAllowed(self.api_client.put('/api/v1/category/', format='json', authentication=self.get_credentials()))

    def test_delete_list_unauthorzied(self):
        '''
        Cannot DELETE to a list.
        '''
        self.assertHttpMethodNotAllowed(self.api_client.delete('/api/v1/category/', format='json', authentication=self.get_credentials()))

    def test_get_list_json(self):
        '''
        GET to a list.
        Must only return objects related to the user.
        '''
        resp = self.api_client.get('/api/v1/category/', format='json', authentication=self.get_credentials())
        self.assertValidJSONResponse(resp)

        # Scope out the data for correctness.
        self.assertEqual(len(self.deserialize(resp)['objects']), 2)

        # Here, we're checking an entire structure for the expected data.
        self.assertEqual(self.deserialize(resp)['objects'][0], {
            u'id': self.category.pk,
            u'name': self.category.name,
            u'color': self.category.color,
            u'resource_uri': u'/api/v1/category/%d/' % self.category.id
        })

    # Detail tests.
    def test_delete_list_unauthorzied(self):
        '''
        Cannot DELETE a category for now.
        Resource accepts the DELETE but returns a NotImplemented.
        '''
        self.assertHttpNotImplemented(self.api_client.delete('/api/v1/category/1/', format='json', authentication=self.get_credentials()))
