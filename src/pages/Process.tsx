import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Process = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Generate automatic tags based on document name/content
  const getAutomaticTags = (docName: string): string[] => {
    const name = docName.toLowerCase();
    const tags = [];
    
    if (name.includes('factura') || name.includes('invoice')) {
      tags.push('Factura');
    } else if (name.includes('contrato') || name.includes('contract')) {
      tags.push('Contrato');
    } else if (name.includes('ticket') || name.includes('recibo') || name.includes('receipt')) {
      tags.push('Ticket');
    } else if (name.includes('nota') || name.includes('note')) {
      tags.push('Notas');
    } else if (name.includes('cita') || name.includes('appointment') || name.includes('entrevista')) {
      tags.push('Cita');
    } else {
      tags.push('Documento');
    }
    
    return tags;
  };

  // Generate mock extracted text based on document type
  const getMockExtractedText = (docName: string): string => {
    const name = docName.toLowerCase();
    
    if (name.includes('factura') || name.includes('invoice')) {
      return `Factura #F-2024-001
Fecha: ${new Date().toLocaleDateString()}
Cliente: Empresa ABC S.L.
Concepto: Servicios de consultoría
Importe: 1,250.00 €
IVA (21%): 262.50 €
Total: 1,512.50 €`;
    } else if (name.includes('contrato')) {
      return `Contrato de Servicios Profesionales
Fecha: ${new Date().toLocaleDateString()}
Partes: [Nombre del Cliente] y [Proveedor]
Duración: 12 meses
Valor: A determinar según servicios prestados`;
    } else if (name.includes('ticket')) {
      return `Ticket de Compra
Fecha: ${new Date().toLocaleDateString()}
Establecimiento: Tienda XYZ
Productos: Varios artículos
Total: 45.60 €`;
    } else {
      return `Documento procesado automáticamente
Fecha: ${new Date().toLocaleDateString()}
Contenido: Texto extraído del documento ${docName}
Estado: Procesado correctamente`;
    }
  };

  const saveDocumentsAutomatically = (docs: any[]) => {
    const savedDocuments = docs.map(doc => {
      const tags = getAutomaticTags(doc.name);
      const extractedText = getMockExtractedText(doc.name);
      
      return {
        id: doc.id,
        name: doc.name,
        type: doc.type,
        extractedText,
        tags,
        savedAt: new Date().toISOString(),
      };
    });

    // Get existing documents
    const existingDocs = JSON.parse(localStorage.getItem('savedDocuments') || '[]');
    
    // Add new documents
    const updatedDocs = [...savedDocuments, ...existingDocs];
    
    // Save to localStorage
    localStorage.setItem('savedDocuments', JSON.stringify(updatedDocs));
    
    return savedDocuments;
  };

  useEffect(() => {
    // Simulate processing time
    const timer = setTimeout(() => {
      const docsInfo = localStorage.getItem('documentsToProcess');
      const docInfo = localStorage.getItem('currentDocument'); // Backwards compatibility
      
      if (docsInfo) {
        const docs = JSON.parse(docsInfo);
        
        // Automatically save documents with tags
        const savedDocs = saveDocumentsAutomatically(docs);
        
        toast({
          title: `${savedDocs.length} documento${savedDocs.length > 1 ? 's' : ''} procesado${savedDocs.length > 1 ? 's' : ''}`,
          description: `Se ha${savedDocs.length > 1 ? 'n' : ''} añadido a tu bandeja de entrada con etiquetas automáticas.`,
        });
        
        // Navigate directly to inbox
        navigate('/app/inbox');
        
        // Clean up temp storage
        localStorage.removeItem('documentsToProcess');
      } else if (docInfo) {
        // Backwards compatibility for single document
        const doc = JSON.parse(docInfo);
        const savedDocs = saveDocumentsAutomatically([doc]);
        
        toast({
          title: "Documento procesado",
          description: `${savedDocs[0].name} se ha añadido a tu bandeja de entrada con etiquetas automáticas.`,
        });
        
        navigate('/app/inbox');
        localStorage.removeItem('currentDocument');
      } else {
        navigate('/app/upload');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, toast]);

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