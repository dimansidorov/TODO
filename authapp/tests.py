from rest_framework import status
from rest_framework.test import APITestCase
# Create your tests here.


class TestToDoModelViewSet(APITestCase):

    def test_get_list(self):
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)