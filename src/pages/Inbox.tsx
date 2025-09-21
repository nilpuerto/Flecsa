import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, FileText, Calendar as CalendarIcon, Trash2, Eye } from "lucide-react";

interface SavedDocument {
  id: string;
  name: string;
  type: string;
  extractedText: string;
  tags: string[];
  savedAt: string;
}

const Inbox = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<SavedDocument[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Todos");
  const [filteredDocs, setFilteredDocs] = useState<SavedDocument[]>([]);

  const filters = ["Todos", "Facturas", "Notas", "Tickets"];

  useEffect(() => {
    const savedDocs = JSON.parse(localStorage.getItem('savedDocuments') || '[]');
    setDocuments(savedDocs);
  }, []);

  useEffect(() => {
    let filtered = documents;

    // Apply filter
    if (selectedFilter !== "Todos") {
      filtered = filtered.filter(doc => 
        doc.tags.some(tag => 
          tag.toLowerCase().includes(selectedFilter.toLowerCase().slice(0, -1)) // Remove 's' from plural
        )
      );
    }

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(doc => 
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.extractedText.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredDocs(filtered);
  }, [documents, searchQuery, selectedFilter]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getDocumentIcon = (tags: string[]) => {
    if (tags.some(tag => tag.toLowerCase().includes('factura'))) {
      return <FileText className="w-5 h-5 text-green-600" />;
    }
    if (tags.some(tag => tag.toLowerCase().includes('ticket'))) {
      return <FileText className="w-5 h-5 text-blue-600" />;
    }
    return <FileText className="w-5 h-5 text-purple-600" />;
  };

  const deleteDocument = (id: string) => {
    const updatedDocs = documents.filter(doc => doc.id !== id);
    setDocuments(updatedDocs);
    localStorage.setItem('savedDocuments', JSON.stringify(updatedDocs));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 fade-in">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Bandeja de entrada
          </h1>
          <p className="text-xl text-muted-foreground">
            Todos tus documentos organizados y listos para buscar
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar facturas, notas o tickets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-modern w-full pl-12"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedFilter === filter
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-muted"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Documents List */}
        {filteredDocs.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-10 h-10 text-muted-foreground" />
            </div>
            {documents.length === 0 ? (
              <>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Aún no tienes documentos
                </h3>
                <p className="text-muted-foreground mb-6">
                  Sube uno para empezar a organizar tu información
                </p>
                <a href="/app/upload" className="btn-hero">
                  Subir primer documento
                </a>
              </>
            ) : (
              <>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No se encontraron resultados
                </h3>
                <p className="text-muted-foreground">
                  Intenta con otros términos de búsqueda o cambia el filtro
                </p>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredDocs.map((doc, index) => (
              <div
                key={doc.id}
                className="card-soft hover:shadow-medium transition-all duration-200 scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  {/* Document Icon */}
                  <div className="flex-shrink-0 mt-1">
                    {getDocumentIcon(doc.tags)}
                  </div>

                  {/* Document Info */}
                  <div className="flex-grow min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-semibold text-foreground truncate">
                        {doc.name}
                      </h3>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <CalendarIcon className="w-4 h-4" />
                          {formatDate(doc.savedAt)}
                        </span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {doc.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className={`tag text-xs ${
                            tag.toLowerCase().includes('factura') ? 'tag-factura' :
                            tag.toLowerCase().includes('ticket') ? 'tag-ticket' : 'tag-nota'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Excerpt */}
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {doc.extractedText.slice(0, 150)}...
                    </p>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => navigate(`/app/document/${doc.id}`)}
                        className="btn-ghost text-sm flex items-center gap-1"
                      >
                        <Eye className="w-4 h-4" />
                        Ver completo
                      </button>
                      <button 
                        onClick={() => deleteDocument(doc.id)}
                        className="btn-ghost text-sm flex items-center gap-1 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        {documents.length > 0 && (
          <div className="mt-8 text-center text-sm text-muted-foreground">
            Mostrando {filteredDocs.length} de {documents.length} documentos
          </div>
        )}
      </div>
    </div>
  );
};

export default Inbox;