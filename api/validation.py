from django import forms

from expenses.models import Transaction, Category
from reminder.models import RepeatableTransaction


class TransactionApiForm(forms.ModelForm):
    category = forms.CharField(max_length=200 , required=True)

    def clean_category(self):
        category_name = self.cleaned_data.get('category')

        if not category_name:
            raise forms.ValidationError(
                forms.CharField.default_error_messages['required'])

        return category_name


    class Meta:
        model = Transaction
        exclude = ('user', 'category')


class RepeatableTransactionApiForm(forms.ModelForm):
    category = forms.CharField(max_length=200 , required=True)

    def clean_category(self):
        category_name = self.cleaned_data.get('category')

        if not category_name:
            raise forms.ValidationError(
                forms.CharField.default_error_messages['required'])

        return category_name


    class Meta:
        model = RepeatableTransaction
        exclude = ('user', 'category', '_day_of_month', '_last_date')
