from django.utils.translation import ugettext, ugettext_lazy as _
from django.db import models
from django import forms
from password_reset import forms as pr_forms

from access.models import User


class PasswordResetForm(pr_forms.PasswordResetForm):
    def save(self):
        self.user.set_password(self.cleaned_data['password1'])
        User.objects.filter(pk=self.user.pk).update(
            password=self.user.password,
        )


class PasswordRecoveryForm(pr_forms.PasswordRecoveryForm):
    def get_user_by_email(self, email):
        pr_forms.validate_email(email)
        key = 'email__%sexact' % ('' if self.case_sensitive else 'i')
        try:
            user = User.objects.get(**{key: email})
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
    }
    email = forms.EmailField()
    password1 = forms.CharField(label=_("Password"),
        widget=forms.PasswordInput)
    password2 = forms.CharField(label=_("Password confirmation"),
        widget=forms.PasswordInput,
        help_text=_("Enter the same password as above, for verification."))

    class Meta:
        model = User
        fields = ("email",)

    def clean_email(self):
        email = self.cleaned_data["email"]
        try:
            User._default_manager.get(email=email)
        except User.DoesNotExist:
            return email 
        raise forms.ValidationError(self.error_messages['duplicate_email'])

    def clean_password2(self):
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError(
                self.error_messages['password_mismatch'])
        return password2

    def save(self, commit=True):
        user = super(UserCreationForm, self).save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user
