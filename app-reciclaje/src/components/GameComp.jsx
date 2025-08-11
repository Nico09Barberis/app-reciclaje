import React, { useState } from "react";
import { residuesImgs, containersImgs } from "../assets/images";
import {
  DndContext,
  useDraggable,
  useDroppable,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { motion, AnimatePresence } from "framer-motion";

const residues = [
  {
    id: "botella1",
    tipo: "plastico",
    nombre: "Botella plástica",
    img: residuesImgs.botella1,
  },
  {
    id: "papel1",
    tipo: "papel",
    nombre: "Hoja de papel",
    img: residuesImgs.papel1,
  },
  {
    id: "lata1",
    tipo: "metal",
    nombre: "Lata de aluminio",
    img: residuesImgs.lata1,
  },
  {
    id: "manzana1",
    tipo: "organico",
    nombre: "Cáscara de manzana",
    img: residuesImgs.manzana1,
  },
];

const containers = [
  {
    id: "plastico",
    nombre: "Plástico",
    color: "bg-yellow-400",
    img: containersImgs.plastic,
  },
  {
    id: "papel",
    nombre: "Papel",
    color: "bg-blue-400",
    img: containersImgs.papel,
  },
  {
    id: "no-reciclable",
    nombre: "No-reciclable",
    color: "bg-gray-400",
    img: containersImgs.noReciclable,
  },
  {
    id: "peligroso",
    nombre: "Peligroso",
    color: "bg-red-600",
    img: containersImgs.peligroso,
  },
  {
    id: "vidrio",
    nombre: "vidrio",
    color: "bg-green-400",
    img: containersImgs.vidrio,
  },
  {
    id: "organico",
    nombre: "Orgánico",
    color: "bg-amber-700",
    img: containersImgs.organic,
  },
];

function Draggable({ id, nombre, img }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="p-2 m-2 bg-white rounded shadow cursor-grab select-none flex flex-col items-center w-24"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileTap={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <img src={img} alt={nombre} className="w-16 h-16 object-contain mb-1" />
      <span className="text-sm text-center">{nombre}</span>
    </motion.div>
  );
}

function Droppable({ id, nombre, color, img }) {
  const { setNodeRef, isOver: droppableIsOver } = useDroppable({ id });

  return (
    <motion.div
      ref={setNodeRef}
      className={`${color} p-4 m-2 rounded shadow min-h-[120px] flex flex-col items-center justify-center text-white font-bold text-lg`}
      initial={{ boxShadow: "0 0 0px rgba(0,0,0,0)" }}
      animate={{
        boxShadow: droppableIsOver
          ? "0 0 15px 5px rgba(72, 187, 120, 0.7)" // verde glow
          : "0 0 0px rgba(0,0,0,0)",
      }}
      transition={{ duration: 0.3 }}
      role="button"
    >
      <img src={img} alt={`${nombre} contenedor`} className="w-12 h-12 mb-2" />
      {nombre}
    </motion.div>
  );
}

export default function GameComp() {
  const [message, setMessage] = useState("");
  const [correctos, setCorrectos] = useState(0);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) {
      setMessage("Suelta el objeto sobre un contenedor");
      return;
    }

    const objeto = residues.find((r) => r.id === active.id);
    if (!objeto) return;

    if (objeto.tipo === over.id) {
      setMessage(`¡Correcto! ${objeto.nombre} va en ${over.id}`);
      setCorrectos((c) => c + 1);
    } else {
      setMessage(`Oops! ${objeto.nombre} NO va en ${over.id}`);
    }
  };


  return (
    <div className="p-4 min-h-screen bg-green-50">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Clasifica los residuos
      </h2>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {residues.map(({ id, nombre, img }) => (
            <Draggable key={id} id={id} nombre={nombre} img={img} />
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {containers.map(({ id, nombre, color, img }) => (
            <Droppable
              key={id}
              id={id}
              nombre={nombre}
              color={color}
              img={img}
            />
          ))}
        </div>
      </DndContext>

      <AnimatePresence mode="wait">
        {message && (
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
        Puntaje: {correctos}
      </div>
    </div>
  );
}
