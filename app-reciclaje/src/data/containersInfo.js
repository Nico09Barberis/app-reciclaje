// src/data/containersInfo.js
export const containersInfo = [
  {
    id: 1,
    name: "Plásticos-metales",
    color: "bg-yellow-400",
    img: "/images/containers/plastic.png",
    yes: ["Botellas de plástico", "Tapas", "Envases de bebidas"],
    no: ["Plásticos sucios", "Juguetes", "Cubiertos descartables"],
  },
  {
    id: 2,
    name: "Papel y Cartón",
    color: "bg-blue-400",
    img: "/images/containers/paper.png",
    yes: ["Diarios", "Revistas", "Cajas limpias"],
    no: ["Papel mojado", "Servilletas usadas", "Cartón con grasa"],
  },
  {
    id: 3,
    name: "Vidrio",
    color: "bg-green-500",
    img: "/images/containers/glass.png",
    yes: ["Botellas de vidrio", "Frascos"],
    no: ["Vidrios rotos peligrosos", "Espejos", "Cerámica"],
  },
  {
    id: 4,
    name: "organico",
    color: "bg-orange-400",
    img: "/images/containers/organic.png",
    yes: ["Latas de aluminio", "Latas de conserva", "Tapas metálicas"],
    no: ["Objetos oxidados", "Cables", "Electrodomésticos"],
  },
  {
    id: 5,
    name: "No Reciclable",
    color: "bg-gray-700",
    img: "/images/containers/non-recyclable.png",
    yes: ["Pañales", "Colillas de cigarro", "Papel higiénico usado"],
    no: ["Materiales reciclables limpios", "Residuos peligrosos"],
  },
  {
    id: 6,
    name: "Residuos Peligrosos",
    color: "bg-red-600",
    img: "/images/containers/hazardous.png",
    yes: ["Baterías", "Aceites", "Pinturas", "Medicamentos vencidos"],
    no: ["Residuos comunes", "Reciclables"],
  }
];
