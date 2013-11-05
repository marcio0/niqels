from django.contrib import admin
from django.conf import settings

from expenses.models import Category, Transaction, CategoryGroup

class CategoryAdmin(admin.ModelAdmin):
    readonly_fields = ['custom', 'default_active', 'group', u'id', 'name', 'transaction_set']
    search_fields = ['name']
    actions = None
    list_display = ('name', 'group')
    list_filter = ('default_active', 'custom', 'group')

    def has_add_permission(self, request, obj=None):
        return False
    def has_delete_permission(self, request, obj=None):
        return False

    def get_actions(self, request):
        actions = super(CategoryAdmin, self).get_actions(request)
        if 'delete_selected' in actions:
            del actions['delete_selected']
        return actions
admin.site.register(Category, CategoryAdmin)


class CategoryGroupAdmin(admin.ModelAdmin):
    def has_add_permission(self, request, obj=None):
        return False
    def has_delete_permission(self, request, obj=None):
        return False

    def get_actions(self, request):
        actions = super(CategoryGroupAdmin, self).get_actions(request)
        if 'delete_selected' in actions:
            del actions['delete_selected']
        return actions

    readonly_fields = ['name']
    search_fields = ['name']
    actions = None

admin.site.register(CategoryGroup, CategoryGroupAdmin)


class TransactionAdmin(admin.ModelAdmin):
    pass

if settings.DEBUG:
    admin.site.register(Transaction, TransactionAdmin)
