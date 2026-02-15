// Funciones auxiliares para el proyecto

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
    minimumFractionDigits: 2
  }).format(amount);
};

export const formatDate = (date) => {
  const d = new Date(date);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (d.toDateString() === today.toDateString()) {
    return 'Hoy';
  } else if (d.toDateString() === yesterday.toDateString()) {
    return 'Ayer';
  }

  return d.toLocaleDateString('es-PE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

export const formatTime = (date) => {
  return new Date(date).toLocaleTimeString('es-PE', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

export const formatDateTime = (date) => {
  return `${formatDate(date)} ${formatTime(date)}`;
};

export const generateOperationNumber = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

export const generateClientCode = () => {
  const numbers = '0123456789';
  let code = '';
  for (let i = 0; i < 10; i++) {
    code += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }
  return code;
};

export const formatPhoneNumber = (phone) => {
  if (phone.length === 9) {
    return `${phone.slice(0, 3)} ${phone.slice(3, 6)} ${phone.slice(6)}`;
  }
  return phone;
};

export const validatePhoneNumber = (phone) => {
  return /^9\d{8}$/.test(phone);
};

export const validateAmount = (amount, maxAmount) => {
  const num = parseFloat(amount);
  return !isNaN(num) && num > 0 && num <= maxAmount;
};

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Buenos días';
  if (hour < 19) return 'Buenas tardes';
  return 'Buenas noches';
};

export const calculateFee = (amount) => {
  // Por ahora sin comisiones
  return 0;
};

export const getTransactionIcon = (type) => {
  const icons = {
    'sent': '↑',
    'received': '↓',
    'payment': '💳',
    'service': '⚡'
  };
  return icons[type] || '•';
};