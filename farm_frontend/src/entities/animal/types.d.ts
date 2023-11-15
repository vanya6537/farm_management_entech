interface Animal {
  id: string;
  name: string;
}

interface AnimalsListComponentProps {
  animals: Animal[];
  onAnimalClick: (id: string) => void;
}
