# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'CategoryConfig'
        db.create_table(u'expenses_categoryconfig', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('category', self.gf('django.db.models.fields.related.ForeignKey')(related_name='+', to=orm['expenses.Category'])),
            ('user', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['access.User'])),
            ('color', self.gf('django.db.models.fields.CharField')(default='#999999', max_length=7)),
            ('category_active', self.gf('django.db.models.fields.BooleanField')(default=True)),
        ))
        db.send_create_signal(u'expenses', ['CategoryConfig'])

        # Deleting field 'Transaction.category'
        db.delete_column(u'expenses_transaction', 'category_id')

        # Adding field 'Transaction.category_config'
        db.add_column(u'expenses_transaction', 'category_config',
                      self.gf('django.db.models.fields.related.ForeignKey')(default=1, related_name='+', to=orm['expenses.CategoryConfig']),
                      keep_default=False)

        # Deleting field 'Category.color'
        db.delete_column(u'expenses_category', 'color')

        # Deleting field 'Category.user'
        db.delete_column(u'expenses_category', 'user_id')

        # Deleting field 'Category.active'
        db.delete_column(u'expenses_category', 'active')

        # Adding field 'Category.custom'
        db.add_column(u'expenses_category', 'custom',
                      self.gf('django.db.models.fields.BooleanField')(default=False),
                      keep_default=False)

        # Adding field 'Category.default_active'
        db.add_column(u'expenses_category', 'default_active',
                      self.gf('django.db.models.fields.BooleanField')(default=True),
                      keep_default=False)


    def backwards(self, orm):
        # Deleting model 'CategoryConfig'
        db.delete_table(u'expenses_categoryconfig')


        # User chose to not deal with backwards NULL issues for 'Transaction.category'
        raise RuntimeError("Cannot reverse this migration. 'Transaction.category' and its values cannot be restored.")
        # Deleting field 'Transaction.category_config'
        db.delete_column(u'expenses_transaction', 'category_config_id')

        # Adding field 'Category.color'
        db.add_column(u'expenses_category', 'color',
                      self.gf('django.db.models.fields.CharField')(default='#999999', max_length=7),
                      keep_default=False)


        # User chose to not deal with backwards NULL issues for 'Category.user'
        raise RuntimeError("Cannot reverse this migration. 'Category.user' and its values cannot be restored.")
        # Adding field 'Category.active'
        db.add_column(u'expenses_category', 'active',
                      self.gf('django.db.models.fields.BooleanField')(default=True),
                      keep_default=False)

        # Deleting field 'Category.custom'
        db.delete_column(u'expenses_category', 'custom')

        # Deleting field 'Category.default_active'
        db.delete_column(u'expenses_category', 'default_active')


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
            'Meta': {'object_name': 'Category'},
            'custom': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'default_active': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '20'})
        },
        u'expenses.categoryconfig': {
            'Meta': {'object_name': 'CategoryConfig'},
            'category': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'+'", 'to': u"orm['expenses.Category']"}),
            'category_active': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'color': ('django.db.models.fields.CharField', [], {'default': "'#999999'", 'max_length': '7'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['access.User']"})
        },
        u'expenses.transaction': {
            'Meta': {'ordering': "['-date', '-add_date']", 'object_name': 'Transaction'},
            'add_date': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime(2013, 9, 19, 0, 0)'}),
            'category_config': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'+'", 'to': u"orm['expenses.CategoryConfig']"}),
            'date': ('django.db.models.fields.DateField', [], {}),
            'description': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'repeatable': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['reminder.RepeatableTransaction']", 'null': 'True', 'on_delete': 'models.SET_NULL', 'blank': 'True'}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['access.User']"}),
            'value': ('django.db.models.fields.DecimalField', [], {'default': "'0'", 'max_digits': '7', 'decimal_places': '2'})
        },
        u'reminder.repeatabletransaction': {
            'Meta': {'object_name': 'RepeatableTransaction'},
            '_day_of_month': ('django.db.models.fields.IntegerField', [], {'default': '0'}),
            '_due_date': ('django.db.models.fields.DateField', [], {}),
            'category': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['expenses.Category']"}),
            'description': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'repeat': ('django.db.models.fields.CharField', [], {'max_length': '10'}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['access.User']"}),
            'value': ('django.db.models.fields.DecimalField', [], {'default': "'0'", 'max_digits': '7', 'decimal_places': '2'})
        }
    }

    complete_apps = ['expenses']