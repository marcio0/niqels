from decimal import Decimal
import datetime

from tastypie.test import ResourceTestCase
from django.test import TestCase
from django.utils import timezone

from access.models import User
from expenses.models import Transaction
from api.resources.transaction_resource import _truncate_date_tzinfo


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
        """
        Get the credentials for basic http authentication.
        """
        return self.create_basic(username=self.email, password=self.password)

    # General tests.
    def test_basic_auth_ok(self):
        """
        Testing auth with basic HTTP authentication.
        """
        resp = self.api_client.get('/api/v1/transaction/', format='json', authentication=self.get_credentials())
        self.assertValidJSONResponse(resp)

    def test_session_auth_ok(self):
        """
        Testing auth with django's session authentication.
        User is alread logged in, so there's no need for auth data on requisition.
        """
        self.assertTrue(self.api_client.client.login(email=self.email, password=self.password))
        resp = self.api_client.get('/api/v1/transaction/', format='json')
        self.assertValidJSONResponse(resp)

    # List tests: GET.
    def test_get_list_unauthorized(self):
        """
        Must be authenticated to GET to a list endpoint.
        """
        self.assertHttpUnauthorized(self.api_client.get('/api/v1/transaction/', format='json'))

    def test_get_list_json(self):
        """
        Successful GET to a list endpoint.
        """
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
                u'id': 1,
                u'is_negative': True,
                u'name': u'groceries',
                u'resource_uri': u'/api/v1/category/1',
                u'group': u'group'
            }
        })

    # List tests: POST
    def test_post_list_unauthorized(self):
        """
        Must be authenticated to POST a list endpoint.
        """
        self.assertHttpUnauthorized(self.api_client.post('/api/v1/transaction/', format='json'))

    def test_post_negative_transaction(self):
        """
        If category.is_negative, the value must be negative.
        """
        # Check how many are there first.
        self.assertEqual(Transaction.objects.filter(user=self.user).count(), 2)

        resp = self.api_client.post('/api/v1/transaction/', format='json', data=self.post_data, authentication=self.get_credentials())
        self.assertHttpCreated(resp)

        content = self.deserialize(resp)

        self.assertEquals(content, {
            u'description': u'',
            u'value': u'-40',
            u'date': u'2010-03-03',
            u'id': 4,
            u'resource_uri': u'/api/v1/transaction/4',
            u'category': {
                u'id': 2,
                u'is_negative': True,
                u'name': u'STUFF',
                u'resource_uri': u'/api/v1/category/2',
                u'group': u'group'
            }
        })

        self.assertEqual(Transaction.objects.filter(user=self.user).count(), 3)
        self.assertEqual(Transaction.objects.get(pk=content['id']).value, Decimal(-40))

    def test_post_repeating_decimal(self):
        """
        In [2]: Decimal(3232.32)
        Out[2]: Decimal('3232.32000000000016370904631912708282470703125')
        """
        # Check how many are there first.
        self.assertEqual(Transaction.objects.filter(user=self.user).count(), 2)

        data = self.post_data.copy()
        data['value'] = "3232,32"

        resp = self.api_client.post('/api/v1/transaction/', format='json', data=data, authentication=self.get_credentials())
        self.assertHttpCreated(resp)

        content = self.deserialize(resp)

        self.assertEquals(content, {
            u'description': u'',
            u'value': u'-3232.32',
            u'date': u'2010-03-03',
            u'id': 4,
            u'resource_uri': u'/api/v1/transaction/4',
            u'category': {
                u'id': 2,
                u'is_negative': True,
                u'name': u'STUFF',
                u'resource_uri': u'/api/v1/category/2',
                u'group': u'group'
            }
        })

        self.assertEqual(Transaction.objects.filter(user=self.user).count(), 3)
        self.assertEqual(Transaction.objects.get(pk=content['id']).value, Decimal("-3232.32"))

    def test_post_positive_transaction(self):
        """
        If not category.is_negative, the value must be positive.
        """
        # Check how many are there first.
        self.assertEqual(Transaction.objects.filter(user=self.user).count(), 2)

        data = self.post_data.copy()
        data['category'] = '/api/v1/category/5'
        resp = self.api_client.post('/api/v1/transaction/', format='json', data=data, authentication=self.get_credentials())
        self.assertHttpCreated(resp)

        content = self.deserialize(resp)

        self.assertEquals(content, {
            u'description': u'',
            u'value': u'40',
            u'date': u'2010-03-03',
            u'id': 4,
            u'resource_uri': u'/api/v1/transaction/4',
            u'category': {
                u'id': 5,
                u'is_negative': False,
                u'name': u'positive',
                u'resource_uri': u'/api/v1/category/5',
                u'group': u'group'
            }
        })

        self.assertEqual(Transaction.objects.filter(user=self.user).count(), 3)
        self.assertEqual(Transaction.objects.get(pk=content['id']).value, Decimal(40))

    def test_post_value_signal_irrelevant(self):
        """
        Even if the value on request data is negative, use transaction to set it as positive/negative.
        """
        # Check how many are there first.
        self.assertEqual(Transaction.objects.filter(user=self.user).count(), 2)

        data = self.post_data.copy()
        data['category'] = '/api/v1/category/5'
        data['value'] = '-40'
        resp = self.api_client.post('/api/v1/transaction/', format='json', data=data, authentication=self.get_credentials())
        self.assertHttpCreated(resp)

        content = self.deserialize(resp)

        self.assertEquals(content, {
            u'description': u'',
            u'value': u'40',
            u'date': u'2010-03-03',
            u'id': 4,
            u'resource_uri': u'/api/v1/transaction/4',
            u'category': {
                u'id': 5,
                u'is_negative': False,
                u'name': u'positive',
                u'resource_uri': u'/api/v1/category/5',
                u'group': u'group'
            }
        })

        self.assertEqual(Transaction.objects.filter(user=self.user).count(), 3)
        self.assertEqual(Transaction.objects.get(pk=content['id']).value, Decimal(40))

    def test_post_with_int_as_value(self):
        """
        The resource should also accept integer as a value.
        """
        # Check how many are there first.
        self.assertEqual(Transaction.objects.filter(user=self.user).count(), 2)

        data = self.post_data.copy()
        data['value'] = 5

        resp = self.api_client.post('/api/v1/transaction/', format='json', data=data, authentication=self.get_credentials())
        self.assertHttpCreated(resp)

        content = self.deserialize(resp)

        self.assertEquals(content['value'], u'-5')

        self.assertEqual(Transaction.objects.filter(user=self.user).count(), 3)

    def test_post_list_category_doesnt_exist(self):
        """
        If the category does not exist, the api must return a 400 Bad Request.
        """
        # Check how many are there first.
        self.assertEqual(Transaction.objects.filter(user=self.user).count(), 2)

        data = self.post_data.copy()
        data['category'] = 10000

        resp = self.api_client.post('/api/v1/transaction/', format='json', data=data, authentication=self.get_credentials())
        self.assertHttpBadRequest(resp)

        self.assertEqual(Transaction.objects.filter(user=self.user).count(), 2)

    def test_post_value_another_format(self):
        """
        Must try to fix the number format.
        """
        # Check how many are there first.
        self.assertEqual(Transaction.objects.filter(user=self.user).count(), 2)

        data = self.post_data.copy()
        data['value'] = '4.840,00'

        resp = self.api_client.post('/api/v1/transaction/', format='json', data=data, authentication=self.get_credentials())
        self.assertHttpCreated(resp)

        # Verify a new one has been added.
        self.assertEqual(Transaction.objects.filter(user=self.user).count(), 3)

    def test_post_value_default(self):
        """
        The default value for the value attribute is zero.
        """
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
        """
        Unsuccessful POST to a list endpoint.
        """
        # Check how many are there first.
        self.assertEqual(Transaction.objects.filter(user=self.user).count(), 2)

        data = self.post_data.copy()
        del data['date']

        resp = self.api_client.post('/api/v1/transaction/', format='json', data=data, authentication=self.get_credentials())
        self.assertHttpBadRequest(resp)

        content = self.deserialize(resp)
        self.assertTrue('date' in content['transaction'])

        # Verify a new one has been added.
        self.assertEqual(Transaction.objects.filter(user=self.user).count(), 2)

    # List tests: PUT
    def test_put_list_not_allowed(self):
        """
        Cannot update a list of transactions.
        """
        self.assertHttpMethodNotAllowed(self.api_client.put('/api/v1/transaction/', format='json', authentication=self.get_credentials()))

    # List tests: DELETE
    def test_delete_list_not_allowed(self):
        """
        Must be authenticated to DELETE to a list endpoint.
        """
        self.assertHttpMethodNotAllowed(self.api_client.delete('/api/v1/transaction/', format='json', authentication=self.get_credentials()))


    # Detail tests: GET.
    def test_get_detail_unauthorized(self):
        """
        Must be authenticated to GET to a detail endpoint.
        """
        self.assertHttpUnauthorized(self.api_client.get(self.detail_url, format='json'))

    def test_get_detail(self):
        """
        Successful GET to a detail endpoint.
        """
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
                u'is_negative': True,
                u'id': 1,
                u'name': u'groceries',
                u'resource_uri': u'/api/v1/category/1',
                u'group': u'group'
            }
        })

    def test_get_detail_own_obj_only(self):
        """
        Can only retrieve own transactions.
        """
        detail_url = '/api/v1/transaction/3'
        resp = self.api_client.get(detail_url, format='json', authentication=self.get_credentials())
        self.assertHttpNotFound(resp)

    # Detail tests: POST
    def test_post_detail_not_allowed(self):
        """
        Cannot POST to a detail endpoint.
        """
        self.assertHttpMethodNotAllowed(self.api_client.post(self.detail_url, format='json', authentication=self.get_credentials()))


    # Detail tests: PUT
    def test_put_detail_unauthorized(self):
        """
        Must be authenticated to PUT to a detail  endpoint.
        """
        self.assertHttpUnauthorized(self.api_client.put(self.detail_url, format='json'))

    def test_put_detail_not_implemented(self):
        """
        Successful PUT to a detail endpoint.
        """
        self.assertHttpNotImplemented(self.api_client.put(self.detail_url, format='json', authentication=self.get_credentials()))


    # Detail  tests: DELETE
    def test_delete_detail_unauthorized(self):
        """
        Must be authenticated to DELETE to a detail endpoint.
        """
        self.assertHttpUnauthorized(self.api_client.delete(self.detail_url, format='json'))

    def test_delete_detail(self):
        """
        Successful DELETE to a detail endpoint.
        """
        self.assertEqual(Transaction.objects.filter(user=self.user).count(), 2)

        self.assertHttpAccepted(self.api_client.delete(self.detail_url, format='json', authentication=self.get_credentials()))

        self.assertEqual(Transaction.objects.filter(user=self.user).count(), 1)


