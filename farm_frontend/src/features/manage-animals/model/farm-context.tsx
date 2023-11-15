import React, { createContext, useContext, useState, useEffect } from "react";

const FarmContext = createContext<FarmContextProps | undefined>(undefined);

const apiHost = "http://127.0.0.1:8000";

// Create a provider component
export const FarmProvider: React.FC<any> = ({ children }) => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [csrfToken, setCsrfToken] = useState<string>("");

  const loadAndSaveCSRFToken = async () => {
    try {
      const response = await fetch(`${apiHost}/farm/get-csrf/`);
      const data = await response.json();
      setCsrfToken(data.csrfToken);
    } catch {
      setError("Failed to get CSRF token, backend is not set up correctly");
    }
  };

  const loadAnimals = async () => {
    setError("");

    const response = await fetch(`${apiHost}/farm/animals/`);
    const data = await response.json();
    setAnimals(data.animals);
  };

  const handleDeleteAnimal = async (id: string) => {
    setError("");
    try {
      const response = await fetch(
        `${apiHost}/farm/animals/remove/${id}/`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        setError("Failed to delete animal");
      } else {
        const updatedAnimals = animals.filter((animal) => animal.id !== id);
        setAnimals(updatedAnimals);
      }
    } catch {
      setError("Failed to delete animal");
    }
  };

  const handleAddAnimal = async () => {
    setError("");
    // Fetch CSRF token from Django local app

    const newAnimal = {
      name,
    };

    // Include CSRF token in headers of post request as a default security measure
    const postResponse = await fetch(`${apiHost}/farm/animals/add/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      body: JSON.stringify(newAnimal),
    });

    if (postResponse.ok) {
      const newAnimalData = (await postResponse.json()).data as Animal;
      setAnimals([...animals, newAnimalData]);
      setName("");
    } else {
      const message = await postResponse.text();
      setError(message);
      console.error("Failed to add animal");
    }
  };

  useEffect(() => {
    loadAndSaveCSRFToken();
    loadAnimals();
  }, []);

  // Provide the context values to the children
  const contextValues: FarmContextProps = {
    animals,
    name,
    error,
    csrfToken,
    setName,
    handleDeleteAnimal,
    handleAddAnimal,
  };

  return (
    <FarmContext.Provider value={contextValues}>
      {children}
    </FarmContext.Provider>
  );
};

// Create a custom hook for using the context
export const useFarmContext = () => {
  const context = useContext(FarmContext);
  if (!context) {
    throw new Error("useFarmContext must be used within a FarmProvider");
  }
  return context;
};
