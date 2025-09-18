import { Link } from "react-router-dom";
import { Upload, Search, Calendar, ArrowRight, Camera, FileText, Tags } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">Z</span>
            </div>
            <span className="text-xl font-bold text-foreground">Zerlo</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#features" className="btn-ghost">Características</a>
            <a href="#how-it-works" className="btn-ghost">Cómo funciona</a>
            <Link to="/app/upload" className="btn-secondary">Probar gratis</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="fade-in">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                Convierte tus fotos y documentos en{" "}
                <span className="text-primary">orden instantáneo</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Sube o haz una foto, Zerlo la organiza automáticamente y la guarda en tu bandeja inteligente. 
                Pregunta por tus facturas, tickets o notas y encuéntralas al instante.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/app/upload" className="btn-hero inline-flex items-center gap-2">
                  Probar Zerlo gratis
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <button className="btn-secondary">Ver demo</button>
              </div>
            </div>
            <div className="slide-in-right">
              <img 
                src={heroImage} 
                alt="Documentos organizándose automáticamente con IA"
                className="w-full h-auto rounded-2xl shadow-[0_20px_50px_hsl(217_100%_52%_/_0.15)]"
              />
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
            <div className="card-soft text-center scale-in">
              <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-6">
                <Camera className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">1. Sube o haz una foto</h3>
              <p className="text-muted-foreground">
                Captura documentos con tu cámara o sube archivos desde tu dispositivo
              </p>
            </div>
            
            <div className="card-soft text-center scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-6">
                <Tags className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">2. La IA organiza automáticamente</h3>
              <p className="text-muted-foreground">
                Nuestro sistema detecta y clasifica tus documentos al instante
              </p>
            </div>
            
            <div className="card-soft text-center scale-in" style={{ animationDelay: '0.4s' }}>
              <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">3. Encuentra con búsqueda natural</h3>
              <p className="text-muted-foreground">
                Pregunta en español y encuentra cualquier documento al instante
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary-light text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Calendar className="w-4 h-4" />
              Próximamente
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Calendario inteligente
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Zerlo detectará automáticamente fechas importantes, reuniones y plazos en tus documentos 
              y los añadirá a tu calendario personal.
            </p>
            <button className="btn-secondary">Avísame cuando esté listo</button>
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
    </div>
  );
};

export default Landing;