# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'BaseCategoryRestriction'
        db.create_table(u'restrictions_basecategoryrestriction', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('user', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['access.User'])),
            ('category', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['expenses.Category'])),
            ('value', self.gf('django.db.models.fields.DecimalField')(default='0', max_digits=7, decimal_places=2)),
        ))
        db.send_create_signal(u'restrictions', ['BaseCategoryRestriction'])

        # Adding unique constraint on 'BaseCategoryRestriction', fields ['category', 'user']
        db.create_unique(u'restrictions_basecategoryrestriction', ['category_id', 'user_id'])

        # Adding model 'MonthlyCategoryRestriction'
        db.create_table(u'restrictions_monthlycategoryrestriction', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('value', self.gf('django.db.models.fields.DecimalField')(default='0', max_digits=7, decimal_places=2)),
            ('month', self.gf('django.db.models.fields.DateField')()),
            ('baserestriction', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['restrictions.BaseCategoryRestriction'])),
        ))
        db.send_create_signal(u'restrictions', ['MonthlyCategoryRestriction'])

        # Adding unique constraint on 'MonthlyCategoryRestriction', fields ['month', 'baserestriction']
        db.create_unique(u'restrictions_monthlycategoryrestriction', ['month', 'baserestriction_id'])


    def backwards(self, orm):
        # Removing unique constraint on 'MonthlyCategoryRestriction', fields ['month', 'baserestriction']
        db.delete_unique(u'restrictions_monthlycategoryrestriction', ['month', 'baserestriction_id'])

        # Removing unique constraint on 'BaseCategoryRestriction', fields ['category', 'user']
        db.delete_unique(u'restrictions_basecategoryrestriction', ['category_id', 'user_id'])

        # Deleting model 'BaseCategoryRestriction'
        db.delete_table(u'restrictions_basecategoryrestriction')

        # Deleting model 'MonthlyCategoryRestriction'
        db.delete_table(u'restrictions_monthlycategoryrestriction')


    models = {
        u'access.user': {
            'Meta': {'object_name': 'User'},
            'date_joined': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'email': ('django.db.models.fields.EmailField', [], {'unique': 'True', 'max_length': '255', 'db_index': 'True'}),
            'groups': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['auth.Group']", 'symmetrical': 'False', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_active': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'is_admin': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'is_superuser': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'last_login': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '60', 'null': 'True', 'blank': 'True'}),
            'password': ('django.db.models.fields.CharField', [], {'max_length': '128'}),
            'user_permissions': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['auth.Permission']", 'symmetrical': 'False', 'blank': 'True'})
        },
        u'auth.group': {
            'Meta': {'object_name': 'Group'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '80'}),
            'permissions': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['auth.Permission']", 'symmetrical': 'False', 'blank': 'True'})
        },
        u'auth.permission': {
            'Meta': {'ordering': "(u'content_type__app_label', u'content_type__model', u'codename')", 'unique_together': "((u'content_type', u'codename'),)", 'object_name': 'Permission'},
            'codename': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'content_type': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['contenttypes.ContentType']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        u'contenttypes.contenttype': {
            'Meta': {'ordering': "('name',)", 'unique_together': "(('app_label', 'model'),)", 'object_name': 'ContentType', 'db_table': "'django_content_type'"},
            'app_label': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'model': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '100'})
        },
        u'expenses.category': {
            'Meta': {'ordering': "['position']", 'object_name': 'Category'},
            'group': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'categories'", 'to': u"orm['expenses.CategoryGroup']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_active': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'is_negative': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '40'}),
            'position': ('django.db.models.fields.IntegerField', [], {'default': '1'})
        },
        u'expenses.categorygroup': {
            'Meta': {'object_name': 'CategoryGroup'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '40'})
        },
        u'restrictions.basecategoryrestriction': {
            'Meta': {'unique_together': "(('category', 'user'),)", 'object_name': 'BaseCategoryRestriction'},
            'category': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['expenses.Category']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['access.User']"}),
            'value': ('django.db.models.fields.DecimalField', [], {'default': "'0'", 'max_digits': '7', 'decimal_places': '2'})
        },
        u'restrictions.monthlycategoryrestriction': {
            'Meta': {'unique_together': "(('month', 'baserestriction'),)", 'object_name': 'MonthlyCategoryRestriction'},
            'baserestriction': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['restrictions.BaseCategoryRestriction']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'month': ('django.db.models.fields.DateField', [], {}),
            'value': ('django.db.models.fields.DecimalField', [], {'default': "'0'", 'max_digits': '7', 'decimal_places': '2'})
        }
    }

    complete_apps = ['restrictions']