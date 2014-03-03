from django.forms import Form
from django.utils import timezone
from django.views.generic import FormView
from datetime import timedelta


class CancelSubscriptionView(FormView):
    template_name = 'plans/cancel.html'
    form_class = Form
    success_url = '/'

    def _send_cancel_notifiation(self, user):
        pass

    def form_valid(self, form):
        user = self.request.user
        self._send_cancel_notifiation(user)

        subscription = user.has_subscription()[0]

        subscription.end_date = timezone.datetime.now() + timedelta(days=-1)
        subscription.save()

        return super(CancelSubscriptionView, self).form_valid(form)