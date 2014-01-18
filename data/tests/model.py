# encoding: utf-8
from django.test import TestCase
from django.utils import timezone
from data.models import Data
from freezegun import freeze_time


class DataModelTest(TestCase):
    @freeze_time('2010-10-10')
    def test__unicode(self):
        data = Data()
        data.date = timezone.now()
        data.value = '100%'
        data.indicator = 'test'

        self.assertEquals(unicode(data), 'test: 100% em 2010-10-10 00:00:00+00:00')
