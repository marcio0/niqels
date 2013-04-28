import datetime

from django.utils.translation import ugettext, ugettext_lazy as _
from django.shortcuts import redirect, get_object_or_404
from django.core.urlresolvers import reverse
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.views.generic.base import TemplateView, View
from django.views.generic.edit import FormView, DeletionMixin
from django.http import HttpResponseRedirect
from django.contrib import messages

from expenses.models import Entry, Category
from expenses.forms import EntryForm
from access.views import AutenticationRequiredMixin
from access.forms import UserCreationForm
from expenses.calculator import AverageCalculator


class PresentationView(TemplateView):
    template_name = "presentation.html"

    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated():
            return HttpResponseRedirect(reverse('entry_list'))
        else:
            return super(PresentationView, self).get( request, *args, **kwargs)

    def get_context_data(self):
        context = super(PresentationView, self).get_context_data()
        context['register_form'] = UserCreationForm()
        return context


class DeleteEntryView(DeletionMixin, AutenticationRequiredMixin):
    def get_object(self):
        return get_object_or_404(Entry,
            pk=self.kwargs['id'],
            user_id=self.request.user.id)

    def get_success_url(self):
        return reverse('entry_list')

    def delete(self, request, *args, **kwargs):
        ret = super(DeleteEntryView, self).delete(request, *args, **kwargs)
        messages.success(request, _('Entry removed.'))
        return ret


class ListEntryView(TemplateView, AutenticationRequiredMixin):
    template_name = 'expenses/list.html'   

    def get_context_data(self, **kwargs):
        context = super(ListEntryView, self).get_context_data(**kwargs)
        context['entries'] = Entry.objects.filter(user=self.request.user)
        context['entry_form'] = EntryForm()

        calculator = AverageCalculator(
            user=self.request.user,
            start_date=datetime.date.today(),
            qty_months=3)

        context['average_balance'] = calculator.calculate()

        return context


class CreateEntryView(FormView, AutenticationRequiredMixin):
    form_class = EntryForm
    template_name = 'expenses/list.html'

    def form_valid(self, form):
        entry = form.save(commit=False)
        entry.user = self.request.user
        entry.save()

        return super(CreateEntryView, self).form_valid(form)

    def get_context_data(self, **kwargs):
        '''
           Only called if not form.is_valid()
        '''
        context = super(CreateEntryView, self).get_context_data(**kwargs)
        context['entries'] = Entry.objects.filter(user=self.request.user)
        context['entry_form'] = context.pop('form', self.form_class())

        calculator = AverageCalculator(
            user=self.request.user,
            start_date=datetime.date.today(),
            qty_months=3)

        context['average_balance'] = calculator.calculate()

        return context

    def get(self, request, *args, **kwargs):
        return redirect('index')

    def get_form(self, form_class):
        form = super(CreateEntryView, self).get_form(form_class)
        form.user = self.request.user
        return form

    def get_success_url(self):
        return reverse('entry_list')
