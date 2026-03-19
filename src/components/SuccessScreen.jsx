import React, { useEffect, useState } from 'react';
import { X, Share2, Calendar, Clock, Info, Send, Headphones } from 'lucide-react';
import Confetti from './Confetti';

export default function SuccessScreen({ transactionData, onReset }) {
  const [showConfetti, setShowConfetti] = useState(true);
  const [currentAd, setCurrentAd] = useState(1);

  // Generar código de seguridad aleatorio de 3 dígitos
  const securityCode = Math.floor(100 + Math.random() * 900).toString().split('');

  // Ocultar número de celular (mostrar solo últimos 3 dígitos)
  const hiddenPhone = `*** *** ${transactionData.recipientPhone.slice(-3)}`;

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  // Seleccionar anuncio aleatorio al montar el componente (ahora entre 1 y 4)
  useEffect(() => {
    const randomAd = Math.floor(Math.random() * 4) + 1;
    setCurrentAd(randomAd);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6C1D78] via-[#722380] to-[#6C1D78] flex flex-col relative overflow-hidden">
      {showConfetti && <Confetti />}

      {/* Header con logo y botón cerrar */}
      <div className="flex justify-between items-center px-6 py-8 relative z-10">
        <img 
          src="/yape.png" 
          alt="Yape" 
          className="h-20 w-auto"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'block';
          }}
        />
        <div className="hidden text-white font-bold text-2xl">yape</div>
        
        <button 
          onClick={onReset}
          className="w-14 h-14 bg-[#8B2A9B] rounded-full flex items-center justify-center hover:bg-[#9B3AAB] transition-colors"
        >
          <X size={28} className="text-white" />
        </button>
      </div>

      {/* Contenido scrolleable */}
      <div className="flex-1 overflow-y-auto px-6 pb-6 relative z-10">
        {/* Card principal */}
        <div className="bg-white rounded-3xl p-6 shadow-2xl mb-4">
          {/* Título y compartir */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[#6C1D78] font-bold text-2xl">
              ¡Yapeaste!
            </h2>
            <button className="flex items-center gap-1 text-[#00D9BC] font-bold text-sm">
              <Share2 size={18} />
              Compartir
            </button>
          </div>

          {/* Monto */}
          <div className="mb-6">
            <p className="text-5xl font-bold text-[#2D3648] mb-2">S/ {transactionData.amount}</p>
            <p className="text-[#2D3648] font-semibold text-lg">{transactionData.recipient}</p>
            
            {/* Fecha y hora */}
            <div className="flex items-center gap-3 text-gray-500 text-sm mt-3">
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>{transactionData.date}</span>
              </div>
              <span>|</span>
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{transactionData.time}</span>
              </div>
            </div>
          </div>

          {/* Código de seguridad */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <p className="text-gray-500 text-xs uppercase font-bold tracking-wide">
                  Código de seguridad
                </p>
                <div className="w-5 h-5 bg-[#00D9BC] rounded-full flex items-center justify-center">
                  <Info size={12} className="text-white" />
                </div>
              </div>
              
              <div className="flex gap-2">
                {securityCode.map((digit, index) => (
                  <div 
                    key={index} 
                    className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-xl font-bold text-gray-700"
                  >
                    {digit}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Datos de la transacción */}
          <div>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wide mb-4">
              Datos de la transacción
            </p>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Nro. de celular</span>
                <span className="font-semibold text-gray-900">{hiddenPhone}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Destino</span>
                <span className="font-semibold text-gray-900">Yape</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Nro. de operación</span>
                <span className="font-semibold text-gray-900">{transactionData.operationNumber}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Botón Nuevo Yapeo */}
        <button
          onClick={onReset}
          className="w-full bg-[#00D9BC] hover:bg-[#00C4A7] text-white font-bold py-5 rounded-xl shadow-xl transition-all transform hover:scale-[1.02] mb-4 flex items-center justify-center gap-2"
        >
          <Send size={20} />
          Nuevo Yapeo
        </button>

        {/* Botón Necesito ayuda */}
        <button className="w-full bg-transparent border-0 text-white font-bold py-4 rounded-xl mb-6 flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">
          <Headphones size={20} />
          Necesito ayuda
        </button>

        {/* Sección de anuncios */}
        <div className="bg-[#8B2A9B] rounded-3xl p-4 shadow-xl">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="text-white font-bold text-base">Más en Yape</h3>
            <span className="bg-yellow-400 text-[#6C1D78] text-xs font-bold px-2 py-1 rounded">
              Nuevo
            </span>
          </div>
          
          {/* Anuncio rotativo */}
          <div className="relative rounded-2xl overflow-hidden">
            <img 
              src={`/anuncio${currentAd}.jpg`}
              alt="Anuncio"
              className="w-full h-auto object-cover"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="200"%3E%3Crect fill="%23722380" width="400" height="200"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="white" font-size="20"%3EAnuncio %23' + currentAd + '%3C/text%3E%3C/svg%3E';
              }}
            />
            <div className="absolute bottom-3 right-3">
              <button className="bg-[#8B2A9B] text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-1 hover:bg-[#9B3AAB] transition-colors">
                Conoce más
                <span>›</span>
              </button>
            </div>
            <div className="absolute bottom-3 left-3">
              <span className="text-white text-xs bg-black/30 px-2 py-1 rounded">
                Publicidad
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
