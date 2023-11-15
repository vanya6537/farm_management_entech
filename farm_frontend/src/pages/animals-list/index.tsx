import React from "react";
import { AnimalsListComponent } from "../../entities/animal";
import {
  AddAnimalFormComponent,
  useFarmContext,
} from "../../features/manage-animals";

const AnimalsListPage: React.FC = () => {
  // All business logic is now in the FarmProvider component
  const { name, setName, error, animals, handleDeleteAnimal, handleAddAnimal } =
    useFarmContext();

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
};

export default AnimalsListPage;
