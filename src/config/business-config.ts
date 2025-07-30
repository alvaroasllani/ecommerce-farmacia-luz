import { BusinessType, BUSINESS_TYPES, DEFAULT_BUSINESS_TYPE } from './business-types';

// Current business configuration
let currentBusinessConfig: BusinessConfiguration | null = null;

export interface BusinessConfiguration {
  // Basic Info
  businessInfo: {
    name: string;
    description: string;
    logo?: string;
    website?: string;
    email: string;
    phone: string;
    address: string;
  };
  
  // Business Type
  businessType: BusinessType;
  
  // Customizations
  branding: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    logo?: string;
    favicon?: string;
  };
  
  // Features enabled
  enabledFeatures: string[];
  
  // Custom categories (overrides business type defaults)
  customCategories?: string[];
  
  // Payment methods
  paymentMethods: string[];
  
  // Shipping options
  shippingOptions: {
    id: string;
    name: string;
    price: number;
    estimatedDays: number;
  }[];
  
  // Locale settings
  locale: {
    language: string;
    country: string;
    currency: string;
    timezone: string;
  };
  
  // Custom terminology overrides
  customTerminology?: Partial<BusinessType['terminology']>;
}

// Storage key for business configuration
const BUSINESS_CONFIG_KEY = 'business_configuration';

// Initialize business configuration
export const initializeBusinessConfig = (config?: BusinessConfiguration): BusinessConfiguration => {
  if (config) {
    currentBusinessConfig = config;
    localStorage.setItem(BUSINESS_CONFIG_KEY, JSON.stringify(config));
    return config;
  }

  // Try to load from localStorage
  const saved = localStorage.getItem(BUSINESS_CONFIG_KEY);
  if (saved) {
    try {
      currentBusinessConfig = JSON.parse(saved);
      return currentBusinessConfig!;
    } catch (error) {
      console.error('Error loading business config:', error);
    }
  }

  // Create default configuration
  currentBusinessConfig = createDefaultBusinessConfig();
  localStorage.setItem(BUSINESS_CONFIG_KEY, JSON.stringify(currentBusinessConfig));
  return currentBusinessConfig;
};

// Create default business configuration
const createDefaultBusinessConfig = (): BusinessConfiguration => {
  const defaultType = DEFAULT_BUSINESS_TYPE;
  
  return {
    businessInfo: {
      name: defaultType.name + ' Digital',
      description: 'Tu ' + defaultType.name.toLowerCase() + ' en línea',
      email: 'contacto@negocio.com',
      phone: '+1234567890',
      address: 'Dirección del negocio',
    },
    businessType: defaultType,
    branding: {
      primaryColor: defaultType.color.primary,
      secondaryColor: defaultType.color.secondary,
      accentColor: defaultType.color.accent,
    },
    enabledFeatures: defaultType.features
      .filter(f => f.enabled || f.required)
      .map(f => f.id),
    paymentMethods: ['credit_card', 'debit_card', 'cash', 'bank_transfer'],
    shippingOptions: [
      { id: 'standard', name: 'Envío Estándar', price: 5, estimatedDays: 3 },
      { id: 'express', name: 'Envío Express', price: 15, estimatedDays: 1 },
      { id: 'pickup', name: 'Recoger en Tienda', price: 0, estimatedDays: 0 },
    ],
    locale: {
      language: defaultType.currency.locale.split('-')[0],
      country: defaultType.currency.locale.split('-')[1],
      currency: defaultType.currency.code,
      timezone: 'America/Caracas',
    },
  };
};

// Get current business configuration
export const getBusinessConfig = (): BusinessConfiguration => {
  if (!currentBusinessConfig) {
    return initializeBusinessConfig();
  }
  return currentBusinessConfig;
};

// Update business configuration
export const updateBusinessConfig = (updates: Partial<BusinessConfiguration>): BusinessConfiguration => {
  const current = getBusinessConfig();
  const updated = { ...current, ...updates };
  
  currentBusinessConfig = updated;
  localStorage.setItem(BUSINESS_CONFIG_KEY, JSON.stringify(updated));
  
  // Dispatch event for components to react to config changes
  window.dispatchEvent(new CustomEvent('businessConfigChanged', { detail: updated }));
  
  return updated;
};

// Change business type
export const changeBusinessType = (businessTypeId: string): BusinessConfiguration => {
  const businessType = BUSINESS_TYPES[businessTypeId.toUpperCase()];
  if (!businessType) {
    throw new Error(`Business type ${businessTypeId} not found`);
  }

  const current = getBusinessConfig();
  
  return updateBusinessConfig({
    businessType,
    branding: {
      ...current.branding,
      primaryColor: businessType.color.primary,
      secondaryColor: businessType.color.secondary,
      accentColor: businessType.color.accent,
    },
    enabledFeatures: businessType.features
      .filter(f => f.enabled || f.required)
      .map(f => f.id),
    locale: {
      ...current.locale,
      currency: businessType.currency.code,
    },
  });
};

// Get business terminology
export const getBusinessTerminology = (): BusinessType['terminology'] => {
  const config = getBusinessConfig();
  return {
    ...config.businessType.terminology,
    ...config.customTerminology,
  };
};

// Get business categories
export const getBusinessCategories = (): string[] => {
  const config = getBusinessConfig();
  return config.customCategories || config.businessType.categories;
};

// Check if feature is enabled
export const isFeatureEnabled = (featureId: string): boolean => {
  const config = getBusinessConfig();
  return config.enabledFeatures.includes(featureId);
};

// Get available business types for setup
export const getAvailableBusinessTypes = (): BusinessType[] => {
  return Object.values(BUSINESS_TYPES);
};

// Reset to default configuration
export const resetBusinessConfig = (): BusinessConfiguration => {
  localStorage.removeItem(BUSINESS_CONFIG_KEY);
  currentBusinessConfig = null;
  return initializeBusinessConfig();
};

// Export business configuration state
export const exportBusinessConfig = (): string => {
  const config = getBusinessConfig();
  return JSON.stringify(config, null, 2);
};

// Import business configuration
export const importBusinessConfig = (configJson: string): BusinessConfiguration => {
  try {
    const config = JSON.parse(configJson) as BusinessConfiguration;
    return initializeBusinessConfig(config);
  } catch (error) {
    throw new Error('Invalid configuration format');
  }
}; 