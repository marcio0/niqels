# encoding: utf-8

from django.core.management.base import BaseCommand, CommandError
from django.utils.translation import gettext as _

from expenses.models import Category, CategoryGroup

categories = [
    {
        'name':_('Receitas'),
        'categories': [
            {'name': _(u'Salário'), 'default_active': True, 'is_negative': False},
            {'name': _(u'Extras'), 'default_active': True, 'is_negative': False}
        ]
    },
    {
        'name':_('Contas fixas'),
        'categories': [
            {'name': _(u'Moradia'), 'default_active': True},
            {'name': _(u'Água'), 'default_active': True},
            {'name': _(u'Luz'), 'default_active': True},
            {'name': _(u'Gás'), 'default_active': True},
            {'name': _(u'Telefone/Internet/TV'), 'default_active': True},
        ]
    },
    {
        'name':_('Despesas'),
        'categories': [
            {'name': _('Alimentação'), 'default_active': True},
            {'name': _('Transporte'), 'default_active': True},
            {'name': _('Lazer'), 'default_active': True},
            {'name': _('Vestuário'), 'default_active': True},
            {'name': _('Educação'), 'default_active': True},
            {'name': _('Saúde'), 'default_active': True},
            {'name': _('Mercado'), 'default_active': True},
            {'name': _('Utensílios domésticos'), 'default_active': True},
            {'name': _('Outros'), 'default_active': True},
        ]
    }
]


class Command(BaseCommand):
    help = 'Sets up all categories, creating the new ones and updating existing ones.'

    def handle(self, *args, **options):
        for group in categories:
            group_obj, created = CategoryGroup.objects.get_or_create(name=group['name'])

            self.stdout.write('%(action)s group %(name)s' % {
                'action': 'Creating' if created else 'Updating',
                'name': group['name']
            })

            for category in group['categories']:
                category_obj, created = Category.objects.get_or_create(name=category['name'], group=group_obj)

                self.stdout.write('\t%(action)s category %(name)s' % {
                    'action': 'Creating' if created else 'Updating',
                    'name': category['name']
                })

                for k, v in category.items():
                    setattr(category_obj, k, v)

                category_obj.save()
