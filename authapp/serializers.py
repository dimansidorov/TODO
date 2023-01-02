from .models import UserModel
from rest_framework.serializers import HyperlinkedModelSerializer


class UserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = UserModel
        fields = ('username', 'firstname', 'lastname', 'email',)