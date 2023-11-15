interface AddAnimalFormComponentProps {
  onAddAnimal: (e: any) => Promise<void>;
  name: string;
  onNameChange: (name: string) => void;
  error: string;
}

interface FarmContextProps {
  animals: Animal[];
  name: string;
  error: string;
  csrfToken: string;
  setName: (name: string) => void;
  handleDeleteAnimal: (id: string) => Promise<void>;
  handleAddAnimal: () => Promise<void>;
}