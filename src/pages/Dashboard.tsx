import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Upload, FileText, Clock, Plus, Folder, FileUp, FolderPlus, Sparkles } from "lucide-react";
import { apiService } from "@/services/api";
import { useAuth } from "@/hooks/useAuth";
import FloatingActionButton from "@/components/FloatingActionButton";

interface Document {
  id: number;
  filename: string;
  mime_type: string;
  created_at: string;
  updated_at: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [recentDocuments, setRecentDocuments] = useState<Document[]>([]);
  const [showUploadCard, setShowUploadCard] = useState(true);

  useEffect(() => {
    const fetchRecentDocuments = async () => {
      try {
        const response = await apiService.getDocuments(1, 5, "");
        if (!response.error && response.data) {
          const docs = (response.data as any).documents || [];
          setRecentDocuments(docs);
          // Ocultar la tarjeta de upload si hay más de 10 documentos
          setShowUploadCard(docs.length < 10);
        }
      } catch (error) {
        console.error('Error fetching documents:', error);
        // No mostrar error, solo dejar vacío
        setRecentDocuments([]);
      }
    };
    fetchRecentDocuments();
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/app/ia?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Bloc superior - Bienvenida */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              {user?.avatarUrl ? (
                <img 
                  src={user.avatarUrl} 
                  alt={user?.name || user?.email || "Usuario"} 
                  className="w-12 h-12 rounded-full border-2 border-primary/20"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20">
                  <span className="text-primary font-bold text-lg">
                    {user ? (user.name || user.email || "U")[0].toUpperCase() : "U"}
                  </span>
                </div>
              )}
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  Bienvenido{user ? `, ${user.name || user.email?.split("@")[0] || "Usuario"}` : ""}
                </h1>
                <p className="text-slate-600 mt-1">Organiza tus documentos con inteligencia artificial</p>
              </div>
            </div>
          </div>

          {/* Barra de búsqueda grande */}
          <div className="relative max-w-3xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Pregunta lo que quieras… la IA lo encuentra."
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-lg shadow-sm hover:shadow-md transition-all"
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-md hover:shadow-lg"
            >
              Buscar
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Columna principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tarjeta de upload (solo para nuevos usuarios) */}
            {showUploadCard && (
              <div 
                onClick={() => navigate("/app/archivos")}
                className="bg-gradient-to-br from-primary/10 via-primary/5 to-blue-50 border-2 border-dashed border-primary/30 rounded-3xl p-12 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/10 transition-all group"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Upload className="w-10 h-10 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Subir archivo</h3>
                    <p className="text-slate-600 text-lg">Sube fotos, PDFs o documentos.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Actividad reciente */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Actividad reciente
                </h2>
                <button
                  onClick={() => navigate("/app/archivos")}
                  className="text-primary hover:text-primary/80 font-medium text-sm"
                >
                  Ver todos
                </button>
              </div>

              {recentDocuments.length > 0 ? (
                <div className="space-y-3">
                  {recentDocuments.map((doc) => (
                    <div
                      key={doc.id}
                      onClick={() => navigate(`/app/document/${doc.id}`)}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-slate-900 truncate">{doc.filename}</p>
                        <p className="text-sm text-slate-500">
                          {new Date(doc.updated_at).toLocaleDateString("es-ES", {
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit"
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500">
                  <FileText className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                  <p>No hay documentos recientes</p>
                </div>
              )}
            </div>
          </div>

          {/* Columna lateral - Accesos rápidos */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Accesos rápidos</h3>
              <div className="space-y-2">
                <button
                  onClick={() => navigate("/app/archivos")}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-left transition-colors"
                >
                  <Folder className="w-5 h-5 text-primary" />
                  <span className="text-slate-700">Mis archivos</span>
                </button>
                <button
                  onClick={() => navigate("/app/ia")}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-left transition-colors"
                >
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span className="text-slate-700">IA</span>
                </button>
                <button
                  onClick={() => navigate("/app/compartidos")}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-left transition-colors"
                >
                  <FileText className="w-5 h-5 text-primary" />
                  <span className="text-slate-700">Compartidos</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Botón flotante "+" */}
      <FloatingActionButton />
    </div>
  );
};

export default Dashboard;

