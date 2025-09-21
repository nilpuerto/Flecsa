import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Edit3, Save, X, Download, Trash2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SavedDocument {
  id: string;
  name: string;
  type: string;
  extractedText: string;
  tags: string[];
  savedAt: string;
}

const DocumentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [document, setDocument] = useState<SavedDocument | null>(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    const savedDocs = JSON.parse(localStorage.getItem('savedDocuments') || '[]');
    const doc = savedDocs.find((d: SavedDocument) => d.id === id);
    if (doc) {
      setDocument(doc);
      setEditedName(doc.name);
    } else {
      navigate('/app/inbox');
    }
  }, [id, navigate]);

  const saveChanges = () => {
    if (!document) return;

    const updatedDoc = {
      ...document,
      name: editedName
    };

    const savedDocs = JSON.parse(localStorage.getItem('savedDocuments') || '[]');
    const updatedDocs = savedDocs.map((d: SavedDocument) => 
      d.id === document.id ? updatedDoc : d
    );
    
    localStorage.setItem('savedDocuments', JSON.stringify(updatedDocs));
    setDocument(updatedDoc);
    setIsEditingName(false);

    toast({
      title: "Cambios guardados",
      description: "El documento se ha actualizado correctamente.",
    });
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
                        setEditedName(document.name);
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
                    setEditedName(document.name);
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
                  {document.name}
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
              Guardado el {new Date(document.savedAt).toLocaleDateString('es-ES', {
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
            onClick={() => setIsEditingName(!isEditingName)}
            className="btn-hero flex items-center gap-2"
          >
            <Edit3 className="w-4 h-4" />
            Editar
          </button>
          <button
            onClick={deleteDocument}
            className="btn-secondary text-destructive hover:text-destructive flex items-center gap-2"
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
                <div className="text-center text-muted-foreground">
                  <div className="w-16 h-16 bg-muted-foreground/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p>Vista previa del documento</p>
                  <p className="text-sm mt-1">El documento original se mostraría aquí</p>
                </div>
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
                  {document.tags.map((tag, index) => (
                    <div
                      key={index}
                      className={`tag group flex items-center gap-1 ${
                        tag.toLowerCase().includes('factura') ? 'tag-factura' :
                        tag.toLowerCase().includes('ticket') ? 'tag-ticket' : 'tag-nota'
                      }`}
                    >
                      {tag}
                      <button
                        onClick={() => removeTag(index)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Nueva etiqueta"
                    className="input-modern flex-grow"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') addTag();
                    }}
                  />
                  <button onClick={addTag} className="btn-ghost p-2">
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
                  <span className="text-muted-foreground ml-2">{document.type || 'Desconocido'}</span>
                </div>
                <div>
                  <span className="font-medium text-foreground">ID:</span>
                  <span className="text-muted-foreground ml-2 font-mono text-xs">{document.id}</span>
                </div>
                <div>
                  <span className="font-medium text-foreground">Etiquetas:</span>
                  <span className="text-muted-foreground ml-2">{document.tags.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentDetail;