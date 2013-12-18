from tastypie.resources import ModelResource, Resource, fields
from tastypie.authentication import SessionAuthentication, BasicAuthentication, MultiAuthentication

from expenses.models import SplitTransaction, Transaction
from api.authorization import UserObjectsOnlyAuthorization
from api.resources import CategoryResource, TransactionResource


class SplitTransactionResource(ModelResource):
    total_value = fields.DecimalField()
    installments = fields.IntegerField()
    first_installment_date = fields.DateField()
    category = fields.ForeignKey(CategoryResource, 'category', full=True, null=True)
    transactions = fields.ToManyField(TransactionResource, attribute=lambda bundle: Transaction.objects.filter(installment_of=bundle.obj))

    class Meta:
        queryset = SplitTransaction.objects.all()
        always_return_data = True
        authentication = MultiAuthentication(SessionAuthentication(), BasicAuthentication())
        authorization = UserObjectsOnlyAuthorization()
        #validation = FormValidation(form_class=TransactionApiForm)
        list_allowed_methods = ['get', 'post']
        detail_allowed_methods = []