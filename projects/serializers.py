from rest_framework import serializers

from .models import Project, ToDo
from authapp.serializers import UserModelSerializer, UserOnlyUsernameModelSerializer
from rest_framework.serializers import ModelSerializer


class ProjectModelSerializer(ModelSerializer):
    creators = UserOnlyUsernameModelSerializer(many=True)
    class Meta:
        model = Project
        fields = ('id', 'title', 'link', 'creators')


class TodoModelSerializer(ModelSerializer):
    # creator = serializers.HiddenField(default=serializers.CurrentUserDefault())
    # active = serializers.HiddenField(default=True)
    class Meta:
        model = ToDo
        fields = ('id', 'project', 'text', 'updated_at', 'created_at', 'active', 'creator')
