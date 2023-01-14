from .models import Project, ToDo
from authapp.serializers import UserModelSerializer
from rest_framework.serializers import ModelSerializer


class ProjectModelSerializer(ModelSerializer):
    # creators = UserModelSerializer(many=True)
    class Meta:
        model = Project
        fields = ('title', 'link', 'creators')


class TodoModelSerializer(ModelSerializer):

    class Meta:
        model = ToDo
        fields = ('project', 'text', 'updated_at', 'created_at', 'active', 'creator')
