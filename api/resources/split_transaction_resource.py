from babel.numbers import parse_decimal
from decimal import Decimal
from dateutil.relativedelta import relativedelta

from django import forms
from django.utils import timezone
from tastypie.resources import ModelResource, fields
from tastypie.authentication import SessionAuthentication, BasicAuthentication, MultiAuthentication
from tastypie.validation import CleanedDataFormValidation, FormValidation

from expenses.models import SplitTransaction, Transaction, Category
from api.authorization import UserObjectsOnlyAuthorization
from api.resources import CategoryResource, TransactionResource


class SplitTransactionApiForm(forms.Form):
    total_value = forms.DecimalField(decimal_places=2, max_digits=7)
    description = forms.CharField()
    first_installment_date = forms.DateField()
    installments = forms.IntegerField(min_value=1)
    category = forms.ModelChoiceField(Category.objects.all())

    def full_clean(self):
        """
        Converting Tastypie's uri to the model pk.
        """
        category = self.data.get('category')

        if category and isinstance(category, basestring):
            self.data['category'] = CategoryResource().get_via_uri(category).pk

        super(SplitTransactionApiForm, self).full_clean()

    class Meta:
        model = SplitTransaction
        exclude = ('user',)


class SplitTransactionResource(ModelResource):
    total_value = fields.DecimalField()
    installments = fields.IntegerField()
    first_installment_date = fields.DateField()
    category = fields.ForeignKey(CategoryResource, 'category', full=True, null=True)
    description = fields.CharField(attribute='description', null=True, blank=True)
    transactions = fields.ToManyField(TransactionResource, attribute=lambda bundle: Transaction.objects.filter(installment_of=bundle.obj).order_by('date'), full=True, null=True)

    class Meta:
        resource_name = "split_transaction"
        queryset = SplitTransaction.objects.all()
        always_return_data = True
        authentication = MultiAuthentication(SessionAuthentication(), BasicAuthentication())
        authorization = UserObjectsOnlyAuthorization()
        validation = CleanedDataFormValidation(form_class=SplitTransactionApiForm)
        list_allowed_methods = ['get', 'post']
        detail_allowed_methods = ['get']

    def _create_installments(self, bundle):
        data = bundle.data

        transaction_data = {
            'value': data.get('total_value') / data.get('installments'),
            'date': data.get('first_installment_date'),
            'user': bundle.obj.user,
            'description': data.get('description'),
            'created': timezone.now(),
            'category': bundle.obj.category
        }

        transactions = []
        for i in range(0, data['installments']):
            transactions.append(Transaction.objects.create(**transaction_data))

            transaction_data['date'] += relativedelta(months=1)

        return transactions

    def hydrate_total_value(self, bundle):
        value = bundle.data.get('total_value', None)

        if value:
            bundle.data['total_value'] = parse_decimal(str(value), locale=bundle.request.locale)

        return bundle

    def full_hydrate(self, bundle):
        bundle = super(SplitTransactionResource, self).full_hydrate(bundle)

        # this must happen after all hydrations because order isn't garanteed
        value = bundle.data.get('total_value')
        if value:
            # casting value to str to avoid repeating decimals
            value = Decimal(str(value)).copy_abs()

            if bundle.obj.category.is_negative:
                value = value.copy_negate()

            bundle.data['total_value'] = value

        return bundle

    def obj_create(self, bundle, **kwargs):
        bundle = super(SplitTransactionResource, self).obj_create(bundle, user=bundle.request.user, **kwargs)

        bundle.obj.transactions = self._create_installments(bundle)

        return bundle