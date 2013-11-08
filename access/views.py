import logging

from django.contrib.auth import get_user_model, login, authenticate
from django.views.generic.base import View
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.utils.translation import ugettext, ugettext_lazy as _
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.conf import settings
from django.http import HttpResponseRedirect
from django.template.loader import get_template
from django.template import Context
from django.core.mail import send_mail

from password_reset import views as pr_views

from access.forms import UserCreationForm, PasswordRecoveryForm, PasswordResetForm
from access.models import User


logger = logging.getLogger('access')


def test_login(request):
    email = request.GET.get('email')
    user = get_object_or_404(User, email=email)

    user.backend='django.contrib.auth.backends.ModelBackend'
    login(request, user)

    return HttpResponseRedirect('/')


def notify(func):
    def wrapper(request, *args, **kwargs):
        ret = func(request, *args, **kwargs)

        if ret.status_code ==  302:
            messages.success(request, _('Your password was successfuly changed.'))

        return ret
    return wrapper


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


def _send_welcome_email(email, name):
    text = get_template('access/welcome-email.txt')
    context = Context({'username': name})
    email_content = text.render(context)

    subject, from_email, to = _('Welcome to Niqels!'), 'niqels@niqels.com.br', email

    try:
        send_mail(subject, email_content, from_email, [to], fail_silently=False)
    except Exception, e:
        logger.warning('Error sending email: ' + str(e))
    


def register(request):
    if request.user.is_authenticated():
        return redirect('index')

    if request.method == 'POST':
        form = UserCreationForm(request.POST)

        if form.is_valid():
            form.save()
            email = request.POST['email']
            password = request.POST['password1']

            user = authenticate(email=email, password=password)
            login(request, user)

            _send_welcome_email(email, user.name)

            return redirect('index')
    else:
        form = UserCreationForm()

    context = {
        'register_form': form
    }

    return render(request, 'access/register.html', context)
