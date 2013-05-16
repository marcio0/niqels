from tastypie.test import ResourceTestCase

from access.models import User
from expenses.models import Category


class ResourceTest(ResourceTestCase):
    def setUp(self):
        super(ResourceTest, self).setUp()

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
        self.fail()

    def test_session_auth_ok(self):
        '''
        Testing auth with django's session authentication.
        User is alread logged in, so there's no need for auth data on requisition.
        '''
        self.fail()

    # List tests: GET.
    def test_get_list_unauthorzied(self):
        '''
        Must be authenticated to GET to a list endpoint.
        '''
        self.fail()

    def test_get_list_json(self):
        '''
        Successful GET to a list endpoint.
        '''
        self.fail()

    # List tests: POST
    def test_post_list_unauthorized(self):
        '''
        Must be authenticated to POST a list endpoint.
        '''
        self.fail()

    def test_post_list(self):
        '''
        Successful POST to a list endpoint.
        '''
        self.fail()

    def test_post_bad_data(self):
        '''
        Unsuccessful POST to a list endpoint.
        '''
        self.fail()

    # List tests: PUT
    def test_put_list_unauthorzied(self):
        '''
        Must be authenticated to PUT to a list endpoint.
        '''
        self.fail()

    def test_put_list_bad_data(self):
        '''
        Unsuccessful PUT to a list endpoint.
        '''
        self.fail()

    def test_put_list(self):
        '''
        Successful PUT to a list endpoint.
        '''
        self.fail()

    # List tests: DELETE
    def test_delete_list_unauthorzied(self):
        '''
        Must be authenticated to DELETE to a list endpoint.
        '''
        self.fail()

    def test_delete_list(self):
        '''
        Successful DELETE to a list endpoint.
        '''
        self.fail()


    # Detail tests: GET.
    def test_get_detail_unauthorzied(self):
        '''
        Must be authenticated to GET to a detail endpoint.
        '''
        self.fail()

    def test_get_detail(self):
        '''
        Successful GET to a detail endpoint.
        '''
        self.fail()

    # Detail tests: POST
    def test_post_detail_unauthorized(self):
        '''
        Must be authenticated to POST a detail endpoint.
        '''
        self.fail()

    def test_post_detail(self):
        '''
        Successful POST to a detail endpoint.
        '''
        self.fail()

    def test_post_bad_data(self):
        '''
        Unsuccessful POST to a detail endpoint.
        '''
        self.fail()

    # Detail tests: PUT
    def test_put_detail_unauthorzied(self):
        '''
        Must be authenticated to PUT to a detail  endpoint.
        '''
        self.fail()

    def test_put_detail_bad_data(self):
        '''
        Unsuccessful PUT to a detail endpoint.
        '''
        self.fail()

    def test_put_detail(self):
        '''
        Successful PUT to a detail  endpoint.
        '''
        self.fail()

    # Detail  tests: DELETE
    def test_delete_detail_unauthorzied(self):
        '''
        Must be authenticated to DELETE to a detail  endpoint.
        '''
        self.fail()

    def test_delete_detail(self):
        '''
        Successful DELETE to a detail endpoint.
        '''
        self.fail()