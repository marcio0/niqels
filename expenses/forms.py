from django import forms

from expenses.models import Category


class CategoryForm(forms.ModelForm):
    class Meta:
        model = Category
        exclude = ('user',)
