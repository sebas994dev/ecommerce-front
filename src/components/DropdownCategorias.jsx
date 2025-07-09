import React, { useState } from 'react';
import { Menu, ChevronDown } from 'lucide-react';

const DropdownCategorias = () => {
  const [isOpen, setIsOpen] = useState(false);

  const categorias = [
    'Electrónica',
    'Ropa',
    'Hogar y Jardín',
    'Juguetes',
    'Salud y Belleza',
    'Automotriz',
  ];

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 text-base font-medium">
        <Menu className="w-4 h-4" />
        Todas las categorías
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-md z-50">
          <ul className="py-2">
            {categorias.map((cat) => (
              <li key={cat}>
                <a
                  href={`/categoria/${cat.toLowerCase().replace(/\s+/g, '-')}`}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition"
                >
                  {cat}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownCategorias;
