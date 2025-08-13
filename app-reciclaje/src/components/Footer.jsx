export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 py-2 text-center text-sm">
      <div className="flex justify-center gap-4">
        <p className="mb-1">
          &copy; {new Date().getFullYear()} Barberis Nicolas. Todos los derechos
          reservados.
        </p>
        <a
          href="https://tu-portafolio.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline transition"
        >
          Portafolio
        </a>
        <a
          href="https://github.com/tuusuario/tu-repositorio"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline transition"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}
