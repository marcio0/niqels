from django.db import models
from django import forms

from core.models import Entry, Category

class EntryForm(forms.ModelForm):
    category = forms.CharField(max_length=200)

    def clean_category(self):
        category_name = self.cleaned_data.get('category')

        if not category_name:
            raise forms.ValidationError(
                forms.CharField.default_error_messages['required'])

        category, _ = Category.objects.get_or_create(
            name=category_name)

        return category

    class Meta:
        model = Entry
