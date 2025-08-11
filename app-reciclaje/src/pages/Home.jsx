import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-green-100 p-4">
      <h1 className="text-4xl font-bold mb-6 text-center text-green-800">
        Bienvenido al Clasificador de Reciclaje
      </h1>
      <p className="max-w-md mb-8 text-center text-green-700">
        Aprende a clasificar los residuos correctamente y cuida el planeta de forma divertida.
      </p>
      <button
        onClick={() => navigate('/juego')}
        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        Empezar
      </button>
    </main>
  )
}
