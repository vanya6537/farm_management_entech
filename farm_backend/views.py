from django.shortcuts import render, redirect
from django.http import Http404

from django.views.decorators.csrf import get_token, csrf_protect, csrf_exempt
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponseNotFound, HttpResponseNotAllowed
import json
import uuid

# Emulating a database
# usual class for this case in models:
# class Animal(models.Model):
#    name = models.CharField(max_length=255, unique=True)

class Animal:
    def __init__(self, name, id):
        self.name = name
        self.id = id
    def getSerialized(self):
        return {'name': self.name, 'id': self.id}

def new_uuid():
    return str(uuid.uuid4())

in_memory_data = {'animals': [Animal('Cat', new_uuid() ), Animal('Dog', new_uuid() ), Animal('Software Developer after a night of coding', new_uuid()) ]}
print(in_memory_data)

# For CSRF token logic before the POST/DELETE request. usually integrated into the view form cookie
def get_csrf_token(request):
    token = get_token(request)
    return JsonResponse({'csrfToken': token})


def animal_list(request):
    if request.method == 'GET':
        return JsonResponse({'animals': [x.getSerialized() for x in in_memory_data['animals']]})

#@csrf_protect
@csrf_exempt
def add_animal(request):
     if request.method == 'POST':
        try:
            data = json.loads(request.body)
            name = data.get('name', '')
            # check if animal with such name already exists
            if name:
                for animal in in_memory_data['animals']:
                    if animal.name == name:
                        return HttpResponseBadRequest('Animal already exists')

                # create new animal
                newAnimal = Animal(name,  new_uuid())
                # add new animal to the list
                in_memory_data['animals'].append(newAnimal)
                return JsonResponse({'status': 'Animal added successfully', 'data': newAnimal.getSerialized()})
            else:
                return HttpResponseBadRequest('Invalid data')
        except json.JSONDecodeError:
            return HttpResponseBadRequest('Invalid JSON data')

#@csrf_protect
@csrf_exempt
def remove_animal(request, animal_id):
    if request.method == 'DELETE':
        try:
            # try to find animal by id
            animal_index = -1
            for i, animal in enumerate(in_memory_data['animals']):
                if animal.id == animal_id:
                    # remember it and break the loop
                    animal_index = i
                    break
            
            # if animal found - remove it
            if animal_index >= 0:
                removed_animal = in_memory_data['animals'].pop(animal_index)
                return JsonResponse({'status': 'Animal removed successfully', 'removed_animal': removed_animal.getSerialized()})
            else:
                return HttpResponseNotFound('Animal not found')
        except ValueError:
            return HttpResponseBadRequest('Invalid animal index')
    else:
        return HttpResponseNotAllowed(['DELETE'])
