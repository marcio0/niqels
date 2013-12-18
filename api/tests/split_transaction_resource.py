import factory
import datetime
from decimal import Decimal

from tastypie.test import ResourceTestCase

from access.models import User
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
            'first_transaction_date': '03/03/2010',
            'total_value': '40',
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
        resp = self.api_client.get('/api/v1/splittransaction/', format='json', authentication=self.get_credentials())
        self.assertValidJSONResponse(resp)

    def test_session_auth_ok(self):
        """
        Testing auth with django's session authentication.
        User is alread logged in, so there's no need for auth data on requisition.
        """
        self.assertTrue(self.api_client.client.login(username=self.user.email, password="password"))
        resp = self.api_client.get('/api/v1/splittransaction/', format='json')
        self.assertValidJSONResponse(resp)

    # List tests: GET.
    def test_get_list_unauthorized(self):
        """
        Must be authenticated to GET to a list endpoint.
        """
        self.assertHttpUnauthorized(self.api_client.get('/api/v1/splittransaction/', format='json'))

    def test_get_list_json(self):
        """
        Successful GET to a list endpoint.
        """

        split = SplitTransaction.objects.create(user=self.user)
        split.transactions = TransactionFactory.create_batch(3, user=self.user, category_id=1)

        resp = self.api_client.get('/api/v1/splittransaction/', format='json', authentication=self.get_credentials())
        self.assertValidJSONResponse(resp)

        content = self.deserialize(resp)['objects']

        self.assertEquals(content,
                          [{u'category': None,
                            u'first_installment_date': None,
                            u'id': 1,
                            u'installments': None,
                            u'resource_uri': u'/api/v1/splittransaction/1',
                            u'total_value': None,
                            u'transactions': [u'/api/v1/transaction/1',
                                              u'/api/v1/transaction/2',
                                              u'/api/v1/transaction/3']}])