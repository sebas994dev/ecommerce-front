import React from 'react';

const categorias = [
  { nombre: 'Nueva electrónica', imagen: '/images/electronica.webp' },
  { nombre: 'Coleccionables', imagen: '/images/coleccionables.webp' },
  { nombre: 'Partes y accesorios', imagen: '/images/partes.webp' },
  { nombre: 'Moda', imagen: '/images/moda.webp' },
  { nombre: 'Salud y belleza', imagen: '/images/belleza.webp' },
  { nombre: 'Hogar y jardín', imagen: '/images/hogar.webp' },
  { nombre: 'Reacondicionados', imagen: '/images/reacondicionados.webp' },
];

const CategoriasDestacadas = () => {
  return (
    <section className="my-10 px-6 md:px-20">
      {/* Título alineado al inicio */}
      <h2 className="text-2xl md:text-2xl font-bold mb-8">
        Compra por categorías
      </h2>

      {/* Contenedor con padding simétrico */}
      <div className="flex flex-wrap justify-between gap-8">
        {categorias.map((cat, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center hover:scale-105 transition-transform duration-200 cursor-pointer w-[110px] md:w-[130px]"
          >
            <div className="w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden shadow-md">
              <img
                src={cat.imagen}
                alt={cat.nombre}
                className="w-20 h-20 object-contain"
              />
            </div>
            <span className="mt-3 text-sm font-semibold text-center text-gray-800">
              {cat.nombre}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriasDestacadas;
