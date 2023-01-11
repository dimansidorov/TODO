from .models import Project, ToDo
from authapp.serializers import UserModelSerializer
from rest_framework.serializers import ModelSerializer


class ProjectModelSerializer(ModelSerializer):
    creators = UserModelSerializer(many=True)
    class Meta:
        model = Project
        fields = '__all__'


class TodoModelSerializer(ModelSerializer):
    creator = UserModelSerializer()
    class Meta:
        model = ToDo
        fields = '__all__'
