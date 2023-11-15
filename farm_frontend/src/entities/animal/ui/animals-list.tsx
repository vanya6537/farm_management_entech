import { FaDeleteLeft } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";
export const AnimalsListComponent = ({
  animals,
  onAnimalClick,
}: AnimalsListComponentProps) => {
  return (
    <motion.ul>
      <AnimatePresence>
        {animals.map((animal) => (
          <motion.li
            key={animal.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
              mass: 0.2,
              duration: 0.5,
              ease: "easeInOut",
            }}
            className="text-xl flex flex-row items-center py-1"
          >
            {animal.name}
            <motion.button
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 50,
                mass: 0.2,
                duration: 0.4,
                ease: "easeInOut",
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
              className="pl-2"
              onClick={() => onAnimalClick(animal.id)}
            >
              <FaDeleteLeft size={28} />
            </motion.button>
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
};
