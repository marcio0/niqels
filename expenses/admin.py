from django.contrib import admin
from django.conf import settings
from django.db import models
from django.forms import Textarea
from django.contrib.admin import SimpleListFilter
from django.utils.translation import ugettext_lazy as _

from expenses.models import Category, Transaction, CategoryGroup

class CategoryAdmin(admin.ModelAdmin):
    fields = ['group' ,'name', 'is_negative', 'is_active']
    search_fields = ['name']
    actions = None
    list_display = ('name', 'group')
    list_filter = ('is_active', 'group')

    def has_delete_permission(self, request, obj=None):
        return False

    def get_actions(self, request):
        actions = super(CategoryAdmin, self).get_actions(request)
        if 'delete_selected' in actions:
            del actions['delete_selected']
        return actions
admin.site.register(Category, CategoryAdmin)


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

    list_display = ('get_user', 'date', 'value', 'get_category')
    list_filter = (CategoryListFilter, CategoryGroupListFilter, 'date', 'created')

    fields = ['value', 'description', 'date', 'user', 'created']
    search_fields = ['=value', '=user__email', 'description']
    readonly_fields = ['user', 'created']
    actions = None
    formfield_overrides = {
        models.TextField: {'widget': Textarea(attrs={'rows': 1, 'cols': 40})},
    }

    def get_category(self, obj):
        return '%s (%s)' % (obj.category.name, obj.category.group.name)
    get_category.short_description = u'Category'

    def get_user(self, obj):
        return '%s (%s)' % (obj.user.name, obj.user.email)
    get_user.short_description = u'User'

admin.site.register(Transaction, TransactionAdmin)
