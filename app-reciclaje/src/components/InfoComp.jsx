// src/pages/Info.jsx
import { containersInfo } from "../data/containersInfo";
import FAQ from "./Questions";
import TipsFlip from "./TipsFlip";

const Info = () => {
  return (
    <div className="bg-[#181F2A]">
      <div className="px-4 py-8 max-w-6xl mx-auto font-sans">
        <section className="text-gray-200 py-16 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-green-400 mb-6">
              La importancia de separar los residuos correctamente ♻
            </h2>

            <p className="text-lg md:text-xl leading-relaxed mb-6 text-gray-300">
              Separar los residuos no es solo una tarea doméstica: es un acto de
              responsabilidad con el planeta. Al clasificar correctamente la
              basura, reducimos la contaminación, facilitamos el reciclaje y
              protegemos los recursos naturales. Cada envase, papel o resto
              orgánico colocado en el contenedor adecuado contribuye a un futuro
              más limpio y sostenible.
            </p>

            <p className="text-lg md:text-xl leading-relaxed mb-6 text-gray-300">
              Cuando los residuos se mezclan, gran parte del material reciclable
              se pierde, aumentando la cantidad de basura que termina en
              vertederos e incineradoras. Esto no solo degrada el medio
              ambiente, sino que también genera emisiones de gases de efecto
              invernadero que afectan directamente al clima.
            </p>

            <p className="text-lg md:text-xl leading-relaxed text-gray-300">
              En cambio, al separar de forma adecuada, damos una segunda vida a
              muchos materiales, reducimos el consumo de recursos vírgenes y
              ayudamos a construir comunidades más sostenibles. Un gesto tan
              simple como colocar la botella de plástico en su contenedor puede
              marcar una gran diferencia.
            </p>
          </div>
        </section>

        {/* Introducción renovada con movimiento */}
        <section className="mb-16 text-center animate-fadeIn px-6 md:px-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-green-400 tracking-wide">
            ♻️ Guía práctica para clasificar residuos
          </h1>

          <p className="text-gray-300 max-w-2xl mx-auto text-lg md:text-xl my-10 leading-relaxed font-light">
            La correcta clasificación de residuos es el primer paso para cuidar
            el medio ambiente y fomentar la economía circular.{" "}
            <em className="text-green-300/90">
              Reciclar bien significa menos basura, menos contaminación y más
              recursos para todos.
            </em>
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "¿Por qué clasificar?",
                text: "Separar los residuos permite que materiales como vidrio, papel y plástico puedan ser reciclados y reutilizados, evitando que terminen contaminando ríos y suelos.",
              },
              {
                title: "Impacto ambiental",
                text: "Cada kilo de residuos reciclados reduce la emisión de gases de efecto invernadero y ayuda a preservar la biodiversidad.",
              },
              {
                title: "Tu aporte cuenta",
                text: "No es necesario ser perfecto, sino constante. Pequeñas acciones suman para un futuro más limpio y saludable.",
              },
            ].map(({ title, text }, i) => (
              <div
                key={title}
                className={`flex-1 bg-green-50 p-6 rounded-lg border border-green-200 shadow-md transform transition-transform duration-300 
          opacity-0 translate-y-6 animate-fadeInUp`}
                style={{
                  animationDelay: `${i * 200}ms`,
                  animationFillMode: "forwards",
                }}
                onMouseEnter={(e) =>
                  e.currentTarget.classList.add("scale-105", "shadow-xl")
                }
                onMouseLeave={(e) =>
                  e.currentTarget.classList.remove("scale-105", "shadow-xl")
                }
              >
                <h3 className="text-green-700 font-semibold mb-2">{title}</h3>
                <p className="text-gray-600 text-sm">{text}</p>
              </div>
            ))}
          </div>

          <style jsx>{`
            @keyframes fadeInUp {
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            .animate-fadeInUp {
              animation-name: fadeInUp;
              animation-duration: 500ms;
              animation-timing-function: ease-out;
              animation-fill-mode: forwards;
            }
          `}</style>
        </section>

        {/* Contenedores horizontales */}
        <section className="flex flex-col gap-8 px-6 py-8 max-w-5xl mx-auto">
          {containersInfo.map((c) => (
            <div
              key={c.id}
              className="flex flex-col md:flex-row bg-[#1F2736] shadow-xl rounded-2xl overflow-hidden border border-transparent hover:border-gradient-to-r hover:from-purple-400 hover:via-pink-500 hover:to-red-400 transform transition-all duration-500 hover:scale-[1.03] hover:shadow-3xl cursor-pointer"
              style={{
                backgroundImage: `linear-gradient(135deg, ${c.color}33 0%, #fff 100%)`,
              }}
            >
              {/* Imagen a la izquierda */}
              <div className="md:flex-shrink-0 md:w-1/3 bg-[#1F2736] flex items-center justify-center p-6">
                <img
                  src={c.img}
                  alt={c.name}
                  className="w-full h-48 object-contain transition-transform duration-500 hover:scale-110 hover:rotate-2"
                />
              </div>

              {/* Contenido a la derecha */}
              <div className="p-6 flex flex-col justify-center md:w-2/3">
                <div
                  className={`${c.color} h-2 w-24 rounded-full mb-4 animate-pulse`}
                  style={{ filter: "drop-shadow(0 0 8px " + c.color + ")" }}
                ></div>

                <h2 className="text-3xl font-extrabold mb-6 text-gray-300 tracking-wide drop-shadow-sm">
                  {c.name}
                </h2>

                {/* Qué sí va */}
                <div className="mb-6">
                  <p className="text-green-700 font-semibold mb-3 flex items-center gap-2 text-lg">
                    <span className="inline-block bg-green-300 text-green-800 rounded-full px-3 py-1 text-sm font-medium shadow-sm">
                      ✅ Qué sí va
                    </span>
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {c.yes.map((item, i) => (
                      <span
                        key={i}
                        className="bg-green-300 text-green-900 px-4 py-2 rounded-full text-sm font-medium shadow-md hover:bg-green-200 cursor-default transition"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Qué no va */}
                <div>
                  <p className="text-red-700 font-semibold mb-3 flex items-center gap-2 text-lg">
                    <span className="inline-block bg-red-300 text-red-800 rounded-full px-3 py-1 text-sm font-medium shadow-sm">
                      ❌ Qué no va
                    </span>
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {c.no.map((item, i) => (
                      <span
                        key={i}
                        className="bg-red-300 text-red-900 px-4 py-2 rounded-full text-sm font-medium shadow-md hover:bg-red-200 cursor-default transition"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="relative h-96 flex items-center justify-center my-12 overflow-hidden">
          {/* Imagen de fondo con blur y efecto parallax */}
          <div
            className="absolute inset-0 bg-center bg-cover filter blur-md scale-105 transition-transform duration-1000 group-hover:scale-110"
            style={{ backgroundImage: "url('/images/img-section-info.png')" }}
          ></div>

          {/* Overlay semitransparente con degradado suave */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/70"></div>

          {/* Contenido */}
          <div className="relative z-10 text-center px-6 max-w-3xl">
            <h2 className="text-5xl md:text-6xl font-extrabold tracking-wide text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] animate-slideUp">
              Pequeñas <span className="text-green-400">acciones</span>,
              <span className="text-yellow-400"> gran impacto</span>
            </h2>
            <p className="mt-4 text-lg md:text-2xl text-gray-200/90 font-medium animate-slideUp delay-200">
              Separar correctamente los residuos ayuda a conservar recursos,
              reducir la contaminación y proteger nuestro entorno para las
              próximas generaciones.
            </p>
          </div>
        </section>

        {/* Consejos prácticos */}
        <section className="mt-16 animate-fadeIn delay-200">
          <TipsFlip />
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
    </div>
  );
};

export default Info;
