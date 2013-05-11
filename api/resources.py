from tastypie.resources import ModelResource
from tastypie import fields
from tastypie import authentication

from expenses.models import Entry, Category
from access.models import User
from api.authorization import UserObjectsOnlyAuthorization


class CategoryResource(ModelResource):
    class Meta:
        queryset = Category.objects.all()
        authentication = authentication.SessionAuthentication()
        authorization = UserObjectsOnlyAuthorization()
        list_allowed_methods = ['get']
        detail_allowed_methods = ['get', 'post', 'put']


class EntryResource(ModelResource):
    category = fields.ForeignKey(CategoryResource, 'category', full=True)

    def dehydrate_category(self, bundle):
        return bundle.obj.category.name

    class Meta:
        queryset = Entry.objects.all()
        excludes = ['last_edited_time']
        authentication = authentication.SessionAuthentication()
        authorization = UserObjectsOnlyAuthorization()
        list_allowed_methods = ['get', 'post']
        detail_allowed_methods = ['get', 'post', 'put', 'delete']


class UserResource(ModelResource):
    class Meta:
        queryset = User.objects.all()
        fields = ['email', 'name']
        authentication = authentication.SessionAuthentication()
        authorization = UserObjectsOnlyAuthorization()
        list_allowed_methods = ['get']
        detail_allowed_methods = ['get']
