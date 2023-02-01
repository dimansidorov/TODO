from .models import User
from rest_framework.serializers import ModelSerializer


class UserModelSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'firstname', 'lastname', 'email')


class UserOnlyUsernameModelSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = 'username',

