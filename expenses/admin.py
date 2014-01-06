# encoding: utf-8

from django.contrib import admin
from django.conf import settings
from django.core.urlresolvers import reverse
from django.db import models
from django.forms import Textarea
from django.contrib.admin import SimpleListFilter
from django.utils.safestring import mark_safe
from django.utils.translation import ugettext_lazy as _

from expenses.models import Category, Transaction, CategoryGroup, SplitTransaction


class TransactionInlineAdmin(admin.TabularInline):
    model = Transaction
    extra = 0
    fields = ('value', 'description', 'date', 'category', 'installment_number', 'admin_link')
    readonly_fields = ('installment_number', 'admin_link')
    verbose_name = _(u'Parcela')
    verbose_name_plural = _(u'Parcelas')

    def admin_link(self, instance):
        url = reverse('admin:%s_%s_change' % (
            instance._meta.app_label,  instance._meta.module_name),  args=[instance.id] )
        return mark_safe(u'<a href="%s">%s</a>' % (url, _(u'Editar')))
    admin_link.get_short_description = _(u'Editar parcela')

    formfield_overrides = {
        models.TextField: {'widget': Textarea(attrs={'rows': 1, 'cols': 40})},
    }


class SplitTransactionAdmin(admin.ModelAdmin):
    def has_add_permission(self, request, obj=None):
        return False

    list_display = ('get_total_value', 'get_installments', 'get_short_description')

    readonly_fields = ['user']
    actions = None
    formfield_overrides = {
        models.TextField: {'widget': Textarea(attrs={'rows': 1, 'cols': 40})},
    }
    inlines = [
        TransactionInlineAdmin
    ]

    def get_installments(self, obj):
        return obj.transactions.count()
    get_installments.short_description = _(u"parcelas")

    def get_total_value(self, obj):
        return sum([s.value for s in obj.transactions.all()])
    get_total_value.short_description = _(u"valor total")

    def get_short_description(self, obj):
        if obj.description:
            return obj.description[0:40] + '...'
        return obj.description
    get_short_description.short_description = _(u"descrição")

    def get_user(self, obj):
        return '%s (%s)' % (obj.user.name, obj.user.email)
    get_user.short_description = _(u'User')
admin.site.register(SplitTransaction, SplitTransactionAdmin)


class CategoryAdmin(admin.ModelAdmin):
    fields = ['group' ,'name', 'is_negative', 'is_active', 'position']
    search_fields = ['name']
    actions = None
    list_display = ('name', 'group', 'position')
    list_filter = ('is_active', 'group')

    def has_delete_permission(self, request, obj=None):
        return False

    def get_actions(self, request):
        actions = super(CategoryAdmin, self).get_actions(request)
        if 'delete_selected' in actions:
            del actions['delete_selected']
        return actions
admin.site.register(Category, CategoryAdmin)


class CategoryInlineAdmin(admin.TabularInline):
    model = Category
    fields = ['name', 'is_negative', 'is_active', 'position']

    def has_delete_permission(self, request, obj=None):
        return False


class CategoryGroupAdmin(admin.ModelAdmin):
    def has_delete_permission(self, request, obj=None):
        return False

    def get_actions(self, request):
        actions = super(CategoryGroupAdmin, self).get_actions(request)
        if 'delete_selected' in actions:
            del actions['delete_selected']
        return actions

    fields = ['name']
    search_fields = ['name']
    actions = None
    inlines = [
        CategoryInlineAdmin,
    ]
admin.site.register(CategoryGroup, CategoryGroupAdmin)


class CategoryListFilter(SimpleListFilter):
    title = _('Category')
    parameter_name = 'category'

    def lookups(self, request, model_admin):
        return [(c.id, c.name) for c in Category.objects.all()]

    def queryset(self, request, queryset):
        if self.value():
            return queryset.filter(category__id=self.value())
        else:
            return queryset


class CategoryGroupListFilter(SimpleListFilter):
    title = _('Category group')
    parameter_name = 'category_group'

    def lookups(self, request, model_admin):
        return [(g.id, g.name) for g in CategoryGroup.objects.all()]

    def queryset(self, request, queryset):
        if self.value():
            return queryset.filter(category__group__id=self.value())
        else:
            return queryset


class TransactionAdmin(admin.ModelAdmin):
    def has_add_permission(self, request, obj=None):
        return False

    list_display = ('date', 'value', 'get_short_description', 'get_category', 'created')
    list_filter = (CategoryListFilter, CategoryGroupListFilter, 'date', 'created')
    ordering = ['-created']

    fields = ['value', 'description', 'date', 'user', 'created']
    search_fields = ['=value', '=user__email', 'description']
    readonly_fields = ['user', 'created']
    actions = None
    formfield_overrides = {
        models.TextField: {'widget': Textarea(attrs={'rows': 1, 'cols': 40})},
    }

    def get_short_description(self, obj):
        if obj.description:
            return obj.description[0:40] + '...'
        return obj.description
    get_short_description.short_description = "short description"

    def get_category(self, obj):
        return '%s (%s)' % (obj.category.name, obj.category.group.name)
    get_category.short_description = u'Category'

    def get_user(self, obj):
        return '%s (%s)' % (obj.user.name, obj.user.email)
    get_user.short_description = u'User'
admin.site.register(Transaction, TransactionAdmin)
