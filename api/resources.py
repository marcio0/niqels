from tastypie.resources import ModelResource
from tastypie import fields
from tastypie import authentication

from expenses.models import Entry, Category
from access.models import User
from api.authorization import UserObjectsOnlyAuthorization


class CategoryResource(ModelResource):
    class Meta:
        queryset = Category.objects.all()
        resource_name = 'category'
        authentication = authentication.SessionAuthentication()
        authorization = UserObjectsOnlyAuthorization()


class EntryResource(ModelResource):
    category = fields.ForeignKey(CategoryResource, 'category')

    class Meta:
        queryset = Entry.objects.all()
        resource_name = 'entry'
        excludes = ['last_edited_time']
        authentication = authentication.SessionAuthentication()
        authorization = UserObjectsOnlyAuthorization()


class UserResource(ModelResource):
    class Meta:
        queryset = User.objects.all()
        resource_name = 'user'
        fields = ['email', 'name']
        authentication = authentication.SessionAuthentication()
        authorization = UserObjectsOnlyAuthorization()
