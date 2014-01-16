from django.core.exceptions import ValidationError
from django.core.validators import RegexValidator
from django.utils.encoding import force_text
from django.utils.translation import gettext as _

import re

class SqlValidator(RegexValidator):
    regex = re.compile(r'update|drop|delete|alter|insert|create', re.IGNORECASE)
    message = _('SQL that changes data are not allowed.')

    def __call__(self, value):
        if self.regex.search(force_text(value)):
            raise ValidationError(self.message, code=self.code)
validate_sql = SqlValidator()