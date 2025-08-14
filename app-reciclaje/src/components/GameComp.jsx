import React, { useState } from "react";
import residuesData from "../data/residues.json";
import containersData from "../data/containers.json";
import GameOver from "./GameOver";
import levelsData from "../data/levels.json";
import {
  DndContext,
  useDraggable,
  useDroppable,
  rectIntersection,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export function Draggable({ id, name, img }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id });

  return (
    <motion.div
      ref={setNodeRef}
      style={{
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
        opacity: isDragging ? 0.6 : 1,
      }}
      {...listeners}
      {...attributes}
      className="p-4 m-3 cursor-grab select-none flex flex-col items-center w-28 
                 bg-gradient-to-br from-purple-500/30 to-pink-500/30 
                 rounded-2xl shadow-lg backdrop-blur-md border border-white/20
                 transition-all duration-200"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{
        scale: 1.07,
        boxShadow: "0px 12px 28px rgba(0, 0, 0, 0.25)",
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 250, damping: 18 }}
    >
      <motion.img
        src={img}
        alt={name}
        className="w-24 h-24 object-contain drop-shadow-lg"
        whileHover={{ rotate: 3, scale: 1.1 }}
        transition={{ type: "spring", stiffness: 200 }}
      />
      <span className=" text-center font-semibold text-gray-300 drop-shadow-sm mt-2">
        {name}
      </span>
    </motion.div>
  );
}

export function Droppable({ id, name, color, img }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <motion.div
      ref={setNodeRef}
      className={`p-5 mt-10 m-3 rounded-2xl min-h-[160px] w-40
                  flex flex-col items-center justify-center gap-2
                  shadow-lg border border-white/20 
                  ${color} transition-all duration-300`}
      style={{
        background: isOver
          ? "linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.2))"
          : undefined,
        backdropFilter: "blur(12px)",
      }}
      animate={{
        scale: isOver ? 1.05 : 1,
        boxShadow: isOver
          ? "0px 15px 30px rgba(0,0,0,0.25)"
          : "0px 8px 20px rgba(0,0,0,0.15)",
      }}
      whileHover={{
        scale: 1.03,
        boxShadow: "0px 14px 28px rgba(0,0,0,0.2)",
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <motion.img
        src={img}
        alt={`${name} container`}
        className="w-20 h-20 drop-shadow-md"
        whileHover={{ scale: 1.08 }}
        transition={{ type: "spring", stiffness: 200 }}
      />
      <span className="font-semibold text-gray-300 drop-shadow-sm">{name}</span>
    </motion.div>
  );
}

export default function GameComp() {
  const [level, setLevel] = useState(1);
  const [message, setMessage] = useState("");
  const [corrects, setCorrects] = useState(0);
  const [placedResidues, setPlacedResidues] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const navigate = useNavigate();

  // Nivel actual
  const currentLevel = levelsData.find((l) => l.id === level);

  // Filtrar residuos excluyendo colocados
  const residues =
    currentLevel && currentLevel.residues
      ? residuesData.filter(
          (r) =>
            currentLevel.residues.includes(r.id) &&
            !placedResidues.includes(r.id)
        )
      : [];

  const containers =
    currentLevel && currentLevel.containers
      ? containersData.filter((c) => currentLevel.containers.includes(c.id))
      : [];

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragEnd = (event) => {
    if (gameOver) return; // bloqueo si el juego terminó

    const { active, over } = event;
    if (!over) return setMessage("Dejar caer el objeto sobre un contenedor");

    const item = residuesData.find((r) => r.id === active.id);
    const container = containers.find((c) => c.id === over.id);

    if (!item || !container) return;

    if (item.category === container.id) {
      setMessage(`✅ Correcto! ${item.name} va en ${container.name}`);

      setCorrects((c) => {
        const newCount = c + 1;

        setPlacedResidues((prev) => [...prev, item.id]);

        if (newCount >= (currentLevel?.goal || Infinity)) {
          setTimeout(() => {
            if (level < levelsData.length) {
              setLevel(level + 1);
              setCorrects(0);
              setPlacedResidues([]);
              setMessage(`🌟 Level ${level + 1}`);
            } else {
              // Aquí activamos el GameOver
              setGameOver(true);
              setMessage("");
            }
          }, 1000);
        }
        return newCount;
      });
    } else {
      setMessage(`❌ ${item.name} no va en ${container.name}`);
    }
  };

  const handleRestart = () => {
    setLevel(1);
    setCorrects(0);
    setPlacedResidues([]);
    setGameOver(false);
    setMessage("");
  };

  const handleHome = () => {
    navigate("/");
  };

  return (
    <div className="p-4 min-h-screen bg-[#181F2A] relative">
      <h2
        className="text-3xl font-extrabold mb-4 text-center 
             bg-gradient-to-r from-emerald-500 to-green-700 
             bg-clip-text text-transparent 
             drop-shadow-md tracking-wide animate-fadeIn"
      >
        Clasifica la basura – Nivel {level}
      </h2>

      <p
        className="max-w-xl mx-auto mb-8 text-lg text-center text-gray-700 
             bg-white/70 backdrop-blur-sm rounded-lg p-4 shadow-md 
             leading-relaxed animate-fadeIn delay-200"
      >
        ♻️ <span className="font-semibold">Cómo jugar:</span> Arrastra cada
        residuo hacia el contenedor correcto. Si te equivocas, no pasa nada —
        ¡puedes intentarlo de nuevo hasta lograrlo! 🎯 La meta es clasificar
        todos los elementos correctamente.
      </p>

      <DndContext
        sensors={sensors}
        collisionDetection={rectIntersection}
        onDragEnd={handleDragEnd}
      >
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {!gameOver &&
            residues.map(({ id, name, img }) => (
              <Draggable key={id} id={id} name={name} img={img} />
            ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {containers.map(({ id, name, img }) => (
            <Droppable key={id} id={id} name={name} img={img} />
          ))}
        </div>
      </DndContext>

      <AnimatePresence>
        {message && !gameOver && (
          <motion.div
            key={message}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="mt-8 text-gray-300 text-center font-semibold text-lg"
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col items-center justify-center my-12">
        <div
          className="px-6 py-4 rounded-lg bg-gradient-to-r from-green-400 to-emerald-600 shadow-lg 
               text-white font-extrabold text-lg tracking-wide transform transition-all duration-300 
               hover:scale-105 text-center"
        >
          <span className="block text-lg opacity-80">Puntuación actual</span>
          <span
            className={`text-3xl ${
              corrects >= (currentLevel?.goal || 0)
                ? "animate-bounce"
                : "animate-pulse"
            }`}
          >
            {corrects} / {currentLevel?.goal || "?"}
          </span>
        </div>
      </div>

      <AnimatePresence>
        {gameOver && <GameOver onRestart={handleRestart} onHome={handleHome} />}
      </AnimatePresence>
    </div>
  );
}
