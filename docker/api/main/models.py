from django.db import models

# Create your models here.
class Blog(models.Model):
    title   = models.CharField(max_length=200)
    content = models.CharField(max_length=200)
    date    = models.DateField()
    user    = models.CharField(max_length=200)
    
    def __str__(self):
        return self.title

class Este_User(models.Model):
    name        = models.CharField(max_length=200)
    address     = models.CharField(max_length=200)
    date        = models.DateField()
    tel         = models.CharField(max_length=200)
    birthday    = models.DateField(default='2000-01-01')
    
    def __str__(self):
        return self.name
    
class Este_Course_Contents(models.Model):
    cose_name       = models.TextField()
    contents        = models.TextField()
    price           = models.CharField(max_length=200)
    treatment_area  = models.TextField(default='Default Area')
    date            = models.DateField()

    def __str__(self):
        return self.cose_name