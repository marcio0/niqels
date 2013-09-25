# encoding: utf-8

from django.core.management.base import BaseCommand, CommandError
from django.utils.translation import gettext as _

from expenses.models import Category, CategoryGroup

categories = [
    {
        'name':_('Geral'),
        'categories': [
            {'name': _('Mercado'), 'default_active': True},
        ]
    },

    {
        'name': _('Housing'),
        'categories': [
            {'name': _('Aluguel')},
            {'name': _('Financiamento Imobiliário')},
            {'name': _('Condominio')},
        ]
    },

    {
        'name': _('Consumo'),
        'categories': [
            {'name': _('Telefone')},
            {'name': _('TV a Cabo')},
            {'name': _('Água')},
            {'name': _('Luz')},
            {'name': _('Gás')},
            {'name': _('Internet')},
        ]
    },

    {
        'name': _('Car'),
        'categories': [
            {'name': _('Financiamento')},
            {'name': _('Manutenção')},
            {'name': _('Combustível')},
            {'name': _('Estacionamento')},
            {'name': _('Impostos')},
        ]
    },

    {
        'name': _('Entretenimento'),
        'categories': [
            {'name': _('Restaurante')},
            {'name': _('Cinema')},
            {'name': _('Teatro')},
        ]
    },

    {
        'name': _('Aparência'),
        'categories': [
            {'name': _('Roupas')},
            {'name': _('Sapatos/Tênis')},
        ]
    },

    {
        'name': _('Empréstimos'),
        'categories': [
            {'name': _('Cartão de Crédito')},
            {'name': _('Cheque Especial')},
            {'name': _('Crédito Pessoal')},
        ]
    },

    {
        'name': _('Educação'),
        'categories': [
            {'name': _('Escola')},
            {'name': _('Faculdade')},
            {'name': _('Curso')},
        ]
    },

    {
        'name': _('Despesas Médicas'),
        'categories': [
            {'name': _('Plano de Saúde')},
            {'name': _('Hospital')},
            {'name': _('Exames')},
        ]
    },

    {
        'name': _('Receitas'),
        'categories': [
            {'name': _('Salário')},
            {'name': _('Hora Extra')},
            {'name': _('Restituição de Imposto')},
        ]
    },

    {
        'name':_('Customizado'),
        'categories': [
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
