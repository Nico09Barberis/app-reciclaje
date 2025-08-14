const tips = [
  {
    front: "♻️",
    title: "Reduce",
    back: "Minimiza el consumo de productos desechables para generar menos residuos.",
  },
  {
    front: "🧼",
    title: "Limpia",
    back: "Lava y seca los envases antes de reciclar para evitar contaminación.",
  },
  {
    front: "📦",
    title: "Compacta",
    back: "Aplasta botellas y cajas para ahorrar espacio en el contenedor.",
  },
  {
    front: "🚫",
    title: "No mezcles",
    back: "No mezcles residuos peligrosos con reciclables para evitar riesgos.",
  },
];

export default function TipsFlip() {
  return (
    <section className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-extrabold text-[#26B75A] mb-8 text-center">
        💡 Tips verdes para tu día a día 
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {tips.map(({ front, title, back }, index) => (
          <div
            key={index}
            className="group perspective w-full h-48 cursor-pointer"
          >
            <div className="relative w-full h-full duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
              {/* Frente */}
              <div className="absolute w-full h-full backface-hidden bg-[#26B75A] rounded-xl flex flex-col items-center justify-center p-4 shadow-lg">
                <div className="text-6xl">{front}</div>
                <h3 className="mt-4 text-xl font-bold text-gray-900">{title}</h3>
              </div>

              {/* Reverso */}
              <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-[#26B75A] rounded-xl flex items-center justify-center p-6 shadow-lg">
                <p className="text-gray-900 font-semibold text-center text-base">{back}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
