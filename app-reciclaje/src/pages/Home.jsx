import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <main
      className="relative flex items-center justify-start min-h-screen px-10 bg-cover bg-center"
      style={{
        backgroundImage: "url('/ruta/a/tu-imagen.jpg')",
      }}
    >
      {/* Overlay con degradado */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>

      {/* Contenido */}
      <div className="relative z-10 max-w-xl text-left text-white">
        <h1 className="text-5xl font-extrabold mb-4">
          Bienvenido al Clasificador de Reciclaje
        </h1>
        <p className="text-lg mb-6">
          Aprende a clasificar los residuos correctamente y cuida el planeta de forma divertida.
        </p>
        <button
          onClick={() => navigate('/informacion')}
          className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition"
        >
          Más información
        </button>
      </div>
    </main>
  )
}
