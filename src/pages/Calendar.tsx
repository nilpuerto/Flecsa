import { useState } from "react";
import { Calendar as CalendarIcon, Bell, Mail, Sparkles, Clock, Users, MapPin } from "lucide-react";

const Calendar = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      // In a real app, this would call an API
      console.log('Subscribed email:', email);
    }
  };

  const upcomingFeatures = [
    {
      icon: <CalendarIcon className="w-6 h-6" />,
      title: "Detección automática de fechas",
      description: "Identifica fechas importantes en tus documentos y las añade automáticamente"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Recordatorios inteligentes",
      description: "Recibe notificaciones antes de vencimientos y fechas límite"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Reuniones y citas",
      description: "Extrae información de reuniones de emails y documentos"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Ubicaciones automáticas",
      description: "Detecta direcciones y las asocia con eventos del calendario"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Próximamente
          </div>
          
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Calendario Inteligente
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Nuestra IA creará automáticamente eventos de calendario desde tus documentos: citas, reuniones, fechas límite y más.
          </p>
          <div className="bg-muted/50 border border-border rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-sm text-muted-foreground">
              <strong>¿Qué hará el calendario?</strong> Detectará fechas importantes en tus documentos (contratos, facturas, citas médicas) y las añadirá automáticamente a tu calendario personal para que nunca olvides una fecha importante.
            </p>
          </div>
        </div>

        {/* Calendar Preview - Blurred */}
        <div className="mb-12 scale-in relative">
          <div className="card-soft max-w-2xl mx-auto relative overflow-hidden">
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CalendarIcon className="w-8 h-8 text-primary" />
                </div>
                <p className="text-sm font-medium text-muted-foreground">Disponible próximamente</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">Enero 2025</h3>
              <div className="flex gap-2">
                <button className="btn-ghost p-2">←</button>
                <button className="btn-ghost p-2">→</button>
              </div>
            </div>
            
            {/* Mock Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 mb-4">
              {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((day) => (
                <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                  {day}
                </div>
              ))}
              {Array.from({ length: 35 }, (_, i) => {
                const day = i - 2;
                const isCurrentMonth = day > 0 && day <= 31;
                const hasEvent = [15, 22, 28].includes(day);
                
                return (
                  <div
                    key={i}
                    className={`aspect-square flex items-center justify-center text-sm rounded-lg transition-colors ${
                      isCurrentMonth
                        ? hasEvent
                          ? 'bg-primary text-primary-foreground font-medium'
                          : 'text-foreground hover:bg-muted'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {day > 0 && day <= 31 ? day : ''}
                  </div>
                );
              })}
            </div>
            
            {/* Event Examples */}
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-2 bg-primary/10 rounded-lg">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-foreground">Pago factura electricidad</p>
                  <p className="text-xs text-muted-foreground">15 enero - Detectado automáticamente</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-foreground">Reunión con cliente</p>
                  <p className="text-xs text-muted-foreground">22 enero - Extraído de email</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2 bg-green-50 rounded-lg">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-foreground">Vencimiento contrato</p>
                  <p className="text-xs text-muted-foreground">28 enero - Detectado en PDF</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Preview */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">
            Características que estarán disponibles
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {upcomingFeatures.map((feature, index) => (
              <div
                key={index}
                className="card-soft scale-in opacity-75"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Email Subscription */}
        <div className="text-center">
          <div className="card-soft max-w-md mx-auto">
            {isSubscribed ? (
              <div className="scale-in">
                <div className="w-16 h-16 bg-success-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bell className="w-8 h-8 text-success" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  ¡Perfecto!
                </h3>
                <p className="text-muted-foreground">
                  Te avisaremos en cuanto el calendario inteligente esté disponible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe}>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Avísame cuando esté listo
                </h3>
                <p className="text-muted-foreground mb-6">
                  Sé el primero en probar el calendario inteligente de Zerlo
                </p>
                
                <div className="space-y-4">
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-modern w-full"
                    required
                  />
                  <button type="submit" className="btn-hero w-full">
                    Notificarme
                  </button>
                </div>
                
                <p className="text-xs text-muted-foreground mt-4">
                  No enviaremos spam. Solo te avisaremos cuando esté disponible.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;