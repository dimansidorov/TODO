from .models import Project, ToDo
from authapp.serializers import UserModelSerializer
from rest_framework.serializers import ModelSerializer


class ProjectModelSerializer(ModelSerializer):
    creators = UserModelSerializer(many=True)
    class Meta:
        model = Project
        fields = ('id', 'title', 'link', 'creators')


class TodoModelSerializer(ModelSerializer):
    creator = UserModelSerializer()

    class Meta:
        model = ToDo
        fields = ('id', 'project', 'text', 'updated_at', 'created_at', 'active', 'creator')
