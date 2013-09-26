from django.contrib import admin

from expenses.models import Category, Transaction, CategoryGroup

class CategoryAdmin(admin.ModelAdmin):
    readonly_fields = Category._meta.get_all_field_names()
    search_fields = ['name']
    actions = None
    list_display = ('name', 'group')
    list_filter = ('default_active', 'custom', 'group')

    def has_add_permission(self, request, obj=None):
        return False
    def has_delete_permission(self, request, obj=None):
        return False
admin.site.register(Category, CategoryAdmin)


class CategoryGroupAdmin(admin.ModelAdmin):
    def has_add_permission(self, request, obj=None):
        return False
    def has_delete_permission(self, request, obj=None):
        return False

    readonly_fields = ['name']
    search_fields = ['name']
    actions = None

admin.site.register(CategoryGroup, CategoryGroupAdmin)


class TransactionAdmin(admin.ModelAdmin):
    pass

#admin.site.register(Transaction, TransactionAdmin)
