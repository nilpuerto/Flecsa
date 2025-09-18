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
      <section className="hero-gradient py-20 lg:py-32 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="fade-in">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                Organiza tus documentos.{" "}
                <span className="text-primary">Encuentra lo que necesitas en segundos.</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Zerlo.ai transforma fotos y PDFs en un inbox inteligente, rápido y privado.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setIsLoginModalOpen(true)}
                  className="btn-hero inline-flex items-center gap-2"
                >
                  Probar Zerlo gratis
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="btn-secondary">Ver demo</button>
              </div>
            </div>
            <div className="slide-in-right relative">
              <div className="animate-float">
                <img 
                  src={heroImage} 
                  alt="Documentos organizándose automáticamente con IA"
                  className="w-full h-auto rounded-2xl shadow-large"
                />
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium animate-pulse-slow">
                IA organizando...
              </div>
            </div>
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

      {/* Motivating Quotes */}
      <section className="py-20 bg-background overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            <div className="text-center">
              <h2 className="text-4xl lg:text-6xl font-bold text-foreground parallax-text">
                Menos caos.{" "}
                <span className="text-primary">Más claridad.</span>
              </h2>
            </div>
            <div className="text-center">
              <h2 className="text-4xl lg:text-6xl font-bold text-foreground parallax-text">
                Tu tiempo es valioso.{" "}
                <span className="text-primary">Zerlo lo respeta.</span>
              </h2>
            </div>
            <div className="text-center">
              <h2 className="text-4xl lg:text-6xl font-bold text-foreground parallax-text">
                Organiza, encuentra y{" "}
                <span className="text-primary">controla tus documentos.</span>
              </h2>
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