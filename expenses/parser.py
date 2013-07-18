import re
from decimal import Decimal, InvalidOperation
from expenses.models import Category
import datetime

class ExpensePositionalParser(object):
    def __init__(self, string):
        self.string = string
        self.raw_values = string.split(' ')

    def parse_expense(self):
        expense = dict(
            category=self.get_category(),
            value=self.get_value(),
            description=self.get_description(),
            date=self.get_date()
        )
        return expense

    def get_category(self):
        return self.raw_values[0]

    def get_description(self):
        pattern = ''.join([
            r'(?<=["\'])', # Starts with ' or ".
            r'(.*)' # Anything after that.
        ])
        value = re.search(pattern, self.string)

        if value:
            return value.group(0)
        return None

    def get_value(self):
        value = self.raw_values[1]
        if value[0] not in '+-':
            value = '-%s' % value
        try:
            return Decimal(value)
        except InvalidOperation:
            return None

    def get_date(self):
        try:
            raw_date = self.raw_values[2]
        except IndexError:
            return datetime.date.today()

        raw_date_split = raw_date.split('/')

        if len(raw_date_split) == 3:
            date_str = raw_date
            if len(raw_date_split[2]) == 2:
                date_pattern = r'%d/%m/%y'
            elif len(raw_date_split[2]) == 4:
                date_pattern = r'%d/%m/%Y'
        else:
            date_str = r'%s/%d' % (raw_date, datetime.date.today().year)
            date_pattern = r'%d/%m/%Y'

        try:
            return datetime.datetime.strptime(date_str, date_pattern).date()
        except ValueError:
            return datetime.date.today()


class ExpenseRegexParser(object):
    def __init__(self, string):
        self.string = string

    def parse_expense(self):
        category = self.get_category()
        value = self.get_value()
        date = self.get_date()
        description = self.get_description()

        if not date:
            date = datetime.date.today()

        return dict(
            category=category,
            value=value,
            date=date,
            description=description
        )

    def get_description(self):
        pattern = ''.join([
            r'(?<=["\'])', # Starts with ' or ".
            r'(.*)' # Anything after that.
        ])
        value = re.search(pattern, self.string)

        if value:
            return value.group(0)
        return None

    def get_category(self):
        pattern = r'[a-zA-Z]+' # A word.
        value = re.search(pattern, self.string)

        if(value):
            return value.group(0)
        return None

    def get_date(self):
        pattern = ''.join([
            r'\d(\d)?/\d(\d)?', # Month and day.
            r'(/(?P<Y>\d\d\d\d)|/(?P<y>\d\d))?' # Year is optional. Might be 4 or 2 chars long.
        ])
        value = re.search(pattern, self.string)

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

    def get_value(self):
        # TODO: Fix conflict with date if it comes first.
        pattern = ''.join([
            r'[+-]?', # Might be declared as positive or negative.
            r'\d+', # Any number.
            r'(\.\d+)?' # Decimal values are optional.
        ])
        value = re.search(pattern, self.string)

        if value:
            value = value.group(0)
            if value[0] not in '+-':
                value = '-%s' % value # A negative value is default.
            return Decimal(value)
        return None
