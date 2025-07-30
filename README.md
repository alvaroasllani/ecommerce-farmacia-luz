# 🛒 Universal E-commerce Template

Una plantilla de e-commerce **universal y configurable** que se adapta automáticamente a diferentes tipos de negocios. Con una sola configuración inicial, puedes crear tiendas para farmacias, supermercados, tiendas de ropa, electrónicos, restaurantes y más.

## ✨ Características Principales

### 🎯 **Multi-Negocio**

- **6 tipos de negocio predefinidos**: Farmacia, Supermercado, Tienda de Ropa, Electrónicos, Restaurante, y más
- **Configuración automática** de categorías, colores, terminología y características específicas
- **Fácil personalización** para agregar nuevos tipos de negocio

### 🎨 **Totalmente Personalizable**

- **Branding automático** con colores específicos por industria
- **Terminología adaptable** (productos → medicamentos para farmacias)
- **Características específicas** (recetas médicas, tallas, garantías, etc.)
- **Categorías dinámicas** según el tipo de negocio

### 🏗️ **Arquitectura Escalable**

- **TypeScript** para tipado fuerte y mejor desarrollo
- **React Hooks personalizados** para lógica de negocio
- **Sistema de permisos granular** por roles
- **Componentes modulares** y reutilizables
- **Servicios preparados** para integración con backend

### 🌟 **Experiencia de Usuario Premium**

- **Diseño moderno** con Tailwind CSS y Shadcn/UI
- **Responsive design** para todos los dispositivos
- **Loading states y feedback** visual
- **Notificaciones toast** integradas
- **Estados de error** manejados graciosamente

## 🚀 Inicio Rápido

### 1. **Clonación e Instalación**

```bash
git clone https://github.com/tu-usuario/universal-ecommerce-template.git
cd universal-ecommerce-template
npm install
```

### 2. **Configuración Inicial**

```bash
npm run dev
```

Al iniciar por primera vez, serás dirigido automáticamente a `/setup` donde podrás:

1. **Seleccionar tipo de negocio** (Farmacia, Supermercado, etc.)
2. **Configurar información** básica (nombre, descripción, contacto)
3. **Confirmar configuración** y generar datos de ejemplo

### 3. **¡Listo!** 🎉

Tu tienda estará configurada y funcionando con:

- ✅ Productos de ejemplo específicos del tipo de negocio
- ✅ Categorías apropiadas
- ✅ Colores y branding configurados
- ✅ Características específicas habilitadas

## 📊 Tipos de Negocio Disponibles

### 💊 **Farmacia**

- **Categorías**: Analgésicos, Antibióticos, Vitaminas, etc.
- **Características**: Medicamentos con receta, verificación de edad
- **Validaciones**: Cédulas venezolanas, prescripciones médicas
- **Moneda**: Bolívares (VES)

### 🛒 **Supermercado**

- **Categorías**: Frutas y Verduras, Carnes, Lácteos, etc.
- **Características**: Seguimiento de perecederos, precios por volumen
- **Validaciones**: Fechas de vencimiento, verificación de peso
- **Moneda**: USD

### 👕 **Tienda de Ropa**

- **Categorías**: Camisas, Pantalones, Vestidos, etc.
- **Características**: Guía de tallas, variantes de color
- **Validaciones**: Disponibilidad de tallas, combinaciones de color
- **Moneda**: USD

### 📱 **Electrónicos**

- **Categorías**: Smartphones, Laptops, Audio, Gaming, etc.
- **Características**: Seguimiento de garantía, especificaciones técnicas
- **Validaciones**: Compatibilidad, validación de garantía
- **Moneda**: USD

### 🍽️ **Restaurante**

- **Categorías**: Entradas, Platos Principales, Postres, etc.
- **Características**: Restricciones dietéticas, tiempo de entrega
- **Validaciones**: Advertencias de alérgenos, tiempo de preparación
- **Moneda**: USD

## 🛠️ Personalización Avanzada

### Agregar Nuevo Tipo de Negocio

1. **Definir el tipo** en `src/config/business-types.ts`:

```typescript
BOOKSTORE: {
  id: 'bookstore',
  name: 'Librería',
  description: 'Libros y material educativo',
  icon: 'book',
  color: {
    primary: '#8b5cf6', // purple
    secondary: '#7c3aed',
    accent: '#a855f7',
  },
  categories: ['Ficción', 'No Ficción', 'Educativo', 'Infantil'],
  features: [
    { id: 'isbn_tracking', name: 'Seguimiento ISBN', enabled: true },
    { id: 'author_search', name: 'Búsqueda por autor', enabled: true },
  ],
  // ... más configuración
}
```

