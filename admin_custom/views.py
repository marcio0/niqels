from django import forms
from django.core.exceptions import ValidationError
from django.core.validators import RegexValidator
from django.utils.encoding import force_text
from django.views.generic.edit import FormView
import re
from access.models import User


class SqlValidator(RegexValidator):
    regex = re.compile(r'update|drop|delete|alter|insert|create', re.IGNORECASE)

    def __call__(self, value):
        if self.regex.search(force_text(value)):
            raise ValidationError(self.message, code=self.code)
validate_sql = SqlValidator()


class UserQueryForm(forms.Form):
    query = forms.CharField(required=True, validators=[SqlValidator])
    result = forms.CharField(required=False)


class EmailInterface(FormView):
    template_name='admin/email_interface/index.html'
    form_class = UserQueryForm

    def form_valid(self, form):
        form.data = form.data.copy()

        result = User.objects.raw(form.data['query'])
        form.data['result'] = len(result)

        return self.render_to_response(self.get_context_data(form=form))