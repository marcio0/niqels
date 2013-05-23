import datetime

from tastypie.test import ResourceTestCase

from access.models import User
from expenses.models import Entry, Category


class TransactionResourceTest(ResourceTestCase):
    fixtures = ['TransactionResourceTest']
    def setUp(self):
        super(TransactionResourceTest, self).setUp()

        # Create a user.
        self.email = 'user@example.com'
        self.password = 'password'
        self.user = User.objects.create_user(self.email, self.password)

        self.transaction = Entry.objects.get(pk=1)

        self.post_data = {
            'date': '03/03/2010',
            'value': '40',
            'category': 'STUFF'
        }

        self.detail_url = '/api/v1/transaction/{0}'.format(self.transaction.id)

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
            u'resource_uri': u'/api/v1/transaction/%d' % self.transaction.id,
            u'category': {
                u'name': self.transaction.category.name,
                u'id': self.transaction.category.id,
                u'resource_uri': u'/api/v1/category/%d' % self.transaction.category.id,
                u'color': self.transaction.category.color
            }
        })

    # List tests: POST
    def test_post_list_unauthorized(self):
        '''
        Must be authenticated to POST a list endpoint.
        '''
        self.assertHttpUnauthorized(self.api_client.post('/api/v1/transaction/', format='json'))

    def test_post_list_existing_category(self):
        '''
        Successful POST to a list endpoint.
        '''
        # Check how many are there first.
        self.assertEqual(Entry.objects.filter(user=self.user).count(), 2)
        self.assertEqual(Category.objects.filter(user=self.user).count(), 2)

        resp = self.api_client.post('/api/v1/transaction/', format='json', data=self.post_data, authentication=self.get_credentials())
        self.assertHttpCreated(resp)

        self.assertEqual(Entry.objects.filter(user=self.user).count(), 3)
        self.assertEqual(Category.objects.filter(user=self.user).count(), 2)

    def test_post_list_new_category(self):
        '''
        Successful POST to a list endpoint.
        '''
        # Check how many are there first.
        self.assertEqual(Entry.objects.filter(user=self.user).count(), 2)
        self.assertEqual(Category.objects.filter(user=self.user).count(), 2)

        data = self.post_data.copy()
        data['category'] = 'new'

        resp = self.api_client.post('/api/v1/transaction/', format='json', data=data, authentication=self.get_credentials())
        self.assertHttpCreated(resp)

        self.assertEqual(Entry.objects.filter(user=self.user).count(), 3)
        self.assertEqual(Category.objects.filter(user=self.user).count(), 3)

    def test_post_bad_data_missing_value(self):
        '''
        Unsuccessful POST to a list endpoint.
        '''
        # Check how many are there first.
        self.assertEqual(Entry.objects.filter(user=self.user).count(), 2)
        self.assertEqual(Category.objects.filter(user=self.user).count(), 2)

        data = self.post_data.copy()
        del data['value']

        self.assertHttpBadRequest(self.api_client.post('/api/v1/transaction/', format='json', data=data, authentication=self.get_credentials()))

        # Verify a new one has been added.
        self.assertEqual(Entry.objects.filter(user=self.user).count(), 2)
        self.assertEqual(Category.objects.filter(user=self.user).count(), 2)

    def test_post_bad_data_missing_date(self):
        '''
        Unsuccessful POST to a list endpoint.
        '''
        # Check how many are there first.
        self.assertEqual(Entry.objects.filter(user=self.user).count(), 2)
        self.assertEqual(Category.objects.filter(user=self.user).count(), 2)

        data = self.post_data.copy()
        del data['date']

        self.assertHttpBadRequest(self.api_client.post('/api/v1/transaction/', format='json', data=data, authentication=self.get_credentials()))

        # Verify a new one has been added.
        self.assertEqual(Entry.objects.filter(user=self.user).count(), 2)
        self.assertEqual(Category.objects.filter(user=self.user).count(), 2)

    def test_post_bad_data_missing_category(self):
        '''
        Unsuccessful POST to a list endpoint.
        '''
        # Check how many are there first.
        self.assertEqual(Entry.objects.filter(user=self.user).count(), 2)
        self.assertEqual(Category.objects.filter(user=self.user).count(), 2)

        data = self.post_data.copy()
        del data['category']

        self.assertHttpBadRequest(self.api_client.post('/api/v1/transaction/', format='json', data=data, authentication=self.get_credentials()))

        # Verify a new one has been added.
        self.assertEqual(Entry.objects.filter(user=self.user).count(), 2)
        self.assertEqual(Category.objects.filter(user=self.user).count(), 2)


    # List tests: PUT
    def test_put_list_not_allowed(self):
        '''
        Cannot update a list of transactions.
        '''
        self.assertHttpMethodNotAllowed(self.api_client.put('/api/v1/transaction/', format='json', authentication=self.get_credentials()))

    # List tests: DELETE
    def test_delete_list_not_allowed(self):
        '''
        Must be authenticated to DELETE to a list endpoint.
        '''
        self.assertHttpMethodNotAllowed(self.api_client.delete('/api/v1/transaction/', format='json', authentication=self.get_credentials()))


    # Detail tests: GET.
    def test_get_detail_unauthorized(self):
        '''
        Must be authenticated to GET to a detail endpoint.
        '''
        self.assertHttpUnauthorized(self.api_client.get(self.detail_url, format='json'))

    def test_get_detail(self):
        '''
        Successful GET to a detail endpoint.
        '''
        resp = self.api_client.get(self.detail_url, format='json', authentication=self.get_credentials())
        self.assertValidJSONResponse(resp)

        # Here, we're checking an entire structure for the expected data.
        self.assertEqual(self.deserialize(resp), {
            u'id': self.transaction.pk,
            u'date': unicode(self.transaction.date),
            u'description': u'',
            u'value': unicode(self.transaction.value),
            u'resource_uri': u'/api/v1/transaction/%d' % self.transaction.id,
            u'category': {
                u'name': self.transaction.category.name,
                u'id': self.transaction.category.id,
                u'resource_uri': u'/api/v1/category/%d' % self.transaction.category.id,
                u'color': self.transaction.category.color
            }
        })

    def test_get_detail_own_obj_only(self):
        '''
        Can only retrieve own transactions.
        '''
        detail_url = '/api/v1/transaction/3'
        resp = self.api_client.get(detail_url, format='json', authentication=self.get_credentials())
        self.assertHttpNotFound(resp)


    # Detail tests: POST
    def test_post_detail_not_allowed(self):
        '''
        Cannot POST to a detail endpoint.
        '''
        self.assertHttpMethodNotAllowed(self.api_client.post(self.detail_url, format='json', authentication=self.get_credentials()))


    # Detail tests: PUT
    def test_put_detail_unauthorized(self):
        '''
        Must be authenticated to PUT to a detail  endpoint.
        '''
        self.assertHttpUnauthorized(self.api_client.put(self.detail_url, format='json'))

    def test_put_detail_not_implemented(self):
        '''
        Successful PUT to a detail endpoint.
        '''
        self.assertHttpNotImplemented(self.api_client.put(self.detail_url, format='json', authentication=self.get_credentials()))


    # Detail  tests: DELETE
    def test_delete_detail_unauthorized(self):
        '''
        Must be authenticated to DELETE to a detail endpoint.
        '''
        self.assertHttpUnauthorized(self.api_client.delete(self.detail_url, format='json'))

    def test_delete_detail(self):
        '''
        Successful DELETE to a detail endpoint.
        '''
        self.assertEqual(Entry.objects.filter(user=self.user).count(), 2)

        self.assertHttpAccepted(self.api_client.delete(self.detail_url, format='json', authentication=self.get_credentials()))

        self.assertEqual(Entry.objects.filter(user=self.user).count(), 1)
