import { motion } from "framer-motion";

export default function GameOver({ onRestart, onHome }) {
  return (
    // Overlay oscuro que cubre toda la pantalla
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
    >
      {/* Modal */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ type: "spring", stiffness: 120, damping: 15 }}
        className="bg-green-100 rounded-lg shadow-lg max-w-md mx-4 p-12 text-center relative"
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
          className="text-5xl font-extrabold mb-4 text-green-700"
        >
          🎉 ¡Felicidades! 🎉
        </motion.h1>
        <p className="text-xl mb-6 text-green-900">
          Has ganado el juego 🏆 <br />
          Gracias por jugar y ayudar a cuidar el planeta 🌍
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={onRestart}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition"
          >
            Jugar de nuevo
          </button>
          <button
            onClick={onHome}
            className="bg-gray-400 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-500 transition"
          >
            Volver al inicio
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
