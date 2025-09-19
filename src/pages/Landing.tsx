import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Upload, Search, Calendar, ArrowRight, Camera, FileText, Tags, Star, Clock, Shield, Smartphone, Quote } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import LoginModal from "@/components/LoginModal";

const Landing = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'navbar-blur shadow-soft' : 'bg-background'}`}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">Z</span>
            </div>
            <span className="text-xl font-bold text-foreground">Zerlo</span>
          </div>
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="btn-hero px-6 py-2 text-base"
          >
            Iniciar sesión
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/30">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full animate-float"></div>
        <div className="absolute bottom-32 right-20 w-24 h-24 bg-primary/5 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-primary/8 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto fade-in">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                Organización inteligente con IA
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground leading-tight mb-8 tracking-tight">
              <span className="block">Menos caos.</span>
              <span className="block text-primary">Más claridad.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto">
              Zerlo.ai transforma fotos y PDFs en un inbox inteligente.{" "}
              <span className="text-foreground font-medium">Encuentra cualquier documento en segundos.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button 
                onClick={() => setIsLoginModalOpen(true)}
                className="btn-hero inline-flex items-center gap-2 text-lg px-8 py-4"
              >
                Probar Zerlo gratis
                <ArrowRight className="w-6 h-6" />
              </button>
              <button className="btn-secondary text-lg px-8 py-4">Ver demo en vivo</button>
            </div>

            {/* Stats or trust indicators */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">2s</div>
                <div className="text-sm text-muted-foreground">Tiempo de búsqueda promedio</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Privacidad garantizada</div>
              </div>
              <div className="text-center col-span-2 md:col-span-1">
                <div className="text-3xl font-bold text-primary mb-2">∞</div>
                <div className="text-sm text-muted-foreground">Documentos organizados</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Three-Step Process */}
      <section id="how-it-works" className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Tres pasos simples
            </h2>
            <p className="text-xl text-muted-foreground">
              Organiza tus documentos sin esfuerzo
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-soft card-hover text-center scale-in stagger-1">
              <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-6">
                <Camera className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">1. Sube tu documento</h3>
              <p className="text-muted-foreground">
                Captura documentos con tu cámara o sube archivos desde tu dispositivo
              </p>
            </div>
            
            <div className="card-soft card-hover text-center scale-in stagger-2">
              <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-6">
                <Tags className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">2. La IA organiza automáticamente</h3>
              <p className="text-muted-foreground">
                Nuestro sistema detecta y clasifica tus documentos al instante
              </p>
            </div>
            
            <div className="card-soft card-hover text-center scale-in stagger-3">
              <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">3. Encuentra lo que necesitas</h3>
              <p className="text-muted-foreground">
                Pregunta en español y encuentra cualquier documento al instante
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Impact Section */}
      <section className="py-32 bg-gradient-to-b from-background to-muted/50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    Inteligencia artificial avanzada
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                    Tu tiempo es valioso.{" "}
                    <span className="text-primary">Zerlo lo respeta.</span>
                  </h2>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Mientras otros sistemas te hacen perder tiempo buscando, Zerlo entiende tus documentos 
                  y te da respuestas instantáneas. Pregunta en español natural y encuentra exactamente lo que necesitas.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-primary rounded-full flex-shrink-0 flex items-center justify-center mt-1">
                      <span className="text-primary-foreground text-xs">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Búsqueda en lenguaje natural</h4>
                      <p className="text-muted-foreground text-sm">Pregunta como hablarías normalmente</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-primary rounded-full flex-shrink-0 flex items-center justify-center mt-1">
                      <span className="text-primary-foreground text-xs">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Organización automática</h4>
                      <p className="text-muted-foreground text-sm">Sin carpetas, sin etiquetas manuales</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-primary rounded-full flex-shrink-0 flex items-center justify-center mt-1">
                      <span className="text-primary-foreground text-xs">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Privacidad total</h4>
                      <p className="text-muted-foreground text-sm">Tus documentos nunca salen de tu control</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-card rounded-2xl shadow-2xl p-6 border border-border">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-6">
                      <Search className="w-5 h-5 text-primary" />
                      <span className="text-sm font-medium text-muted-foreground">Búsqueda inteligente</span>
                    </div>
                    
                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="text-sm text-muted-foreground mb-2">Tú preguntas:</div>
                      <div className="text-foreground font-medium">"¿Cuánto gasté en gasolina el mes pasado?"</div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 flex items-center gap-3">
                        <FileText className="w-4 h-4 text-primary" />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-foreground">Ticket Repsol - 45,67€</div>
                          <div className="text-xs text-muted-foreground">15 marzo 2024</div>
                        </div>
                      </div>
                      <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 flex items-center gap-3">
                        <FileText className="w-4 h-4 text-primary" />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-foreground">Factura Cepsa - 52,30€</div>
                          <div className="text-xs text-muted-foreground">8 marzo 2024</div>
                        </div>
                      </div>
                      <div className="text-center text-sm text-primary font-medium pt-2">
                        Total: 97,97€ en combustible
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium animate-pulse-slow">
                  IA trabajando...
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              ¿Por qué elegir Zerlo?
            </h2>
            <p className="text-xl text-muted-foreground">
              Optimiza tu flujo de trabajo con inteligencia artificial
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card-soft card-hover text-center fade-in stagger-1">
              <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Ahorra tiempo</h3>
              <p className="text-muted-foreground text-sm">
                Reduce minutos de búsqueda a segundos de resultados
              </p>
            </div>
            
            <div className="card-soft card-hover text-center fade-in stagger-2">
              <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Búsqueda instantánea</h3>
              <p className="text-muted-foreground text-sm">
                Encuentra cualquier documento al instante
              </p>
            </div>
            
            <div className="card-soft card-hover text-center fade-in stagger-3">
              <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Privacidad total</h3>
              <p className="text-muted-foreground text-sm">
                Tus documentos permanecen privados y seguros
              </p>
            </div>
            
            <div className="card-soft card-hover text-center fade-in stagger-4">
              <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Multi-dispositivo</h3>
              <p className="text-muted-foreground text-sm">
                Accede desde cualquier dispositivo, en cualquier momento
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Lo que dicen nuestros usuarios
            </h2>
            <p className="text-xl text-muted-foreground">
              Miles de profesionales ya organizan mejor sus documentos
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="testimonial-card fade-in stagger-1">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mr-4">
                  <span className="text-primary font-semibold">M</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">María González</h4>
                  <p className="text-sm text-muted-foreground">Autónoma</p>
                </div>
              </div>
              <Quote className="w-6 h-6 text-primary mb-3" />
              <p className="text-muted-foreground mb-4">
                "Con Zerlo encontré todas mis facturas de 2024 en segundos. Antes me tomaba horas buscar entre carpetas."
              </p>
              <div className="flex text-primary">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>
            
            <div className="testimonial-card fade-in stagger-2">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mr-4">
                  <span className="text-primary font-semibold">J</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Jorge Martín</h4>
                  <p className="text-sm text-muted-foreground">Freelance</p>
                </div>
              </div>
              <Quote className="w-6 h-6 text-primary mb-3" />
              <p className="text-muted-foreground mb-4">
                "Nunca había tenido un inbox tan inteligente. La IA entiende exactamente lo que busco."
              </p>
              <div className="flex text-primary">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>
            
            <div className="testimonial-card fade-in stagger-3">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mr-4">
                  <span className="text-primary font-semibold">A</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Ana Ruiz</h4>
                  <p className="text-sm text-muted-foreground">Consultora</p>
                </div>
              </div>
              <Quote className="w-6 h-6 text-primary mb-3" />
              <p className="text-muted-foreground mb-4">
                "Organizar documentos nunca fue tan fácil. Solo subo y Zerlo hace el resto."
              </p>
              <div className="flex text-primary">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              ¿Listo para organizar tus documentos?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8">
              Únete a miles de profesionales que ya organizan mejor con Zerlo.ai
            </p>
            <button 
              onClick={() => setIsLoginModalOpen(true)}
              className="bg-background text-primary px-8 py-4 rounded-xl font-semibold text-lg hover:bg-muted transition-all duration-300 shadow-large"
            >
              Comenzar gratis ahora
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">Z</span>
                </div>
                <span className="text-xl font-bold text-foreground">Zerlo</span>
              </div>
              <p className="text-muted-foreground">
                Organiza tus documentos con inteligencia artificial
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Producto</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Características</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Precios</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Empresa</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Sobre Zerlo</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contacto</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacidad</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Términos</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 Zerlo.ai. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </div>
  );
};

export default Landing;