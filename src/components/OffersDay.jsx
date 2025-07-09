import React, { useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const productos = [
  {
    nombre: 'Smartwatch Pro',
    imagen: '/images/watch.webp',
    precioOriginal: 200,
    precioOferta: 149,
  },
  {
    nombre: 'Auriculares Bluetooth',
    imagen: '/images/audifonos.webp',
    precioOriginal: 80,
    precioOferta: 49,
  },
  {
    nombre: 'Cámara de Seguridad WiFi',
    imagen: '/images/camara.webp',
    precioOriginal: 250,
    precioOferta: 189,
  },
  {
    nombre: 'Teclado Mecánico RGB',
    imagen: '/images/teclado.webp',
    precioOriginal: 150,
    precioOferta: 109,
  },
  {
    nombre: 'Zapatillas Urbanas Hombre',
    imagen: '/images/zapatillas2.webp',
    precioOriginal: 120,
    precioOferta: 85,
  },
  {
    nombre: 'Set de Ollas Antiadherentes',
    imagen: '/images/ollas.webp',
    precioOriginal: 180,
    precioOferta: 129,
  },
  {
    nombre: 'Taladro Inalámbrico 20V',
    imagen: '/images/taladro.webp',
    precioOriginal: 220,
    precioOferta: 159,
  },
];

// Calcular % de descuento
const calcularDescuento = (original, oferta) => {
  const descuento = 100 - Math.round((oferta * 100) / original);
  return `${descuento}% OFF`;
};

const OfertasDelDia = () => {
  const ofertas = useMemo(() => {
    const shuffled = [...productos].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 6);
  }, []);

  return (
    <section className="px-4 md:px-10 py-10 bg-[#0f0f0f]">
      <div className="flex gap-4">
        {/* Card de oferta */}
        <div className="w-[230px] h-[330px] bg-[#111] text-white rounded-lg p-5 flex flex-col justify-between flex-shrink-0">
          <div>
            <h2 className="text-lg font-bold mb-2">Ofertas del día</h2>
            <p className="text-sm text-gray-400">Todo con envío gratis</p>
          </div>
          <button className="bg-white text-black text-sm font-semibold py-2 px-4 rounded hover:bg-gray-200 transition">
            Ver oferta
          </button>
        </div>

        {/* Carrusel */}
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={16}
          slidesPerView={1.3}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          className="w-full"
        >
          {ofertas.map((producto, index) => (
            <SwiperSlide key={index} className="w-[230px]">
              <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden w-[230px] h-[330px] flex flex-col">
                <div className="relative">
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="w-full h-36 object-contain p-4"
                  />
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                    {calcularDescuento(producto.precioOriginal, producto.precioOferta)}
                  </div>
                </div>
                <div className="px-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-sm mt-1 line-clamp-2">
                      {producto.nombre}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-red-600 font-bold text-lg">
                        S/ {producto.precioOferta}
                      </span>
                      <span className="line-through text-gray-400 text-sm">
                        S/ {producto.precioOriginal}
                      </span>
                    </div>
                  </div>
                  <button className="mt-4 w-full py-2 text-sm bg-[#01193D] text-white rounded hover:bg-blue-900 transition">
                    Ver oferta
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default OfertasDelDia;
