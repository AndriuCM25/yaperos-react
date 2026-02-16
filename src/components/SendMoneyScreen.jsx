import React, { useState } from 'react';
import { ArrowLeft, Search, Clock, Star, Phone, UserCircle } from 'lucide-react';

export default function SendMoneyScreen({ onNavigate, onSend, userData }) {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState(null);
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [step, setStep] = useState('contacts'); // 'contacts', 'manual', 'amount', 'confirm'

  const recentContacts = [
    { id: 1, name: 'María González', phone: '987654321', avatar: '👩', isFavorite: true },
    { id: 2, name: 'Juan Pérez', phone: '912345678', avatar: '👨', isFavorite: true },
    { id: 3, name: 'Ana Torres', phone: '998877665', avatar: '👩', isFavorite: false },
    { id: 4, name: 'Carlos Ruiz', phone: '923456789', avatar: '👨', isFavorite: false },
    { id: 5, name: 'Lucía Vega', phone: '934567890', avatar: '👩', isFavorite: false }
  ];

  const filteredContacts = recentContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone.includes(searchQuery)
  );

  const handleSelectContact = (contact) => {
    setRecipient(contact);
    setRecipientName(contact.name);
    setRecipientPhone(contact.phone);
    setStep('amount');
  };

  const handleManualEntry = () => {
    setStep('manual');
  };

  const handleContinueFromManual = () => {
    if (recipientName && recipientPhone && recipientPhone.length === 9) {
      setRecipient({
        name: recipientName,
        phone: recipientPhone,
        avatar: '👤'
      });
      setStep('amount');
    }
  };

  const handleContinue = () => {
    if (step === 'amount' && amount) {
      setStep('confirm');
    }
  };

  const handleConfirm = () => {
    if (amount && recipient) {
      const now = new Date();
      const transactionData = {
        amount: amount,
        recipient: recipient.name,
        recipientPhone: recipient.phone,
        message: message || 'Pago yapé',
        date: now.toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' }),
        time: now.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit', hour12: true }),
        operationNumber: Math.floor(100000 + Math.random() * 900000),
        clientCode: '0123456789'
      };
      onSend(transactionData);
    }
  };

  const formatPhoneInput = (value) => {
    // Solo números
    const numbers = value.replace(/\D/g, '');
    // Máximo 9 dígitos
    return numbers.slice(0, 9);
  };

  // Step 1: Select Contact or Manual Entry
  if (step === 'contacts') {
    return (
      <div className="h-screen flex flex-col bg-gray-50 max-w-md mx-auto overflow-hidden">
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-b-[2rem] shadow-xl pb-6 flex-shrink-0">
          <div className="px-6 pt-12">
            <div className="flex items-center mb-6">
              <button onClick={() => onNavigate('home')} className="mr-4 text-white">
                <ArrowLeft size={24} />
              </button>
              <h2 className="text-xl font-bold text-white">Yapear</h2>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar contacto o número"
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/20 backdrop-blur-lg text-white placeholder-white/60 outline-none border-2 border-white/20 focus:border-white/40 transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {/* Manual Entry Button */}
          <button
            onClick={handleManualEntry}
            className="w-full bg-gradient-to-r from-cyan-400 to-cyan-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 mb-6 flex items-center justify-center gap-3"
          >
            <UserCircle size={24} />
            <span>Ingresar nombre y número manualmente</span>
          </button>

          {/* Favorites */}
          {!searchQuery && (
            <div className="mb-6">
              <h3 className="text-gray-700 font-semibold mb-3 flex items-center">
                <Star size={18} className="mr-2 text-amber-500" />
                Favoritos
              </h3>
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {recentContacts.filter(c => c.isFavorite).map((contact) => (
                  <button
                    key={contact.id}
                    onClick={() => handleSelectContact(contact)}
                    className="flex flex-col items-center min-w-[80px] group"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center text-3xl mb-2 group-hover:scale-110 transition-transform shadow-lg">
                      {contact.avatar}
                    </div>
                    <span className="text-xs text-gray-600 text-center font-medium">
                      {contact.name.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Recent Contacts */}
          <div>
            <h3 className="text-gray-700 font-semibold mb-3 flex items-center">
              <Clock size={18} className="mr-2 text-gray-500" />
              Recientes
            </h3>
            <div className="space-y-2">
              {filteredContacts.map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => handleSelectContact(contact)}
                  className="w-full bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-100 flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex items-center justify-center text-2xl">
                    {contact.avatar}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-gray-800">{contact.name}</p>
                    <p className="text-sm text-gray-500">{contact.phone}</p>
                  </div>
                  {contact.isFavorite && (
                    <Star size={16} className="text-amber-500 fill-amber-500" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step: Manual Entry
  if (step === 'manual') {
    return (
      <div className="h-screen flex flex-col bg-gray-50 max-w-md mx-auto overflow-hidden">
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-b-[2rem] shadow-xl pb-8 flex-shrink-0">
          <div className="px-6 pt-12">
            <div className="flex items-center mb-6">
              <button onClick={() => setStep('contacts')} className="mr-4 text-white">
                <ArrowLeft size={24} />
              </button>
              <h2 className="text-xl font-bold text-white">Ingresar datos</h2>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
            <h3 className="text-gray-700 font-bold text-lg mb-6 text-center">
              Datos del destinatario
            </h3>

            {/* Name Input */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                <UserCircle size={18} className="text-purple-600" />
                Nombre completo
              </label>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="Ej: María González"
                className="w-full border-2 border-purple-200 rounded-xl p-4 outline-none focus:border-purple-500 transition-colors text-gray-800 font-medium"
              />
            </div>

            {/* Phone Input */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                <Phone size={18} className="text-purple-600" />
                Número de celular
              </label>
              <input
                type="tel"
                value={recipientPhone}
                onChange={(e) => setRecipientPhone(formatPhoneInput(e.target.value))}
                placeholder="999 999 999"
                maxLength="9"
                className="w-full border-2 border-purple-200 rounded-xl p-4 outline-none focus:border-purple-500 transition-colors text-gray-800 font-medium text-lg"
              />
              <p className="text-sm text-gray-500 mt-2">
                {recipientPhone.length}/9 dígitos
              </p>
            </div>

            {/* Validation Messages */}
            {recipientPhone && recipientPhone.length === 9 && !recipientPhone.startsWith('9') && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4">
                <p className="text-amber-700 text-sm font-medium">
                  ⚠️ El número debe empezar con 9
                </p>
              </div>
            )}

            {recipientName && recipientPhone.length === 9 && recipientPhone.startsWith('9') && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-4">
                <p className="text-green-700 text-sm font-medium">
                  ✓ Datos correctos
                </p>
              </div>
            )}
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinueFromManual}
            disabled={!recipientName || recipientPhone.length !== 9 || !recipientPhone.startsWith('9')}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            Continuar
          </button>
        </div>
      </div>
    );
  }

  // Step 2: Enter Amount
  if (step === 'amount') {
    const numAmount = parseFloat(amount) || 0;
    const hasEnoughBalance = numAmount <= userData.balance;

    return (
      <div className="h-screen flex flex-col bg-gray-50 max-w-md mx-auto overflow-hidden">
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-b-[2rem] shadow-xl pb-8 flex-shrink-0">
          <div className="px-6 pt-12">
            <div className="flex items-center mb-6">
              <button onClick={() => setStep('contacts')} className="mr-4 text-white">
                <ArrowLeft size={24} />
              </button>
              <h2 className="text-xl font-bold text-white">Yapear a</h2>
            </div>

            {/* Recipient Info */}
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-lg rounded-2xl p-4 mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
                {recipient.avatar}
              </div>
              <div>
                <p className="text-white font-semibold">{recipient.name}</p>
                <p className="text-white/70 text-sm">{recipient.phone}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {/* Amount Input */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
            <p className="text-gray-500 text-sm mb-2 text-center">¿Cuánto yapeas?</p>
            <div className="flex items-center justify-center mb-4">
              <span className="text-4xl font-bold text-gray-800 mr-2">S/</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="text-5xl font-bold outline-none text-center w-48 text-gray-800"
                autoFocus
              />
            </div>
            
            {!hasEnoughBalance && amount && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4">
                <p className="text-red-600 text-sm text-center font-medium">
                  ❌ Saldo insuficiente
                </p>
              </div>
            )}

            <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
              <span>Saldo disponible:</span>
              <span className="font-semibold text-purple-600">S/ {userData.balance.toFixed(2)}</span>
            </div>
          </div>

          {/* Quick Amounts */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[10, 20, 50, 100, 200, 500].map((quickAmount) => (
              <button
                key={quickAmount}
                onClick={() => setAmount(quickAmount.toString())}
                className="bg-white border-2 border-purple-200 hover:border-purple-500 hover:bg-purple-50 rounded-xl py-3 font-semibold text-purple-600 transition-all"
              >
                S/ {quickAmount}
              </button>
            ))}
          </div>

          {/* Message */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Mensaje (opcional)</label>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Agrega un mensaje"
              className="w-full border-2 border-gray-200 rounded-xl p-4 outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={!amount || !hasEnoughBalance}
            className="w-full bg-gradient-to-r from-cyan-400 to-cyan-500 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            Continuar
          </button>
        </div>
      </div>
    );
  }

  // Step 3: Confirm Transaction
  if (step === 'confirm') {
    return (
      <div className="h-screen flex flex-col bg-gray-50 max-w-md mx-auto overflow-hidden">
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-b-[2rem] shadow-xl pb-6 flex-shrink-0">
          <div className="px-6 pt-12">
            <div className="flex items-center mb-6">
              <button onClick={() => setStep('amount')} className="mr-4 text-white">
                <ArrowLeft size={24} />
              </button>
              <h2 className="text-xl font-bold text-white">Confirmar yapeo</h2>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
            <div className="text-center mb-6">
              <p className="text-gray-500 text-sm mb-2">Vas a yapear</p>
              <p className="text-5xl font-bold text-gray-800 mb-4">S/ {amount}</p>
              
              <div className="flex items-center justify-center gap-4 bg-purple-50 rounded-2xl p-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center text-2xl">
                  {recipient.avatar}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-800">{recipient.name}</p>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Phone size={14} />
                    {recipient.phone}
                  </p>
                </div>
              </div>
            </div>

            {message && (
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-500 mb-1">Mensaje</p>
                <p className="text-gray-800 font-medium">{message}</p>
              </div>
            )}

            <div className="border-t border-gray-200 pt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Comisión</span>
                <span className="font-semibold text-green-600">S/ 0.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-semibold">Total</span>
                <span className="font-bold text-lg text-gray-800">S/ {amount}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleConfirm}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 mb-3"
          >
            Yapear ahora
          </button>

          <button
            onClick={() => setStep('amount')}
            className="w-full bg-white border-2 border-gray-200 text-gray-700 font-semibold py-4 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    );
  }

  return null;

}
