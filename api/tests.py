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
        self.detail_url = '/api/v1/category/{0}/'.format(self.category.pk)

        # The data we'll send on POST requests. Again, because we'll use it
        # frequently (enough).
        self.post_data = {
            'color': '#fefefe',
            'name': 'new'
        }

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
        Testing auth with django's session authentication.
        User is alread logged in, sho theres no need for auth data on requisition.
        '''
        self.assertTrue(self.api_client.client.login(email=self.email, password=self.password))
        resp = self.api_client.get('/api/v1/category/', format='json')
        self.assertValidJSONResponse(resp)

    # List tests: GET.
    def test_get_list_unauthorzied(self):
        '''
        Must be authenticated to GET a list.
        '''
        self.assertHttpUnauthorized(self.api_client.get('/api/v1/category/', format='json'))

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

    # List tests: POST
    def test_post_list_unauthorized(self):
        '''
        Must be authenticated to POST a category.
        '''
        self.assertHttpUnauthorized(self.api_client.post('/api/v1/category/', format='json'))

    def test_post_list(self):
        # Check how many are there first.
        self.assertEqual(Category.objects.count(), 3)

        self.assertHttpCreated(self.api_client.post('/api/v1/category/', format='json', data=self.post_data, authentication=self.get_credentials()))

        # Verify a new one has been added.
        self.assertEqual(Category.objects.count(), 4) 

    # List tests: PUT
    def test_put_list_unauthorzied(self):
        '''
        Cannot PUT to a list.
        '''
        self.assertHttpMethodNotAllowed(self.api_client.put('/api/v1/category/', format='json', authentication=self.get_credentials()))

    # List tests: DELETE
    def test_delete_list_unauthorzied(self):
        '''
        Cannot DELETE to a list.
        '''
        self.assertHttpMethodNotAllowed(self.api_client.delete('/api/v1/category/', format='json', authentication=self.get_credentials()))


    # Detail tests: GET.
    def test_only_own_objects(self):
        '''
        Can only retrieve own objects.
        '''
        self.assertHttpNotFound(self.api_client.get('/api/v1/category/3/', format='json', authentication=self.get_credentials()))

    def test_get_detail_unauthorized(self):
        '''
        Must be authenticated to GET a category.
        '''
        self.assertHttpUnauthorized(self.api_client.get(self.detail_url, format='json'))

    def test_get_detail(self):
        resp = self.api_client.get(self.detail_url, format='json', authentication=self.get_credentials())
        self.assertValidJSONResponse(resp)

        # We use ``assertKeys`` here to just verify the keys, not all the data.
        self.assertKeys(self.deserialize(resp), ['name', 'color', 'id', 'resource_uri'])
        self.assertEqual(self.deserialize(resp)['name'], 'Groceries')

    # Detail tests: POST
    def test_post_detail_not_allowed(self):
        '''
        Cannot POST to detail.
        '''
        self.assertHttpMethodNotAllowed(self.api_client.post(self.detail_url, format='json', authentication=self.get_credentials()))

    # Detail tests: DELETE
    def test_delete_detail_not_implemented(self):
        '''
        Cannot DELETE a category for now.
        Resource accepts the DELETE but returns a NotImplemented.
        '''
        self.assertHttpNotImplemented(self.api_client.delete('/api/v1/category/1/', format='json', authentication=self.get_credentials()))
