import re
from decimal import Decimal
from core.models import Category
import datetime


def get_description(s):
    pattern = r'(?<=[\"\'])(.*?)(?=[\"\'])'
    value = re.search(pattern, s)
    if value:
        return value.group(0)
    return None


def get_category(s):
    pattern = r'[a-zA-Z]+'
    value = re.search(pattern, s)
    if(value):
        return Category(name=value.group(0))
    return None


def get_date(s):
    pattern = r'\d(\d)?/\d(\d)?(/(?P<Y>\d\d\d\d)|/(?P<y>\d\d))?'
    value = re.search(pattern, s)
    if value:
        date_str = value.group(0)

        if value.group('Y'):
            date_pattern = r'%d/%m/%Y'
        elif value.group('y'):
            date_pattern = r'%d/%m/%y'
        else:
            date_str = r'%s/%d' % (date_str, datetime.date.today().year)
            date_pattern = r'%d/%m/%Y'

        date = datetime.datetime.strptime(date_str, date_pattern).date()

        return date
    return None


def get_value(s):
    pattern = r'[+-]?\d+(.\d+)?'
    value = re.search(pattern, s)
    if value:
        value = value.group(0)
        if value[0] not in '+-':
            value = '-%s' % value
        return Decimal(value)
    return None
