# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Deleting model 'RepeatableTransaction'
        db.delete_table(u'reminder_repeatabletransaction')


    def backwards(self, orm):
        # Adding model 'RepeatableTransaction'
        db.create_table(u'reminder_repeatabletransaction', (
            ('value', self.gf('django.db.models.fields.DecimalField')(default='0', max_digits=7, decimal_places=2)),
            ('category_config', self.gf('django.db.models.fields.related.ForeignKey')(related_name='+', to=orm['expenses.CategoryConfig'])),
            ('description', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('_day_of_month', self.gf('django.db.models.fields.IntegerField')(default=0)),
            ('user', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['access.User'])),
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('repeat', self.gf('django.db.models.fields.CharField')(max_length=10)),
            ('_due_date', self.gf('django.db.models.fields.DateField')()),
        ))
        db.send_create_signal(u'reminder', ['RepeatableTransaction'])


    models = {
        
    }

    complete_apps = ['reminder']