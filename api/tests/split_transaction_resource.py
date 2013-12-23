import factory
import mock
import datetime
from decimal import Decimal

from tastypie.test import ResourceTestCase

from access.models import User
from api.resources import SplitTransactionResource
from expenses.models import Transaction, Category, SplitTransaction, CategoryGroup


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
    description = 'a split transaction'


class SplitTransactionResourceTest(ResourceTestCase):

    def setUp(self):
        super(SplitTransactionResourceTest, self).setUp()
        self.maxDiff = None

        CategoryGroup.objects.create(name="group")
        Category.objects.create(name="cat1", is_negative=False, group_id=1)
        Category.objects.create(name="cat2", is_negative=True, group_id=1)


        #self.user = UserFactory.create()
        self.email = 'user@example.com'
        self.password = 'password'
        self.user = User.objects.create_user(self.email, self.password)

        self.post_data = {
            'first_installment_date': '2010-03-03',
            'total_value': '90',
            'installments': 3,
            'category': '/api/v1/category/2',
            'description': 'a split transaction'
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

        self.assertEquals(content,
                          [{u'category': None,
                            u'first_installment_date': u'2010-10-10',
                            u'id': 1,
                            u'installments': 3,
                            u'resource_uri': u'/api/v1/split_transaction/1',
                            u'total_value': u'30.00',
                            u'description': u'a split transaction',
                            u'transactions': [{u'category': {u'group': u'group',
                                                             u'id': 1,
                                                             u'is_negative': False,
                                                             u'name': u'cat1',
                                                             u'resource_uri': u'/api/v1/category/1'},
                                               u'date': u'2010-10-10',
                                               u'description': u'a split transaction',
                                               u'id': 1,
                                               u'resource_uri': u'/api/v1/transaction/1',
                                               u'value': u'10'},
                                              {u'category': {u'group': u'group',
                                                             u'id': 1,
                                                             u'is_negative': False,
                                                             u'name': u'cat1',
                                                             u'resource_uri': u'/api/v1/category/1'},
                                               u'date': u'2010-10-10',
                                               u'description': u'a split transaction',
                                               u'id': 2,
                                               u'resource_uri': u'/api/v1/transaction/2',
                                               u'value': u'10'},
                                              {u'category': {u'group': u'group',
                                                             u'id': 1,
                                                             u'is_negative': False,
                                                             u'name': u'cat1',
                                                             u'resource_uri': u'/api/v1/category/1'},
                                               u'date': u'2010-10-10',
                                               u'description': u'a split transaction',
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
        bundle.obj.category = Category.objects.get(pk=2)

        bundle.data['total_value'] = Decimal(bundle.data['total_value'])
        bundle.data['first_installment_date'] = datetime.date(2010, 5, 10)

        self.assertEquals(Transaction.objects.count(), 0)

        transactions = SplitTransactionResource()._create_installments(bundle)

        self.assertEquals(len(transactions), 3)

        month = 5
        for transaction in transactions:
            self.assertEquals(transaction.value, Decimal(30))
            self.assertEquals(transaction.category_id, 2)
            self.assertEquals(transaction.date, datetime.date(2010, month, 10))

            month += 1

        self.assertEquals(Transaction.objects.count(), 3)

    def test_post_list_negative_transaction(self):
        """
        Sucessfuly creating a split transaction and it's installments.
        Testing negative values.
        """

        self.assertEquals(SplitTransaction.objects.count(), 0)
        self.assertEquals(Transaction.objects.count(), 0)

        resp = self.api_client.post('/api/v1/split_transaction/', data=self.post_data, format='json', authentication=self.get_credentials())
        self.assertHttpCreated(resp)

        split = self.deserialize(resp)
        self.assertEquals(split, {u'category': {u'group': u'group',
                                                u'id': 2,
                                                u'is_negative': True,
                                                u'name': u'cat2',
                                                u'resource_uri': u'/api/v1/category/2'},
                                  u'first_installment_date': u'2010-03-03',
                                  u'id': 1,
                                  u'installments': 3,
                                  u'resource_uri': u'/api/v1/split_transaction/1',
                                  u'total_value': u'90',
                                  u'description': u'a split transaction',
                                  u'transactions': [{u'category': {u'group': u'group',
                                                                   u'id': 2,
                                                                   u'is_negative': True,
                                                                   u'name': u'cat2',
                                                                   u'resource_uri': u'/api/v1/category/2'},
                                                     u'date': u'2010-03-03',
                                                     u'description': u'a split transaction',
                                                     u'id': 1,
                                                     u'resource_uri': u'/api/v1/transaction/1',
                                                     u'value': u'-30'},
                                                    {u'category': {u'group': u'group',
                                                                   u'id': 2,
                                                                   u'is_negative': True,
                                                                   u'name': u'cat2',
                                                                   u'resource_uri': u'/api/v1/category/2'},
                                                     u'date': u'2010-04-03',
                                                     u'description': u'a split transaction',
                                                     u'id': 2,
                                                     u'resource_uri': u'/api/v1/transaction/2',
                                                     u'value': u'-30'},
                                                    {u'category': {u'group': u'group',
                                                                   u'id': 2,
                                                                   u'is_negative': True,
                                                                   u'name': u'cat2',
                                                                   u'resource_uri': u'/api/v1/category/2'},
                                                     u'date': u'2010-05-03',
                                                     u'description': u'a split transaction',
                                                     u'id': 3,
                                                     u'resource_uri': u'/api/v1/transaction/3',
                                                     u'value': u'-30'}]
        })

        split_id = split['id']

        self.assertEquals(SplitTransaction.objects.count(), 1)
        self.assertEquals(Transaction.objects.filter(installment_of__id=split_id).count(), 3)

    def test_post_list_description_optional(self):
        """
        Description is not obligatory.
        """

        self.assertEquals(SplitTransaction.objects.count(), 0)

        data = self.post_data.copy()
        del data['description']

        resp = self.api_client.post('/api/v1/split_transaction/', data=data, format='json', authentication=self.get_credentials())
        self.assertHttpCreated(resp)

        self.assertEquals(SplitTransaction.objects.count(), 1)

    def test_post_list_positive_transaction(self):
        """
        Sucessfuly creating a split transaction and it's installments.
        Testing positive values.
        """

        self.assertEquals(SplitTransaction.objects.count(), 0)
        self.assertEquals(Transaction.objects.count(), 0)

        data = self.post_data.copy()
        data['category'] = '/api/v1/category/1'

        resp = self.api_client.post('/api/v1/split_transaction/', data=data, format='json', authentication=self.get_credentials())
        self.assertHttpCreated(resp)

        split = self.deserialize(resp)
        self.assertEquals(split, {u'category': {u'group': u'group',
                                                u'id': 1,
                                                u'is_negative': False,
                                                u'name': u'cat1',
                                                u'resource_uri': u'/api/v1/category/1'},
                                  u'first_installment_date': u'2010-03-03',
                                  u'id': 1,
                                  u'description': u'a split transaction',
                                  u'installments': 3,
                                  u'resource_uri': u'/api/v1/split_transaction/1',
                                  u'total_value': u'90',
                                  u'transactions': [{u'category': {u'group': u'group',
                                                                   u'id': 1,
                                                                   u'is_negative': False,
                                                                   u'name': u'cat1',
                                                                   u'resource_uri': u'/api/v1/category/1'},
                                                     u'date': u'2010-03-03',
                                                     u'description': u'a split transaction',
                                                     u'id': 1,
                                                     u'resource_uri': u'/api/v1/transaction/1',
                                                     u'value': u'30'},
                                                    {u'category': {u'group': u'group',
                                                                   u'id': 1,
                                                                   u'is_negative': False,
                                                                   u'name': u'cat1',
                                                                   u'resource_uri': u'/api/v1/category/1'},
                                                     u'date': u'2010-04-03',
                                                     u'description': u'a split transaction',
                                                     u'id': 2,
                                                     u'resource_uri': u'/api/v1/transaction/2',
                                                     u'value': u'30'},
                                                    {u'category': {u'group': u'group',
                                                                   u'id': 1,
                                                                   u'is_negative': False,
                                                                   u'name': u'cat1',
                                                                   u'resource_uri': u'/api/v1/category/1'},
                                                     u'date': u'2010-05-03',
                                                     u'id': 3,
                                                     u'description': u'a split transaction',
                                                     u'resource_uri': u'/api/v1/transaction/3',
                                                     u'value': u''
                                                               u'30'}]
        })

        split_id = split['id']

        self.assertEquals(SplitTransaction.objects.count(), 1)
        self.assertEquals(Transaction.objects.filter(installment_of__id=split_id).count(), 3)

    def test_post_category_does_not_exist(self):
        """
        Should return HTTP 400 Bad Request.
        """

        self.assertEquals(SplitTransaction.objects.count(), 0)
        self.assertEquals(Transaction.objects.count(), 0)

        data = self.post_data.copy()
        data['category'] = '/api/v1/category/3'

        resp = self.api_client.post('/api/v1/split_transaction/', data=data, format='json', authentication=self.get_credentials())
        self.assertHttpBadRequest(resp)

        self.assertEquals(SplitTransaction.objects.count(), 0)
        self.assertEquals(Transaction.objects.count(), 0)

    def test_post_missing_date(self):
        """
        Should return HTTP 400 Bad Request.
        """

        self.assertEquals(SplitTransaction.objects.count(), 0)
        self.assertEquals(Transaction.objects.count(), 0)

        data = self.post_data.copy()
        del data['first_installment_date']

        resp = self.api_client.post('/api/v1/split_transaction/', data=data, format='json', authentication=self.get_credentials())
        self.assertHttpBadRequest(resp)

        content = self.deserialize(resp)
        self.assertTrue('first_installment_date' in content['split_transaction'])

        self.assertEquals(SplitTransaction.objects.count(), 0)
        self.assertEquals(Transaction.objects.count(), 0)

    def test_post_installments_greater_than_zero(self):
        """
        Should return HTTP 400 Bad Request.
        """
        self.assertEquals(SplitTransaction.objects.count(), 0)
        self.assertEquals(Transaction.objects.count(), 0)

        data = self.post_data.copy()
        data['installments'] = 0

        resp = self.api_client.post('/api/v1/split_transaction/', data=data, format='json', authentication=self.get_credentials())
        self.assertHttpBadRequest(resp)

        content = self.deserialize(resp)
        self.assertTrue('installments' in content['split_transaction'])

        self.assertEquals(SplitTransaction.objects.count(), 0)
        self.assertEquals(Transaction.objects.count(), 0)

    # List tests: PUT
    def test_put_list_not_allowed(self):
        self.assertHttpMethodNotAllowed(self.api_client.put('/api/v1/split_transaction/', format='json', authentication=self.get_credentials()))

    # List tests: DELETE
    def test_delete_list_not_allowed(self):
        self.assertHttpMethodNotAllowed(self.api_client.delete('/api/v1/split_transaction/', format='json', authentication=self.get_credentials()))

    # Detail tests: GET
    def test_get_detail(self):
        split = SplitTransaction.objects.create(user=self.user)
        split.transactions = TransactionFactory.create_batch(3, user=self.user, category_id=1, date=datetime.date(2010, 10, 10))

        resp = self.api_client.get('/api/v1/split_transaction/1', format='json', authentication=self.get_credentials())
        self.assertValidJSONResponse(resp)

        content = self.deserialize(resp)

        self.assertEquals(content,
                          {u'category': None,
                           u'first_installment_date': u'2010-10-10',
                           u'id': 1,
                           u'installments': 3,
                           u'resource_uri': u'/api/v1/split_transaction/1',
                           u'total_value': u'30.00',
                           u'description': u'a split transaction',
                           u'transactions': [{u'category': {u'group': u'group',
                                                            u'id': 1,
                                                            u'is_negative': False,
                                                            u'name': u'cat1',
                                                            u'resource_uri': u'/api/v1/category/1'},
                                              u'date': u'2010-10-10',
                                              u'description': u'a split transaction',
                                              u'id': 1,
                                              u'resource_uri': u'/api/v1/transaction/1',
                                              u'value': u'10'},
                                             {u'category': {u'group': u'group',
                                                            u'id': 1,
                                                            u'is_negative': False,
                                                            u'name': u'cat1',
                                                            u'resource_uri': u'/api/v1/category/1'},
                                              u'date': u'2010-10-10',
                                              u'description': u'a split transaction',
                                              u'id': 2,
                                              u'resource_uri': u'/api/v1/transaction/2',
                                              u'value': u'10'},
                                             {u'category': {u'group': u'group',
                                                            u'id': 1,
                                                            u'is_negative': False,
                                                            u'name': u'cat1',
                                                            u'resource_uri': u'/api/v1/category/1'},
                                              u'date': u'2010-10-10',
                                              u'description': u'a split transaction',
                                              u'id': 3,
                                              u'resource_uri': u'/api/v1/transaction/3',
                                              u'value': u'10'}]})

    # Detail tests: POST
    def test_post_detail_not_allowed(self):
        self.assertHttpMethodNotAllowed(self.api_client.post('/api/v1/split_transaction/1', format='json', authentication=self.get_credentials()))

    # Detail tests: PUT
    def test_put_detail_not_allowed(self):
        self.assertHttpMethodNotAllowed(self.api_client.put('/api/v1/split_transaction/1', format='json', authentication=self.get_credentials()))

    # Detail tests: DELETE
    def test_delete_detail_not_allowed(self):
        self.assertHttpMethodNotAllowed(self.api_client.delete('/api/v1/split_transaction/1', format='json', authentication=self.get_credentials()))
