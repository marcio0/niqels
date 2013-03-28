from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=20)
    #user = models.ForeignKey('auth.User')

    def __unicode__(self):
        return self.name


class Entry(models.Model):
    value = models.DecimalField(decimal_places=2, max_digits=7)
    description = models.TextField(null=True)
    date = models.DateField()
    category = models.ForeignKey(Category)
    #user = models.ForeignKey('auth.User')

    class Meta:
        ordering = ['-date']
