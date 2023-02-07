from rest_framework import mixins, versioning
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer, AdminRenderer
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, ViewSet, GenericViewSet
from .models import User
from .serializers import UserModelSerializer, SuperUserModelSeriaziler


# class UserModelViewSet(ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserModelSerializer


class UserViewSet(mixins.RetrieveModelMixin,
                  mixins.ListModelMixin,
                  mixins.UpdateModelMixin,
                  GenericViewSet):
    queryset = User.objects.all()
    # serializer_class = UserModelSerializer

    def get_serializer_class(self):
        if self.request.version == '1':
            return SuperUserModelSeriaziler
        return UserModelSerializer