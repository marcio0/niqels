from django.test import TestCase

from access.managers import UserManager
from access.models import User


class UserTest(TestCase):
    def test_properties(self):
        user = User()
        user.email = "user@expenses.com"
        user.name = "dude"

        self.assertEquals(user.get_full_name(), "dude")
        self.assertEquals(user.get_short_name(), "dude")
        self.assertEquals(unicode(user), user.email)

    def test_admin_staff_status(self):
        user = User()
        
        self.assertFalse(user.is_staff)

        user.is_admin = True
        self.assertTrue(user.is_staff)


class UserManagerTest(TestCase):
    def test_create_user(self):
        m = UserManager()
        m.model = User

        u = m.create_user(
            email="new_user@expenses.com",
            password="pass"
        )

        self.assertTrue(u.check_password('pass'))

    def test_create_user_without_email_raises(self):
        m = UserManager()
        m.model = User

        self.assertRaises(
            ValueError,
            m.create_user,
            None,
            password="pass"
        )

    def test_create_superuser(self):
        m = UserManager()
        m.model = User

        u = m.create_superuser(
            email="new_user@expenses.com",
            password="pass"
        )

        self.assertTrue(u.is_admin)
        self.assertTrue(u.is_superuser)
