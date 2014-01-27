# encoding: utf-8

from django.db import models
from django.utils.translation import ugettext_lazy as _
from access.models import User


class Subscription(models.Model):
    name = models.CharField(_(u'nome'),
                            max_length=30,
                            null=False,
                            blank=False)

    start_date = models.DateField(_(u'data de início'),
                                  null=False,
                                  blank=False,
                                  help_text=_(u'quando a assinatura começou'))

    end_date = models.DateField(_(u'data de término'),
                                null=True,
                                blank=True,
                                help_text=_(u'quando termina a assinatura'))

    user = models.ForeignKey('access.User',
                             null=False,
                             blank=False,
                             verbose_name=_(u'usuário'),
                             related_name='subscriptions')

def _has_subscription(user):
    return user.subscriptions.exists()
User.has_subscription = _has_subscription