import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, FileText, Calendar as CalendarIcon, Trash2, Eye, Share2, Mic, Square } from "lucide-react";
import { apiService } from "@/services/api";
import { useAuth } from "@/hooks/useAuth";

interface BackendDocument {
  id: number;
  filename: string;
  mime_type: string;
  byte_size: number;
  status: string;
  provider: string | null;
  invoice_number: string | null;
  currency: string | null;
  amount: number | null;
  issue_date: string | null;
  created_at: string;
  updated_at: string;
  ocr_text: string | null;
  extracted_data: any;
  tags?: string | null; // comma-separated from backend
}

const Inbox = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [documents, setDocuments] = useState<BackendDocument[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Todos");
  const [filteredDocs, setFilteredDocs] = useState<BackendDocument[]>([]);
  const [availableTags, setAvailableTags] = useState<{ tag: string; count: number }[]>([]);
  const [aiQuery, setAiQuery] = useState("");
  const [listening, setListening] = useState(false);

  const filters = ["Todos", ...availableTags.map(t => t.tag.charAt(0).toUpperCase() + t.tag.slice(1))];

  useEffect(() => {
    const fetchData = async () => {
      if (!isAuthenticated) return;
      
      // Fetch documents and tags in parallel for faster loading
      const [docsResp, tagsResp] = await Promise.all([
        apiService.getDocuments(1, 50, ""),
        apiService.getTags()
      ]);
      
      if (!docsResp.error && docsResp.data) {
        setDocuments((docsResp.data as any).documents || []);
      }
      
      if (!tagsResp.error && tagsResp.data) {
        setAvailableTags((tagsResp.data as any).tags || []);
      }
    };
    
    fetchData();
  }, [isAuthenticated]);

  useEffect(() => {
    let filtered = documents;

    // Apply filter
    if (selectedFilter !== "Todos") {
      filtered = filtered.filter(doc => {
        const tags = (doc.tags || "").toLowerCase().split(",").map(t => t.trim());
        const needle = selectedFilter.toLowerCase();
        // match normalized tags exactly (singular/plural flexible)
        const norm = (s: string) => s
          .toLowerCase()
          .normalize('NFD').replace(/\p{Diacritic}/gu, '')
          .replace(/[^a-z0-9\s]/g, '')
          .trim();
        const isMatch = (t: string) => {
          const nt = norm(t);
          const nn = norm(needle);
          if (nt === nn) return true;
          // pluralization: factura(s), nota(s), ticket(s), nomina(s)
          if (nt + 's' === nn) return true;
          if (nn + 's' === nt) return true;
          return false;
        };
        return tags.some(isMatch);
      });
    }

    // Search removed (AI input is the primary entry point)

    setFilteredDocs(filtered);
  }, [documents, searchQuery, selectedFilter]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getDocumentStyles = (doc: BackendDocument) => {
    const tags = (doc.tags || '').toLowerCase();
    if (doc.mime_type === 'application/pdf' || tags.includes('pdf')) {
      return { iconClass: 'text-purple-600', cardClass: 'border-purple-200 bg-purple-50/50' };
    }
    if (doc.mime_type?.startsWith('image/')) {
      return { iconClass: 'text-amber-600', cardClass: 'border-amber-200 bg-amber-50/50' }; // fotos amarillas
    }
    if (doc.mime_type?.startsWith('video/')) {
      return { iconClass: 'text-red-600', cardClass: 'border-red-200 bg-red-50/50' };
    }
    if (doc.mime_type?.includes('presentation') || doc.mime_type?.includes('powerpoint')) {
      return { iconClass: 'text-rose-600', cardClass: 'border-rose-200 bg-rose-50/50' };
    }
    if (doc.mime_type?.includes('spreadsheet') || doc.mime_type?.includes('excel')) {
      return { iconClass: 'text-emerald-600', cardClass: 'border-emerald-200 bg-emerald-50/50' };
    }
    if (doc.mime_type?.includes('word') || doc.mime_type?.includes('msword')) {
      return { iconClass: 'text-fuchsia-600', cardClass: 'border-fuchsia-200 bg-fuchsia-50/50' }; // word rosas
    }
    return { iconClass: 'text-blue-600', cardClass: 'border-blue-200 bg-blue-50/50' };
  };

  const shareDocument = (doc: BackendDocument) => {
    const url = `${window.location.origin}/app/document/${doc.id}`;
    const title = doc.filename;
    const text = `Te comparto este documento: ${doc.filename}`;
    if ((navigator as any).share) {
      (navigator as any).share({ title, text, url }).catch(() => {});
      return;
    }
    // fallbacks
    const mailto = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + '\n' + url)}`;
    window.open(mailto, '_blank');
  };

  const startVoice = () => {
    const SR: any = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SR) return;
    const r = new SR();
    r.lang = 'es-ES';
    r.interimResults = true;
    setListening(true);
    r.onresult = (e: any) => {
      const t = Array.from(e.results).map((res: any) => res[0].transcript).join(' ');
      setAiQuery(t);
    };
    r.onend = () => setListening(false);
    r.start();
  };

  const deleteDocument = async (id: number) => {
    try {
      const resp = await apiService.deleteDocument(String(id));
      if (!resp.error) {
        setDocuments(prev => prev.filter(d => d.id !== id));
      }
    } catch {}
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

        {/* AI Input */}
        <div className="mb-8 space-y-4">
          <div className="p-4 rounded-xl border bg-card">
            <div className="flex items-center gap-3">
              <Square className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Pregúntale a tu archivador</h3>
            </div>
            <div className="mt-3 flex items-center gap-2 flex-wrap">
              <input
                type="text"
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                placeholder="Ej.: ¿Cuánto he pagado este año en impuestos?"
                className="input-modern flex-1 min-w-[220px]"
              />
              <button
                onClick={startVoice}
                className={`btn-secondary p-2 ${listening ? 'opacity-80' : ''}`}
                title="Hablar"
              >
                <Mic className={`w-4 h-4 ${listening ? 'text-red-500' : ''}`} />
              </button>
              <button
                onClick={() => navigate(`/app/search?q=${encodeURIComponent(aiQuery)}`)}
                className="btn-hero px-3 py-2 text-sm"
              >
                Buscar
              </button>
            </div>
          </div>

          {/* Filtros */}

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
                title={filter !== 'Todos' ? `${availableTags.find(t => t.tag.toLowerCase() === filter.toLowerCase())?.count || 0} documentos` : ''}
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
                className={`card-soft hover:shadow-medium transition-all duration-200 scale-in border ${getDocumentStyles(doc).cardClass}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  {/* Document Icon */}
                  <div className="flex-shrink-0 mt-1">
                    <FileText className={`w-5 h-5 ${getDocumentStyles(doc).iconClass}`} />
                  </div>

                  {/* Document Info */}
                  <div className="flex-grow min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-semibold text-foreground truncate">
                        {doc.filename}
                      </h3>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <CalendarIcon className="w-4 h-4" />
                          {formatDate(doc.created_at)}
                        </span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {(doc.tags || '').split(',').filter(Boolean).map((tag, tagIndex) => (
                        <button
                          type="button"
                          onClick={() => setSelectedFilter(tag.charAt(0).toUpperCase() + tag.slice(1))}
                          key={tagIndex}
                          className={`tag text-xs cursor-pointer ${
                            tag.toLowerCase().includes('factura') ? 'tag-factura' :
                            tag.toLowerCase().includes('ticket') ? 'tag-ticket' : 'tag-nota'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>

                    {/* Excerpt removed intentionally */}

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
                        onClick={() => shareDocument(doc)}
                        className="btn-ghost text-sm flex items-center gap-1"
                      >
                        <Share2 className="w-4 h-4" />
                        Compartir
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