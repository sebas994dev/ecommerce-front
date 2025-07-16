import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

// Función para simular un precio original y calcular descuento
const calcularDescuento = (precioActual) => {
  const precioOriginal = precioActual * 1.25; // asumimos un 25% más
  const descuento = `${100 - Math.round((precioActual * 100) / precioOriginal)}% OFF`;
  return { precioOriginal: precioOriginal.toFixed(2), descuento };
};

const ProductCard = ({ producto }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // simulamos precio original y etiqueta descuento
  const { precioOriginal, descuento } = calcularDescuento(producto.precio);

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition flex flex-col h-full relative">
      {/* Imagen y botones superiores */}
      <div className="relative">
        <img
          src={producto.imagen || '/placeholder.jpg'}
          alt={producto.nombre}
          className="w-full h-40 object-contain p-4"
        />

        {/* Etiqueta descuento */}
        <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
          {descuento}
        </span>

        {/* Icono de favoritos */}
        <motion.button
          whileTap={{ scale: 0.8, rotate: -15 }}
          animate={{ scale: isFavorite ? 1.2 : 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 10 }}
          onClick={() => setIsFavorite(!isFavorite)}
          className={`absolute top-2 right-2 p-1 rounded-full shadow transition 
            ${isFavorite ? 'bg-red-100' : 'bg-white hover:bg-red-50'}`}
          title="Agregar a favoritos"
        >
          <Heart
            className={`w-5 h-5 transition-colors duration-200 ${
              isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-500'
            }`}
          />
        </motion.button>
      </div>

      {/* Información del producto */}
      <div className="px-4 flex flex-col flex-1 justify-between pb-4">
        <div>
          <h3 className="font-medium text-sm mt-1 line-clamp-2">{producto.nombre}</h3>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-red-600 font-bold text-lg">
              S/ {producto.precio}
            </span>
            <span className="line-through text-gray-400 text-sm">
              S/ {precioOriginal}
            </span>
          </div>
        </div>

        {/* Acciones inferiores */}
        <div className="mt-4 flex gap-2">
          <Link
            to={`/producto/${producto.idProducto}`}
            className="flex-1 py-2 text-sm bg-[#01193D] text-white rounded-lg text-center hover:bg-blue-900 transition"
          >
            Ver oferta
          </Link>
          <button
            className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            title="Añadir al carrito"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
