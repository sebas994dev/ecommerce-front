import React, { useState, useRef, useEffect } from 'react';
import { Menu, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchCategorias } from '../services/categoryService';

const DropdownCategorias = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Cargar categorías al montar el componente
    const cargarCategorias = async () => {
      try {
        const data = await fetchCategorias();
        setCategorias(data);
      } catch (err) {
        console.error("Error cargando categorías", err);
      }
    };
    cargarCategorias();
  }, []);

  // Cerrar el dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 text-base font-medium"
      >
        <Menu className="w-4 h-4" />
        Todas las categorías
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-md z-50 animate-fade-in">
          <ul className="py-2">
            {categorias.length > 0 ? (
              categorias.map((cat) => (
                <li key={cat.idCategoria}>
                  <Link
                    to={`/categoria/${cat.idCategoria}`}
                    state={{ nombreCategoria: cat.nombre }}   // 👈 pasamos el nombre
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors"
                  >
                    {cat.nombre}
                  </Link>
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500">No hay categorías</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownCategorias;
