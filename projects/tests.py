from django.test import TestCase

from rest_framework import status
from rest_framework.test import APIRequestFactory, APIClient, APITestCase
from mixer.backend.django import mixer
from django.contrib.auth.models import User
from .views import ProjectModelViewSet, ToDoModelViewSet
from .models import Project, ToDo
from authapp.models import User


class TestBase(TestCase):

    def setUp(self):
        self.factory = APIRequestFactory()
        self.user_1 = User.objects.create(username='name', firstname='name', lastname='lastname',
                                          email='email@email.email')
        self.user_2 = User.objects.create(username='name1', firstname='name', lastname='lastname',
                                          email='email1@email.email')
        self.client = APIClient()
        self.project = Project.objects.create(title='project test')
        self.project.creators.set([self.user_1.pk])
        self.note = ToDo.objects.create(project=self.project, text='la', creator=self.user_1)
        self.admin = User.objects.create_superuser('admin', 'admin@admin.com',
                                                   'admin')


class TestProjectModelViewSet(TestBase):

    def test_get_list(self):
        request = self.factory.get('/api/projects/')
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_edit_guest(self):
        response = self.client.patch(f'/api/projects/{self.project.id}/', {'title': 'project test 2',
                                                                           'creators': [self.user_2.pk]})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_edit_admin(self):
        self.client.login(username='admin', password='admin')
        response = self.client.patch(f'/api/projects/{self.project.id}/', {'title': 'project test 2',
                                                                           'creators': [self.user_2.pk]})
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestToDoModelViewSet(TestBase):

    def test_get_list(self):
        request = self.factory.get('/api/notes/')
        view = ToDoModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_edit_guest(self):
        response = self.client.patch(f'/api/notes/{self.note.id}/', {'text': 'project test 2',
                                                                     'creator': self.user_2})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_edit_admin(self):
        self.client.login(username='admin', password='admin')
        response = self.client.patch(f'/api/notes/{self.note.id}/', {'text': 'project test 2',
                                                                     'creator': self.user_2})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
