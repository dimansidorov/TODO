from rest_framework import filters
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.viewsets import ModelViewSet
from .models import Project, ToDo
from .serializers import ProjectModelSerializer, TodoModelSerializer


class ProjectOffsetPagintion(LimitOffsetPagination):
    default_limit = 10


class ToDoOffsetPagintion(LimitOffsetPagination):
    default_limit = 20


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectOffsetPagintion
    filter_backends = [filters.SearchFilter]
    search_fields = 'title',


class ToDoModelViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = TodoModelSerializer
    pagination_class = ToDoOffsetPagintion
    filterset_fields = ('id', 'created_at', 'updated_at')

    def perform_destroy(self, instance):
        instance.active = False
        instance.save()





