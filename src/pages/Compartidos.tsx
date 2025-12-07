import { useState, useEffect } from "react";
import { FileText, Share2, User, Clock, Download, Eye, MoreVertical } from "lucide-react";
import FloatingActionButton from "@/components/FloatingActionButton";

interface SharedDocument {
  id: number;
  filename: string;
  sharedBy: string;
  sharedAt: string;
  type: "shared-with-me" | "shared-by-me";
}

const Compartidos = () => {
  const [sharedWithMe, setSharedWithMe] = useState<SharedDocument[]>([]);
  const [sharedByMe, setSharedByMe] = useState<SharedDocument[]>([]);
  const [activeTab, setActiveTab] = useState<"with-me" | "by-me">("with-me");

  // TODO: Implementar fetch de documentos compartidos desde API
  useEffect(() => {
    // Placeholder data
    setSharedWithMe([
      {
        id: 1,
        filename: "Factura_2024.pdf",
        sharedBy: "Juan Pérez",
        sharedAt: "2024-01-15",
        type: "shared-with-me"
      }
    ]);
    setSharedByMe([
      {
        id: 2,
        filename: "Contrato_servicios.pdf",
        sharedBy: "Tú",
        sharedAt: "2024-01-10",
        type: "shared-by-me"
      }
    ]);
  }, []);

  const currentDocuments = activeTab === "with-me" ? sharedWithMe : sharedByMe;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Compartidos</h1>
          <p className="text-slate-600">Documentos compartidos contigo y que has compartido</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-slate-200">
          <button
            onClick={() => setActiveTab("with-me")}
            className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
              activeTab === "with-me"
                ? "border-primary text-primary"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            Compartidos conmigo
          </button>
          <button
            onClick={() => setActiveTab("by-me")}
            className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
              activeTab === "by-me"
                ? "border-primary text-primary"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            Compartidos por mí
          </button>
        </div>

        {/* Lista de documentos */}
        {currentDocuments.length > 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="divide-y divide-slate-200">
              {currentDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="p-4 hover:bg-slate-50 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 truncate">{doc.filename}</p>
                      <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{doc.sharedBy}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>
                            {new Date(doc.sharedAt).toLocaleDateString("es-ES", {
                              day: "numeric",
                              month: "short",
                              year: "numeric"
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 rounded-lg hover:bg-slate-100">
                        <Eye className="w-4 h-4 text-slate-600" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-slate-100">
                        <Download className="w-4 h-4 text-slate-600" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-slate-100">
                        <MoreVertical className="w-4 h-4 text-slate-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
            <Share2 className="w-16 h-16 mx-auto mb-4 text-slate-300" />
            <p className="text-slate-600 mb-2">
              {activeTab === "with-me" 
                ? "No hay documentos compartidos contigo" 
                : "No has compartido ningún documento"}
            </p>
            <p className="text-sm text-slate-500">
              {activeTab === "with-me"
                ? "Los documentos que otros compartan contigo aparecerán aquí"
                : "Comparte documentos desde la vista de archivos"}
            </p>
          </div>
        )}
      </div>

      <FloatingActionButton />
    </div>
  );
};

export default Compartidos;



