from django import forms
from django.core.exceptions import ValidationError
from django.core.validators import RegexValidator
from django.db import DatabaseError
from django.db.models.query_utils import InvalidQuery
from django.utils.encoding import force_text
from django.utils.translation import gettext as _
from django.views.generic.edit import FormView
import re
from access.models import User


class SqlValidator(RegexValidator):
    regex = re.compile(r'update|drop|delete|alter|insert|create', re.IGNORECASE)
    message = _('SQL that changes data are not allowed.')

    def __call__(self, value):
        if self.regex.search(force_text(value)):
            raise ValidationError(self.message, code=self.code)
validate_sql = SqlValidator()


class UserQueryForm(forms.Form):
    query = forms.CharField(required=True, validators=[validate_sql])
    result = forms.CharField(required=False)


class EmailInterface(FormView):
    template_name='admin/email_interface/index.html'
    form_class = UserQueryForm

    def execute_sql(self, form):
        form.data = form.data.copy()

        try:
            result = User.objects.raw(form.data['query'])
            form.data['result'] = len(list(result))

            return True
        except (DatabaseError, InvalidQuery):
            form.data['result'] = 0
            form.errors['__all__'] = 'invalid sql query'

            return False

    def post(self, request, *args, **kwargs):
        form_class = self.get_form_class()
        form = self.get_form(form_class)

        if form.is_valid() and self.execute_sql(form):
            print 'ok', form.errors
            return self.form_valid(form)
        else:
            print 'nok', form.errors
            return self.form_invalid(form)

    def form_valid(self, form):
        return self.render_to_response(self.get_context_data(form=form))