from django.contrib.auth import get_user_model, login, authenticate
from django.views.generic.base import View
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.utils.translation import ugettext, ugettext_lazy as _
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.conf import settings
from password_reset import views as pr_views

from access.forms import UserCreationForm, PasswordRecoveryForm, PasswordResetForm
from access.models import User


class AutenticationRequiredMixin(View):
    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(AutenticationRequiredMixin, self).dispatch(*args, **kwargs)


class Reset(pr_views.Reset):
    form_class = PasswordResetForm

    def dispatch(self, request, *args, **kwargs):
        self.request = request
        self.args = args
        self.kwargs = kwargs

        try:
            pk = pr_views.signing.loads(kwargs['token'], max_age=self.token_expires,
                               salt=self.salt)
        except pr_views.signing.BadSignature as e:
            return self.invalid()

        self.user = get_object_or_404(get_user_model(), pk=pk)
        return super(pr_views.Reset, self).dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        ctx = super(pr_views.Reset, self).get_context_data(**kwargs)
        if 'invalid' not in ctx:
            ctx.update({
                'email': self.user.get_username(),
                'token': self.kwargs['token'],
            })
        return ctx


class Recover(pr_views.Recover):
    # do a better job on this one!
    form_class = PasswordRecoveryForm
    search_fields = ['email']


def register(request):
    if request.user.is_authenticated():
        return redirect('entry_list')

    if request.method == 'POST':
        form = UserCreationForm(request.POST)

        if form.is_valid():
            form.save()
            email = request.POST['email']
            password = request.POST['password1']

            user = authenticate(email=email, password=password)
            login(request, user)

            messages.success(request,
                _('Welcome to %(site_name)s, %(user_name)s!') % {'site_name': settings.SITE_NAME, 'user_name': user.name})

            return redirect('entry_list')
    else:
        form = UserCreationForm()

    context = {
        'register_form': form
    }

    return render(request, 'access/register.html', context)
