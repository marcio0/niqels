import re
from decimal import Decimal
from core.models import Category
import datetime


def parse_expense(s):
    category = get_category(s)
    value = get_value(s)
    date = get_date(s)

    if not date:
        date = datetime.date.today()

    return dict(
        category=category,
        value=value,
        date=date
    )
    

def get_description(s):
    pattern = ''.join([
        r'(?<=["\'])', # Starts with ' or ".
        r'(.*)' # Anything after that.
    ])
    value = re.search(pattern, s)

    if value:
        return value.group(0)
    return None


def get_category(s):
    pattern = r'[a-zA-Z]+' # A word.
    value = re.search(pattern, s)

    if(value):
        return value.group(0)
    return None


def get_date(s):
    pattern = ''.join([
        r'\d(\d)?/\d(\d)?', # Month and day.
        r'(/(?P<Y>\d\d\d\d)|/(?P<y>\d\d))?' # Year is optional. Might be 4 or 2 chars long.
    ])
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
    # TODO: Fix conflict with date if it comes first.
    pattern = ''.join([
        r'[+-]?', # Might be declared as positive or negative.
        r'\d+', # Any number.
        r'(\.\d+)?' # Decimal values are optional.
    ])
    value = re.search(pattern, s)

    if value:
        value = value.group(0)
        if value[0] not in '+-':
            value = '-%s' % value # A negative value is default.
        return Decimal(value)
    return None
