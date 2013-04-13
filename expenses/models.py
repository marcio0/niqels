from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=20)
    user = models.ForeignKey('access.User')
    color = models.CharField(max_length=7, default="#999999")

    def __unicode__(self):
        return self.name


class Entry(models.Model):
    value = models.DecimalField(decimal_places=2, max_digits=7)
    description = models.TextField(null=True, blank=True)
    date = models.DateField()
    category = models.ForeignKey(Category)
    user = models.ForeignKey('access.User')

    def __unicode__(self):
        return '%d of %s on %s' % (
            self.value,
            self.category,
            self.date
        )

    class Meta:
        ordering = ['-date']
