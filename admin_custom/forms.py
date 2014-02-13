from django import forms
from admin_custom.validators import validate_sql


class UserQueryForm(forms.Form):
    query = forms.CharField(required=True)
    result = forms.CharField(required=False)

    title = forms.CharField(required=True)
    content = forms.CharField(required=True)