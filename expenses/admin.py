from django.contrib import admin

from expenses.models import Category

class CategoryAdmin(admin.ModelAdmin):
    def has_add_permission(self, request, obj=None):
        return False
    def has_delete_permission(self, request, obj=None):
        return False

    readonly_fields = Category._meta.get_all_field_names()

    search_fields = ['name']

admin.site.register(Category, CategoryAdmin)
