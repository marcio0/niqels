from tastypie.test import ResourceTestCase

from django.test import TestCase

from access.models import User
from expenses.models import Category
from api.resources import UserResource

import mock


class UserResourceUnitTest(TestCase):
    def test_obj_get(self):
        bundle = mock.Mock()
        resource = UserResource()
        self.assertEquals(resource.obj_get(bundle), bundle.request.user)


class UserResourceTest(ResourceTestCase):
    def setUp(self):
        super(UserResourceTest, self).setUp()

        # Create a user.
        self.email = 'user@example.com'
        self.password = 'password'
        self.user = User.objects.create_user(self.email, self.password)
        self.user.name = 'name'
        self.user.save()

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

    def test_get_detail(self):
        '''
        Successful GET to a detail endpoint.
        Must return the logged in user.
        The user resource links the list uri to the detail endpoint.
        '''
        resp = self.api_client.get(self.detail_url, format='json', authentication=self.get_credentials())
        self.assertValidJSONResponse(resp)

        # Here, we're checking an entire structure for the expected data.
        self.assertEqual(self.deserialize(resp), {
            u'name': self.user.name,
            u'email': self.user.email
        })

    # List tests: POST
    def test_post(self):
        '''
        Creating a user.
        '''
        data = {
            'email': 'new@user.com',
            'name': 'john doe',
            'password': 'password'
        }
        resp = self.api_client.post(self.detail_url, data=data, format='json')
        self.assertHttpCreated(resp)

        user = User.objects.get(email=data['email'])
        self.assertEquals(user.name, data['name'])
        self.assertTrue(user.check_password(data['password']))

    def test_post_no_name(self):
        '''
        Name is required.
        '''
        data = {
            'email': 'new@user.com',
            'password': 'password'
        }
        resp = self.api_client.post(self.detail_url, data=data, format='json')
        self.assertHttpBadRequest(resp)

        content = self.deserialize(resp)
        self.assertIn('name', content.get('user'))

    def test_post_no_email(self):
        '''
        Email is required.
        '''
        data = {
            'name': 'john doe',
            'password': 'password'
        }
        resp = self.api_client.post(self.detail_url, data=data, format='json')
        self.assertHttpBadRequest(resp)

        content = self.deserialize(resp)
        self.assertIn('email', content.get('user'))

    def test_post_bad_email(self):
        '''
        Checking for valid email.
        '''
        
        data = {
            'email': 'invalid_email',
            'name': 'john doe',
            'password': 'password'
        }
        resp = self.api_client.post(self.detail_url, data=data, format='json')
        self.assertHttpBadRequest(resp)

        content = self.deserialize(resp)
        self.assertIn('email', content.get('user'))

    def test_post_no_password(self):
        '''
        Creating a user.
        '''
        data = {
            'name': 'john doe',
            'email': 'new@user.com',
        }
        resp = self.api_client.post(self.detail_url, data=data, format='json')
        self.assertHttpBadRequest(resp)

        content = self.deserialize(resp)
        self.assertIn('password', content.get('user'))

    def test_post_bad_password(self):
        '''
        Checking for password_validity.
        '''
        data = {
            'email': 'new@user.com',
            'name': 'john doe',
            'password': 'small'
        }
        resp = self.api_client.post(self.detail_url, data=data, format='json')
        self.assertHttpBadRequest(resp)

        content = self.deserialize(resp)
        self.assertIn('password', content.get('user'))

    # List tests: PUT
    def test_put_list_not_allowed(self):
        '''
        User Resource does not accept PUT.
        '''
        self.assertHttpMethodNotAllowed(self.api_client.put(self.detail_url, format='json'))

    # List tests: DELETE
    def test_delete_not_allowed(self):
        '''
        User Resource does not accept PUT.
        '''
        self.assertHttpMethodNotAllowed(self.api_client.delete(self.detail_url, format='json'))

    # Detail tests: GET.
    def test_get_detail_unauthorzied(self):
        '''
        Must be authenticated to GET to a detail endpoint.
        '''
        self.assertHttpMethodNotAllowed(self.api_client.delete(self.detail_url, format='json'))

    def test_get_detail_with_id(self):
        '''
        There is no endpoint on User resource with default detaul URIs.
        '''
        self.assertHttpMethodNotAllowed(self.api_client.delete(self.detail_url + '1/', format='json'))
