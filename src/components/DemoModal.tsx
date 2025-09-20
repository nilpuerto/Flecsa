import { useState } from "react";
import { X, Search, FileText, Upload, ArrowRight, Check } from "lucide-react";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DemoModal = ({ isOpen, onClose }: DemoModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  if (!isOpen) return null;

  const handleSearchDemo = () => {
    setShowResults(true);
    setTimeout(() => {
      setCurrentStep(1);
    }, 1000);
  };

  const resetDemo = () => {
    setCurrentStep(0);
    setSearchQuery("");
    setShowResults(false);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-border">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Demo en vivo - Zerlo.ai</h2>
            <p className="text-muted-foreground">Descubre cómo funciona la búsqueda inteligente</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {currentStep === 0 ? (
            <div className="space-y-8">
              {/* Mock Document Upload */}
              <div className="bg-muted/50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Upload className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Documentos organizados</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { name: "Factura_Luz_Enero.pdf", type: "Factura", color: "bg-blue-500/20 text-blue-600" },
                    { name: "Ticket_Gasolina_15mar.jpg", type: "Gasto", color: "bg-green-500/20 text-green-600" },
                    { name: "Contrato_Alquiler.pdf", type: "Contrato", color: "bg-purple-500/20 text-purple-600" },
                    { name: "Nomina_Marzo.pdf", type: "Nómina", color: "bg-orange-500/20 text-orange-600" }
                  ].map((doc, i) => (
                    <div key={i} className="bg-card border border-border rounded-lg p-3 hover:shadow-md transition-shadow">
                      <FileText className="w-8 h-8 text-primary mb-2" />
                      <div className="text-sm font-medium text-foreground mb-1">{doc.name}</div>
                      <div className={`text-xs px-2 py-1 rounded-full ${doc.color}`}>{doc.type}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Search Demo */}
              <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
                <div className="flex items-center gap-3 mb-4">
                  <Search className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Prueba la búsqueda inteligente</h3>
                </div>
                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Escribe tu pregunta en español natural..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-3 pr-12 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                      onClick={handleSearchDemo}
                      disabled={!searchQuery.trim()}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary text-primary-foreground rounded-md flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    Ejemplos: "¿Cuánto gasté en combustible?" | "Busca mi contrato de alquiler" | "Nómina del mes pasado"
                  </div>
                </div>

                {showResults && (
                  <div className="mt-6 space-y-3 animate-fade-in">
                    <div className="text-sm font-medium text-primary">Resultados encontrados:</div>
                    <div className="space-y-2">
                      <div className="bg-card border border-primary/20 rounded-lg p-3 flex items-center gap-3">
                        <FileText className="w-5 h-5 text-primary" />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-foreground">Ticket_Gasolina_15mar.jpg</div>
                          <div className="text-xs text-muted-foreground">45,67€ - 15 marzo 2024</div>
                        </div>
                        <Check className="w-4 h-4 text-green-500" />
                      </div>
                      <div className="bg-card border border-primary/20 rounded-lg p-3 flex items-center gap-3">
                        <FileText className="w-5 h-5 text-primary" />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-foreground">Factura_Cepsa_08mar.pdf</div>
                          <div className="text-xs text-muted-foreground">52,30€ - 8 marzo 2024</div>
                        </div>
                        <Check className="w-4 h-4 text-green-500" />
                      </div>
                    </div>
                    <div className="bg-primary/10 rounded-lg p-3 text-center">
                      <div className="text-sm font-medium text-primary">Total gastado en combustible: 97,97€</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center space-y-6 py-12">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">¡Impresionante!</h3>
                <p className="text-muted-foreground">
                  Zerlo encontró tus documentos y calculó el total automáticamente. 
                  <br />
                  Todo en segundos, sin buscar en carpetas.
                </p>
              </div>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={resetDemo}
                  className="px-6 py-3 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors"
                >
                  Probar otra búsqueda
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Empezar con Zerlo
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DemoModal;