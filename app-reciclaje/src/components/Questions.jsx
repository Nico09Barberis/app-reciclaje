// src/components/FAQ.jsx
import { useState } from "react";

const faqs = [
  {
    question: "¿Por qué es importante separar los residuos?",
    answer:
      "Separar los residuos facilita el reciclaje, reduce la contaminación y ayuda a reutilizar materiales, disminuyendo el impacto ambiental.",
  },
  {
    question: "¿Qué pasa si mezclo materiales reciclables con basura?",
    answer:
      "Mezclar residuos dificulta el proceso de reciclaje y puede hacer que materiales reciclables terminen en vertederos, perdiendo su valor.",
  },
  {
    question: "¿Cómo limpio correctamente los envases?",
    answer:
      "Enjuaga los envases para eliminar restos de comida o líquidos, esto ayuda a evitar olores y facilita el reciclaje.",
  },
  {
    question: "¿Qué hago con residuos peligrosos?",
    answer:
      "Los residuos peligrosos deben llevarse a puntos especiales de recolección para evitar daños al medio ambiente y la salud.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-green-700">❓ Preguntas Frecuentes</h2>
      <div className="space-y-4">
        {faqs.map(({ question, answer }, i) => (
          <div
            key={i}
            className="border border-green-300 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleIndex(i)}
              className="w-full text-left px-6 py-4 bg-green-100 hover:bg-green-200 flex justify-between items-center font-semibold text-lg"
            >
              {question}
              <span className="ml-2 text-green-700 text-xl">
                {openIndex === i ? "−" : "+"}
              </span>
            </button>
            <div
              className={`px-6 pb-4 text-gray-700 transition-max-height duration-300 ease-in-out overflow-hidden ${
                openIndex === i ? "max-h-96 pt-4" : "max-h-0"
              }`}
              style={{ transitionProperty: "max-height, padding" }}
            >
              {answer}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
