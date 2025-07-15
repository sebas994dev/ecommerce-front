import React from 'react';

const categorias = [
  { nombre: 'Nueva electrónica', imagen: '/images/category/ipad.jpeg' },
  { nombre: 'Coleccionables', imagen: '/images/category/cartas.jpeg' },
  { nombre: 'Partes y accesorios', imagen: '/images/category/aro.jpeg' },
  { nombre: 'Moda', imagen: '/images/category/zapatillas.jpeg' },
  { nombre: 'Salud y belleza', imagen: '/images/category/perfume.jpeg' },
  { nombre: 'Hogar y jardín', imagen: '/images/category/sillon.jpeg' },
  { nombre: 'Reacondicionados', imagen: '/images/category/telefono.jpeg' },
];

const CategoriasDestacadas = () => {
  return (
    <section className="my-10 px-4 md:px-20">
      <h2 className="text-2xl font-bold mb-6">Compra por categorías</h2>

      {/* Contenedor que permite scroll solo en móviles */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex md:justify-between gap-6 md:gap-4 w-max md:w-full">
          {categorias.map((cat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center cursor-pointer w-[170px]"
            >
              <img
                src={cat.imagen}
                alt={cat.nombre}
                className="w-[160px] h-[160px] object-cover rounded-full transition duration-200 hover:brightness-97"
              />
              <span className="mt-3 text-sm font-semibold text-center text-gray-800">
                {cat.nombre}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriasDestacadas;
