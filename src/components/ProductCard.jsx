import React from 'react';
import { Link } from 'react-router-dom';

const calcularDescuento = (original, oferta) =>
  `${100 - Math.round((oferta * 100) / original)}% OFF`;

const ProductCard = ({ producto }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition flex flex-col h-full">
      <div className="relative">
        <img
          src={producto.imagen}
          
          className="w-full h-40 object-contain p-4"
        />
        <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
          {calcularDescuento(producto.precioOriginal, producto.precioOferta)}
        </span>
      </div>
      <div className="px-4 flex flex-col flex-1 justify-between pb-4">
        <div>
          <h3 className="font-medium text-sm mt-1 line-clamp-2">{producto.nombre}</h3>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-red-600 font-bold text-lg">
              S/ {producto.precioOferta}
            </span>
            <span className="line-through text-gray-400 text-sm">
              S/ {producto.precioOriginal}
            </span>
          </div>
        </div>
        <Link
          to={`/producto/${producto.nombre}`}
          className="mt-4 w-full py-2 text-sm bg-[#01193D] text-white rounded-lg text-center hover:bg-blue-900 transition"
        >
          Ver oferta
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
