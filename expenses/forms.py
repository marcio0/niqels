from django.db import models
from django import forms

from expenses.models import Entry, Category
from expenses import random_color

class EntryForm(forms.ModelForm):
    category = forms.CharField(max_length=200)

    def clean_category(self):
        category_name = self.cleaned_data.get('category')

        if not category_name:
            raise forms.ValidationError(
                forms.CharField.default_error_messages['required'])

        try:
            category = Category.objects.get(
                name=category_name,
                user=self.user
            )
        except Category.DoesNotExist:
            category = Category(
                name=category_name,
                user=self.user,
                color=random_color()
            )
            category.save()

        return category

    class Meta:
        model = Entry
        exclude = ('user',)
