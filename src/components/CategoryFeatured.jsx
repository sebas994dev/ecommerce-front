import React from 'react';

const categorias = [
  { nombre: 'Electrodomésticos', imagen: 'https://www.electronow.es/blog/wp-content/uploads/2023/04/Que-electrodomesticos-desgastan-mas-rapido-su-eficiencia.png' },
  { nombre: 'Coleccionables', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn_rg9ke6gjXavw78hBDvXcPavyfd7YkwXCw&s' },
  { nombre: 'Partes y accesorios', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOMR3Ju3SHOpEM4vkFxLOB0zZkDCHRJKo2UA&s' },
  { nombre: 'Moda', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP8w2JeKkgzhSbF7BCAVGcCjfEkDlI9XhA5A&s' },
  { nombre: 'Salud y belleza', imagen: 'https://images.contentstack.io/v3/assets/bltf4ed0b9a176c126e/bltffdde09b545aecc9/661d8ff836c04a5276cf9bb2/150424-cyber-filtro-topper-labios.jpg?v1752165641444' },
  { nombre: 'Hogar y jardín', imagen: 'https://www.jardinerosenlima.com/wp-content/uploads/2024/07/planta-hawaina-con-maceta-capsula-v3-300x300.png' },
  { nombre: 'Dispositovos Electronicos', imagen: 'https://estilospe.vtexassets.com/arquivos/ids/3275227/SKU.jpg?v=638672188231430000' },
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
                className="w-28 h-28 object-contain"
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
