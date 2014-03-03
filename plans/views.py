# encoding: utf-8
from django.core.mail import mail_admins

from django.forms import Form
from django.utils import timezone
from django.views.generic import FormView
from datetime import timedelta


class CancelSubscriptionView(FormView):
    template_name = 'plans/cancel.html'
    form_class = Form
    success_url = '/'

    # not unit tested
    def _send_cancel_notifiation(self, user):
        subscription = user.has_subscription()[0]

        subject = 'Cancelamento de assinatura'
        message = u"Usuário: %(user_email)s \n" \
                  u"Início da assinatura: %(subs_start_date)s \n" \
                  u"Detalhe da assinatura: %(subs_desc)s" \
                  u"\n" \
                  u"Favor conferir o status da assinatura no admin panel e entrar em contato com o usuário" % {
            'user_email': user.email,
            'subs_start_date': subscription.start_date,
            'subs_desc': subscription.name
        }

        mail_admins(subject, message)

    def form_valid(self, form):
        user = self.request.user
        self._send_cancel_notifiation(user)

        subscription = user.has_subscription()[0]

        subscription.end_date = timezone.datetime.now() + timedelta(days=-1)
        subscription.save()

        return super(CancelSubscriptionView, self).form_valid(form)