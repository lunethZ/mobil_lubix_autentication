import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-slate-900 text-gray-700 dark:text-gray-300 mt-20 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-green-500 text-xl font-bold mb-4">Lubix</h3>
            <p className="text-sm">
              Tu marketplace de confianza para compras online.
            </p>
          </div>
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-4">Ayuda</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/buscar" className="hover:text-green-500">Comprar</Link></li>
              <li><Link to="/register" className="hover:text-green-500">Vender</Link></li>
              <li><Link to="/login" className="hover:text-green-500">Centro de ayuda</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-4">Acerca de</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-green-500">Términos</Link></li>
              <li><Link to="/" className="hover:text-green-500">Privacidad</Link></li>
              <li><Link to="/" className="hover:text-green-500">Contacto</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-4">Redes Sociales</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-500">Facebook</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-500">Instagram</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-500">Twitter</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>© 2026 Lubix. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

