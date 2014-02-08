from tastypie import fields
from tastypie.authentication import MultiAuthentication, BasicAuthentication, SessionAuthentication
from tastypie.resources import ModelResource
from api.authorization import UserObjectsOnlyAuthorization
from api.resources import CategoryResource
from restrictions.models import BaseCategoryRestriction


class BaseCategoryRestrictionResource(ModelResource):
    category = fields.ForeignKey(CategoryResource, 'category', full=True)

    class Meta:
        queryset = BaseCategoryRestriction.objects.all()
        always_return_data = True
        authentication = MultiAuthentication(SessionAuthentication(), BasicAuthentication())
        authorization = UserObjectsOnlyAuthorization()
        #validation = FormValidation(form_class=TransactionApiForm)
        list_allowed_methods = ['get']
        detail_allowed_methods = []

    def obj_create(self, bundle, **kwargs):
        return super(BaseCategoryRestrictionResource, self).obj_create(bundle, user=bundle.request.user)