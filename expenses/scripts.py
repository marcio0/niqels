from django.db.models import Q
from expenses.models import Transaction


def get_descriptions():

	q = ~Q(description="")

	transactions = Transaction.objects.filter(q).values('category__name', 'description').order_by('category__name', 'description')

	groups = {}

	for transaction in transactions:
		groups.setdefault(transaction['category__name'], [])
		groups[transaction['category__name']].append(transaction['description'])

	print groups