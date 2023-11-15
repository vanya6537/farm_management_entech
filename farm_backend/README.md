# Farm Backend Django App

## Overview

The Farm Backend Django App is a web application designed to manage animal records on a farm. This Django app provides a set of functionalities to list animals, add new animals, remove animals, and retrieve the CSRF token for secure form submissions.

## Installation

To use the Farm Backend Django App, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/vanya6537/farm_management_entech.git
    ```

2. Install the required dependencies:

    ```bash
    pip install -r requirements.txt
    ```

3. Apply the database migrations:

    ```bash
    python manage.py migrate
    ```

4. Run the development server:

    ```bash
    python manage.py runserver
    ```

## URLs Configuration

The main URLs file (`urls.py`) is configured to handle the following endpoints:

- **Animal List**: View a list of all animals on the farm.
  - URL: `/animals/`
  - View Function: `animal_list`
  - Name: `animal_list`

- **Add Animal**: Add a new animal to the farm.
  - URL: `/animals/add/`
  - View Function: `add_animal`
  - Name: `add_animal`

- **Remove Animal**: Remove an existing animal from the farm.
  - URL: `/animals/remove/<animal_id>/`
  - View Function: `remove_animal`
  - Name: `remove_animal`

- **Get CSRF Token**: Retrieve the CSRF token for secure form submissions.
  - URL: `/get-csrf/`
  - View Function: `get_csrf_token`
  - Name: `get_csrf_token`

## Usage

Once the app is installed and the development server is running, you can access the different functionalities through the defined URLs.

- To view the list of animals, navigate to `/animals/`.
- To add a new animal, go to `/animals/add/`.
- To remove an animal, access `/animals/remove/<animal_id>/`.
- To obtain the CSRF token, visit `/get-csrf/`.

## Code review

The provided code represents the main business logic for a Django web application that manages a list of animals on a farm. Let's break down the key components and explain the main business logic:

### 1. Animal Class:

```python
class Animal:
    def __init__(self, name, id):
        self.name = name
        self.id = id

    def getSerialized(self):
        return {'name': self.name, 'id': self.id}
```

- This class defines an `Animal` with attributes `name` and `id`.
- The `getSerialized` method returns a dictionary representing the serialized form of the animal.

### 2. Data Storage:

```python
in_memory_data = {'animals': [Animal('Cat', new_uuid()), Animal('Dog', new_uuid()), Animal('Software Developer after a night of coding', new_uuid())]}
```

- An in-memory data structure (`in_memory_data`) is used to store a list of animals.
- Initial animal data is provided as instances of the `Animal` class.

### 3. CSRF Token Logic:

```python
def get_csrf_token(request):
    token = get_token(request)
    return JsonResponse({'csrfToken': token})
```

- This function generates and returns a CSRF token to be used for secure form submissions.
- The token is retrieved using Django's `get_token` function.

### 4. Animal List View:

```python
def animal_list(request):
    if request.method == 'GET':
        return JsonResponse({'animals': [x.getSerialized() for x in in_memory_data['animals']]})
```

- Returns a JSON response containing the list of animals when the HTTP GET method is used.

### 5. Add Animal View:

```python
@csrf_exempt
def add_animal(request):
    if request.method == 'POST':
        # ... (omitted for brevity)
```

- Handles the addition of a new animal when the HTTP POST method is used.
- Validates the incoming JSON data, checks if the animal already exists, creates a new animal, and adds it to the list.

### 6. Remove Animal View:

```python
@csrf_exempt
def remove_animal(request, animal_id):
    if request.method == 'DELETE':
        # ... (omitted for brevity)
```

- Handles the removal of an animal when the HTTP DELETE method is used.
- Finds the animal by ID, removes it from the list, and returns a JSON response with the removed animal's information.

### 7. CSRF Protection:

CSRF protection is applied using the `@csrf_exempt` decorator, allowing the views to accept requests without a CSRF token during development. 

### 8. Error Handling:

- Proper error handling is implemented for cases such as invalid JSON data, attempts to add an existing animal, attempting to remove a non-existent animal, etc.

This code provides a basic foundation for managing animals on a farm, with endpoints for listing, adding, and removing animals, along with CSRF token support. It's important to note that this is a simplified example, and in a real-world scenario, a database model would likely be used instead of the in-memory data structure for persistent data storage.