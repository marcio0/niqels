# encoding: utf-8

from django.contrib import admin
from django.utils.translation import ugettext_lazy as _

from access.admin import UserAdmin
from plans.models import Subscription


class SubscriptionAdmin(admin.TabularInline):
    model = Subscription

    extra = 1
    verbose_name = _(u'assinatura')
    verbose_name_plural = _(u'assinaturas')

UserAdmin.inlines = [SubscriptionAdmin]