2. **Crear template de datos** en `src/data/business-templates.ts`:

```typescript
export const BOOKSTORE_TEMPLATE: BusinessTemplate = {
  businessTypeId: "bookstore",
  products: [
    {
      id: "1",
      name: "El Quijote",
      description: "Clásico de la literatura española",
      price: 25.0,
      category: "Ficción",
      // ... más datos
    },
  ],
  // ... usuarios y órdenes de ejemplo
};
```

### Personalizar Componentes

Los componentes se adaptan automáticamente usando el hook `useBusinessConfig()`:

```typescript
import { useBusinessConfig } from "../hooks/useBusinessConfig";

const MyComponent = () => {
  const { terminology, getPrimaryColor, checkFeature } = useBusinessConfig();

  return (
    <div>
      <h1 style={{ color: getPrimaryColor() }}>
        {terminology.products} Disponibles
      </h1>
      {checkFeature("prescription_required") && <PrescriptionWarning />}
    </div>
  );
};
```

## 📁 Estructura del Proyecto

```
src/
├── 📁 config/               # Configuración de tipos de negocio
│   ├── business-types.ts    # Definiciones de tipos de negocio
│   └── business-config.ts   # Sistema de configuración global
├── 📁 data/                 # Templates de datos por negocio
│   └── business-templates.ts
├── 📁 components/           # Componentes reutilizables
│   ├── BusinessSetup/       # Configuración inicial
│   ├── Layout/              # Layout principal
│   └── ui/                  # Componentes UI base
├── 📁 hooks/                # Hooks personalizados
│   ├── useBusinessConfig.ts # Configuración reactiva
│   ├── useProducts.ts       # Manejo de productos
│   └── useOrders.ts         # Gestión de órdenes
├── 📁 services/             # Servicios para API
├── 📁 utils/                # Utilidades del dominio
├── 📁 constants/            # Constantes configurables
└── 📁 types/                # Tipos TypeScript
```

## 🔧 Configuración de Desarrollo

### Variables de Entorno

Crea un archivo `.env.local`:

```env
VITE_API_URL=http://localhost:3000/api
VITE_DEFAULT_BUSINESS_TYPE=pharmacy
```

### Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build de producción
- `npm run preview` - Preview del build
- `npm run lint` - Linting del código

## 🌍 Internacionalización

La plantilla incluye soporte para:

- **Múltiples monedas** (USD, VES, EUR, etc.)
- **Formatos de fecha localizados**
- **Validaciones específicas por país** (teléfonos, cédulas)
- **Terminología adaptable** por idioma/región

## 🔐 Sistema de Roles y Permisos

### Roles Predefinidos

- **Cliente**: Comprar productos, ver pedidos
- **Cajero**: Procesar pagos, gestionar órdenes
- **Administrador**: Control total del sistema

### Permisos Granulares

```typescript
// Ejemplo de uso
const { hasPermission } = usePermissions();

if (hasPermission(PERMISSIONS.MANAGE_INVENTORY)) {
  // Mostrar opciones de inventario
}
```

## 📱 Responsive y Accesibilidad

- ✅ **Mobile-first design**
- ✅ **Componentes accesibles** con Shadcn/UI
- ✅ **Navegación por teclado**
- ✅ **Lectores de pantalla** compatibles
- ✅ **Contraste adecuado** para todos los temas

## 🚀 Despliegue

### Vercel (Recomendado)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Subir carpeta dist/
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🎯 Casos de Uso

### Para Desarrolladores

- **Prototipado rápido** de e-commerce
- **Base sólida** para proyectos client custom
- **Aprendizaje** de arquitecturas escalables

### Para Negocios

- **MVP rápido** para validar idea de negocio
- **Migración digital** de negocios tradicionales
- **Multi-tenant SaaS** con configuraciones por cliente

## 🔮 Roadmap

- [ ] **Más tipos de negocio**: Gimnasio, Veterinaria, Floristería
- [ ] **Integración con pagos**: Stripe, PayPal, pagos locales
- [ ] **Dashboard avanzado**: Analytics, reportes, métricas
- [ ] **Multi-idioma**: i18n completo
- [ ] **PWA**: Funcionalidad offline
- [ ] **Integración WhatsApp**: Catálogo y pedidos
- [ ] **IA**: Recomendaciones personalizadas

---

**¿Tienes preguntas?** Abre un [Issue](https://github.com/tu-usuario/universal-ecommerce-template/issues) o contacta al equipo.

**¿Te gusta el proyecto?** Dale una ⭐ para apoyar el desarrollo.
