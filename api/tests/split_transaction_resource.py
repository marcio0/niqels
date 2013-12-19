import factory
import mock
import datetime
from decimal import Decimal

from tastypie.test import ResourceTestCase

from access.models import User
from api.resources import SplitTransactionResource
from expenses.models import Transaction, Category, SplitTransaction


class UserFactory(factory.django.DjangoModelFactory):
    FACTORY_FOR = User
    FACTORY_DJANGO_GET_OR_CREATE = ('email',)

    email = 'user@example.com'
    password = 'password'


class TransactionFactory(factory.Factory):
    FACTORY_FOR = Transaction

    value = Decimal("10")
    user = factory.SubFactory(UserFactory)
    date = datetime.date.today()
    created = datetime.datetime.now()


class SplitTransactionResourceTest(ResourceTestCase):
    fixtures = ['testserver_data']

    def setUp(self):
        super(SplitTransactionResourceTest, self).setUp()

        #self.user = UserFactory.create()
        self.email = 'user@example.com'
        self.password = 'password'
        self.user = User.objects.create_user(self.email, self.password)

        self.post_data = {
            'first_installment_date': '03/03/2010',
            'total_value': '90',
            'installments': 3,
            'category': '/api/v1/category/2'
        }

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
        resp = self.api_client.get('/api/v1/split_transaction/', format='json', authentication=self.get_credentials())
        self.assertValidJSONResponse(resp)

    def test_session_auth_ok(self):
        """
        Testing auth with django's session authentication.
        User is alread logged in, so there's no need for auth data on requisition.
        """
        self.assertTrue(self.api_client.client.login(username=self.user.email, password="password"))
        resp = self.api_client.get('/api/v1/split_transaction/', format='json')
        self.assertValidJSONResponse(resp)

    # List tests: GET.
    def test_get_list_unauthorized(self):
        """
        Must be authenticated to GET to a list endpoint.
        """
        self.assertHttpUnauthorized(self.api_client.get('/api/v1/split_transaction/', format='json'))

    def test_get_list_json(self):
        """
        Successful GET to a list endpoint.
        """

        split = SplitTransaction.objects.create(user=self.user)
        split.transactions = TransactionFactory.create_batch(3, user=self.user, category_id=1, date=datetime.date(2010, 10, 10))

        resp = self.api_client.get('/api/v1/split_transaction/', format='json', authentication=self.get_credentials())
        self.assertValidJSONResponse(resp)

        content = self.deserialize(resp)['objects']
        self.maxDiff = None

        self.assertEquals(content,
                          [{u'category': None,
                            u'first_installment_date': None,
                            u'id': 1,
                            u'installments': None,
                            u'resource_uri': u'/api/v1/split_transaction/1',
                            u'total_value': None,
                            u'transactions': [{u'category': {u'group': u'Receitas',
                                                             u'id': 1,
                                                             u'is_negative': False,
                                                             u'name': u'Sal\xe1rio',
                                                             u'resource_uri': u'/api/v1/category/1'},
                                               u'date': u'2010-10-10',
                                               u'description': u'',
                                               u'id': 1,
                                               u'resource_uri': u'/api/v1/transaction/1',
                                               u'value': u'10'},
                                              {u'category': {u'group': u'Receitas',
                                                             u'id': 1,
                                                             u'is_negative': False,
                                                             u'name': u'Sal\xe1rio',
                                                             u'resource_uri': u'/api/v1/category/1'},
                                               u'date': u'2010-10-10',
                                               u'description': u'',
                                               u'id': 2,
                                               u'resource_uri': u'/api/v1/transaction/2',
                                               u'value': u'10'},
                                              {u'category': {u'group': u'Receitas',
                                                             u'id': 1,
                                                             u'is_negative': False,
                                                             u'name': u'Sal\xe1rio',
                                                             u'resource_uri': u'/api/v1/category/1'},
                                               u'date': u'2010-10-10',
                                               u'description': u'',
                                               u'id': 3,
                                               u'resource_uri': u'/api/v1/transaction/3',
                                               u'value': u'10'}]}])

    def test_post_list_unauthorized(self):
        """
        Must be authenticated to POST a list endpoint.
        """
        self.assertHttpUnauthorized(self.api_client.post('/api/v1/split_transaction/', format='json'))

    def test_create_installments(self):
        bundle = mock.Mock()
        bundle.data = self.post_data.copy()
        bundle.obj.user = self.user

        bundle.data['total_value'] = Decimal(bundle.data['total_value'])
        bundle.data['first_installment_date'] = datetime.date(2010, 10, 10)
        bundle.data['category'] = 2

        self.assertEquals(Transaction.objects.count(), 0)

        transactions = SplitTransactionResource()._create_installments(bundle)

        self.assertEquals(len(transactions), 3)

        for transaction in transactions:
            self.assertEquals(transaction.value, Decimal(30))
            self.assertEquals(transaction.category_id, 2)
            self.assertEquals(transaction.date, datetime.date(2010, 10, 10))

        self.assertEquals(Transaction.objects.count(), 3)

    def test_post_list(self):
        """
        Sucessfuly creating a split transaction and it's installments.
        """

        self.assertEquals(SplitTransaction.objects.count(), 0)
        self.assertEquals(Transaction.objects.count(), 0)

        resp = self.api_client.post('/api/v1/split_transaction/', data=self.post_data, format='json', authentication=self.get_credentials())
        self.assertHttpCreated(resp)

        split = self.deserialize(resp)
        self.assertEquals(split, {u'category': {u'group': u'Receitas',
                                                u'id': 2,
                                                u'is_negative': False,
                                                u'name': u'Extras',
                                                u'resource_uri': u'/api/v1/category/2'},
                                  u'first_installment_date': None,
                                  u'id': 1,
                                  u'installments': None,
                                  u'resource_uri': u'/api/v1/split_transaction/1',
                                  u'total_value': None,
                                  u'transactions': [{u'category': {u'group': u'Receitas',
                                                                   u'id': 2,
                                                                   u'is_negative': False,
                                                                   u'name': u'Extras',
                                                                   u'resource_uri': u'/api/v1/category/2'},
                                                     u'date': u'2010-03-03',
                                                     u'description': u'',
                                                     u'id': 1,
                                                     u'resource_uri': u'/api/v1/transaction/1',
                                                     u'value': u'30'},
                                                    {u'category': {u'group': u'Receitas',
                                                                   u'id': 2,
                                                                   u'is_negative': False,
                                                                   u'name': u'Extras',
                                                                   u'resource_uri': u'/api/v1/category/2'},
                                                     u'date': u'2010-03-03',
                                                     u'description': u'',
                                                     u'id': 2,
                                                     u'resource_uri': u'/api/v1/transaction/2',
                                                     u'value': u'30'},
                                                    {u'category': {u'group': u'Receitas',
                                                                   u'id': 2,
                                                                   u'is_negative': False,
                                                                   u'name': u'Extras',
                                                                   u'resource_uri': u'/api/v1/category/2'},
                                                     u'date': u'2010-03-03',
                                                     u'description': u'',
                                                     u'id': 3,
                                                     u'resource_uri': u'/api/v1/transaction/3',
                                                     u'value': u'30'}]
        })

        split_id = split['id']

        self.assertEquals(SplitTransaction.objects.count(), 1)
        self.assertEquals(Transaction.objects.filter(installment_of__id=split_id).count(), 3)