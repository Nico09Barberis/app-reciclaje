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

function Draggable({ id, name, img }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id });

  return (
    <motion.div
      ref={setNodeRef}
      style={{
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
        opacity: isDragging ? 0.5 : 1,
      }}
      {...listeners}
      {...attributes}
      className="p-4 m-3 cursor-grab select-none flex flex-col items-center w-28 
               bg-gradient-to-br from-purple-500/20 to-pink-500/20 
               rounded-xl shadow-lg backdrop-blur-sm border border-white/20"
      initial={{ scale: 1, opacity: 0 }}
      animate={{ scale: 1.2, opacity: 1 }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.25)",
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 250, damping: 15 }}
    >
      <motion.img
        src={img}
        alt={name}
        className="w-36 h-36 object-contain drop-shadow-lg"
        whileHover={{ rotate: 3, scale: 1.08 }}
        transition={{ type: "spring", stiffness: 200 }}
      />
      <span className="text-sm text-center font-semibold text-gray-800 drop-shadow-sm">
        {name}
      </span>
    </motion.div>
  );
}

function Droppable({ id, name, color, img }) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <motion.div
      ref={setNodeRef}
      className={`${color} p-4 m-3 rounded-xl min-h-[140px] 
                 flex flex-col items-center justify-center 
                 text-black font-bold text-lg shadow-lg border border-white/20`}
      whileHover={{
        scale: 1.03,
        boxShadow: "0px 12px 30px rgba(0,0,0,0.2)",
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <motion.img
        src={img}
        alt={`${name} container`}
        className="w-24 h-24 mb-1 drop-shadow-md"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 200 }}
      />
      <span className="drop-shadow-sm">{name}</span>
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
    if (!over) return setMessage("Drop the object on a container");

    const item = residuesData.find((r) => r.id === active.id);
    const container = containers.find((c) => c.id === over.id);

    if (!item || !container) return;

    if (item.category === container.id) {
      setMessage(`✅ Correct! ${item.name} goes in ${container.name}`);

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
      setMessage(`❌ ${item.name} does NOT go in ${container.name}`);
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
    <div className="p-4 min-h-screen bg-green-50 relative">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Sort the waste - Level {level}
      </h2>

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
            className="mt-8 text-center font-semibold text-lg"
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-2 text-center text-green-700 font-bold">
        Score: {corrects} / {currentLevel?.goal || "?"}
      </div>

      <AnimatePresence>
        {gameOver && <GameOver onRestart={handleRestart} onHome={handleHome} />}
      </AnimatePresence>
    </div>
  );
}
