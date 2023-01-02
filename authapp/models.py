from django.db import models
from uuid import uuid4


class UserModel(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True)
    username = models.CharField(max_length=64, verbose_name='Имя пользователя')
    firstname = models.CharField(max_length=64, verbose_name='Имя')
    lastname = models.CharField(max_length=64, verbose_name='Фамилия')
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
