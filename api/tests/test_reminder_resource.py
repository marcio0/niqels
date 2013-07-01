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
            'date': '03/03/2010',
            'value': '40',
            'category': 'STUFF'
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
        Must be authenticated to GET to a list endpoint.
        '''
        self.assertHttpUnauthorized(self.api_client.get('/api/v1/reminder/', format='json'))

    def test_get_list_json(self):
        '''
        Successful GET to a list endpoint.
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
