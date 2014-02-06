from django.contrib import admin
from data.models import Data


class DataAdmin(admin.ModelAdmin):
    readonly_fields = ('indicator', 'date', 'value')
    list_display = ('indicator', 'value', 'date')
    search_fields = ['indicator', 'date']
    list_filter = ('date', 'indicator')
    ordering = ['-date']
    date_hierarchy = 'date'

    def has_add_permission(self, request):
        return False

    def __init__(self, *args, **kwargs):
        super(DataAdmin, self).__init__(*args, **kwargs)
        self.list_display_links = (None, )


admin.site.register(Data, DataAdmin)