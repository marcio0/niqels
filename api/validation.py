from django import forms

from expenses.models import Transaction, Category
from reminder.models import RepeatableTransaction


class RepeatableTransactionApiForm(forms.ModelForm):
    class Meta:
        model = RepeatableTransaction
        exclude = ('user', '_day_of_month', '_last_date')
