from mixer.backend.django import mixer
from django.core.management.base import BaseCommand

from authapp.models import User


class Command(BaseCommand):
    help = 'Добавить Товар'

    def handle(self, *args, **options):
        try:
            User.objects.create_user(username='admin',
                                     password='admin',
                                     email='admin@admin.com',
                                     is_staff=True,
                                     is_superuser=True)
            print('Cуперпользователь "admin" создан')
        except:
            print('Cуперпользователь "admin" уже существует')
        finally:
            for i in range(3):
                user = mixer.blend(User)
                print(f'Пользователь {user} создан')
