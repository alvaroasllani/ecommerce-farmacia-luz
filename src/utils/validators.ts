// Email validation
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Venezuelan phone validation
export const validateVenezuelanPhone = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '');
  
  // Check for Venezuelan mobile patterns
  const patterns = [
    /^58(412|414|416|424|426)\d{7}$/, // International format
    /^0(412|414|416|424|426)\d{7}$/, // Local format
    /^(412|414|416|424|426)\d{7}$/, // Without prefix
  ];
  
  return patterns.some(pattern => pattern.test(cleaned));
};

// Password strength validation
export const validatePassword = (password: string): {
  isValid: boolean;
  errors: string[];
  strength: 'weak' | 'medium' | 'strong';
} => {
  const errors: string[] = [];
  let score = 0;
  
  if (password.length < 8) {
    errors.push('Debe tener al menos 8 caracteres');
  } else {
    score += 1;
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Debe contener al menos una letra minúscula');
  } else {
    score += 1;
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Debe contener al menos una letra mayúscula');
  } else {
    score += 1;
  }
  
  if (!/\d/.test(password)) {
    errors.push('Debe contener al menos un número');
  } else {
    score += 1;
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Debe contener al menos un carácter especial');
  } else {
    score += 1;
  }
  
  let strength: 'weak' | 'medium' | 'strong';
  if (score < 3) {
    strength = 'weak';
  } else if (score < 5) {
    strength = 'medium';
  } else {
    strength = 'strong';
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    strength,
  };
};

// Venezuelan cedula validation
export const validateVenezuelanCedula = (cedula: string): boolean => {
  const cleaned = cedula.replace(/\D/g, '');
  
  // Must be between 7-8 digits
  if (cleaned.length < 7 || cleaned.length > 8) {
    return false;
  }
  
  // Basic format validation
  return /^\d{7,8}$/.test(cleaned);
};

// Product name validation
export const validateProductName = (name: string): boolean => {
  // Must be at least 3 characters, not just numbers or special chars
  return name.trim().length >= 3 && /[a-zA-ZáéíóúÁÉÍÓÚñÑ]/.test(name);
};

// Price validation
export const validatePrice = (price: number): boolean => {
  return price > 0 && price <= 999999.99 && Number.isFinite(price);
};

// Stock validation
export const validateStock = (stock: number): boolean => {
  return Number.isInteger(stock) && stock >= 0 && stock <= 99999;
};

// Prescription validation (for controlled medications)
export const validatePrescription = (prescriptionNumber: string): boolean => {
  // Venezuelan prescription format: RX-YYYY-NNNNNN
  const prescriptionRegex = /^RX-\d{4}-\d{6}$/;
  return prescriptionRegex.test(prescriptionNumber);
};

// Dosage validation
export const validateDosage = (dosage: string): boolean => {
  // Common dosage patterns: "500mg", "2.5ml", "100UI", etc.
  const dosageRegex = /^\d+(\.\d+)?\s*(mg|ml|g|UI|mcg|IU)$/i;
  return dosageRegex.test(dosage.trim());
};

// Address validation
export const validateAddress = (address: string): boolean => {
  return address.trim().length >= 10 && address.trim().length <= 200;
};

// Cart quantity validation
export const validateCartQuantity = (quantity: number, maxStock: number): {
  isValid: boolean;
  error?: string;
} => {
  if (!Number.isInteger(quantity) || quantity < 1) {
    return { isValid: false, error: 'La cantidad debe ser un número entero mayor a 0' };
  }
  
  if (quantity > maxStock) {
    return { isValid: false, error: `Stock insuficiente. Máximo disponible: ${maxStock}` };
  }
  
  if (quantity > 99) {
    return { isValid: false, error: 'Cantidad máxima por producto: 99' };
  }
  
  return { isValid: true };
};

// Order delivery date validation
export const validateDeliveryDate = (date: string): boolean => {
  const deliveryDate = new Date(date);
  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 30); // Max 30 days in advance
  
  return deliveryDate >= today && deliveryDate <= maxDate;
};

// Credit card validation (basic Luhn algorithm)
export const validateCreditCard = (cardNumber: string): boolean => {
  const cleaned = cardNumber.replace(/\D/g, '');
  
  if (cleaned.length < 13 || cleaned.length > 19) {
    return false;
  }
  
  // Luhn algorithm
  let sum = 0;
  let shouldDouble = false;
  
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned.charAt(i), 10);
    
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  
  return sum % 10 === 0;
}; 