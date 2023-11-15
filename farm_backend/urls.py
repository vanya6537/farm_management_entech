from django.urls import path
from .views import animal_list, add_animal, remove_animal, get_csrf_token

urlpatterns = [
    path('animals/', animal_list, name='animal_list'),
    path('animals/add/', add_animal, name='add_animal'),
    path('animals/remove/<animal_id>/', remove_animal, name='remove_animal'),
    path('get-csrf/', get_csrf_token, name='get_csrf_token'),
]
