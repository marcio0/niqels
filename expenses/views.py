from django.shortcuts import redirect
from django.core.urlresolvers import reverse
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.views.generic.base import TemplateView, View
from django.views.generic.edit import FormView
from django.http import HttpResponseRedirect

from expenses.models import Entry, Category
from expenses.forms import EntryForm
from access.views import AutenticationRequiredMixin


class EntryListView(TemplateView, AutenticationRequiredMixin):
    template_name = 'expenses/list.html'   

    def get_context_data(self, **kwargs):
        context = super(EntryListView, self).get_context_data(**kwargs)
        context['entries'] = Entry.objects.filter(user=self.request.user)
        context['entry_form'] = EntryForm()

        return context


class NewEntryView(FormView, AutenticationRequiredMixin):
    form_class = EntryForm
    template_name = 'expenses/list.html'

    def form_valid(self, form):
        entry = form.save(commit=False)
        entry.user = self.request.user
        entry.save()

        return super(NewEntryView, self).form_valid(form)

    def get_context_data(self, **kwargs):
        '''
           Only called if not form.is_valid()
        '''
        context = super(NewEntryView, self).get_context_data(**kwargs)
        context['entries'] = Entry.objects.filter(user=self.request.user)
        context['entry_form'] = self.form_class()

        return context

    def get(self, request, *args, **kwargs):
        return redirect('index')

    def get_form(self, form_class):
        form = super(NewEntryView, self).get_form(form_class)
        form.user = self.request.user
        return form

    def get_success_url(self):
        return reverse('entry_list')
