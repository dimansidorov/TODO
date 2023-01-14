from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin, UserManager
from django.db import models
from uuid import uuid4


class User(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(default=uuid4, primary_key=True)
    username = models.CharField(max_length=64, unique=True, verbose_name="Имя пользователя")
    firstname = models.CharField(max_length=64, verbose_name='Имя')
    lastname = models.CharField(max_length=64, verbose_name='Фамилия')
    email = models.EmailField(unique=True, verbose_name='email')
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    objects = UserManager()

    EMAIL_FIELD = "email"
    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email"]

    def __str__(self):
        return self.username

    class Meta:
        verbose_name = "user"
        verbose_name_plural = "users"
