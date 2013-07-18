from tastypie.test import ResourceTestCase

from access.models import User
from expenses.models import Category


class ResourceTest(ResourceTestCase):
    def setUp(self):
        super(ResourceTest, self).setUp()

    def get_credentials(self):
        '''
        Get the credentials for basic http authentication.
        '''
        return self.create_basic(username=self.email, password=self.password)

    def test__unauthorized(self):
        self.assertHttpUnauthorized(self.api_client.METHOD('URL', format='json'))

    def test__not_allowed(self):
        self.assertHttpMethodNotAllowed(self.api_client.METHOD('URL', format='json', authentication=self.get_credentials()))

    def test__post_ok(self):
        resp = self.api_client.post('URL', format='json', data={}, authentication=self.get_credentials())
        self.assertHttpCreated(resp)
