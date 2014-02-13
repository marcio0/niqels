# encoding: utf-8

from django.conf.urls import patterns, include, url
from django.utils.translation import ugettext_lazy as _
from guide.views import GuideIndex

urlpatterns = patterns('',
    url(_(r'^$'), GuideIndex.as_view(), name='index'),

    url(_(r'^topico/movimentacoes$'), GuideIndex.as_view(template_name='guide/topics/transactions.html')),
    url(_(r'^topico/relatorios'), GuideIndex.as_view(template_name='guide/topics/reports.html')),
)
