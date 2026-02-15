import React from 'react';
import { ArrowLeft, User, Lock, Bell, CreditCard, HelpCircle, LogOut, ChevronRight, Shield, Globe } from 'lucide-react';

export default function SettingsScreen({ onNavigate, onLogout, userData }) {
  const settingsOptions = [
    {
      category: 'Cuenta',
      items: [
        { icon: User, label: 'Datos personales', action: 'profile', color: 'text-purple-600' },
        { icon: Lock, label: 'Seguridad y privacidad', action: 'security', color: 'text-blue-600' },
        { icon: Shield, label: 'Verificación de identidad', action: 'verification', color: 'text-green-600' }
      ]
    },
    {
      category: 'Configuración',
      items: [
        { icon: Bell, label: 'Notificaciones', action: 'notifications', color: 'text-amber-600' },
        { icon: CreditCard, label: 'Métodos de pago', action: 'payment', color: 'text-pink-600' },
        { icon: Globe, label: 'Idioma', action: 'language', color: 'text-cyan-600' }
      ]
    },
    {
      category: 'Soporte',
      items: [
        { icon: HelpCircle, label: 'Centro de ayuda', action: 'help', color: 'text-indigo-600' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-b-[2rem] shadow-xl pb-8">
        <div className="px-6 pt-12">
          <div className="flex items-center mb-6">
            <button onClick={() => onNavigate('home')} className="mr-4 text-white">
              <ArrowLeft size={24} />
            </button>
            <h2 className="text-xl font-bold text-white">Configuración</h2>
          </div>

          {/* User Info Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <User size={32} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-white font-bold text-lg">{userData.name}</p>
              <p className="text-purple-200 text-sm">{userData.phone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Options */}
      <div className="px-6 py-6 space-y-6">
        {settingsOptions.map((section, idx) => (
          <div key={idx}>
            <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wide mb-3">
              {section.category}
            </h3>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {section.items.map((item, itemIdx) => (
                <button
                  key={itemIdx}
                  onClick={() => alert(`Ir a ${item.label}`)}
                  className={`w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors ${
                    itemIdx !== section.items.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <div className={`w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center ${item.color}`}>
                    <item.icon size={20} />
                  </div>
                  <span className="flex-1 text-left font-medium text-gray-800">{item.label}</span>
                  <ChevronRight size={20} className="text-gray-400" />
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="w-full bg-red-50 border-2 border-red-200 text-red-600 font-semibold py-4 rounded-xl hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
        >
          <LogOut size={20} />
          Cerrar sesión
        </button>

        {/* Version */}
        <div className="text-center text-gray-400 text-sm pt-4">
          <p>Ya-pe v1.0.0</p>
          <p className="text-xs mt-1">© 2026 Ya-pe. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  );
}