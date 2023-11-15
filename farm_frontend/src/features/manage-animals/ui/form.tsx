import { AnimatePresence, motion } from "framer-motion";

export const AddAnimalFormComponent = ({
  onAddAnimal,
  name,
  onNameChange,
  error,
}: AddAnimalFormComponentProps) => {
  return (
    <AnimatePresence>
      <h1 className="text-2xl">Add new animal form:</h1>
      <div className="my-6">
        <label
          className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
          htmlFor="name"
        >
          Name:
        </label>
        <input
          type="text"
          id="name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700"
          placeholder="Dog"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
        />
      </div>
      <motion.button
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 50,
          mass: 0.2,
          duration: 0.4,
          ease: "easeInOut",
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
        onClick={onAddAnimal}
        className="text-2xl text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 rounded-lg px-5 py-2.5 text-center me-2 mb-2"
      >
        Add Animal
      </motion.button>
      {error && <p className="error-container text-red-700">{error}</p>}
    </AnimatePresence>
  );
};
