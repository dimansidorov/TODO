from .models import User
from rest_framework.serializers import ModelSerializer


class UserModelSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'firstname', 'lastname', 'email')


class UserOnlyUsernameModelSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = 'username',


class SuperUserModelSeriaziler(ModelSerializer):
    class Meta:
        model = User
        fields = 'id', 'username', 'firstname', 'lastname', 'email', 'is_superuser', 'is_staff'

