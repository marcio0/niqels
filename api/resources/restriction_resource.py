from django import forms
from django.core.exceptions import ValidationError
from django.utils.translation import gettext as _
from tastypie import fields
from tastypie.authentication import MultiAuthentication, BasicAuthentication, SessionAuthentication
from tastypie.resources import ModelResource
from tastypie.validation import FormValidation
from api.authorization import UserObjectsOnlyAuthorization
from api.resources import CategoryResource
from restrictions.models import BaseCategoryRestriction


class BaseCategoryRestrictionApiForm(forms.ModelForm):
    def full_clean(self):
        """
        Converting Tastypie's uri to the model pk.
        """
        category = self.data.get('category')

        if category:
            if isinstance(category, basestring):
                category = CategoryResource().get_via_uri(category)
                self.data['category'] = category.pk

                if BaseCategoryRestriction.objects.filter(category=category, user=self.instance.user).exists():
                    raise ValidationError(_('There is alread a restriction for this month.'))

        super(BaseCategoryRestrictionApiForm, self).full_clean()

    class Meta:
        model = BaseCategoryRestriction
        exclude = ('user',)


class BaseCategoryRestrictionResource(ModelResource):
    category = fields.ForeignKey(CategoryResource, 'category', null=False, blank=False)

    class Meta:
        queryset = BaseCategoryRestriction.objects.all()
        always_return_data = True
        authentication = MultiAuthentication(SessionAuthentication(), BasicAuthentication())
        authorization = UserObjectsOnlyAuthorization()
        validation = FormValidation(form_class=BaseCategoryRestrictionApiForm)
        list_allowed_methods = ['get', 'post']
        detail_allowed_methods = ['get', 'put', 'delete']
        resource_name = "restrictions/category"

    def hydrate_category(self, bundle):
        if not 'category' in bundle.data and bundle.request.method == "POST":
            bundle.data['category'] = None
        return bundle

    def obj_create(self, bundle, **kwargs):
        return super(BaseCategoryRestrictionResource, self).obj_create(bundle, user=bundle.request.user)