class GroupedTransactionResourceTest(ResourceTestCase):
    fixtures = ['GroupedTransactionResourceTest']

    def setUp(self):
        super(GroupedTransactionResourceTest, self).setUp()

        # Create a user.
        self.email = 'user1@expenses.com'
        self.password = 'password'

    def get_credentials(self):
        """
        Get the credentials for basic http authentication.
        """
        return self.create_basic(username=self.email, password=self.password)

    # General tests.
    def test_basic_auth_ok(self):
        """
        Testing auth with basic HTTP authentication.
        """
        resp = self.api_client.get('/api/v1/transaction/?group_by=category__name', format='json', authentication=self.get_credentials())
        self.assertValidJSONResponse(resp)

    def test_session_auth_ok(self):
        """
        Testing auth with django's session authentication.
        User is alread logged in, so there's no need for auth data on requisition.
        """
        self.assertTrue(self.api_client.client.login(email=self.email, password=self.password))
        resp = self.api_client.get('/api/v1/transaction/?group_by=category__name', format='json')
        self.assertValidJSONResponse(resp)

    def test_group_by_category_name(self):
        resp = self.api_client.get('/api/v1/transaction/?group_by=category__name', format='json', authentication=self.get_credentials())
        self.assertValidJSONResponse(resp)

        self.assertEqual(self.deserialize(resp), {
            'meta': {
                'limit': 100,
                'next': None,
                'previous': None,
                'offset': 0,
                'total_count': 4
            },
            'objects': [
                {'category__name': u'group1', 'sum': '-120.00', 'total': 3},
                {'category__name': u'group2', 'sum': '260.00', 'total': 5},
                {'category__name': u'group3', 'sum': '330.00', 'total': 5},
                {'category__name': u'group4', 'sum': '-50.00', 'total': 5}
            ]
        })

    def test_group_by_date_month(self):
        resp = self.api_client.get('/api/v1/transaction/?group_by=date__month', format='json', authentication=self.get_credentials())
        self.assertValidJSONResponse(resp)

        self.assertEqual(self.deserialize(resp), {
            'meta': {
                'limit': 100,
                'next': None,
                'previous': None,
                'offset': 0,
                'total_count': 3
            },
            'objects': [
                {'sum': '150.00', 'total': 6, 'date__month': u'2010-01-01'},
                {'sum': '120.00', 'total': 6, 'date__month': u'2010-02-01'},
                {'sum': '150.00', 'total': 6, 'date__month': u'2010-03-01'}
            ]
        })

    def test_group_by_date_day(self):
        resp = self.api_client.get('/api/v1/transaction/?group_by=date__day', format='json', authentication=self.get_credentials())
        self.assertValidJSONResponse(resp)

        self.assertEqual(self.deserialize(resp), {
            'meta': {
                'limit': 100,
                'next': None,
                'previous': None,
                'offset': 0,
                'total_count': 14
            },
            'objects': [
                {'date__day': u'2010-01-01', 'sum': '-100.00', 'total': 1},
                {'date__day': u'2010-01-02', 'sum': '-100.00', 'total': 1},
                {'date__day': u'2010-01-03', 'sum': '-100.00', 'total': 1},
                {'date__day': u'2010-01-04', 'sum': '150.00', 'total': 1},
                {'date__day': u'2010-01-11', 'sum': '150.00', 'total': 1},
                {'date__day': u'2010-01-15', 'sum': '150.00', 'total': 1},
                {'date__day': u'2010-02-01', 'sum': '40.00', 'total': 2},
                {'date__day': u'2010-02-02', 'sum': '-120.00', 'total': 1},
                {'date__day': u'2010-02-03', 'sum': '-120.00', 'total': 1},
                {'date__day': u'2010-02-11', 'sum': '160.00', 'total': 1},
                {'date__day': u'2010-02-15', 'sum': '160.00', 'total': 1},
                {'date__day': u'2010-03-02', 'sum': '50.00', 'total': 2},
                {'date__day': u'2010-03-11', 'sum': '50.00', 'total': 2},
                {'date__day': u'2010-03-15', 'sum': '50.00', 'total': 2}
            ]
        })

    def test_group_by_date_year(self):
        resp = self.api_client.get('/api/v1/transaction/?group_by=date__year', format='json', authentication=self.get_credentials())
        self.assertValidJSONResponse(resp)

        self.assertEqual(self.deserialize(resp), {
            'meta': {
                'limit': 100,
                'next': None,
                'previous': None,
                'offset': 0,
                'total_count': 1
            },
            'objects': [{'sum': '420.00', 'total': 18, 'date__year': u'2010-01-01'}]
        })

    def test_two_groups(self):
        resp = self.api_client.get('/api/v1/transaction/?group_by=date__month,category__name', format='json', authentication=self.get_credentials())
        self.assertValidJSONResponse(resp)

        self.assertEqual(self.deserialize(resp), {
            'meta': {
                'limit': 100,
                'next': None,
                'previous': None,
                'offset': 0,
                'total_count': 12
            },
            'objects': [
                {'category__name': u'group1', 'sum': '150.00', 'total': 1, 'date__month': u'2010-01-01'},
                {'category__name': u'group2', 'sum': '50.00', 'total': 2, 'date__month': u'2010-01-01'},
                {'category__name': u'group3', 'sum': '50.00', 'total': 2, 'date__month': u'2010-01-01'},
                {'category__name': u'group4', 'sum': '-100.00', 'total': 1, 'date__month': u'2010-01-01'},
                {'category__name': u'group1', 'sum': '-120.00', 'total': 1, 'date__month': u'2010-02-01'},
                {'category__name': u'group2', 'sum': '160.00', 'total': 1, 'date__month': u'2010-02-01'},
                {'category__name': u'group3', 'sum': '-120.00', 'total': 1, 'date__month': u'2010-02-01'},
                {'category__name': u'group4', 'sum': '200.00', 'total': 3, 'date__month': u'2010-02-01'},
                {'category__name': u'group1', 'sum': '-150.00', 'total': 1, 'date__month': u'2010-03-01'},
                {'category__name': u'group2', 'sum': '50.00', 'total': 2, 'date__month': u'2010-03-01'},
                {'category__name': u'group3', 'sum': '400.00', 'total': 2, 'date__month': u'2010-03-01'},
                {'category__name': u'group4', 'sum': '-150.00', 'total': 1, 'date__month': u'2010-03-01'}
            ]
        })

    def test_grouping_not_allowed(self):
        resp = self.api_client.get('/api/v1/transaction/?group_by=category__group__name', format='json', authentication=self.get_credentials())
        self.assertHttpBadRequest(resp)

    def test_aditional_filters(self):
        resp = self.api_client.get('/api/v1/transaction/?group_by=date__month&date__gte=2010-03-01', format='json', authentication=self.get_credentials())
        self.assertValidJSONResponse(resp)

        self.assertEqual(self.deserialize(resp), {
            'meta': {
                'limit': 100,
                'next': None,
                'previous': None,
                'offset': 0,
                'total_count': 1
            },
            'objects': [{'sum': '150.00', 'total': 6, 'date__month': u'2010-03-01'}]
        })

