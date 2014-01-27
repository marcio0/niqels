# encoding: utf-8

from django.contrib import admin
from django.utils.translation import ugettext_lazy as _
from django.db.models import Count

from access.admin import UserAdmin
from plans.models import Subscription


class SubscriptionAdmin(admin.TabularInline):
    model = Subscription

    extra = 1
    verbose_name = _(u'assinatura')
    verbose_name_plural = _(u'assinaturas')

UserAdmin.inlines = [SubscriptionAdmin]

class SubscriptionFilter(admin.SimpleListFilter):
    title = _(u'assinantes')
    parameter_name = 'subscriptions'

    def lookups(self, request, model_admin):
        return (
            ('true', _(u'Sim')),
            ('false', _(u'Não'))
        )

    def queryset(self, request, queryset):
        if self.value() == 'true':
            return queryset.annotate(subscription_count=Count('subscriptions')).filter(subscription_count__gt=0)
        if self.value() == 'false':
            return queryset.annotate(subscription_count=Count('subscriptions')).filter(subscription_count=0)

UserAdmin.list_filter += (SubscriptionFilter,)



