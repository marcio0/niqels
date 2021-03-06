from django.contrib.auth.models import BaseUserManager
from django.utils.translation import ugettext, ugettext_lazy as _

class UserManager(BaseUserManager):
    def create_user(self, email, password=None):
        """
        Creates and saves a User with the given email and password.
        """
        if not email:
            raise ValueError(_('Users must have an email address'))

        user = self.model(
            email=UserManager.normalize_email(email)
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        """
        Creates and saves a superuser with the given email and password.
        """
        user = self.create_user(email,
            password=password
        )
        user.is_admin = True
        user.is_superuser = True
        user.save(using=self._db)
        return user
