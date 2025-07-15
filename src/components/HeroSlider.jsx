import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ChevronRight } from 'lucide-react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const slides = [
  {
    title: 'Crea una colección de élite',
    subtitle: 'Elige tu próxima aventura entre miles de hallazgos.',
    button: 'Empieza tu viaje',
    bgColor: 'bg-[#feb786]',
    textColor: 'text-[#5c1b05]',
    buttonColor: 'bg-[#5c1b05]',
    buttonHover: 'hover:bg-[#402003]',
    buttonTextColor: 'text-white',
    items: [
      { image: '/images/banner/lego.webp', label: 'Lego' },
      { image: '/images/banner/monedas.webp', label: 'Monedas' },
      { image: '/images/banner/comics.webp', label: 'Cómics' },
    ],
  },
  {
    title: 'Ofertas imperdibles del mes',
    subtitle: '¡Descuentos exclusivos solo por tiempo limitado!',
    button: 'Ver ofertas',
    bgColor: 'bg-[#0099F0]',
    textColor: 'text-[#01193D]',
    buttonColor: 'bg-[#01193D]',
    buttonHover: 'hover:bg-yellow-600',
    buttonTextColor: 'text-white',
    items: [
      { image: '/images/banner/sofa.webp', label: 'Sofás' },
      { image: '/images/banner/zapatilla.webp', label: 'Zapatillas' },
      { image: '/images/banner/taladro.webp', label: 'Taladros' },
    ],
  },
  {
    title: 'Tu hogar más conectado',
    subtitle: 'Encuentra tecnología inteligente para cada espacio.',
    button: 'Explorar',
    bgColor: 'bg-[#191919]',
    textColor: 'text-white',
    buttonColor: 'bg-white',
    buttonHover: 'hover:bg-blue-700',
    buttonTextColor: 'text-[#191919]',
    items: [
      { image: '/images/banner/lampara.webp', label: 'Lámparas' },
      { image: '/images/banner/camara.webp', label: 'Cámaras' },
      { image: '/images/banner/enchufe.webp', label: 'Enchufes' },
    ],
  },
];

const HeroSlider = () => {
  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
        className="w-full h-[350px]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className={`h-full flex items-center justify-between px-25 ${slide.bgColor}`}>
              {/* Texto */}
              <div className="max-w-md">
                <h2 className={`text-3xl md:text-4xl font-bold ${slide.textColor}`}>
                  {slide.title}
                </h2>
                <p className={`mt-2 ${slide.textColor}`}>{slide.subtitle}</p>
                <button
                  className={`mt-4 px-6 py-2 rounded-full transition ${slide.buttonColor} ${slide.buttonHover} ${slide.buttonTextColor}`}
                >
                  {slide.button}
                </button>
              </div>

              {/* Imágenes */}
              <div className="flex gap-8 items-center">
                {slide.items.map((item, i) => (
                  <div key={i} className="text-center">
                    <img
                      src={item.image}
                      alt={item.label}
                      className="w-50 h-50 object-contain mx-auto"
                    />
                    <p className={`flex items-center justify-center text-lg font-bold ${slide.textColor} hover:underline cursor-pointer`}>
                      {item.label}
                      <ChevronRight className="w-6 h-6" />
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
