import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <div className="w-20 h-20 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl font-bold text-primary">404</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Página no encontrada
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link to="/" className="btn-hero inline-block">
            Volver al inicio
          </Link>
          <div>
            <Link to="/app/upload" className="btn-secondary">
              Ir a la aplicación
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
