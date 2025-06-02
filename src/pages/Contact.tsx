import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle,
  Send,
  CheckCircle,
  Star,
  Users,
  Truck,
  Shield
} from 'lucide-react';
import { toast } from '../hooks/use-toast';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "✅ Mensaje enviado",
      description: "Te responderemos en las próximas 24 horas.",
    });
    
    // Limpiar formulario
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-pharma-blue to-pharma-blue-dark text-white rounded-2xl p-8">
        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold mb-4">Contáctanos</h1>
          <p className="text-xl opacity-90 mb-6">
            Estamos aquí para ayudarte. Comunícate con nuestro equipo farmacéutico profesional
          </p>
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-pharma-green rounded-full mr-2"></div>
              <span>Respuesta en 24 horas</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-pharma-green rounded-full mr-2"></div>
              <span>Asesoría farmacéutica gratuita</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-pharma-green rounded-full mr-2"></div>
              <span>Atención personalizada</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card className="shadow-xl border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageCircle className="w-5 h-5 mr-2" />
                Envíanos un mensaje
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Nombre completo *
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Tu nombre"
                      className="border-2 border-gray-200 focus:border-pharma-blue"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Correo electrónico *
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="tu@email.com"
                      className="border-2 border-gray-200 focus:border-pharma-blue"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Teléfono
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+58 414-123-4567"
                      className="border-2 border-gray-200 focus:border-pharma-blue"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Asunto *
                    </label>
                    <Input
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      placeholder="¿En qué podemos ayudarte?"
                      className="border-2 border-gray-200 focus:border-pharma-blue"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Mensaje *
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Describe tu consulta o solicitud..."
                    rows={6}
                    className="border-2 border-gray-200 focus:border-pharma-blue"
                    required
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-pharma-green hover:bg-pharma-green-dark text-white font-bold py-4 text-lg rounded-xl shadow-lg transform hover:scale-[1.02] transition-all"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Enviar mensaje
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          {/* Location & Hours */}
          <Card className="shadow-xl border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Información de contacto
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-pharma-blue mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Dirección</p>
                    <p className="text-gray-600">
                      Av. Principal, Centro de la Ciudad<br />
                      Caracas, Venezuela
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-pharma-blue mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Teléfonos</p>
                    <p className="text-gray-600">
                      +58 414-123-4567<br />
                      +58 212-987-6543
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-pharma-blue mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <p className="text-gray-600">
                      info@farmacialuz.com<br />
                      consultas@farmacialuz.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-pharma-blue mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Horarios de atención</p>
                    <div className="text-gray-600 text-sm space-y-1">
                      <p>Lunes - Viernes: 6:00 AM - 10:00 PM</p>
                      <p>Sábados: 7:00 AM - 10:00 PM</p>
                      <p>Domingos: 8:00 AM - 8:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="shadow-xl border-0 bg-gradient-to-br from-pharma-blue/5 to-pharma-green/5">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="w-5 h-5 mr-2 text-pharma-green" />
                Farmacia LUZ en números
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-white rounded-lg">
                  <Users className="w-6 h-6 text-pharma-blue mx-auto mb-1" />
                  <div className="text-xl font-bold text-pharma-blue">5000+</div>
                  <div className="text-xs text-gray-600">Clientes</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <Star className="w-6 h-6 text-pharma-green mx-auto mb-1" />
                  <div className="text-xl font-bold text-pharma-green">4.9</div>
                  <div className="text-xs text-gray-600">Calificación</div>
                </div>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center text-pharma-green">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span>15+ años de experiencia</span>
                </div>
                <div className="flex items-center text-pharma-green">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span>Farmacéuticos certificados</span>
                </div>
                <div className="flex items-center text-pharma-green">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span>Productos originales garantizados</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Services */}
          <Card className="shadow-xl border-0">
            <CardHeader>
              <CardTitle>Nuestros servicios</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Truck className="w-5 h-5 text-pharma-blue" />
                <div>
                  <p className="font-semibold text-sm">Entrega a domicilio</p>
                  <p className="text-xs text-gray-600">En 24-48 horas</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <MessageCircle className="w-5 h-5 text-pharma-green" />
                <div>
                  <p className="font-semibold text-sm">Consulta farmacéutica</p>
                  <p className="text-xs text-gray-600">Asesoría profesional</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Shield className="w-5 h-5 text-pharma-blue" />
                <div>
                  <p className="font-semibold text-sm">Productos certificados</p>
                  <p className="text-xs text-gray-600">Calidad garantizada</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Emergency Contact */}
      <Card className="shadow-xl border-0 bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-l-red-500">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <Phone className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-red-700 mb-2">
                Contacto de Emergencia 24/7
              </h3>
              <p className="text-gray-700 mb-3">
                Para consultas urgentes relacionadas con medicamentos o emergencias farmacológicas
              </p>
              <div className="flex items-center space-x-4">
                <Badge className="bg-red-600 text-white">
                  📞 +58 414-URGENTE
                </Badge>
                <Badge variant="outline" className="border-red-600 text-red-600">
                  WhatsApp disponible
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Contact; 