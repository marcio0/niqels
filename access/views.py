from django.views.generic.base import View
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.utils.translation import ugettext, ugettext_lazy as _
from django.shortcuts import render, redirect
from django.contrib import messages
from django.conf import settings
from password_reset import views as pr_views

from access.forms import UserCreationForm, PasswordRecoveryForm


class AutenticationRequiredMixin(View):
    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(AutenticationRequiredMixin, self).dispatch(*args, **kwargs)


class Recover(pr_views.Recover):
    form_class = PasswordRecoveryForm
    search_fields = ['email']


def register(request):
    if request.user.is_authenticated():
        return redirect('entry_list')

    if request.method == 'POST':
        form = UserCreationForm(request.POST)

        if form.is_valid():
            form.save()
            messages.success(request,
                _('Account created! Now login to start using %s.') % settings.SITE_NAME)

            return redirect('login')
    else:
        form = UserCreationForm()

    context = {
        'register_form': form
    }

    return render(request, 'access/register.html', context)
