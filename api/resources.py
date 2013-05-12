from tastypie.resources import ModelResource
from tastypie import fields
from tastypie import http
from tastypie.authentication import SessionAuthentication, BasicAuthentication, MultiAuthentication

from expenses.models import Entry, Category
from access.models import User
from api.authorization import UserObjectsOnlyAuthorization


class UserResource(ModelResource):
    class Meta:
        queryset = User.objects.all()
        fields = ['email', 'name']
        authentication = SessionAuthentication()
        authorization = UserObjectsOnlyAuthorization()
        list_allowed_methods = ['get']
        detail_allowed_methods = ['get']


class CategoryResource(ModelResource):
    user = fields.ToOneField(UserResource, 'user')

    class Meta:
        queryset = Category.objects.all()
        authentication = MultiAuthentication(SessionAuthentication(), BasicAuthentication())
        authorization = UserObjectsOnlyAuthorization()
        list_allowed_methods = ['get', 'post']
        detail_allowed_methods = ['get', 'put', 'delete']

    def delete_detail(self, *args, **kwargs):
        return http.HttpNotImplemented()


class EntryResource(ModelResource):
    category = fields.ForeignKey(CategoryResource, 'category', full=True)

    def dehydrate_category(self, bundle):
        return bundle.obj.category.name

    class Meta:
        queryset = Entry.objects.all()
        excludes = ['last_edited_time']
        authentication = SessionAuthentication()
        authorization = UserObjectsOnlyAuthorization()
        list_allowed_methods = ['get', 'post']
        detail_allowed_methods = ['get', 'post', 'put', 'delete']
