import React, { useState } from 'react'
import {
  DndContext,
  useDraggable,
  useDroppable,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'

const residuos = [
  { id: 'botella1', tipo: 'plastico', nombre: 'Botella plástica' },
  { id: 'papel1', tipo: 'papel', nombre: 'Hoja de papel' },
  { id: 'lata1', tipo: 'metal', nombre: 'Lata de aluminio' },
  { id: 'manzana1', tipo: 'organico', nombre: 'Cáscara de manzana' },
]

const contenedores = [
  { id: 'plastico', nombre: 'Plástico', color: 'bg-blue-400' },
  { id: 'papel', nombre: 'Papel', color: 'bg-yellow-400' },
  { id: 'metal', nombre: 'Metal', color: 'bg-gray-400' },
  { id: 'organico', nombre: 'Orgánico', color: 'bg-green-400' },
]

function Draggable({ id, nombre }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
  })

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="p-3 m-2 bg-white rounded shadow cursor-grab select-none"
    >
      {nombre}
    </div>
  )
}

function Droppable({ id, nombre, color }) {
  const { setNodeRef, isOver: droppableIsOver } = useDroppable({ id })
  return (
    <div
      ref={setNodeRef}
      className={`${color} p-6 m-2 rounded shadow min-h-[100px] flex items-center justify-center text-white font-bold text-lg ${
        droppableIsOver ? 'ring-4 ring-green-300' : ''
      }`}
    >
      {nombre}
    </div>
  )
}

export default function GameComp() {
  const [message, setMessage] = useState('')
  const [correctos, setCorrectos] = useState(0)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  )

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (!over) {
      setMessage('Suelta el objeto sobre un contenedor')
      return
    }

    const objeto = residuos.find((r) => r.id === active.id)
    if (!objeto) return

    if (objeto.tipo === over.id) {
      setMessage(`¡Correcto! ${objeto.nombre} va en ${over.id}`)
      setCorrectos((c) => c + 1)
    } else {
      setMessage(`Oops! ${objeto.nombre} NO va en ${over.id}`)
    }
  }

  return (
    <div className="p-4 min-h-screen bg-green-50">
      <h2 className="text-2xl font-bold mb-4 text-center">Clasifica los residuos</h2>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {residuos.map(({ id, nombre }) => (
            <Draggable key={id} id={id} nombre={nombre} />
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {contenedores.map(({ id, nombre, color }) => (
            <Droppable key={id} id={id} nombre={nombre} color={color} />
          ))}
        </div>
      </DndContext>

      <div className="mt-8 text-center font-semibold text-lg">{message}</div>
      <div className="mt-2 text-center text-green-700 font-bold">Puntaje: {correctos}</div>
    </div>
  )
}
