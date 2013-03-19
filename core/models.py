from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=20)
    user = models.ForeignKey('auth.User')

class Entry(models.Model):
    value = models.DecimalField(decimal_places=2, max_digits=7)
    description = models.TextField()
    date = models.DateField()
    category = models.ForeignKey(Category)

