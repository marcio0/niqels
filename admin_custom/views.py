from django import forms
from django.views.generic.edit import FormView


class UserQueryForm(forms.Form):
    query = forms.CharField(required=True)
    result = forms.CharField(required=False)


class EmailInterface(FormView):
    template_name='admin_custom/email_interface/index.html'
    form_class = UserQueryForm

    def form_valid(self, form):
        form.data = form.data.copy()
        form.data['result'] = 'sdasdd'
        return self.render_to_response(self.get_context_data(form=form))