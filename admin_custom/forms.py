from django import forms
from admin_custom.validators import validate_sql


class UserQueryForm(forms.Form):
    query = forms.CharField(required=True, validators=[validate_sql])
    result = forms.CharField(required=False)
