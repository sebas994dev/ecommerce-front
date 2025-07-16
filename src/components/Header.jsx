// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import {
  ShoppingCart,
  User,
  Heart,
  Menu as MenuIcon,
  X,
  Search,
  LogOut
} from 'lucide-react';
import DropdownCategorias from './DropdownCategorias';
import LoginModal from './LoginModal';

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [cartCount] = useState(0); // Simulación
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [user, setUser] = useState(null);

  // Cargar usuario si existe en localStorage
  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const navLinks = [
    { label: 'Packs de ofertas', href: '/ofertas', destacado: true },
    { label: 'Choice', href: '/choice' },
    { label: 'SuperOfertas', href: '/superofertas' },
    { label: 'AliExpress Business', href: '/business' },
    { label: 'Hogar y jardín', href: '/hogar' }
  ];

  return (
    <>
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="text-2xl font-bold text-gray-800">
            MiExpress
          </a>

          {/* Barra de búsqueda */}
          <div className="hidden md:flex flex-1 mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="¿Qué buscas?"
                className="w-full border rounded-full px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
            </div>
          </div>

          {/* Íconos */}
          <div className="flex items-center gap-4">
            <Heart className="text-gray-600 hover:text-red-500 cursor-pointer w-5 h-5" />
            <div className="relative cursor-pointer">
              <ShoppingCart className="text-gray-600 hover:text-blue-500 w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </div>

            {/* Ícono usuario */}
            {!user ? (
              <button
                onClick={() => setShowLoginModal(true)}
                className="cursor-pointer"
              >
                <User className="text-gray-600 hover:text-blue-500 w-5 h-5" />
              </button>
            ) : (
              <div className="flex items-center gap-2">
                {user.tipo === 'admin' ? (
                  <Shield className="text-red-600 w-5 h-5" />
                ) : (
                  <User className="text-blue-600 w-5 h-5" />
                )}
                <span className="text-sm font-medium">{user.nombre}</span>
                {user.tipo === 'admin' && (
                  <span className="text-xs text-red-500 font-medium">Administrador</span>
                )}
                <button onClick={handleLogout}>
                  <LogOut className="text-gray-600 hover:text-red-500 w-5 h-5" />
                </button>
              </div>
            )}

            {/* Idioma y moneda */}
            <select className="text-sm bg-transparent border-none text-gray-600 focus:outline-none">
              <option value="es">ES</option>
              <option value="en">EN</option>
            </select>
            <select className="text-sm bg-transparent border-none text-gray-600 focus:outline-none">
              <option value="pen">PEN</option>
              <option value="usd">USD</option>
            </select>

            {/* Botón Mobile */}
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="md:hidden"
            >
              {mobileMenu ? <X /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Menú inferior de navegación */}
        <nav className="hidden md:flex items-center justify-center gap-10 x-6 pb-2 text-base font-medium">
          <DropdownCategorias />
          {navLinks.map(({ label, href, destacado }) => (
            <a
              key={label}
              href={href}
              className={`hover:text-red-500 transition ${destacado ? 'text-red-500 font-semibold' : 'text-gray-700'
                }`}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Menú responsive */}
        {mobileMenu && (
          <div className="md:hidden px-4 pb-4 space-y-2 bg-white border-t">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Buscar productos..."
                className="w-full border rounded-md px-4 py-2 pl-10 focus:outline-none"
              />
              <Search className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
            </div>
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block text-gray-700 hover:text-blue-500"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Modal login */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
};

export default Header;
