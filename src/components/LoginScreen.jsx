import React, { useState } from 'react';
import { Eye, EyeOff, User } from 'lucide-react';

export default function LoginScreen({ onLogin }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phone && password && (isRegistering ? name : true)) {
      onLogin({
        phone,
        name: name || 'Usuario',
        balance: 1250.00
      });
    }
  };

  const formatPhoneInput = (value) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.slice(0, 9);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-block bg-white/10 backdrop-blur-lg rounded-3xl p-6 mb-4">
            <h1 className="text-5xl font-bold text-white">ya-pe</h1>
          </div>
          <p className="text-white/80 text-lg">Tu billetera digital</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {isRegistering ? 'Crear cuenta' : 'Iniciar sesión'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Input - Solo aparece al registrarse */}
            {isRegistering && (
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Nombre completo
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej: María López"
                    className="w-full pl-12 pr-4 border-2 border-gray-200 rounded-xl p-4 outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Número de celular
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(formatPhoneInput(e.target.value))}
                placeholder="999 999 999"
                className="w-full border-2 border-gray-200 rounded-xl p-4 outline-none focus:border-purple-500 transition-colors"
                maxLength="9"
              />
              {phone && phone.length < 9 && (
                <p className="text-sm text-gray-500 mt-1">{phone.length}/9 dígitos</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border-2 border-gray-200 rounded-xl p-4 pr-12 outline-none focus:border-purple-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {!isRegistering && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-purple-600 text-sm font-medium hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={!phone || phone.length !== 9 || !password || (isRegistering && !name)}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isRegistering ? 'Registrarme' : 'Iniciar sesión'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsRegistering(!isRegistering);
                setName('');
              }}
              className="text-gray-600 text-sm"
            >
              {isRegistering ? '¿Ya tienes cuenta? ' : '¿No tienes cuenta? '}
              <span className="text-purple-600 font-semibold">
                {isRegistering ? 'Inicia sesión' : 'Regístrate'}
              </span>
            </button>
          </div>
        </div>

        <p className="text-white/60 text-xs text-center mt-6">
          Al continuar, aceptas nuestros Términos y Condiciones
        </p>
      </div>
    </div>
  );
}