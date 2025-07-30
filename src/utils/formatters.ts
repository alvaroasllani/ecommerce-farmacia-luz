// Currency formatting
export const formatCurrency = (amount: number, currency = 'VES'): string => {
  return new Intl.NumberFormat('es-VE', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

// Date formatting
export const formatDate = (date: Date | string, format: 'short' | 'long' | 'relative' = 'short'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  switch (format) {
    case 'short':
      return dateObj.toLocaleDateString('es-VE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    case 'long':
      return dateObj.toLocaleDateString('es-VE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    case 'relative':
      return formatRelativeDate(dateObj);
    default:
      return dateObj.toLocaleDateString('es-VE');
  }
};

// Time formatting
export const formatTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleTimeString('es-VE', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

// DateTime formatting
export const formatDateTime = (date: Date | string): string => {
  return `${formatDate(date)} ${formatTime(date)}`;
};

// Relative date formatting
export const formatRelativeDate = (date: Date): string => {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSeconds < 60) {
    return 'Hace unos segundos';
  }
  
  if (diffInMinutes < 60) {
    return `Hace ${diffInMinutes} minuto${diffInMinutes !== 1 ? 's' : ''}`;
  }
  
  if (diffInHours < 24) {
    return `Hace ${diffInHours} hora${diffInHours !== 1 ? 's' : ''}`;
  }
  
  if (diffInDays < 7) {
    return `Hace ${diffInDays} día${diffInDays !== 1 ? 's' : ''}`;
  }
  
  return formatDate(date);
};

// Phone number formatting
export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Venezuelan phone format: +58 414-123-4567
  if (cleaned.startsWith('58') && cleaned.length === 12) {
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)}-${cleaned.slice(5, 8)}-${cleaned.slice(8)}`;
  }
  
  // Local format: 0414-123-4567
  if (cleaned.startsWith('0') && cleaned.length === 11) {
    return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  
  // Return original if no format matches
  return phone;
};

// Order ID formatting
export const formatOrderId = (id: string): string => {
  return id.startsWith('ORD-') ? id : `ORD-${id}`;
};

// Product name truncation
export const truncateProductName = (name: string, maxLength = 50): string => {
  if (name.length <= maxLength) return name;
  return `${name.slice(0, maxLength - 3)}...`;
};

// File size formatting
export const formatFileSize = (bytes: number): string => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Bytes';
  
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${Math.round(bytes / Math.pow(1024, i) * 100) / 100} ${sizes[i]}`;
};

// Percentage formatting
export const formatPercentage = (value: number, decimals = 1): string => {
  return `${(value * 100).toFixed(decimals)}%`;
};

// Stock status formatting
export const formatStockStatus = (stock: number): { text: string; color: string } => {
  if (stock === 0) {
    return { text: 'Agotado', color: 'text-red-600' };
  }
  
  if (stock < 10) {
    return { text: 'Stock bajo', color: 'text-yellow-600' };
  }
  
  return { text: 'Disponible', color: 'text-green-600' };
}; 