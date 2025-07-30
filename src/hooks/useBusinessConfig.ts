import { useState, useEffect, useCallback } from 'react';
import { 
  BusinessConfiguration,
  getBusinessConfig,
  updateBusinessConfig,
  changeBusinessType,
  getBusinessTerminology,
  getBusinessCategories,
  isFeatureEnabled,
  BusinessType
} from '../config/business-config';

interface UseBusinessConfigReturn {
  // Configuration
  config: BusinessConfiguration;
  terminology: BusinessType['terminology'];
  categories: string[];
  
  // State
  isLoading: boolean;
  error: string | null;
  
  // Actions
  updateConfig: (updates: Partial<BusinessConfiguration>) => void;
  changeType: (businessTypeId: string) => void;
  checkFeature: (featureId: string) => boolean;
  refresh: () => void;
  
  // Helpers
  getAppName: () => string;
  getPrimaryColor: () => string;
  getCurrency: () => string;
  getLocale: () => string;
}

export const useBusinessConfig = (): UseBusinessConfigReturn => {
  const [config, setConfig] = useState<BusinessConfiguration>(() => getBusinessConfig());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Listen for configuration changes from other components/tabs
  useEffect(() => {
    const handleConfigChange = (event: CustomEvent<BusinessConfiguration>) => {
      setConfig(event.detail);
    };

    window.addEventListener('businessConfigChanged', handleConfigChange as EventListener);

    return () => {
      window.removeEventListener('businessConfigChanged', handleConfigChange as EventListener);
    };
  }, []);

  // Update configuration
  const updateConfig = useCallback((updates: Partial<BusinessConfiguration>) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const updated = updateBusinessConfig(updates);
      setConfig(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating configuration');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Change business type
  const changeType = useCallback((businessTypeId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const updated = changeBusinessType(businessTypeId);
      setConfig(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error changing business type');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Check if feature is enabled
  const checkFeature = useCallback((featureId: string): boolean => {
    return isFeatureEnabled(featureId);
  }, []);

  // Refresh configuration from localStorage
  const refresh = useCallback(() => {
    try {
      setIsLoading(true);
      setError(null);
      
      const fresh = getBusinessConfig();
      setConfig(fresh);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error refreshing configuration');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Memoized derived values
  const terminology = getBusinessTerminology();
  const categories = getBusinessCategories();

  // Helper functions
  const getAppName = useCallback(() => config.businessInfo.name, [config.businessInfo.name]);
  const getPrimaryColor = useCallback(() => config.branding.primaryColor, [config.branding.primaryColor]);
  const getCurrency = useCallback(() => config.locale.currency, [config.locale.currency]);
  const getLocale = useCallback(() => `${config.locale.language}-${config.locale.country}`, [config.locale]);

  return {
    // Configuration
    config,
    terminology,
    categories,
    
    // State
    isLoading,
    error,
    
    // Actions
    updateConfig,
    changeType,
    checkFeature,
    refresh,
    
    // Helpers
    getAppName,
    getPrimaryColor,
    getCurrency,
    getLocale,
  };
}; 