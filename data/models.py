from django.db import models
from django.utils import timezone
from django.utils.translation import gettext as _


class Data(models.Model):
    indicator = models.CharField(_(u'indicador'),
        max_length=100,
        help_text=_(u'Nome do indicador.'))

    date = models.DateTimeField(_(u'data da medição'),
        help_text=_(u'Data em que ocorreu a medição do indicador.'),
        default=timezone.now())

    value = models.TextField(_(u'valor'),
        help_text=_(u'Valor da medição.'))

    class Meta:
        verbose_name = _(u'Dado')
        verbose_name_plural = _(u'Dados')

