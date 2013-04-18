from django.test import TestCase, Client

from access import views
from access.models import User
from access import forms


class LoginViewTest(TestCase):
    def test_already_authenticated_user(self):
        # TODO: make this work
        user = User.objects.create_user(
            email='register@expenses.com',
            password='test'
        )

        client = Client()
        client.login(
            email=user.email,
            password='test'
        )

        ret = client.get('/login/')
        self.assertEquals(ret.status_code, 302)
        self.assertEquals(ret.get('location'), 'http://testserver/')

class RegisterViewTest(TestCase):
    def test_already_authenticated_user(self):
        user = User.objects.create_user(
            email='register@expenses.com',
            password='test'
        )

        client = Client()
        client.login(
            email=user.email,
            password='test'
        )

        ret = client.get('/register/')
        self.assertEquals(ret.status_code, 302)
        self.assertEquals(ret.get('location'), 'http://testserver/entries/')

    def test_get(self):
        client = Client()

        ret = client.get('/register/')

        self.assertEquals(ret.status_code, 200)

        self.assertIsInstance(ret.context['register_form'], forms.UserCreationForm)

    def test_post(self):
        data = {
            'name': 'foo',
            'email': 'new@expenses.com',
            'password1': 'asd',
            'password2': 'asd'
        }
        client = Client()

        ret = client.post('/register/', data)

        self.assertEquals(ret.status_code, 302)
        self.assertEquals(ret.get('location'), 'http://testserver/login/')

        self.assertTrue(
            User.objects.filter(
                email=data['email']
            ).exists()
        )
