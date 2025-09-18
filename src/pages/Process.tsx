import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Process = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate processing time
    const timer = setTimeout(() => {
      const docInfo = localStorage.getItem('currentDocument');
      if (docInfo) {
        const doc = JSON.parse(docInfo);
        navigate(`/app/doc/${doc.id}`);
      } else {
        navigate('/app/upload');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="loader-morph mx-auto mb-8"></div>
        
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
          Analizando tu documento…
        </h1>
        
        <p className="text-lg text-muted-foreground mb-8">
          Esto suele tardar unos segundos.
        </p>
        
        <div className="space-y-3 text-left">
          <div className="flex items-center gap-3 text-muted-foreground">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span>Detectando texto...</span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <span>Clasificando documento...</span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <span>Extrayendo información clave...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Process;