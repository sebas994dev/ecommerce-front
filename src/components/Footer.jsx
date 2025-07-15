import React from "react";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-4 gap-8">
        {/* Columna 1: Logo y descripción */}
        <div>
          <Link to="/" className="text-2xl font-bold text-white">
            MiExpress
          </Link>
          <p className="mt-3 text-sm text-gray-400">
            Tu tienda online de confianza. Encuentra las mejores ofertas y productos de calidad en un solo lugar.
          </p>
        </div>

        {/* Columna 2: Links rápidos */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Enlaces rápidos</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white transition-colors">Inicio</Link>
            </li>
            <li>
              <Link to="/favoritos" className="hover:text-white transition-colors">Favoritos</Link>
            </li>
            <li>
              <Link to="/carrito" className="hover:text-white transition-colors">Carrito</Link>
            </li>
            <li>
              <Link to="/ofertas" className="hover:text-white transition-colors">Ofertas del día</Link>
            </li>
          </ul>
        </div>

        {/* Columna 3: Contacto */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contacto</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> soporte@miexpress.com
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> +51 999 999 999
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Lima, Perú
            </li>
          </ul>
        </div>

        {/* Columna 4: Redes sociales */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Síguenos</h3>
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <Twitter className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer inferior */}
      <div className="border-t border-gray-700 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} MiExpress. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
