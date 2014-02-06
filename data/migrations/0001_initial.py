# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'Data'
        db.create_table(u'data_data', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('indicator', self.gf('django.db.models.fields.CharField')(max_length=100)),
            ('date', self.gf('django.db.models.fields.DateTimeField')(default=datetime.datetime(2014, 1, 16, 0, 0))),
            ('value', self.gf('django.db.models.fields.TextField')()),
        ))
        db.send_create_signal(u'data', ['Data'])


    def backwards(self, orm):
        # Deleting model 'Data'
        db.delete_table(u'data_data')


    models = {
        u'data.data': {
            'Meta': {'object_name': 'Data'},
            'date': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime(2014, 1, 16, 0, 0)'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'indicator': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'value': ('django.db.models.fields.TextField', [], {})
        }
    }

    complete_apps = ['data']