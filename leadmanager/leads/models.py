from django.db import models
from datetime import datetime
from django.contrib.auth.models import User


class Lead(models.Model):
    name=models.CharField(max_length=100)
    email=models.EmailField(max_length=100,unique=True)
    message=models.TextField(blank=True)
    owner=models.ForeignKey(User,related_name='leads',on_delete=models.CASCADE,null=True)
    created_at=models.DateTimeField(default=datetime.now)

    def __str__(self):
        return self.name
