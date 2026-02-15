import React, { useState } from 'react';
import { Menu, Headphones, Bell, Eye, EyeOff, RefreshCw, QrCode, Send } from 'lucide-react';
import PromoBanner from './PromoBanner';

export default function HomeScreen({ onNavigate, userData }) {
  const [showBalance, setShowBalance] = useState(false);

  const transactions = [
    { id: 1, name: 'Amanda Raquel López Andia', amount: '6.90', date: 'Hoy - 9:30 a. m.', type: 'received' },
    { id: 2, name: 'Efraín Saldaña Meneses', amount: '50.50', date: 'Ayer - 5:30 p. m.', type: 'received' },
    { id: 3, name: 'Rodrigo Gonzáles Castillo', amount: '-100.00', date: 'Ayer - 11:30 a. m.', type: 'sent' }
  ];

  const quickActions = [
    { icon: '📱', label: 'Recargar celular', color: 'from-pink-400 to-pink-500', action: 'recharge' },
    { icon: '🧾', label: 'Yapear servicios', color: 'from-purple-500 to-purple-600', size: 'large', action: 'services' },
    { icon: '💳', label: 'Créditos', color: 'from-blue-400 to-blue-500', action: 'credits' },
    { icon: '📋', label: 'Código de aprobación', color: 'from-cyan-400 to-cyan-500', action: 'approval' },
    { icon: '⚙️', label: 'Promos', color: 'from-purple-400 to-purple-500', action: 'promos' },
    { icon: '🏪', label: 'Tienda', color: 'from-teal-400 to-teal-500', action: 'store' },
    { icon: '🎫', label: 'Entradas', color: 'from-purple-500 to-purple-600', action: 'tickets' }
  ];

  return (
    <div className="h-screen flex flex-col bg-gray-100 max-w-md mx-auto">
      {/* Header - Fixed */}
      <div className="bg-gradient-to-br from-purple-700 via-purple-600 to-purple-700 px-6 pt-8 pb-6 rounded-b-3xl flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <button className="text-white">
            <Menu size={24} />
          </button>
          <h2 className="text-white text-lg font-semibold">Hola, {userData.name}</h2>
          <div className="flex gap-3">
            <button className="text-white">
              <Headphones size={22} />
            </button>
            <button className="text-white relative">
              <Bell size={22} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full"></span>
            </button>
          </div>
        </div>

        {/* Promotional Banner Carousel */}
        <PromoBanner />

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          {quickActions.slice(0, 4).map((action, index) => (
            <button
              key={index}
              onClick={() => onNavigate(action.action)}
              className={`flex flex-col items-center ${index === 1 ? 'row-span-2 col-span-1' : ''}`}
            >
              <div className={`bg-white rounded-2xl flex items-center justify-center shadow-lg hover:scale-105 transition-transform ${
                index === 1 ? 'w-20 h-20 text-4xl' : 'w-16 h-16 text-2xl'
              }`}>
                {action.icon}
              </div>
              <span className="text-white text-xs font-medium mt-1.5 text-center leading-tight">
                {action.label}
              </span>
            </button>
          ))}
        </div>

        {/* Bottom Quick Actions */}
        <div className="grid grid-cols-4 gap-3">
          {quickActions.slice(4).map((action, index) => (
            <button
              key={index}
              onClick={() => onNavigate(action.action)}
              className="flex flex-col items-center"
            >
              <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shadow-lg hover:scale-105 transition-transform">
                {action.icon}
              </div>
              <span className="text-white text-xs font-medium mt-1.5 text-center leading-tight">
                {action.label}
              </span>
            </button>
          ))}
          
          {/* Ver más button */}
          <button
            onClick={() => alert('Ver más opciones')}
            className="flex flex-col items-center"
          >
            <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg hover:scale-105 transition-transform border-2 border-white/30">
              <span className="text-white text-3xl font-light">+</span>
            </div>
            <span className="text-white text-xs font-medium mt-1.5">Ver más</span>
          </button>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto">
        {/* Balance Section */}
        <div className="px-6 py-4">
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="w-full bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className="text-purple-600">
                {showBalance ? <Eye size={22} /> : <EyeOff size={22} />}
              </div>
              <span className="text-gray-700 font-semibold">
                {showBalance ? `S/ ${userData.balance.toFixed(2)}` : 'Mostrar saldo'}
              </span>
            </div>
          </button>
        </div>

        {/* Transactions Section */}
        <div className="px-6 pb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-purple-700 font-bold text-lg">Movimientos</h3>
            <div className="flex items-center gap-2">
              <button className="text-cyan-500">
                <RefreshCw size={18} />
              </button>
              <button className="text-cyan-500 font-bold text-sm">VER TODOS</button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {transactions.map((tx, index) => (
              <div key={tx.id}>
                <div className="px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 text-sm">{tx.name}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{tx.date}</p>
                  </div>
                  <p className={`font-bold text-base ${
                    tx.type === 'received' ? 'text-gray-800' : 'text-red-500'
                  }`}>
                    {tx.type === 'sent' ? '- ' : ''}S/ {tx.amount}
                  </p>
                </div>
                {index < transactions.length - 1 && <div className="border-b border-gray-100 mx-4"></div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Action Buttons - Fixed */}
      <div className="bg-white border-t border-gray-200 px-6 py-4 flex-shrink-0 shadow-lg">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => alert('Escanear QR')}
            className="bg-white border-2 border-cyan-400 text-cyan-500 font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-cyan-50 transition-colors shadow-sm"
          >
            <QrCode size={20} />
            ESCANEAR QR
          </button>
          <button
            onClick={() => onNavigate('send')}
            className="bg-gradient-to-r from-cyan-400 to-cyan-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg transition-all transform hover:scale-105 shadow-md"
          >
            <Send size={20} />
            YAPEAR
          </button>
        </div>
      </div>
    </div>
  );
}