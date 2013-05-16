import datetime

from tastypie.test import ResourceTestCase

from access.models import User
from expenses.models import Entry


class TransactionResourceTest(ResourceTestCase):
    fixtures = ['TransactionResourceTest']
    def setUp(self):
        super(TransactionResourceTest, self).setUp()

        # Create a user.
        self.email = 'user@example.com'
        self.password = 'password'
        self.user = User.objects.create_user(self.email, self.password)

        self.transaction = Entry.objects.get(pk=1)

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
        resp = self.api_client.get('/api/v1/transaction/', format='json', authentication=self.get_credentials())
        self.assertValidJSONResponse(resp)

    def test_session_auth_ok(self):
        '''
        Testing auth with django's session authentication.
        User is alread logged in, so there's no need for auth data on requisition.
        '''
        self.assertTrue(self.api_client.client.login(email=self.email, password=self.password))
        resp = self.api_client.get('/api/v1/transaction/', format='json')
        self.assertValidJSONResponse(resp)

    # List tests: GET.
    def test_get_list_unauthorized(self):
        '''
        Must be authenticated to GET to a list endpoint.
        '''
        self.assertHttpUnauthorized(self.api_client.get('/api/v1/transaction/', format='json'))

    def test_get_list_json(self):
        '''
        Successful GET to a list endpoint.
        '''
        resp = self.api_client.get('/api/v1/transaction/', format='json', authentication=self.get_credentials())
        self.assertValidJSONResponse(resp)

        # Scope out the data for correctness.
        self.assertEqual(len(self.deserialize(resp)['objects']), 2)

        # Here, we're checking an entire structure for the expected data.
        self.assertEqual(self.deserialize(resp)['objects'][0], {
            u'id': self.transaction.pk,
            u'date': unicode(self.transaction.date),
            u'description': u'',
            u'value': unicode(self.transaction.value),
            u'resource_uri': u'/api/v1/transaction/%d/' % self.transaction.id,
            u'category': {
                u'name': self.transaction.category.name,
                u'id': self.transaction.category.id,
                u'resource_uri': u'/api/v1/category/%d/' % self.transaction.category.id,
                u'color': self.transaction.category.color
            }
        })

    # List tests: POST
    def test_post_list_unauthorized(self):
        '''
        Must be authenticated to POST a list endpoint.
        '''
        self.fail()

    def test_post_list(self):
        '''
        Successful POST to a list endpoint.
        '''
        self.fail()

    def test_post_bad_data(self):
        '''
        Unsuccessful POST to a list endpoint.
        '''
        self.fail()

    # List tests: PUT
    def test_put_list_unauthorzied(self):
        '''
        Must be authenticated to PUT to a list endpoint.
        '''
        self.fail()

    def test_put_list_bad_data(self):
        '''
        Unsuccessful PUT to a list endpoint.
        '''
        self.fail()

    def test_put_list(self):
        '''
        Successful PUT to a list endpoint.
        '''
        self.fail()

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
