from decimal import Decimal, DecimalException

from django.db import models
from django import forms
from django.core import validators
from django.core.exceptions import ValidationError
from django.utils.encoding import smart_text
from django.utils import formats

from expenses.models import Entry, Category
from expenses import random_color


class NegativeDecimalField(forms.DecimalField):
    def to_python(self, value):
        """
        Validates that the input is a decimal number. Returns a Decimal
        instance. Returns None for empty values. Ensures that there are no more
        than max_digits in the number, and no more than decimal_places digits
        after the decimal point.
        """
        if value in validators.EMPTY_VALUES:
            return None
        if self.localize:
            value = formats.sanitize_separators(value)
        value = smart_text(value).strip()
        if value[0] not in '+-':
            value = '-%s' % value
        try:
            value = Decimal(value)
        except DecimalException:
            raise ValidationError(self.error_messages['invalid'])
        return value


class EntryForm(forms.ModelForm):
    category = forms.CharField(max_length=200)
    value = NegativeDecimalField(localize=True)

    def clean_category(self):
        category_name = self.cleaned_data.get('category')

        if not category_name:
            raise forms.ValidationError(
                forms.CharField.default_error_messages['required'])

        category_name = category_name.lower().strip()

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
