import datetime
from decimal import Decimal
from expenses.models import CategoryGroup
from expenses.tests.base import BaseResourceTestCase
from expenses.tests.factories import CategoryFactory, TransactionFactory
from restrictions.models import BaseCategoryRestriction, MonthlyCategoryRestriction
from restrictions.tests.factories import BaseCategoryRestrictionFactory, MonthlyCategoryRestrictionFactory


class MonthleRestrictionResourceTest(BaseResourceTestCase):
    list_url = '/api/v1/restrictions/2010-10'

    def setUp(self):
        super(MonthleRestrictionResourceTest, self).setUp()

        self.categories = CategoryFactory.create_batch(2)

        base_1 = BaseCategoryRestrictionFactory.create(user=self.user, category=self.categories[0], value=Decimal('-100'))
        base_2 = BaseCategoryRestrictionFactory.create(user=self.user, category=self.categories[1], value=Decimal('-200'))
        self.base_restriction = base_1

        restriction1 = MonthlyCategoryRestrictionFactory.create(baserestriction=base_1, month=datetime.date(2010, 10, 1))
        restriction2 = MonthlyCategoryRestrictionFactory.create(baserestriction=base_2, month=datetime.date(2010, 10, 1))
        self.restriction = restriction1

        # creating a restriction for another user
        self.another_base_restriction = BaseCategoryRestrictionFactory.create(user=self.another_user, category=self.categories[1], value=Decimal('-200'))
        self.another_restriction = MonthlyCategoryRestrictionFactory.create(baserestriction=self.another_base_restriction, month=datetime.date(2010, 10, 10))


    def get_detail_url(self, id=None):
        if not id:
            id = self.base_restriction.id

        return '/api/v1/restrictions/category/monthly/{0}'.format(id)

    def test_get_list(self):
        TransactionFactory.create(date=datetime.date(2010, 10, 10), value=Decimal(-20), user=self.user, category=self.categories[0])

        resp = self.api_client.get(self.list_url, format='json', authentication=self.get_credentials())
        self.assertValidJSONResponse(resp)

        objects = self.deserialize(resp)['objects']

        self.assertEqual(len(objects), 2)

        self.assertEquals(objects, [
            {
                u'id': 1,
                u'resource_uri': u'/api/v1/restrictions/category/monthly/1',
                u'base': u'/api/v1/category/1',
                u'spent': u'-20.00',
                u'value': u'-100',
                u'month': u'2010-10-01'
            },
            {
                u'id': 2,
                u'resource_uri': u'/api/v1/restrictions/category/monthly/2',
                u'base': u'/api/v1/category/2',
                u'spent': u'0',
                u'value': u'-200',
                u'month': u'2010-10-01'
            }
        ])


