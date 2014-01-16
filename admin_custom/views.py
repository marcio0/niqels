from django.core.mail import send_mail, send_mass_mail
from django.db import DatabaseError
from django.db.models.query_utils import InvalidQuery
from django.views.generic.edit import FormView
from access.models import User
from admin_custom.forms import UserQueryForm


class EmailInterface(FormView):
    template_name='admin/email_interface/index.html'
    form_class = UserQueryForm

    def execute_sql(self, form):
        form.data = form.data.copy()

        try:
            result = User.objects.raw(form.data['query'])
            self.users_result = result
            form.data['result'] = len(list(result))

            return True
        except (DatabaseError, InvalidQuery):
            form.data['result'] = 0
            form.errors['__all__'] = 'invalid sql query'

            return False

    def email_users(self, form):
        title = form.data['title']
        content = form.data['content']
        sender = 'niqels@niqels.com.br'

        emails = [u.email for u in self.users_result]

        messages = [(title, content, sender, [email]) for email in emails]

        send_mass_mail(messages)

    def post(self, request, *args, **kwargs):
        form_class = self.get_form_class()
        form = self.get_form(form_class)

        if '_test' in request.POST:
            form.errors.pop('title', None)
            form.errors.pop('content', None)

        if form.is_valid() and self.execute_sql(form):
            if '_submit' in request.POST:
                self.email_users(form)
            return self.form_valid(form)
        return self.form_invalid(form)

    def form_valid(self, form):
        return self.render_to_response(self.get_context_data(form=form))