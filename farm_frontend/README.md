# React Animals Management System for Farmer

This is a single-page React application designed to help farmer manage his/her animals effortlessly. The application follows the feature-sliced architecture, with the main logic encapsulated in the `FarmContext`. The context provides a state management solution, making it easy to share and access data across different components.

## Getting Started

Before running the application, ensure that you have set up the backend correctly. The API host `apiHost` is set to `http://127.0.0.1:8000`, so make sure your backend server is running on this address.

1. Clone the repository: `git clone [repository-url]`
2. cd farm_frontend
3. Install dependencies: `yarn`
4. Start the application: `yarn start`

## Architecture

The application adheres to the feature-sliced architecture, promoting a modular and scalable code structure. The `FarmContext` serves as the central hub for managing state and handling API interactions related to animal management.

### FarmContext

The `FarmContext` is created using the `createContext` API from React. It provides a provider component (`FarmProvider`) and a custom hook (`useFarmContext`) for consuming the context in various components.

#### FarmProvider

The `FarmProvider` component manages the application state, including the list of animals, error messages, and CSRF token. It exposes functions for adding and deleting animals, as well as setting the animal name. The provider component fetches the CSRF token from the backend during initialization.

#### useFarmContext

The `useFarmContext` hook allows components to access the values stored in the `FarmContext`. It throws an error if used outside the `FarmProvider`, ensuring proper usage within the application.

## API Interaction

The application interacts with the backend API for CRUD operations on animals. It fetches the CSRF token and performs asynchronous requests to add or remove animals. Error handling is implemented to manage potential issues during these operations.

# Main Page Code Explanation: `AnimalsListPage`

This React functional component, `AnimalsListPage`, serves as the main page. It leverages components from various parts of the application, specifically the `AddAnimalFormComponent` and `AnimalsListComponent`. Let's break down the key elements of this code:

```jsx
import React from "react";
import { AnimalsListComponent } from "../../entities/animal";
import {
  AddAnimalFormComponent,
  useFarmContext,
} from "../../features/manage-animals";
```

1. **Imports:**
   - The component imports the `AnimalsListComponent` from the `../../entities/animal` directory. This component  handles the display of a list of animals.
   - It also imports `AddAnimalFormComponent` and `useFarmContext` from `../../features/manage-animals`. These components are part of the animal management feature and are used to securely add animals.

```jsx
const AnimalsListPage: React.FC = () => {
  // All business logic is now in the FarmProvider component
  const { name, setName, error, animals, handleDeleteAnimal, handleAddAnimal } =
    useFarmContext();
```

2. **Functional Component:**
   - This is a functional React component named `AnimalsListPage`.
   - It utilizes the `useFarmContext` custom hook to access the values from the `FarmContext`. This hook provides access to the animal list, current name, error messages, and functions for handling animal addition and deletion.

```jsx
return (
  <div className="flex flex-col md:flex-row gap-8 p-3 sm:p-8">
    <div className="flex flex-col md:w-1/2">
      <AddAnimalFormComponent
        onAddAnimal={handleAddAnimal}
        name={name}
        onNameChange={setName}
        error={error}
      />
    </div>
    <div className="flex flex-col md:w-1/2">
      <h1 className="text-2xl mb-3">Animals:</h1>
      <AnimalsListComponent
        animals={animals}
        onAnimalClick={handleDeleteAnimal}
      />
    </div>
  </div>
);
```

3. **Component Structure:**
   - The component returns JSX that represents the layout of the page.
   - It uses a flex container with a column layout for small screens (`flex-col`) and a row layout for medium (`md:flex-row`). The gap between elements is adjusted based on the screen size.
   - The left column (`md:w-1/2`) contains the `AddAnimalFormComponent`, allowing users to add animals. It passes relevant props for handling the addition process.
   - The right column also takes up half of the width and displays a heading ("Animals:") along with the `AnimalsListComponent`. This component renders the list of animals and handles the click event for deleting animals.
