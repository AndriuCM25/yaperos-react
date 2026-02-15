import React, { useEffect, useState } from 'react';
import { X, Share2, Calendar, Clock, FileText } from 'lucide-react';
import Confetti from './Confetti';

export default function SuccessScreen({ transactionData, onReset }) {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen bg-gradient-to-br from-purple-700 via-purple-600 to-purple-700 flex items-center justify-center p-4 relative overflow-hidden max-w-md mx-auto">
      {showConfetti && <Confetti />}
      
      {/* Phone mockup container */}
      <div className="w-full relative z-10 overflow-y-auto max-h-screen py-4">
        <div className="bg-gradient-to-br from-purple-700 to-purple-800 rounded-[3rem] p-6 shadow-2xl border-8 border-purple-900/30 relative">
          
          {/* Header with logo and close button */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-cyan-400 rounded-lg flex items-center justify-center mr-2">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              <span className="text-white font-bold text-xl italic">yape</span>
            </div>
            <button 
              onClick={onReset}
              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <X size={20} className="text-white" />
            </button>
          </div>

          {/* Main card */}
          <div className="bg-white rounded-3xl p-6 shadow-xl relative">
            {/* Success message and share button */}
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-purple-700 font-bold text-xl leading-tight">
                ¡Yapeaste el<br />servicio!
              </h2>
              <button className="flex items-center text-cyan-500 font-semibold text-sm hover:text-cyan-600 transition-colors">
                <Share2 size={16} className="mr-1" />
                COMPARTIR
              </button>
            </div>

            {/* Amount */}
            <div className="mb-6">
              <p className="text-4xl font-bold text-gray-900 mb-1">S/ {transactionData.amount}</p>
              <p className="text-gray-700 font-medium text-base">{transactionData.recipient}</p>
              
              {/* Date and time */}
              <div className="flex items-center text-gray-500 text-sm mt-2">
                <Calendar size={14} className="mr-1" />
                <span>{transactionData.date}</span>
                <span className="mx-2">|</span>
                <Clock size={14} className="mr-1" />
                <span>{transactionData.time}</span>
              </div>
            </div>

            {/* Transaction details */}
            <div className="bg-gray-50 rounded-2xl p-4 mb-4">
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-3">
                Datos de la transacción
              </p>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Servicio</span>
                  <span className="font-semibold text-gray-900">Postpago</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Código de cliente</span>
                  <span className="font-semibold text-gray-900">{transactionData.clientCode}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Titular</span>
                  <span className="font-semibold text-gray-900">{transactionData.recipient}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Nro. de operación</span>
                  <span className="font-semibold text-gray-900">{transactionData.operationNumber}</span>
                </div>
              </div>
            </div>

            {/* Send receipt button */}
            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl font-medium text-sm flex items-center justify-between transition-colors">
              <div className="flex items-center">
                <FileText size={18} className="mr-2" />
                <span>Envía el comprobante a tu proveedor</span>
              </div>
              <span className="text-xl">›</span>
            </button>
          </div>

          {/* "Yapear otro servicio" button */}
          <button
            onClick={onReset}
            className="w-full bg-cyan-400 hover:bg-cyan-500 text-purple-900 font-bold py-4 rounded-xl mt-4 shadow-lg transition-all transform hover:scale-[1.02] uppercase text-sm tracking-wide"
          >
            📋 YAPEAR OTRO SERVICIO
          </button>

          {/* Additional services card */}
          <div className="bg-white rounded-2xl p-4 mt-4 shadow-lg">
            <p className="text-center text-purple-700 font-semibold text-sm mb-3">
              <span className="mr-1">✨</span>
              ¡También puedes yapear otros servicios!
              <span className="ml-1">✨</span>
            </p>
            
            {/* Service icons */}
            <div className="flex justify-center items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-gradient-to-br from-green-100 to-green-200">
                ⚡
              </div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-gradient-to-br from-blue-100 to-blue-200">
                📱
              </div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-gradient-to-br from-cyan-100 to-cyan-200">
                💧
              </div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-gradient-to-br from-orange-100 to-orange-200">
                🌐
              </div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-gradient-to-br from-purple-100 to-purple-200">
                💳
              </div>
            </div>

            {/* More services button */}
            <button className="text-purple-700 font-semibold text-sm flex items-center justify-center w-full hover:text-purple-800 transition-colors">
              MÁS SERVICIOS A TU ALCANCE 
              <span className="ml-1">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}