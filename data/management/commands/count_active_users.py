from django.core.management.base import BaseCommand, CommandError


class Command(BaseCommand):
    help = u'Counts the amount of active users'

    def handle(self, *args, **kwargs):
        pass
