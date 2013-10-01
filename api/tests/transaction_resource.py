import datetime

from tastypie.test import ResourceTestCase

from access.models import User
from expenses.models import Transaction, Category


class TransactionResourceTest(ResourceTestCase):
    fixtures = ['TransactionResourceTest']

    def setUp(self):
        super(TransactionResourceTest, self).setUp()

        # Create a user.
        self.email = 'user@example.com'
        self.password = 'password'
        self.user = User.objects.create_user(self.email, self.password)

        self.transaction = Transaction.objects.get(pk=1)

        self.post_data = {
            'date': '03/03/2010',
            'value': '40',
            'category': '/api/v1/category/2'
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
            u'category': {u'custom': False,
                u'default_active': True,
                u'id': 1,
                u'name': u'groceries',
                u'resource_uri': u'/api/v1/category/1',
                u'group': u'group'
            }
        })

    # List tests: POST
    def test_post_list_unauthorized(self):
        '''
        Must be authenticated to POST a list endpoint.
        '''
        self.assertHttpUnauthorized(self.api_client.post('/api/v1/transaction/', format='json'))

    def test_post_list_success(self):
        '''
        Successful POST to a list endpoint.
        '''
        # Check how many are there first.
        self.assertEqual(Transaction.objects.filter(user=self.user).count(), 2)

        resp = self.api_client.post('/api/v1/transaction/', format='json', data=self.post_data, authentication=self.get_credentials())
        self.assertHttpCreated(resp)

        content = self.deserialize(resp)

        self.assertEquals(content, {
            u'description': u'',
            u'value': u'40.0',
            u'date': u'2010-03-03',
            u'id': 4,
            u'resource_uri': u'/api/v1/transaction/4',
            u'category': {u'custom': False,
                u'default_active': True,
                u'id': 2,
                u'name': u'STUFF',
                u'resource_uri': u'/api/v1/category/2',
                u'group': u'group'
            }
        })

        self.assertEqual(Transaction.objects.filter(user=self.user).count(), 3)

    def test_post_with_int_as_value(self):
        '''
        The resource should also accept integer as a value.
        '''
        # Check how many are there first.
        self.assertEqual(Transaction.objects.filter(user=self.user).count(), 2)

        data = self.post_data.copy()
        data['value'] = 5

        resp = self.api_client.post('/api/v1/transaction/', format='json', data=data, authentication=self.get_credentials())
        self.assertHttpCreated(resp)

        content = self.deserialize(resp)

        self.assertEquals(content['value'], u'5.0')

        self.assertEqual(Transaction.objects.filter(user=self.user).count(), 3)

    def test_post_list_category_doesnt_exist(self):
        '''
        If the category does not exist, the api must return a 400 Bad Request.
        '''
        # Check how many are there first.
        self.assertEqual(Transaction.objects.filter(user=self.user).count(), 2)

        data = self.post_data.copy()
        data['category'] = 10000

        resp = self.api_client.post('/api/v1/transaction/', format='json', data=data, authentication=self.get_credentials())
        self.assertHttpBadRequest(resp)
        content = self.deserialize(resp)

        self.assertEqual(Transaction.objects.filter(user=self.user).count(), 2)

    def test_post_value_another_format(self):
        '''
        Must try to fix the number format.
        '''
        # Check how many are there first.
        self.assertEqual(Transaction.objects.filter(user=self.user).count(), 2)

        data = self.post_data.copy()
        data['value'] = '4.840,00'

        resp = self.api_client.post('/api/v1/transaction/', format='json', data=data, authentication=self.get_credentials())
        self.assertHttpCreated(resp)

        # Verify a new one has been added.
        self.assertEqual(Transaction.objects.filter(user=self.user).count(), 3)

    def test_post_value_default(self):
        '''
        The default value for the value attribute is zero.
        '''
        # Check how many are there first.
        self.assertEqual(Transaction.objects.filter(user=self.user).count(), 2)

        data = self.post_data.copy()
        del data['value']

        resp = self.api_client.post('/api/v1/transaction/', format='json', data=data, authentication=self.get_credentials())
        self.assertHttpCreated(resp)
        content = self.deserialize(resp)

        self.assertEquals(content['value'], '0')

        # Verify a new one has been added.
        self.assertEqual(Transaction.objects.filter(user=self.user).count(), 3)

    def test_post_bad_data_missing_date(self):
        '''
        Unsuccessful POST to a list endpoint.
        '''
        # Check how many are there first.
        self.assertEqual(Transaction.objects.filter(user=self.user).count(), 2)

        data = self.post_data.copy()
        del data['date']

        self.assertHttpBadRequest(self.api_client.post('/api/v1/transaction/', format='json', data=data, authentication=self.get_credentials()))

        # Verify a new one has been added.
        self.assertEqual(Transaction.objects.filter(user=self.user).count(), 2)

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
            u'category': {u'custom': False,
                u'default_active': True,
                u'id': 1,
                u'name': u'groceries',
                u'resource_uri': u'/api/v1/category/1',
                u'group': u'group'
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
        self.assertEqual(Transaction.objects.filter(user=self.user).count(), 2)

        self.assertHttpAccepted(self.api_client.delete(self.detail_url, format='json', authentication=self.get_credentials()))

        self.assertEqual(Transaction.objects.filter(user=self.user).count(), 1)
