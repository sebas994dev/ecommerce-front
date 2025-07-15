// src/components/OfertasDelDia.jsx
import React, { useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

const productos = [
  { nombre: 'Smartwatch Pro', imagen: '/images/watch.webp', precioOriginal: 200, precioOferta: 149 },
  { nombre: 'Auriculares Bluetooth', imagen: '/images/audifonos.webp', precioOriginal: 80, precioOferta: 49 },
  { nombre: 'Cámara de Seguridad WiFi', imagen: '/images/camara.webp', precioOriginal: 250, precioOferta: 189 },
  { nombre: 'Teclado Mecánico RGB', imagen: '/images/teclado.webp', precioOriginal: 150, precioOferta: 109 },
  { nombre: 'Zapatillas Urbanas Hombre', imagen: '/images/zapatillas2.webp', precioOriginal: 120, precioOferta: 85 },
  { nombre: 'Set de Ollas Antiadherentes', imagen: '/images/ollas.webp', precioOriginal: 180, precioOferta: 129 },
  { nombre: 'Taladro Inalámbrico 20V', imagen: '/images/taladro.webp', precioOriginal: 220, precioOferta: 159 },
];

const OfertasDelDia = () => {
  const ofertas = useMemo(() => {
    const shuffled = [...productos].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 6);
  }, []);

  return (
    <section className="ofertas-swiper px-4 md:px-10 py-12 bg-gradient-to-b from-gray-100 to-gray-200">
      <div className="flex gap-6">
        {/* Card principal */}
        <div className="w-56 min-h-[330px] bg-gradient-to-br from-red-600 to-red-400 text-white rounded-xl p-5 flex flex-col justify-between shadow-lg">
          <div>
            <h2 className="text-xl font-bold mb-2">🔥 Ofertas del día</h2>
            <p className="text-sm text-red-100">¡Todo con envío gratis!</p>
          </div>
          <Link
            to="/ofertas"
            className="bg-white text-red-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition text-center"
          >
            Ver todas
          </Link>
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
            <SwiperSlide key={index} className="h-full">
              <ProductCard producto={producto} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default OfertasDelDia;
