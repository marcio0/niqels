    # -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import DataMigration
from django.db import models

class Migration(DataMigration):

    def forwards(self, orm):
        objects = orm['expenses.Category'].objects
        categories = {
            u'Salário': 1,
            u'Extras': 2,

            u'Alimentação': 11,
            u'Mercado': 12,
            u'Lazer': 13,
            u'Transporte': 14,
            u'Presente': 15,
            u'Vestuário': 16,
            u'Educação': 17,
            u'Saúde': 18,
            u'Utensílios domésticos': 19,
            u'Eletrônicos e Acessórios': 20,
            u'Tarifas bancárias/Juros': 21,
            u'Outros': 22,

            u'Moradia': 31,
            u'Telefone/Internet/TV': 32,
            u'Luz': 33,
            u'Água': 34,
            u'Gás': 35
        }

        for category, idx in categories.items():
            try:
                objects.filter(name=category).update(position=idx)
            except orm['Category'].DoesNotExist:
                print 'Category %s not found.' % category


    def backwards(self, orm):
        "Nothing to to."

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
        u'expenses.splittransaction': {
            'Meta': {'object_name': 'SplitTransaction'},
            'description': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['access.User']"})
        },
        u'expenses.transaction': {
            'Meta': {'ordering': "['-date', '-created']", 'object_name': 'Transaction'},
            'category': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['expenses.Category']"}),
            'created': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime(2014, 1, 6, 0, 0)'}),
            'date': ('django.db.models.fields.DateField', [], {}),
            'description': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'installment_number': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'installment_of': ('django.db.models.fields.related.ForeignKey', [], {'blank': 'True', 'related_name': "'transactions'", 'null': 'True', 'to': u"orm['expenses.SplitTransaction']"}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['access.User']"}),
            'value': ('django.db.models.fields.DecimalField', [], {'default': "'0'", 'max_digits': '7', 'decimal_places': '2'})
        }
    }

    complete_apps = ['expenses']
    symmetrical = True
