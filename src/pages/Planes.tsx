import { useState, useEffect } from "react";
import { Check, ArrowLeft } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { apiService } from "@/services/api";
import { useNavigate } from "react-router-dom";

const Planes = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const plans = [
    {
      id: 'free',
      name: 'Gratuito',
      price: '0',
      period: '/mes',
      accent: 'Ideal para empezar',
      description: 'Prueba Flecsa sin coste.',
      button: 'Plan actual',
      features: [
        '70 créditos de IA al mes',
        '20 GB de almacenamiento seguro',
        'Búsqueda inteligente ilimitada',
        'Organización automática',
        'Acceso multi-dispositivo'
      ],
      isCurrent: user?.subscriptionPlan === 'free',
      isDisabled: false
    },
    {
      id: 'starter',
      name: 'Starter',
      price: '6,99',
      period: '/mes',
      accent: 'Más IA y lectura avanzada',
      description: 'Más IA y lectura avanzada.',
      button: user?.subscriptionPlan === 'starter' ? 'Plan actual' : 'Comenzar ahora',
      features: [
        '400 créditos de IA al mes',
        '200 GB de almacenamiento',
        'Todas las funciones del plan Gratuito',
        'Todas las instrucciones de IA',
        'Exportación avanzada (PDF, CSV, JSON)',
        'Soporte prioritario'
      ],
      isCurrent: user?.subscriptionPlan === 'starter',
      isDisabled: false
    },
    {
      id: 'business',
      name: 'Business',
      price: '49,99',
      period: '/mes por usuario',
      accent: 'Equipos y empresas',
      description: 'Disponible muy pronto.',
      button: 'Próximamente',
      features: [
        '4.000 créditos de IA al mes por usuario',
        '500 GB de almacenamiento',
        'Todas las funciones de Starter',
        'Espacios compartidos y roles',
        'Moderación inteligente y API profesional',
        'Integraciones con Google, Notion, Slack y más',
        'Panel de administración completo',
        'Hasta 10 empleados con un pago'
      ],
      isCurrent: user?.subscriptionPlan === 'business',
      isDisabled: true
    }
  ];

  const handleSubscribe = async (planId: string) => {
    if (planId === 'free' || planId === 'business') return;
    
    setIsLoading(true);
    try {
      const response = await apiService.createCheckoutSession({
        type: 'subscription',
        planId: planId,
        price: planId === 'starter' ? 6.99 : 49.99
      });
      
      if (!response.error && response.data) {
        const { url } = response.data as { url: string };
        window.location.href = url;
      } else {
        console.error('Error creating checkout session:', response.error);
        alert('Error al procesar el pago. Por favor, intenta de nuevo.');
      }
    } catch (error) {
      console.error('Subscribe error:', error);
      alert('Error al procesar el pago. Por favor, intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-12 md:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Atrás</span>
        </button>
        
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 md:mb-4">
            Planes de Precios
          </h1>
          <p className="text-sm md:text-lg text-slate-600 max-w-2xl mx-auto">
            Planes limpios y directos adaptados a tus necesidades. Elige un plan y comienza ahora.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-xl md:rounded-2xl border-2 p-4 md:p-8 flex flex-col transition-all ${
                plan.isCurrent
                  ? 'border-primary shadow-xl scale-105'
                  : plan.isDisabled
                  ? 'border-slate-200 bg-slate-50 opacity-75'
                  : 'border-slate-200 hover:border-primary hover:shadow-lg'
              }`}
            >
              {plan.isCurrent && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                    Plan actual
                  </span>
                </div>
              )}

              <div className="mb-4 md:mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-2xl md:text-4xl font-bold text-slate-900">{plan.price}€</span>
                  <span className="text-xs md:text-base text-slate-600">{plan.period}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-1 md:mb-2">{plan.name}</h3>
                <p className="text-xs md:text-sm text-slate-500 mb-1">{plan.accent}</p>
                <p className="text-xs md:text-sm text-slate-600">{plan.description}</p>
              </div>

              <button
                onClick={() => handleSubscribe(plan.id)}
                disabled={plan.isDisabled || plan.isCurrent || isLoading}
                className={`w-full py-2 md:py-3 px-4 md:px-6 rounded-full text-sm md:text-base font-medium transition-colors mb-4 md:mb-6 ${
                  plan.isCurrent
                    ? 'bg-slate-100 text-slate-500 cursor-default'
                    : plan.isDisabled
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'bg-primary text-white hover:bg-primary/90'
                }`}
              >
                {isLoading && !plan.isCurrent && !plan.isDisabled ? 'Procesando...' : plan.button}
              </button>

              <div className="flex-1 space-y-2 md:space-y-3">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2 md:gap-3">
                    <Check className="w-4 h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-xs md:text-sm text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Credits Explanation - Small, subtle note */}
        <div className="max-w-3xl mx-auto mb-4 md:mb-6 -mt-4 md:-mt-6">
          <p className="text-sm md:text-base text-slate-400 text-center leading-relaxed">
            <span className="text-slate-500">Nota:</span> Buscar archivo con IA: 10 créditos. Subir y organizar: 2 créditos por archivo.
          </p>
        </div>

        {/* Footer Note */}
        <div className="text-center text-xs md:text-sm text-slate-500 mb-6">
          <p>Pausa o cancela en cualquier momento</p>
        </div>
      </div>
    </div>
  );
};

export default Planes;

