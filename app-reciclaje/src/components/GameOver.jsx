import { motion } from "framer-motion";

export default function GameOver({ onRestart, onHome }) {
  return (
    // Overlay oscuro que cubre toda la pantalla
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
      aria-modal="true"
      role="dialog"
    >
      {/* Modal */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ type: "spring", stiffness: 120, damping: 15 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl h-auto p-10 md:p-16 text-center relative"
      >
        <motion.h1
          initial={{ rotate: -10 }}
          animate={{ rotate: 0 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 1,
            ease: "easeInOut",
          }}
          className="text-5xl md:text-6xl font-extrabold mb-6 text-green-600"
        >
          🎉 ¡Felicidades! 🎉
        </motion.h1>
        <p className="text-lg md:text-2xl mb-10 text-gray-700 dark:text-gray-200">
          Has ganado el juego 🏆 <br />
          Gracias por jugar y ayudar a cuidar el planeta 🌍
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button
            onClick={onRestart}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Jugar de nuevo
          </button>
          <button
            onClick={onHome}
            className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-4 rounded-xl font-semibold transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Volver al inicio
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
