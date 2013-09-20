from django.core.management.base import BaseCommand, CommandError
from django.utils.translation import ugettext, ugettext_lazy as _

from expenses.models import Category

categories = [
    {_('General'): [
        {'name': _('Groceries')},
    ]},

    {_('Housing'): [
        {'name': ('Rent')},
        {'name': ('Mortgage')},
        #{'name': ('Condominio')},
    ]},

    {_('Utility Bills'): [
        {'name': ('Phone')},
        {'name': ('Cable TV')},
        {'name': ('Water')},
        {'name': ('Light')},
        {'name': ('Gas')},
        {'name': ('Internet')},
    ]},

    {_('Car'): [
        {'name': _('Financing')},
        {'name': _('Maintenance')},
        {'name': _('Fuel')},
        {'name': _('Parking')},
        {'name': _('Taxes')},
    ]},

    {_('Entertainment'): [
        {'name': _('Restaurant')},
        {'name': _('Cinema')},
        {'name': _('Teatre')},
    ]},

    {_('Appearance'): [
        {'name': _('Clothing')},
        {'name': _('Shoes')},
    ]},

    {_('Loan'): [
        {'name': _('Credit Card')},
        {'name': _('Overdraft')},
        {'name': _('Personal Loans')},
    ]},

    {_('Education'): [
        {'name': _('School/College')},
        #{'name': _('Curso')},
    ]},

    {_('Education'): [
        {'name': _('School/College')},
        #{'name': _('Curso')},
    ]},

    {_('Medical Expenses'): [
        {'name': _('Health Care')},
        {'name': _('Hospital')},
        {'name': _('Examination')},
    ]},

    {_('Income'): [
        {'name': _('Salary')},
        {'name': _('Overwork')},
        {'name': _('Taxes Refunds')},
    ]}
]


class Command(BaseCommand):
    help = 'Sets up all categories, creating the new ones and updating existing ones.'

    def handle(self, *args, **options):
        pass
        
