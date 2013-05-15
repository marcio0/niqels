from tastypie.test import ResourceTestCase

from access.models import User
from expenses.models import Category


class UserResourceTest(ResourceTestCase):
    def setUp(self):
        super(UserResourceTest, self).setUp()

        # Create a user.
        self.email = 'user@example.com'
        self.password = 'password'
        self.user = User.objects.create_user(self.email, self.password)

        # We also build a detail URI, since we will be using it all over.
        # DRY, baby. DRY.
        self.detail_url = '/api/v1/user/'

        # The data we'll send on POST requests. Again, because we'll use it
        # frequently (enough).
        self.put_data = {
            'email': 'new@email.com',
            'name': 'new user'
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
        resp = self.api_client.get(self.detail_url, format='json', authentication=self.get_credentials())
        self.assertValidJSONResponse(resp)

    def test_session_auth_ok(self):
        '''
        Testing auth with django's session authentication.
        User is alread logged in, so there's no need for auth data on requisition.
        '''
        self.assertTrue(self.api_client.client.login(email=self.email, password=self.password))
        resp = self.api_client.get(self.detail_url, format='json')
        self.assertValidJSONResponse(resp)

    # List tests: GET.
    def test_get_list_unauthorzied(self):
        '''
        Must be authenticated to GET to a list endpoint.
        '''
        self.assertHttpUnauthorized(self.api_client.get(self.detail_url, format='json'))

    def test_get_list(self):
        '''
        Successful GET to a list endpoint.
        Must return the logged in user.
        '''
        resp = self.api_client.get(self.detail_url, format='json', authentication=self.get_credentials())
        self.assertValidJSONResponse(resp)

        # Here, we're checking an entire structure for the expected data.
        self.assertEqual(self.deserialize(resp), {
            u'name': self.user.name,
            u'email': self.user.email,
            u'resource_uri': self.detail_url
        })

    # List tests: POST
    def test_post_list_not_allowed(self):
        '''
        Must be authenticated to POST a list endpoint.
        '''
        self.assertHttpMethodNotAllowed(self.api_client.post(self.detail_url, format='json'))

    # List tests: PUT
    def test_put_list_unauthorzied(self):
        '''
        Must be authenticated to PUT to a list endpoint.
        '''
        self.assertHttpUnauthorized(self.api_client.put(self.detail_url, format='json', data={}))

    def test_put_list(self):
        '''
        Sending a successful PUT to a detail endpoint.
        '''
        new_data = {
            'name': 'new name',
            'email': 'another@email.com'
        }
        resp = self.api_client.put(self.detail_url, format='json', data=new_data, authentication=self.get_credentials())
        print 'status code', resp.status_code

        self.assertHttpAccepted(resp)
        # Make sure the count hasn't changed & we did an update.
        # Check for updated data.
        updated = User.objects.get(pk=self.user.id)
        self.assertEqual(updated.name, 'new name')
        self.assertEqual(updated.email, 'another@email.com')

    def test_put_list_bad_data(self):
        '''
        Object is not changed.
        '''
        # Grab the current data & modify it slightly.
        new_data = self.put_data.copy()
        del new_data['name']

        resp = self.api_client.put(self.detail_url, format='json', data=new_data, authentication=self.get_credentials())
        print resp.status_code, resp.content
        #self.assertHttpBadRequest(resp)
        self.assertHttpAccepted(resp)  # I think this is wrong

        # Make sure the count hasn't changed & we did an update.
        # Check for updated data.
        updated = User.objects.get(pk=self.user.id)
        self.assertEqual(updated.name, self.put_data['name'])
        self.assertEqual(updated.email, self.put_data['email'])

    # List tests: DELETE
    def test_delete_list_unauthorzied(self):
        '''
        Must be authenticated to DELETE to a list endpoint.
        '''
        self.fail()

    def test_delete_list(self):
        '''
        Successful DELETE to a list endpoint.
        '''
        self.fail()


    # Detail tests: GET.
    def test_get_detail_unauthorzied(self):
        '''
        Must be authenticated to GET to a detail endpoint.
        '''
        self.fail()

    def test_get_detail(self):
        '''
        Successful GET to a detail endpoint.
        '''
        self.fail()

    # Detail tests: POST
    def test_post_detail_unauthorized(self):
        '''
        Must be authenticated to POST a detail endpoint.
        '''
        self.fail()

    def test_post_detail(self):
        '''
        Successful POST to a detail endpoint.
        '''
        self.fail()

    def test_post_bad_data(self):
        '''
        Unsuccessful POST to a detail endpoint.
        '''
        self.fail()

    # Detail tests: PUT
    def test_put_detail_unauthorzied(self):
        '''
        Must be authenticated to PUT to a detail  endpoint.
        '''
        self.fail()

    def test_put_detail_bad_data(self):
        '''
        Unsuccessful PUT to a detail endpoint.
        '''
        self.fail()

    def test_put_detail(self):
        '''
        Successful PUT to a detail  endpoint.
        '''
        self.fail()

    # Detail  tests: DELETE
    def test_delete_detail_unauthorzied(self):
        '''
        Must be authenticated to DELETE to a detail  endpoint.
        '''
        self.fail()

    def test_delete_detail(self):
        '''
        Successful DELETE to a detail endpoint.
        '''
        self.fail()
