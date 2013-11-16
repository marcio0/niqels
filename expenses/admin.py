from django.contrib import admin
from django.conf import settings
from django.db import models
from django.forms import Textarea

from expenses.models import Category, Transaction, CategoryGroup

class CategoryAdmin(admin.ModelAdmin):
    fields = ['group' ,'name', 'is_negative']
    search_fields = ['name']
    actions = None
    list_display = ('name', 'group')
    list_filter = ('default_active', 'custom', 'group')

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


class TransactionAdmin(admin.ModelAdmin):
    def has_add_permission(self, request, obj=None):
        return False

    fields = ['value', 'description', 'date', 'user', 'created']
    search_fields = ['=value', '=user__email', 'description']
    readonly_fields = ['user', 'created']
    actions = None
    formfield_overrides = {
        models.TextField: {'widget': Textarea(attrs={'rows': 1, 'cols': 40})},
    }
admin.site.register(Transaction, TransactionAdmin)
