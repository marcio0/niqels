from tastypie.test import ResourceTestCase
from access.models import User


def skip_if_base_class(f):
    def wrapper(self, *args, **kwargs):
        if type(self) == BaseResourceTestCase:
            self.skipTest('')
        return f(self, *args, **kwargs)
    return wrapper


class BaseResourceTestCase(ResourceTestCase):

    def setUp(self):
        super(BaseResourceTestCase, self).setUp()

        self.email = 'user@example.com'
        self.password = 'password'
        self.user = User.objects.create_user(self.email, self.password)

        self.another_user = User.objects.create_user('another@example.com', 'password')

    def get_list_url(self):
        return self.list_url

    def get_detail_url(self):
        return self.detail_url

    def get_credentials(self):
        """
        Get the credentials for basic http authentication.
        """
        return self.create_basic(username=self.email, password=self.password)

    @skip_if_base_class
    def test_basic_auth_ok(self):
        """
        Testing auth with basic HTTP authentication.
        """
        resp = self.api_client.get(self.get_list_url(), format='json', authentication=self.get_credentials())
        self.assertValidJSONResponse(resp)

    @skip_if_base_class
    def test_session_auth_ok(self):
        """
        Testing auth with django's session authentication.
        User is alread logged in, so there's no need for auth data on requisition.
        """
        self.assertTrue(self.api_client.client.login(email=self.email, password=self.password))
        resp = self.api_client.get(self.get_list_url(), format='json')
        self.assertValidJSONResponse(resp)


    ###
    ### GET TESTS
    ###

    @skip_if_base_class
    def test_get_list_unauthorized(self):
        self.assertHttpUnauthorized(self.api_client.get(self.get_list_url(), format='json'))

    @skip_if_base_class
    def test_get_list(self):
        raise NotImplementedError


    @skip_if_base_class
    def test_get_detail_unauthorized(self):
        self.assertHttpUnauthorized(self.api_client.get(self.get_detail_url(), format='json'))

    @skip_if_base_class
    def test_get_detail(self):
        raise NotImplementedError

    @skip_if_base_class
    def test_get_detail_own_objects_only(self):
        raise NotImplemented

    @skip_if_base_class
    def test_get_detail_own_objects_only(self):
        raise NotImplementedError


    ###
    ### POST TESTS
    ###

    @skip_if_base_class
    def test_post_list_unauthorized(self):
        self.assertHttpUnauthorized(self.api_client.post(self.get_list_url(), format='json'))

    @skip_if_base_class
    def test_post_list(self):
        raise NotImplementedError

    @skip_if_base_class
    def test_post_detail_unauthorized(self):
        self.assertHttpUnauthorized(self.api_client.post(self.get_detail_url(), format='json'))

    @skip_if_base_class
    def test_post_detail(self):
        raise NotImplementedError


    ###
    ### PUT TESTS
    ###

    @skip_if_base_class
    def test_put_list_unauthorized(self):
        self.assertHttpUnauthorized(self.api_client.put(self.get_list_url(), format='json'))

    @skip_if_base_class
    def test_put_list(self):
        raise NotImplementedError

    @skip_if_base_class
    def test_put_detail_unauthorized(self):
        self.assertHttpUnauthorized(self.api_client.put(self.get_detail_url(), format='json'))

    @skip_if_base_class
    def test_put_detail(self):
        raise NotImplementedError

    @skip_if_base_class
    def test_put_detail_own_objects_only(self):
        raise NotImplementedError


    ###
    ### DELETE TESTS
    ###

    @skip_if_base_class
    def test_delete_list_unauthorized(self):
        self.assertHttpUnauthorized(self.api_client.delete(self.get_list_url(), format='json'))

    @skip_if_base_class
    def test_delete_list(self):
        raise NotImplementedError

    @skip_if_base_class
    def test_delete_detail_unauthorized(self):
        self.assertHttpUnauthorized(self.api_client.delete(self.get_detail_url(), format='json'))

    @skip_if_base_class
    def test_delete_detail(self):
        raise NotImplementedError

    @skip_if_base_class
    def test_delete_detail_own_objects_only(self):
        raise NotImplementedError