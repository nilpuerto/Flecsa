import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Edit3, Save, X, Download, Trash2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiService } from "@/services/api";

interface SavedDocument {}

const DocumentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [document, setDocument] = useState<any | null>(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [newTag, setNewTag] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const fetchDoc = async () => {
      if (!id) return;
      const resp = await apiService.getDocument(String(id));
      if (!resp.error && resp.data) {
        const doc = (resp.data as any).document;
        setDocument(doc);
        setEditedName(doc.filename);
        setIssueDate(doc.issue_date || "");
      } else {
        navigate('/app/inbox');
      }
    };
    fetchDoc();
  }, [id, navigate]);

  const saveChanges = async () => {
    if (!document) return;
    const payload: any = {};
    if (editedName && editedName !== document.filename) payload.filename = editedName;
    if (issueDate && issueDate !== document.issue_date) payload.issueDate = issueDate;
    
    console.log('Saving changes:', payload);
    
    const resp = await apiService.updateDocument(String(document.id), payload);
    if (!resp.error && resp.data) {
      const updatedDoc = (resp.data as any).document;
      setDocument(updatedDoc);
      setEditedName(updatedDoc.filename);
      setIsEditingName(false);
      toast({ title: 'Cambios guardados', description: 'Documento actualizado.' });
    } else {
      toast({ title: 'Error', description: resp.error!, variant: 'destructive' as any });
    }
  };

  const addTag = () => {
    if (!document || !newTag.trim()) return;

    const updatedDoc = {
      ...document,
      tags: [...document.tags, newTag.trim()]
    };

    const savedDocs = JSON.parse(localStorage.getItem('savedDocuments') || '[]');
    const updatedDocs = savedDocs.map((d: SavedDocument) => 
      d.id === document.id ? updatedDoc : d
    );
    
    localStorage.setItem('savedDocuments', JSON.stringify(updatedDocs));
    setDocument(updatedDoc);
    setNewTag("");

    toast({
      title: "Etiqueta añadida",
      description: `Se ha añadido la etiqueta "${newTag.trim()}".`,
    });
  };

  const removeTag = (tagIndex: number) => {
    if (!document) return;

    const updatedDoc = {
      ...document,
      tags: document.tags.filter((_, index) => index !== tagIndex)
    };

    const savedDocs = JSON.parse(localStorage.getItem('savedDocuments') || '[]');
    const updatedDocs = savedDocs.map((d: SavedDocument) => 
      d.id === document.id ? updatedDoc : d
    );
    
    localStorage.setItem('savedDocuments', JSON.stringify(updatedDocs));
    setDocument(updatedDoc);
  };

  const downloadDocument = () => {
    if (!document) return;

    const content = `Documento: ${document.name}\nFecha: ${new Date(document.savedAt).toLocaleDateString()}\nEtiquetas: ${document.tags.join(', ')}\n\n${document.extractedText}`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement('a');
    a.href = url;
    a.download = `${document.name.replace(/\.[^/.]+$/, "")}.txt`;
    window.document.body.appendChild(a);
    a.click();
    window.document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Descarga iniciada",
      description: "El documento se ha descargado como archivo de texto.",
    });
  };

  const deleteDocument = () => {
    if (!document) return;

    const savedDocs = JSON.parse(localStorage.getItem('savedDocuments') || '[]');
    const updatedDocs = savedDocs.filter((d: SavedDocument) => d.id !== document.id);
    localStorage.setItem('savedDocuments', JSON.stringify(updatedDocs));

    toast({
      title: "Documento eliminado",
      description: "El documento se ha eliminado correctamente.",
    });

    navigate('/app/inbox');
  };

  if (!document) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/app/inbox')}
            className="btn-ghost p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-grow">
            {isEditingName ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="input-modern text-2xl font-bold"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') saveChanges();
                      if (e.key === 'Escape') {
                        setEditedName(document.filename);
                        setIsEditingName(false);
                      }
                    }}
                  autoFocus
                />
                <button onClick={saveChanges} className="btn-ghost p-2">
                  <Save className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {
                    setEditedName(document.filename);
                    setIsEditingName(false);
                  }}
                  className="btn-ghost p-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                  {document.filename}
                </h1>
                <button
                  onClick={() => setIsEditingName(true)}
                  className="btn-ghost p-2"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
            )}
            <p className="text-muted-foreground mt-1">
              Guardado el {new Date(document.created_at).toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => {
              if (isEditingName) {
                saveChanges();
              } else {
                setIsEditingName(true);
              }
            }}
            className="btn-hero flex items-center gap-2 px-3 py-1.5 text-sm"
          >
            <Edit3 className="w-4 h-4" />
            {isEditingName ? 'Guardar' : 'Editar'}
          </button>
          <button
            onClick={() => {
              const url = apiService.getDownloadUrl(String(document.id));
              window.open(url, '_blank');
            }}
            className="btn-secondary flex items-center gap-2 px-3 py-1.5 text-sm"
          >
            <Download className="w-4 h-4" />
            Descargar
          </button>
          <button
            onClick={deleteDocument}
            className="btn-secondary text-destructive hover:text-destructive flex items-center gap-2 px-3 py-1.5 text-sm"
          >
            <Trash2 className="w-4 h-4" />
            Eliminar
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="card-soft">
              <h2 className="text-xl font-semibold mb-4">Vista del documento</h2>
              <div className="w-full h-96 border border-border rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                {document.mime_type?.includes('image/') ? (
                  <img
                    src={apiService.getPreviewUrl(String(document.id))}
                    alt={document.filename}
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => {
                      console.error('Image load error:', e);
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999"%3EError al cargar imagen%3C/text%3E%3C/svg%3E';
                    }}
                  />
                ) : (
                  <iframe
                    src={apiService.getPreviewUrl(String(document.id))}
                    title="Vista previa"
                    className="w-full h-full"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tags */}
            <div className="card-soft">
              <h3 className="text-lg font-semibold mb-4">Etiquetas</h3>
              
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {(document.tags || '').toString().split(',').filter(Boolean).map((tag: string, index: number) => (
                    <div
                      key={index}
                      className={`tag group flex items-center gap-1 ${
                        tag.toLowerCase().includes('factura') ? 'tag-factura' :
                        tag.toLowerCase().includes('ticket') ? 'tag-ticket' : 'tag-nota'
                      }`}
                    >
                      {tag}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Nueva etiqueta"
                    className="input-modern h-8 text-sm flex-1 min-w-[0]"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') addTag();
                    }}
                  />
                  <button onClick={addTag} className="btn-ghost p-1.5 h-8 w-8 flex items-center justify-center flex-shrink-0 ml-1" title="Añadir etiqueta">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Document Info */}
            <div className="card-soft">
              <h3 className="text-lg font-semibold mb-4">Información</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-foreground">Tipo:</span>
                  <span className="text-muted-foreground ml-2">{document.mime_type || 'Desconocido'}</span>
                </div>
                <div>
                  <span className="font-medium text-foreground">ID:</span>
                  <span className="text-muted-foreground ml-2 font-mono text-xs">{document.id}</span>
                </div>
                <div>
                  <span className="font-medium text-foreground">Fecha de subida:</span>
                  <span className="text-muted-foreground ml-2">{new Date(document.created_at).toLocaleString('es-ES')}</span>
                </div>
                {document.issue_date && (
                  <div>
                    <span className="font-medium text-foreground">Fecha del documento:</span>
                    <span className="text-muted-foreground ml-2">{document.issue_date}</span>
                  </div>
                )}
                <div>
                  <span className="font-medium text-foreground">Etiquetas:</span>
                  <span className="text-muted-foreground ml-2">{((document.tags || '') + '').split(',').filter(Boolean).length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showPreview && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg shadow-xl w-full max-w-5xl h-[80vh] relative overflow-hidden">
            <button
              onClick={() => setShowPreview(false)}
              className="absolute top-3 right-3 btn-ghost px-3 py-1.5 text-sm"
            >
              Cerrar
            </button>
            {document.mime_type?.includes('image/') ? (
              <img
                src={apiService.getPreviewUrl(String(document.id))}
                alt={document.filename}
                className="w-full h-full object-contain"
              />
            ) : (
              <iframe
                src={apiService.getPreviewUrl(String(document.id))}
                title="Vista previa"
                className="w-full h-full"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentDetail;