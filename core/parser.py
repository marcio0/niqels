import re
from decimal import Decimal


def get_value(s):
    pattern = r'\d+(.\d+)?'
    value = re.search(pattern, s)
    if value:
        return Decimal(value.group(0))
    return None
