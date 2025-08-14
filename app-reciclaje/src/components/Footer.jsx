export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 py-4 text-center text-sm">
      <p className="mb-2">
        &copy; {new Date().getFullYear()} Barberis Nicolas. Todos los derechos reservados.
      </p>
      <div className="flex justify-center gap-6">
        <a
          href="https://web-portafolio-phi.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline transition-colors duration-200"
        >
          Portafolio
        </a>
        <a
          href="https://github.com/Nico09Barberis/app-reciclaje.git"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline transition-colors duration-200"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}
