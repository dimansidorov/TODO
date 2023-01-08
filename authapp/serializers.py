from .models import User
from rest_framework.serializers import HyperlinkedModelSerializer


class UserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'firstname', 'lastname', 'email',)