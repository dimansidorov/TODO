from django.db import models
from authapp.models import User


class Project(models.Model):
    title = models.CharField(max_length=64)
    link = models.URLField(blank=True)
    creators = models.ManyToManyField(User)

    def __str__(self):
        return self.title


class ToDo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    active = models.BooleanField(default=True)

    class Meta:
        verbose_name_plural = 'Todos'
