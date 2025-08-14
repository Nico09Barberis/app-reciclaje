import { useState, useEffect } from "react";

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
  {
    question: "¿Cuáles son los residuos orgánicos y cómo tratarlos?",
    answer:
      "Los residuos orgánicos incluyen restos de comida y plantas. Se pueden compostar para generar abono natural.",
  },
  {
    question: "¿Qué materiales son reciclables en papel y cartón?",
    answer:
      "Papel limpio, periódicos, cajas y cartones sin restos de comida son reciclables. Evita mezclar con papel sucio o plastificado.",
  },
  {
    question: "¿Cómo reducir la generación de residuos en casa?",
    answer:
      "Puedes reducir residuos reutilizando, comprando a granel, evitando productos de un solo uso y reciclando correctamente.",
  },
  {
    question: "¿Por qué es importante apoyar programas de reciclaje locales?",
    answer:
      "Apoyar estos programas fomenta la economía circular, reduce la contaminación y educa a la comunidad sobre prácticas sostenibles.",
  },
];


export default function FAQ() {
  const [openIndexes, setOpenIndexes] = useState([]); // ahora puede haber varios abiertos
  const [search, setSearch] = useState("");
  const [filteredFaqs, setFilteredFaqs] = useState(faqs);

  // Filtrar preguntas según búsqueda
  useEffect(() => {
    const filtered = faqs.filter(({ question, answer }) =>
      question.toLowerCase().includes(search.toLowerCase()) ||
      answer.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredFaqs(filtered);
    setOpenIndexes([]); // reset cuando cambia búsqueda
  }, [search]);

  const toggleIndex = (index) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter(i => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };

  const expandAll = () => setOpenIndexes(filteredFaqs.map((_, i) => i));
  const collapseAll = () => setOpenIndexes([]);

  return (
    <section className="max-w-3xl mx-auto p-6 my-12">
      <h2 className="text-4xl font-extrabold mb-6 text-[#26B75A] tracking-tight text-center">
        ❓ Preguntas Frecuentes
      </h2>

      <div className="mb-6 flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
        <input
          type="search"
          placeholder="Buscar pregunta..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-2/3 px-4 py-2 border bg-[#e8eaec] border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          aria-label="Buscar preguntas frecuentes"
        />
        <div className="flex gap-2">
          <button
            onClick={expandAll}
            className="bg-[#26B75A] text-white px-4 py-2 rounded-lg hover:bg-[#26B75A] transition"
            aria-label="Expandir todas las respuestas"
          >
            Expandir todo
          </button>
          <button
            onClick={collapseAll}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
            aria-label="Contraer todas las respuestas"
          >
            Contraer todo
          </button>
        </div>
      </div>

      <div className="space-y-5">
        {filteredFaqs.length === 0 && (
          <p className="text-center text-gray-500">No se encontraron resultados.</p>
        )}

        {filteredFaqs.map(({ question, answer }, i) => {
          const isOpen = openIndexes.includes(i);
          return (
            <article
              key={i}
              className={`border border-gray-300 rounded-xl shadow-sm transition-colors duration-300 ${
                isOpen ? "bg-[#e8eaec] border-green-400" : "bg-[#e8eaec]"
              }`}
              role="region"
              aria-expanded={isOpen}
              aria-labelledby={`faq-question-${i}`}
            >
              <header
                id={`faq-question-${i}`}
                className="flex justify-between items-center cursor-pointer px-6 py-4 select-none"
                onClick={() => toggleIndex(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleIndex(i);
                  }
                }}
                tabIndex={0}
              >
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  {isOpen ? (
                    <svg
                      className="w-6 h-6 text-[#26B75A]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                    </svg>
                  )}
                  {question}
                </h3>

                {isOpen && (
                  <svg
                    className="w-5 h-5 text-[#26B75A]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </header>

              <div
                className={`px-6 pb-6 text-gray-700 text-base leading-relaxed transition-[max-height,opacity,padding] duration-300 ease-in-out overflow-hidden ${
                  isOpen ? "max-h-screen opacity-100 pt-2" : "max-h-0 opacity-0 p-0"
                }`}
              >
                {answer}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
