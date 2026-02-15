import React, { useState, useEffect, useRef } from 'react';

export default function PromoBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const slideRef = useRef(null);

  const promos = [
    {
      id: 1,
      brand: 'Dunkin\' Donuts',
      title: '¡4 donuts a solo S/8.90!',
      subtitle: 'Yapeando en Dunkin\' Donuts',
      emoji: '🍩',
      bgColor: 'from-amber-100 to-orange-100',
      textColor: 'text-purple-900',
      logo: 'DD',
      logoColor: 'bg-pink-500'
    },
    {
      id: 2,
      brand: 'Starbucks',
      title: '2x1 en Frappuccinos',
      subtitle: 'Todos los días después de las 3pm',
      emoji: '☕',
      bgColor: 'from-green-100 to-emerald-100',
      textColor: 'text-green-900',
      logo: 'SB',
      logoColor: 'bg-green-600'
    },
    {
      id: 3,
      brand: 'Adidas',
      title: '30% OFF en toda la tienda',
      subtitle: 'Pagando con Yape',
      emoji: '👟',
      bgColor: 'from-blue-100 to-cyan-100',
      textColor: 'text-blue-900',
      logo: 'AD',
      logoColor: 'bg-blue-600'
    },
    {
      id: 4,
      brand: 'Cineplanet',
      title: 'Entradas desde S/12.90',
      subtitle: 'Martes y miércoles todo el día',
      emoji: '🎬',
      bgColor: 'from-purple-100 to-pink-100',
      textColor: 'text-purple-900',
      logo: 'CP',
      logoColor: 'bg-purple-600'
    },
    {
      id: 5,
      brand: 'KFC',
      title: 'Mega Box a S/25.90',
      subtitle: '8 piezas + papas + gaseosa',
      emoji: '🍗',
      bgColor: 'from-red-100 to-orange-100',
      textColor: 'text-red-900',
      logo: 'KFC',
      logoColor: 'bg-red-600'
    },
    {
      id: 6,
      brand: 'Rappi',
      title: 'Envío gratis en tu 1era orden',
      subtitle: 'Pedidos mayores a S/30',
      emoji: '🛵',
      bgColor: 'from-orange-100 to-amber-100',
      textColor: 'text-orange-900',
      logo: 'RP',
      logoColor: 'bg-orange-500'
    },
    {
      id: 7,
      brand: 'Nike',
      title: '¡Hasta 40% de descuento!',
      subtitle: 'En calzado seleccionado',
      emoji: '⚡',
      bgColor: 'from-gray-100 to-slate-100',
      textColor: 'text-gray-900',
      logo: 'NK',
      logoColor: 'bg-black'
    },
    {
      id: 8,
      brand: 'Papa John\'s',
      title: 'Pizza familiar + bebida S/39.90',
      subtitle: 'Delivery incluido',
      emoji: '🍕',
      bgColor: 'from-red-100 to-rose-100',
      textColor: 'text-red-900',
      logo: 'PJ',
      logoColor: 'bg-red-700'
    }
  ];

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swipe left - next slide
      setCurrentSlide((prev) => (prev + 1) % promos.length);
    }

    if (touchStart - touchEnd < -75) {
      // Swipe right - previous slide
      setCurrentSlide((prev) => (prev - 1 + promos.length) % promos.length);
    }
  };

  // Auto-advance slides every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promos.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [promos.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative mb-4">
      {/* Carousel Container */}
      <div 
        className="overflow-hidden rounded-2xl"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        ref={slideRef}
      >
        <div 
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {promos.map((promo) => (
            <div
              key={promo.id}
              className="min-w-full px-0.5"
            >
              <div className={`bg-gradient-to-r ${promo.bgColor} rounded-2xl p-3 flex items-center justify-between shadow-lg hover:shadow-xl transition-shadow cursor-pointer`}>
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{promo.emoji}</div>
                  <div>
                    <p className={`${promo.textColor} font-bold text-sm`}>{promo.title}</p>
                    <p className={`${promo.textColor} opacity-80 text-xs`}>{promo.subtitle}</p>
                  </div>
                </div>
                <div className={`${promo.logoColor} text-white rounded-xl px-3 py-2 shadow-md min-w-[50px] text-center`}>
                  <p className="font-bold text-xs">{promo.logo}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-1.5 mt-3">
        {promos.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'bg-white w-6 h-2'
                : 'bg-white/50 w-2 h-2'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}