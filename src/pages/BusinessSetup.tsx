import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BusinessTypeSelector from '../components/BusinessSetup/BusinessTypeSelector';
import BusinessInfoForm from '../components/BusinessSetup/BusinessInfoForm';
import { 
  BusinessConfiguration,
  BusinessType,
  initializeBusinessConfig,
  getAvailableBusinessTypes 
} from '../config/business-config';
import { generateSampleData } from '../data/business-templates';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { CheckCircle, ArrowLeft, Loader2 } from 'lucide-react';
import { ROUTES } from '../constants/routes';

type SetupStep = 'type' | 'info' | 'confirm' | 'complete';

interface BusinessInfo {
  name: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  website?: string;
}

const BusinessSetup: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<SetupStep>('type');
  const [selectedType, setSelectedType] = useState<BusinessType | null>(null);
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({
    name: '',
    description: '',
    email: '',
    phone: '',
    address: '',
    website: '',
  });
  const [isCompleting, setIsCompleting] = useState(false);

  const steps = [
    { id: 'type', title: 'Tipo de Negocio', completed: !!selectedType },
    { id: 'info', title: 'Información', completed: currentStep === 'confirm' || currentStep === 'complete' },
    { id: 'confirm', title: 'Confirmación', completed: currentStep === 'complete' },
    { id: 'complete', title: 'Completado', completed: false },
  ];

  const getCurrentStepIndex = () => {
    return steps.findIndex(step => step.id === currentStep);
  };

  const handleTypeSelect = (businessType: BusinessType) => {
    setSelectedType(businessType);
    // Pre-fill business info with defaults
    setBusinessInfo(prev => ({
      ...prev,
      name: prev.name || `${businessType.name} Digital`,
      description: prev.description || `Tu ${businessType.name.toLowerCase()} en línea`,
    }));
  };

  const handleInfoUpdate = (info: BusinessInfo) => {
    setBusinessInfo(info);
  };

  const handleCompleteSetup = async () => {
    if (!selectedType) return;

    try {
      setIsCompleting(true);

      // Create business configuration
      const config: BusinessConfiguration = {
        businessInfo: {
          name: businessInfo.name,
          description: businessInfo.description,
          email: businessInfo.email,
          phone: businessInfo.phone,
          address: businessInfo.address,
          website: businessInfo.website,
        },
        businessType: selectedType,
        branding: {
          primaryColor: selectedType.color.primary,
          secondaryColor: selectedType.color.secondary,
          accentColor: selectedType.color.accent,
        },
        enabledFeatures: selectedType.features
          .filter(f => f.enabled || f.required)
          .map(f => f.id),
        paymentMethods: ['credit_card', 'debit_card', 'cash', 'bank_transfer'],
        shippingOptions: [
          { id: 'standard', name: 'Envío Estándar', price: 5, estimatedDays: 3 },
          { id: 'express', name: 'Envío Express', price: 15, estimatedDays: 1 },
          { id: 'pickup', name: 'Recoger en Tienda', price: 0, estimatedDays: 0 },
        ],
        locale: {
          language: selectedType.currency.locale.split('-')[0],
          country: selectedType.currency.locale.split('-')[1],
          currency: selectedType.currency.code,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
      };

      // Initialize configuration
      initializeBusinessConfig(config);

      // Generate and store sample data
      try {
        const sampleData = generateSampleData(selectedType.id);
        // Store sample data in localStorage for development
        localStorage.setItem('sample_products', JSON.stringify(sampleData.products));
        localStorage.setItem('sample_users', JSON.stringify(sampleData.users));
        localStorage.setItem('sample_orders', JSON.stringify(sampleData.orders));
      } catch (error) {
        console.warn('Could not generate sample data:', error);
      }

      // Simulate setup delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      setCurrentStep('complete');
      
      // Auto-redirect after showing success
      setTimeout(() => {
        navigate(ROUTES.HOME);
        // Refresh the page to apply new configuration
        window.location.reload();
      }, 3000);

    } catch (error) {
      console.error('Setup failed:', error);
      alert('Error durante la configuración. Intenta nuevamente.');
    } finally {
      setIsCompleting(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => {
        const isActive = currentStep === step.id;
        const isCompleted = step.completed;
        const isNext = index === getCurrentStepIndex() + 1;

        return (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                ${isCompleted 
                  ? 'bg-green-500 text-white' 
                  : isActive 
                    ? selectedType
                      ? 'text-white'
                      : 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }
              `}
              style={isActive && selectedType ? { backgroundColor: selectedType.color.primary } : {}}
              >
                {isCompleted ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  index + 1
                )}
              </div>
              <span className={`
                text-xs mt-2 font-medium
                ${isActive ? 'text-gray-900' : 'text-gray-500'}
              `}>
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`
                h-0.5 w-16 mx-4 mt-5
                ${step.completed ? 'bg-green-500' : 'bg-gray-200'}
              `} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'type':
        return (
          <BusinessTypeSelector
            selectedType={selectedType}
            onSelect={handleTypeSelect}
            onNext={() => setCurrentStep('info')}
          />
        );

      case 'info':
        return (
          <BusinessInfoForm
            businessType={selectedType!}
            businessInfo={businessInfo}
            onUpdate={handleInfoUpdate}
            onNext={() => setCurrentStep('confirm')}
            onPrevious={() => setCurrentStep('type')}
          />
        );

      case 'confirm':
        return (
          <div className="w-full max-w-2xl mx-auto p-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Confirma tu Configuración
              </h1>
              <p className="text-lg text-gray-600">
                Revisa los datos antes de crear tu tienda
              </p>
            </div>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Resumen de Configuración</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Business Type */}
                <div>
                  <h3 className="font-semibold mb-2">Tipo de Negocio</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{selectedType?.name}</span>
                    <Badge style={{ backgroundColor: selectedType?.color.primary, color: 'white' }}>
                      {selectedType?.id}
                    </Badge>
                  </div>
                </div>

                {/* Business Info */}
                <div>
                  <h3 className="font-semibold mb-2">Información</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <p><strong>Nombre:</strong> {businessInfo.name}</p>
                    <p><strong>Descripción:</strong> {businessInfo.description}</p>
                    <p><strong>Email:</strong> {businessInfo.email}</p>
                    <p><strong>Teléfono:</strong> {businessInfo.phone}</p>
                    <p><strong>Dirección:</strong> {businessInfo.address}</p>
                    {businessInfo.website && (
                      <p><strong>Sitio Web:</strong> {businessInfo.website}</p>
                    )}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h3 className="font-semibold mb-2">Características Incluidas</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedType?.features
                      .filter(f => f.enabled || f.required)
                      .map((feature) => (
                        <Badge key={feature.id} variant="secondary">
                          {feature.name}
                          {feature.required && ' (Requerido)'}
                        </Badge>
                      ))}
                  </div>
                </div>

                {/* Categories Preview */}
                <div>
                  <h3 className="font-semibold mb-2">Categorías de Productos</h3>
                  <div className="text-sm text-gray-600">
                    {selectedType?.categories.slice(0, 8).join(', ')}
                    {selectedType && selectedType.categories.length > 8 && '...'}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrentStep('info')}
                className="px-8"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Editar
              </Button>

              <Button
                onClick={handleCompleteSetup}
                disabled={isCompleting}
                className="px-8"
                style={{ backgroundColor: selectedType?.color.primary }}
              >
                {isCompleting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Configurando...
                  </>
                ) : (
                  'Crear Mi Tienda'
                )}
              </Button>
            </div>
          </div>
        );

      case 'complete':
        return (
          <div className="w-full max-w-lg mx-auto p-6 text-center">
            <div className="text-6xl mb-6">🎉</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              ¡Configuración Completada!
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Tu {selectedType?.name.toLowerCase()} <strong>{businessInfo.name}</strong> está lista.
              Serás redirigido en unos segundos...
            </p>
            <div className="flex items-center justify-center gap-2 text-gray-500">
              <Loader2 className="w-4 h-4 animate-spin" />
              Inicializando tu tienda...
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {renderStepIndicator()}
      {renderCurrentStep()}
    </div>
  );
};

export default BusinessSetup; 