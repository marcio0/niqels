from django.contrib.auth import get_user_model
from django.utils.translation import ugettext, ugettext_lazy as _
from django.db import models
from django import forms
from password_reset import forms as pr_forms

from access.models import User


def validate_password(pwd):
    return 6 <= len(pwd) <= 30


class PasswordResetForm(pr_forms.PasswordResetForm):
    error_messages = {
        'invalid_password': _("Password must have between 6 and 30 characters.")
    }

    def save(self):
        self.user.set_password(self.cleaned_data['password1'])
        get_user_model().objects.filter(pk=self.user.pk).update(
            password=self.user.password,
        )

    def clean_password1(self):
        password1 = self.cleaned_data.get("password1")

        if password1 and not validate_password(password1):
            raise forms.ValidationError(
                self.error_messages['invalid_password'])

        return password1


class PasswordRecoveryForm(pr_forms.PasswordRecoveryForm):
    def get_user_by_email(self, email):
        pr_forms.validate_email(email)
        key = 'email__%sexact' % ('' if self.case_sensitive else 'i')
        try:
            user = get_user_model().objects.get(**{key: email})
        except User.DoesNotExist:
            raise forms.ValidationError(_("Sorry, this user doesn't exist."))
        return user

    
class UserCreationForm(forms.ModelForm):
    """
    A form that creates a user, with no privileges, from the given email and
    password.
    """
    error_messages = {
        'duplicate_email': _("A user with that email already exists."),
        'password_mismatch': _("The two password fields didn't match."),
        'invalid_password': _("Password must have between 6 and 30 characters.")
    }
    email = forms.EmailField()
    name = forms.CharField(label=_("Name"), required=True, max_length=60)
    password = forms.CharField(label=_("Password"),
        widget=forms.PasswordInput)
    password_confirm = forms.CharField(label=_("Password confirmation"),
        widget=forms.PasswordInput,
        help_text=_("Enter the same password as above, for verification."))

    class Meta:
        model = User
        fields = ('name', 'email')

    def clean_email(self):
        email = self.cleaned_data["email"]
        try:
            User._default_manager.get(email=email)
        except User.DoesNotExist:
            return email 
        raise forms.ValidationError(self.error_messages['duplicate_email'])

    def clean_password(self):
        password = self.cleaned_data.get("password")

        if (not password) or (password and not validate_password(password)):
            raise forms.ValidationError(
                self.error_messages['invalid_password'])

        return password

    def clean_password_confirm(self):
        password = self.cleaned_data.get("password")
        password_confirm = self.cleaned_data.get("password_confirm")

        if password and password_confirm and password != password_confirm:
            raise forms.ValidationError(
                self.error_messages['password_mismatch'])
            
        return password_confirm

    def save(self, commit=True):
        user = super(UserCreationForm, self).save(commit=False)
        user.set_password(self.cleaned_data["password"])
        if commit:
            user.save()
        return user
