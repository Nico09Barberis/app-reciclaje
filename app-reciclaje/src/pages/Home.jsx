import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <main
      className="relative flex items-center justify-start min-h-screen px-10 bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/bg-home.png')",
      }}
    >
      {/* Overlay con degradado */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>

      {/* Contenido */}
      <div className="relative z-10 max-w-xl text-left text-white">
        <h1 className="text-5xl font-extrabold mb-4">
          Bienvenido al Clasificador de Reciclaje
        </h1>
        <p className="text-lg mb-6">
          Aprende a clasificar los residuos correctamente y cuida el planeta de
          forma divertida.
        </p>
        <button
          onClick={() => navigate("/info")}
          className="px-8 py-3 
             bg-gradient-to-r from-green-500 to-emerald-600
             hover:from-green-400 hover:to-emerald-500
             text-white font-bold rounded-lg 
             shadow-lg hover:shadow-emerald-500/50
             transform hover:-translate-y-0.5
             transition-all duration-300 ease-out
             relative overflow-hidden group"
        >
          <span className="relative z-10">Más información</span>
          {/* Efecto de brillo diagonal */}
          <span
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                    translate-x-[-100%] group-hover:translate-x-[100%]
                    transition-transform duration-500 ease-in-out"
          ></span>
        </button>
      </div>
    </main>
  );
}
