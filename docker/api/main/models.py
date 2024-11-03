from django.db import models

# Create your models here.
class Blog(models.Model):
    title   = models.CharField(max_length=200)
    content = models.CharField(max_length=200)
    date    = models.DateField()
    user    = models.CharField(max_length=200)
    
    def __str__(self):
        return self.title

class Este(models.Model):
    name    = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    date    = models.DateField()
    cose    = models.CharField(max_length=200)
    
    def __str__(self):
        return self.name