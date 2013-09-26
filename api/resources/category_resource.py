from tastypie import fields
from tastypie.constants import ALL
from tastypie.resources import ModelResource
from tastypie.authentication import SessionAuthentication, BasicAuthentication, MultiAuthentication
from tastypie.authorization import ReadOnlyAuthorization
from django.core.exceptions import ObjectDoesNotExist
from django.utils.translation import ugettext, ugettext_lazy as _

from expenses.models import Category, CategoryGroup
from expenses.forms import CategoryForm


class CategoryGroupResource(ModelResource):
    '''
    This class does not have a url configured. It is used only for the 'group' relation
    in the CategoryResource.
    '''
    class Meta:
        queryset = CategoryGroup.objects.all()
        always_return_data = True
        list_allowed_methods = []
        detail_allowed_methods = ['get']


class CategoryResource(ModelResource):
    group = fields.ForeignKey(CategoryGroupResource, 'group', full=True, readonly=True)

    class Meta:
        queryset = Category.objects.all()
        authentication = MultiAuthentication(SessionAuthentication(), BasicAuthentication())
        authorization = ReadOnlyAuthorization()
        always_return_data = True
        list_allowed_methods = ['get']
        detail_allowed_methods = ['get']
        filtering = {
            'name': ALL
        }

    def dehydrate_group(self, bundle):
        return bundle.data['group'].data['name']

    def _obj_create(self, bundle, **kwargs):
        """
        Creating a inactive category will reactivate it.
        """
        try:
            bundle.obj = self._meta.object_class.objects.get(name=bundle.data.get('name'))
        except self._meta.object_class.DoesNotExist:
            bundle.obj = self._meta.object_class()

        bundle.obj.active = True
        bundle.obj.user = bundle.request.user

        for key, value in kwargs.items():
            setattr(bundle.obj, key, value)

        self.authorized_create_detail(self.get_object_list(bundle.request), bundle)
        bundle = self.full_hydrate(bundle)
        return self.save(bundle)