class DateGroupTruncateTest(TestCase):
    def test_truncate_unicode(self):
        objects = [
            {'date__day': u'2010-10-10 00:00:00'},
            {'date__month': u'2010-10-11 00:00:00'},
            {'date__year': u'2010-10-12 00:00:00'}
        ]

        _truncate_date_tzinfo(objects)

        self.assertEquals(objects, [
            {'date__day': u'2010-10-10'},
            {'date__month': u'2010-10-11'},
            {'date__year': u'2010-10-12'}
        ])

    def test_no_date_group(self):
        objects = [
            {'some_group': 'value'}
        ]

        _truncate_date_tzinfo(objects)

        self.assertEquals(objects, [
            {'some_group': 'value'}
        ])

    def test_truncate_timezone(self):
        objects = [
            {'date__day': timezone.make_aware(datetime.datetime(2010, 10, 10), timezone.utc)},
            {'date__month': timezone.make_aware(datetime.datetime(2010, 10, 10), timezone.utc)},
            {'date__year': timezone.make_aware(datetime.datetime(2010, 10, 10), timezone.utc)}
        ]

        _truncate_date_tzinfo(objects)

        self.assertEquals(objects, [
            {'date__day': datetime.datetime(2010, 10, 10)},
            {'date__month': datetime.datetime(2010, 10, 10)},
            {'date__year': datetime.datetime(2010, 10, 10)}
        ])