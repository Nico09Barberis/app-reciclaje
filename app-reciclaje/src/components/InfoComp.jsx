// src/pages/Info.jsx
import { containersInfo } from "../data/containersInfo";
import FAQ from "./Questions";

const Info = () => {
  return (
    <div className="px-4 py-8 max-w-6xl mx-auto font-sans">
      {/* Introducción */}
      <section className="mb-12 text-center animate-fadeIn">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-green-700">
          ♻️ Guía de Clasificación de Residuos
        </h1>
        <p className="text-gray-700 text-lg max-w-2xl mx-auto leading-relaxed">
          Clasificar los residuos correctamente ayuda a reducir la
          contaminación, ahorrar energía y dar nueva vida a materiales
          reciclables.
        </p>
      </section>

      {/* Contenedores */}
      <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {containersInfo.map((c) => (
          <div
            key={c.id}
            className="bg-white shadow-lg rounded-xl overflow-hidden border transform transition-all hover:scale-105 hover:shadow-2xl"
          >
            <div className={`${c.color} h-3 w-full`}></div>
            <img
              src={c.img}
              alt={c.name}
              className="w-full h-44 object-contain p-5 transition-transform duration-300 hover:scale-110"
            />
            <div className="p-5">
              <h2 className="text-2xl font-semibold mb-3 text-gray-800">
                {c.name}
              </h2>
              <p className="text-green-600 font-semibold mb-2">✅ Qué sí va:</p>
              <ul className="list-disc list-inside mb-4 text-sm space-y-1 text-gray-700">
                {c.yes.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="text-red-600 font-semibold mb-2">❌ Qué no va:</p>
              <ul className="list-disc list-inside text-sm space-y-1 text-gray-700">
                {c.no.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>

      <section className="relative h-96 flex items-center justify-center my-12 text-white overflow-hidden">
        {/* Imagen de fondo con blur */}
        <div
          className="absolute inset-0 bg-center bg-cover filter blur-sm"
          style={{ backgroundImage: "url('/images/img-info.png')" }}
        ></div>

        {/* Overlay semitransparente para oscurecer la imagen */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Contenido encima */}
        <div className="relative z-10 text-center px-4">
          <h2 className="text-3xl font-bold">Texto sobre la imagen borrosa</h2>
          <p className="mt-2">Así se ve el fondo con blur usando TailwindCSS</p>
        </div>
      </section>

      {/* Consejos prácticos */}
      <section className="mt-16 animate-fadeIn delay-200">
        <h2 className="text-3xl font-bold mb-5 text-green-700">
          💡 Consejos Prácticos
        </h2>
        <ul className="list-disc list-inside text-gray-800 space-y-2 text-lg">
          <li>🧼 Limpia los envases antes de reciclar.</li>
          <li>🚫 No mezcles residuos peligrosos con reciclables.</li>
          <li>♻️ Aplasta botellas y cajas para ahorrar espacio.</li>
          <li>📦 Retira etiquetas si es posible.</li>
        </ul>
      </section>

      {/* Datos curiosos */}
      <section className="mt-16 bg-green-100 p-6 rounded-xl shadow-md border-l-4 border-green-500 animate-fadeIn delay-400">
        <h2 className="text-3xl font-bold mb-5 text-green-700">
          🌍 ¿Sabías que...?
        </h2>
        <ul className="space-y-3 text-lg text-gray-800">
          <li>
            📄 Reciclar una tonelada de papel ahorra <b>17 árboles</b>.
          </li>
          <li>
            🍾 El vidrio puede reciclarse <b>infinitas veces</b>.
          </li>
          <li>
            🥫 Un envase de aluminio reciclado ahorra energía para mantener
            encendida una TV durante <b>3 horas</b>.
          </li>
        </ul>
      </section>

      <FAQ />
    </div>
  );
};

export default Info;
