import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FileText, Save, Download, Calendar, ArrowLeft, Edit3, Tags, CheckSquare } from "lucide-react";

const DocResult = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [docData, setDocData] = useState<any>(null);
  const [extractedText, setExtractedText] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const docInfo = localStorage.getItem('currentDocument');
    if (docInfo) {
      const doc = JSON.parse(docInfo);
      if (doc.id === id) {
        setDocData(doc);
        // Mock extracted text based on document type
        if (doc.name.toLowerCase().includes('factura') || doc.name.toLowerCase().includes('invoice')) {
          setExtractedText("FACTURA\n\nEmpresa: Tecnología Avanzada S.L.\nNIF: B12345678\nDirección: Calle Principal 123, Madrid\n\nCliente: Juan Pérez\nDNI: 12345678A\n\nFactura nº: 2025-001\nFecha: 15/01/2025\nVencimiento: 15/02/2025\n\nConcepto: Servicios de consultoría tecnológica\nImporte: 1.200,00 €\nIVA (21%): 252,00 €\nTotal: 1.452,00 €");
        } else {
          setExtractedText("Documento procesado correctamente.\n\nTexto detectado:\n\nEste es un ejemplo de contenido extraído del documento. La tecnología OCR ha detectado y procesado el texto visible en la imagen o archivo PDF.\n\nFecha: 15/01/2025\nTipo: Documento general\nEstado: Procesado");
        }
      }
    } else {
      navigate('/app/upload');
    }
  }, [id, navigate]);

  const saveDocument = () => {
    const savedDocs = JSON.parse(localStorage.getItem('savedDocuments') || '[]');
    const newDoc = {
      ...docData,
      extractedText,
      tags: getDocumentTags(),
      actions: getDocumentActions(),
      savedAt: new Date().toISOString(),
    };
    savedDocs.push(newDoc);
    localStorage.setItem('savedDocuments', JSON.stringify(savedDocs));
    navigate('/app/inbox');
  };

  const getDocumentTags = () => {
    if (extractedText.toLowerCase().includes('factura')) {
      return ['Factura', 'Contabilidad', 'Pago pendiente'];
    }
    return ['Documento', 'General'];
  };

  const getDocumentActions = () => {
    if (extractedText.toLowerCase().includes('factura')) {
      return [
        'Registrar en contabilidad',
        'Programar pago para el 15/02/2025',
        'Archivar en carpeta de facturas'
      ];
    }
    return [
      'Revisar contenido',
      'Clasificar documento',
      'Archivar'
    ];
  };

  if (!docData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loader-morph"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/app/upload')}
            className="btn-ghost flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </button>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
              Documento procesado
            </h1>
            <p className="text-muted-foreground">{docData.name}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Document Thumbnail */}
          <div className="lg:col-span-1">
            <div className="card-soft">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Documento original</h3>
              </div>
              
              <div className="bg-muted rounded-lg p-8 text-center mb-4">
                <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground mb-2">{docData.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(docData.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tipo:</span>
                  <span className="text-foreground">{docData.type}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Procesado:</span>
                  <span className="text-foreground">Hace un momento</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Extracted Text */}
            <div className="card-soft">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Texto detectado</h3>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="btn-ghost text-sm"
                >
                  {isEditing ? 'Guardar' : 'Editar'}
                </button>
              </div>
              
              {isEditing ? (
                <textarea
                  value={extractedText}
                  onChange={(e) => setExtractedText(e.target.value)}
                  className="input-modern w-full h-64 resize-none"
                  placeholder="Texto extraído del documento..."
                />
              ) : (
                <div className="bg-muted rounded-lg p-4 h-64 overflow-y-auto">
                  <pre className="text-sm text-foreground whitespace-pre-wrap font-mono">
                    {extractedText}
                  </pre>
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="card-soft">
              <div className="flex items-center gap-2 mb-4">
                <Tags className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Etiquetas sugeridas</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {getDocumentTags().map((tag, index) => (
                  <span
                    key={index}
                    className={`tag ${tag === 'Factura' ? 'tag-factura' : tag === 'Documento' ? 'tag-nota' : 'tag-ticket'}`}
                  >
                    {tag}
                  </span>
                ))}
                <button className="tag border-dashed border-2 border-border bg-transparent text-muted-foreground hover:border-primary hover:text-primary">
                  + Añadir etiqueta
                </button>
              </div>
            </div>

            {/* Suggested Actions */}
            <div className="card-soft">
              <div className="flex items-center gap-2 mb-4">
                <CheckSquare className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Acciones sugeridas</h3>
              </div>
              
              <ul className="space-y-3">
                {getDocumentActions().map((action, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-foreground">{action}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button onClick={saveDocument} className="btn-hero flex items-center gap-2">
                <Save className="w-4 h-4" />
                Guardar en bandeja
              </button>
              <button className="btn-secondary flex items-center gap-2">
                <Download className="w-4 h-4" />
                Exportar PDF
              </button>
              <button className="btn-secondary flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Añadir a tareas
                <span className="text-xs bg-warning text-warning-foreground px-2 py-0.5 rounded-full ml-1">
                  Próximamente
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocResult;