import datetime

from tastypie.test import ResourceTestCase

from access.models import User
from expenses.models import Entry, Category
from reminder.models import RepeatableTransaction


class ReminderResourceTest(ResourceTestCase):
    fixtures = ['ReminderResourceTest']

    def setUp(self):
        super(ReminderResourceTest, self).setUp()

        # Create a user.
        self.email = 'user@example.com'
        self.password = 'password'
        self.user = User.objects.create_user(self.email, self.password)

        self.reminder = RepeatableTransaction.objects.get(pk=1)

        self.post_data = {
            'due_date': '2010-03-03',
            'value': '40',
            'category': 'STUFF',
            'repeat': 'monthly'
        }

        self.detail_url = '/api/v1/reminder/{0}'.format(self.reminder.id)

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
        resp = self.api_client.get('/api/v1/reminder/', format='json', authentication=self.get_credentials())
        self.assertValidJSONResponse(resp)

    def test_session_auth_ok(self):
        '''
        Testing auth with django's session authentication.
        User is alread logged in, so there's no need for auth data on requisition.
        '''
        self.assertTrue(self.api_client.client.login(email=self.email, password=self.password))
        resp = self.api_client.get('/api/v1/reminder/', format='json')
        self.assertValidJSONResponse(resp)

    # List tests: GET.
    def test_get_list_unauthorized(self):
        '''
        Tests authentication in the list endpoint through a GET request.
        '''
        self.assertHttpUnauthorized(self.api_client.get('/api/v1/reminder/', format='json'))

    def test_get_list_json(self):
        '''
        Tests a successful GET on the list endpoint.
        '''
        resp = self.api_client.get('/api/v1/reminder/', format='json', authentication=self.get_credentials())
        self.assertValidJSONResponse(resp)

        # Scope out the data for correctness.
        self.assertEqual(len(self.deserialize(resp)['objects']), 2)

        # Here, we're checking an entire structure for the expected data.
        self.assertEqual(self.deserialize(resp)['objects'][0], {
            u'id': self.reminder.pk,
            u'due_date': unicode(self.reminder.due_date),
            u'description': u'',
            u'value': unicode(self.reminder.value),
            u'repeat': unicode(self.reminder.repeat),
            u'resource_uri': u'/api/v1/reminder/%d' % self.reminder.id,
            u'category': {
                u'name': self.reminder.category.name,
                u'id': self.reminder.category.id,
                u'resource_uri': u'/api/v1/category/%d' % self.reminder.category.id,
                u'color': self.reminder.category.color
            }
        })


    # List tests: POST
    def test_post_list_unauthorized(self):
        '''
        Tests authentication in the list endpoint through a POST request.
        '''
        self.assertHttpUnauthorized(self.api_client.post('/api/v1/reminder/', format='json'))

    def test_post_list_existing_category(self):
        '''
        Tests a successful POST to a list endpoint.
        Must create a new Reminder.
        When the category already exists, create an association.
        '''
        # Check how many are there first.
        self.assertEqual(RepeatableTransaction.objects.filter(user=self.user).count(), 2)
        self.assertEqual(Category.objects.filter(user=self.user).count(), 2)

        resp = self.api_client.post('/api/v1/reminder/', format='json', data=self.post_data, authentication=self.get_credentials())
        self.assertHttpCreated(resp)

        content = self.deserialize(resp)

        self.assertEquals(content, {
            u'category': {
                u'resource_uri': u'/api/v1/category/2',
                u'id': 2,
                u'name': u'STUFF',
                u'color': u'#999999'
            },
            u'description': u'',
            u'value': u'40.0',
            u'due_date': u'2010-03-03',
            u'id': 4,
            u'repeat': 'monthly',
            u'resource_uri': u'/api/v1/reminder/4'
        })

        self.assertEqual(RepeatableTransaction.objects.filter(user=self.user).count(), 3)
        self.assertEqual(Category.objects.filter(user=self.user).count(), 2)

    def test_post_list_new_category(self):
        '''
        Tests a successful POST to a list endpoint.
        Must create a new Reminder.
        When the category does not exist, creates it and associates with the Reminder.
        '''
        # Check how many are there first.
        self.assertEqual(RepeatableTransaction.objects.filter(user=self.user).count(), 2)
        self.assertEqual(Category.objects.filter(user=self.user).count(), 2)

        data = self.post_data.copy()
        data['category'] = 'new'

        resp = self.api_client.post('/api/v1/reminder/', format='json', data=data, authentication=self.get_credentials())
        self.assertHttpCreated(resp)
        content = self.deserialize(resp)

        del content['category']['color']  # Unpredictable

        self.assertEquals(content, {
            u'category': {
                u'resource_uri': u'/api/v1/category/4',
                u'id': 4,
                u'name': u'new'
            },
            u'description': u'',
            u'value': u'40.0',
            u'due_date': u'2010-03-03',
            u'repeat': 'monthly',
            u'id': 4,
            u'resource_uri': u'/api/v1/reminder/4'
        })

        self.assertEqual(RepeatableTransaction.objects.filter(user=self.user).count(), 3)
        self.assertEqual(Category.objects.filter(user=self.user).count(), 3)

    def test_post_list_missing_value(self):
        '''
        Tests a successful POST to a list endpoint.
        Must create a new Reminder.
        When the value is absent, uses Decimal(0) as the default.
        '''

        data = self.post_data.copy()
        del data['value']

        resp = self.api_client.post('/api/v1/reminder/', format='json', data=data, authentication=self.get_credentials())
        self.assertHttpCreated(resp)
        content = self.deserialize(resp)

        self.assertEquals(content.get('value'), '0')

    def test_post_bad_data_missing_due_date(self):
        '''
        Tests a unsuccessful POST to a list endpoint.
        When the due_date is absent, returns a 400 bad request.
        '''
        # Check how many are there first.
        self.assertEqual(RepeatableTransaction.objects.filter(user=self.user).count(), 2)
        self.assertEqual(Category.objects.filter(user=self.user).count(), 2)

        data = self.post_data.copy()
        del data['due_date']

        self.assertHttpBadRequest(self.api_client.post('/api/v1/reminder/', format='json', data=data, authentication=self.get_credentials()))

        # Verify a new one hasn't been added.
        self.assertEqual(RepeatableTransaction.objects.filter(user=self.user).count(), 2)
        self.assertEqual(Category.objects.filter(user=self.user).count(), 2)

    def test_post_bad_data_missing_category(self):
        '''
        Tests a unsuccessful POST to a list endpoint.
        When the category is absent, returns a 400 bad request.
        '''
        # Check how many are there first.
        self.assertEqual(RepeatableTransaction.objects.filter(user=self.user).count(), 2)
        self.assertEqual(Category.objects.filter(user=self.user).count(), 2)

        data = self.post_data.copy()
        del data['category']

        self.assertHttpBadRequest(self.api_client.post('/api/v1/reminder/', format='json', data=data, authentication=self.get_credentials()))

        # Verify a new one hasn't been added.
        self.assertEqual(RepeatableTransaction.objects.filter(user=self.user).count(), 2)
        self.assertEqual(Category.objects.filter(user=self.user).count(), 2)

    def test_post_bad_data_missing_repeat(self):
        '''
        Tests a unsuccessful POST to a list endpoint.
        When the repeat attribute is absent, returns a 400 bad request.
        '''
        # Check how many are there first.
        self.assertEqual(RepeatableTransaction.objects.filter(user=self.user).count(), 2)
        self.assertEqual(Category.objects.filter(user=self.user).count(), 2)

        data = self.post_data.copy()
        del data['repeat']

        self.assertHttpBadRequest(self.api_client.post('/api/v1/reminder/', format='json', data=data, authentication=self.get_credentials()))

        # Verify a new one hasn't been added.
        self.assertEqual(RepeatableTransaction.objects.filter(user=self.user).count(), 2)
        self.assertEqual(Category.objects.filter(user=self.user).count(), 2)

    # List tests: PUT
    def test_put_list_not_allowed(self):
        '''
        Asserts the PUT method is not allowed on the list endpoint.
        '''
        self.assertHttpMethodNotAllowed(self.api_client.put('/api/v1/reminder/', format='json', authentication=self.get_credentials()))

    # List tests: DELETE
    def test_delete_list_not_allowed(self):
        '''
        Asserts the DELETE method is not allowed on the list endpoint.
        '''
        self.assertHttpMethodNotAllowed(self.api_client.delete('/api/v1/reminder/', format='json', authentication=self.get_credentials()))

    # Detail tests: GET.
    def test_get_detail_unauthorized(self):
        '''
        Tests authentication in the detail endpoint through a GET request.
        '''
        self.assertHttpUnauthorized(self.api_client.get(self.detail_url, format='json'))

    def test_get_detail(self):
        '''
        Tests a successful GET to a detail endpoint.
        Must return a Reminder.
        '''
        resp = self.api_client.get(self.detail_url, format='json', authentication=self.get_credentials())
        self.assertValidJSONResponse(resp)

        # Here, we're checking an entire structure for the expected data.
        self.assertEqual(self.deserialize(resp), {
            u'id': self.reminder.pk,
            u'due_date': unicode(self.reminder.due_date),
            u'description': u'',
            u'value': unicode(self.reminder.value),
            u'repeat': unicode(self.reminder.repeat),
            u'resource_uri': u'/api/v1/reminder/%d' % self.reminder.id,
            u'category': {
                u'name': self.reminder.category.name,
                u'id': self.reminder.category.id,
                u'resource_uri': u'/api/v1/category/%d' % self.reminder.category.id,
                u'color': self.reminder.category.color
            }
        })

    def test_get_detail_own_obj_only(self):
        '''
        Tests a unsuccessful GET to a detail endpoint.
        If the reminder does not belongs to the user, return a 404 not found.
        '''
        detail_url = '/api/v1/reminder/3'
        resp = self.api_client.get(detail_url, format='json', authentication=self.get_credentials())
        self.assertHttpNotFound(resp)


    # Detail tests: POST
    def test_post_detail_not_allowed(self):
        '''
        Asserts the POST method is not allowed on the detail endpoint.
        '''
        self.assertHttpMethodNotAllowed(self.api_client.post(self.detail_url, format='json', authentication=self.get_credentials()))


    # Detail tests: PUT
    def test_put_detail_not_implemented(self):
        '''
        Asserts the PUT method is not allowed on the detail endpoint.
        '''
        self.assertHttpMethodNotAllowed(self.api_client.put(self.detail_url, format='json', authentication=self.get_credentials()))


    # Detail tests: DELETE
    def test_delete_detail_unauthorized(self):
        '''
        Tests authentication in the detail endpoint through a DELETE request.
        '''
        self.assertHttpUnauthorized(self.api_client.delete(self.detail_url, format='json'))

    def test_delete_detail(self):
        '''
        Tests a successful DELETE to a detail endpoint.
        Deletes a Reminder.
        '''
        self.assertEqual(RepeatableTransaction.objects.filter(user=self.user).count(), 2)

        self.assertHttpAccepted(self.api_client.delete(self.detail_url, format='json', authentication=self.get_credentials()))

        self.assertEqual(RepeatableTransaction.objects.filter(user=self.user).count(), 1)