class RestrictionResourceTest(BaseResourceTestCase):
    list_url = '/api/v1/restrictions/category/base'

    def setUp(self):
        super(RestrictionResourceTest, self).setUp()

        group = CategoryGroup.objects.create(name='group')

        self.categories = CategoryFactory.create_batch(2, group=group)

        self.restriction = BaseCategoryRestrictionFactory.create(user=self.user, category=self.categories[0], value=Decimal('-100'))
        BaseCategoryRestrictionFactory.create(user=self.user, category=self.categories[1], value=Decimal('-200'))

        # creating a restriction for another user
        self.another_restriction = BaseCategoryRestrictionFactory.create(user=self.another_user, category=self.categories[1], value=Decimal('-200'))

        self.detail_url = '/api/v1/restrictions/category/base/{0}'.format(self.restriction.id)


    ###
    ### GET TESTS
    ###

    def test_get_list(self):

        TransactionFactory.create(date=datetime.date.today(), value=Decimal(10), user=self.user, category_id=1)

        resp = self.api_client.get('/api/v1/restrictions/category/base', format='json', authentication=self.get_credentials())
        self.assertValidJSONResponse(resp)

        self.assertEqual(len(self.deserialize(resp)['objects']), 2)

        self.assertEquals(self.deserialize(resp)['objects'], [
            {
                u'category': u'/api/v1/category/1',
                u'id': 1,
                u'resource_uri': u'/api/v1/restrictions/category/base/1',
                u'value': u'-100'
            },
            {
                u'category': u'/api/v1/category/2',
                u'id': 2,
                u'resource_uri': u'/api/v1/restrictions/category/base/2',
                u'value': u'-200'
            }
        ])

    def test_get_detail(self):
        resp = self.api_client.get(self.get_detail_url(), format='json', authentication=self.get_credentials())

        self.assertValidJSONResponse(resp)
        self.assertEquals(self.deserialize(resp), {
            u'category': u'/api/v1/category/1',
            u'id': 1,
            u'resource_uri': u'/api/v1/restrictions/category/base/1',
            u'value': u'-100'
        })

    def test_get_detail_own_objects_only(self):
        another_retriction = BaseCategoryRestriction.objects.filter(user_id=self.another_user.id)[0]
        url = '/api/v1/restrictions/category/base/{0}'.format(another_retriction.id)

        resp = self.api_client.get(url, format='json', authentication=self.get_credentials())
        self.assertHttpUnauthorized(resp)


    ###
    ### POST TESTS
    ###

    def test_post_list(self):
        # Check how many are there first.
        self.assertEqual(BaseCategoryRestriction.objects.filter(user=self.user).count(), 2)

        # creating a new category to avoid unique clash
        category = CategoryFactory.create()

        post_data = {
            'value': Decimal(-350),
            'category': '/api/v1/category/%d' % category.id
        }

        resp = self.api_client.post(self.get_list_url(), format='json', data=post_data, authentication=self.get_credentials())
        self.assertHttpCreated(resp)

        content = self.deserialize(resp)

        self.assertEquals(content, {
            u'category': u'/api/v1/category/%d' % category.id,
            u'id': 4,
            u'value': u'-350',
            u'resource_uri': u'/api/v1/restrictions/category/base/4'
        })

        self.assertEqual(BaseCategoryRestriction.objects.filter(user=self.user).count(), 3)

    def test_post_list_uniqueness(self):
        """
        Testing for uniqueness of category and user combination.
        """
        # Check how many are there first.
        self.assertEqual(BaseCategoryRestriction.objects.filter(user=self.user).count(), 2)

        post_data = {
            'value': Decimal(-350),
            'category': '/api/v1/category/1'
        }

        resp = self.api_client.post(self.get_list_url(), format='json', data=post_data, authentication=self.get_credentials())
        self.assertHttpBadRequest(resp)

        self.assertEqual(BaseCategoryRestriction.objects.filter(user=self.user).count(), 2)

    def test_post_list_send_user_no_effect(self):
        """
        Sending "user" property should have no effect.
        It must use the logged-in user.
        """
        # Check how many are there first.
        self.assertEqual(BaseCategoryRestriction.objects.filter(user=self.user).count(), 2)

        # creating a new category to avoid unique clash
        category = CategoryFactory.create()

        post_data = {
            'value': Decimal(-350),
            'category': '/api/v1/category/%d' % category.id,
            'user': 2
        }

        resp = self.api_client.post(self.get_list_url(), format='json', data=post_data, authentication=self.get_credentials())
        self.assertHttpCreated(resp)

        self.assertEqual(BaseCategoryRestriction.objects.filter(user=self.user).count(), 3)

    def test_post_list_bad_data_no_category(self):
        """
        The category property is mandatory.
        """
        # Check how many are there first.
        self.assertEqual(BaseCategoryRestriction.objects.filter(user=self.user).count(), 2)

        post_data = {
            'value': '-400'
        }

        resp = self.api_client.post(self.get_list_url(), format='json', data=post_data, authentication=self.get_credentials())
        self.assertHttpBadRequest(resp)

        self.assertEqual(BaseCategoryRestriction.objects.filter(user=self.user).count(), 2)

    def test_post_detail_unauthorized(self):
        self.skipTest('Not needed')

    def test_post_detail(self):
        post_data = {}
        resp = self.api_client.post(self.get_detail_url(), format='json', data=post_data, authentication=self.get_credentials())
        self.assertHttpMethodNotAllowed(resp)


    ###
    ### PUT TESTS
    ###

    def test_put_list(self):
        resp = self.api_client.put(self.get_list_url(), format='json', data={}, authentication=self.get_credentials())
        self.assertHttpMethodNotAllowed(resp)

    def test_put_list_unauthorized(self):
        self.skipTest('')

    def test_put_detail(self):
        actual_value = self.restriction.value

        data = {
            'id': self.restriction.id,
            'value': actual_value + Decimal("-100")
        }

        resp = self.api_client.put(self.get_detail_url(), format='json', data=data, authentication=self.get_credentials())
        self.assertHttpAccepted(resp)

        content = self.deserialize(resp)
        self.assertEquals(content['value'], str(data['value']))

        restriction = BaseCategoryRestriction.objects.get(pk=self.restriction.id)
        self.assertEquals(restriction.value, data['value'])

    def test_put_detail_cant_change_category(self):
        data = {
            'category': '/api/v1/category/%d' % (self.restriction.category_id + 1)
        }

        resp = self.api_client.put(self.get_detail_url(), format='json', data=data, authentication=self.get_credentials())
        self.assertHttpBadRequest(resp)

    def test_put_detail_no_category_in_data(self):
        """
        There should be no problem with the category missing on put requests.
        """
        data = {}

        resp = self.api_client.put(self.get_detail_url(), format='json', data=data, authentication=self.get_credentials())
        self.assertHttpAccepted(resp)

        restriction = BaseCategoryRestriction.objects.get(pk=self.restriction.id)

        self.assertEquals(self.restriction.category_id, restriction.category_id)
        self.assertEquals(self.restriction.value, restriction.value)

    def test_put_detail_own_objects_only(self):
        data = {
            'value': Decimal(999)
        }

        resp = self.api_client.put('/api/v1/restrictions/category/base/%d' % self.another_restriction.id , format='json', data=data, authentication=self.get_credentials())
        self.assertHttpUnauthorized(resp)

        restriction = BaseCategoryRestriction.objects.get(pk=self.restriction.id)

        self.assertEquals(self.restriction.category_id, restriction.category_id)
        self.assertEquals(self.restriction.value, restriction.value)


    ###
    ### DELETE TESTS
    ###

    def test_delete_list(self):
        resp = self.api_client.delete(self.get_list_url(), format='json', authentication=self.get_credentials())
        self.assertHttpMethodNotAllowed(resp)

    def test_delete_list_unauthorized(self):
        self.skipTest('')

    def test_delete_detail(self):
        resp = self.api_client.delete(self.get_detail_url(), format='json', authentication=self.get_credentials())
        self.assertHttpAccepted(resp)

    def test_delete_detail_own_objects_only(self):
        resp = self.api_client.delete('/api/v1/restrictions/category/base/%d' % self.another_restriction.id, format='json', authentication=self.get_credentials())
        self.assertHttpUnauthorized(resp)