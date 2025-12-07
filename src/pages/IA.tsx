import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Send, Mic, Sparkles, FileText, Copy, Download, Star } from "lucide-react";
import { apiService } from "@/services/api";
import FloatingActionButton from "@/components/FloatingActionButton";

interface AIResponse {
  query: string;
  answer: string;
  documents: Array<{ id: number; filename: string }>;
  timestamp: string;
}

const IA = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [responses, setResponses] = useState<AIResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    const initialQuery = searchParams.get("q");
    if (initialQuery) {
      setQuery(initialQuery);
      handleSearch(initialQuery);
    }
  }, [searchParams]);

  const handleSearch = async (searchQuery?: string) => {
    const queryText = searchQuery || query;
    if (!queryText.trim()) return;

    setIsLoading(true);
    try {
      const response = await apiService.smartSearch(queryText, 20, 0);
      if (!response.error && response.data) {
        const data = response.data as any;
        setResponses([
          {
            query: queryText,
            answer: data.summary || "He encontrado los siguientes documentos relacionados con tu búsqueda.",
            documents: data.documents || [],
            timestamp: new Date().toISOString()
          },
          ...responses
        ]);
        setQuery("");
      }
    } catch (error) {
      console.error("Error en búsqueda IA:", error);
    }
    setIsLoading(false);
  };

  const handleVoiceInput = () => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.lang = "es-ES";
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setListening(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setListening(false);
      };
      recognition.onerror = () => setListening(false);
      recognition.onend = () => setListening(false);

      recognition.start();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-primary font-semibold">Inbox Inteligente</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Pregunta lo que quieras</h1>
          <p className="text-slate-600">La IA encuentra y organiza tus documentos automáticamente</p>
        </div>

        {/* Cuadro de búsqueda grande */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 mb-8">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSearch();
                  }
                }}
                placeholder="Ejemplo: ¿Cuánto gasté en gasolina el mes pasado?"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none min-h-[100px]"
                rows={3}
              />
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleSearch()}
                disabled={isLoading || !query.trim()}
                className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Send className="w-5 h-5" />
                )}
                Enviar
              </button>
              <button
                onClick={handleVoiceInput}
                className={`p-3 rounded-xl border-2 transition-all ${
                  listening 
                    ? "border-red-500 bg-red-50 text-red-600" 
                    : "border-slate-200 hover:border-primary hover:bg-primary/5"
                }`}
              >
                <Mic className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Respuestas */}
        <div className="space-y-6">
          {responses.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
              <Sparkles className="w-16 h-16 mx-auto mb-4 text-slate-300" />
              <p className="text-slate-600 mb-2">Haz una pregunta para comenzar</p>
              <p className="text-sm text-slate-500">La IA buscará en todos tus documentos</p>
            </div>
          ) : (
            responses.map((response, index) => (
              <div key={index} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-500 mb-2">{response.query}</p>
                    <p className="text-slate-900 leading-relaxed">{response.answer}</p>
                  </div>
                </div>

                {/* Documentos encontrados */}
                {response.documents.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <p className="text-sm font-semibold text-slate-700 mb-3">Documentos encontrados:</p>
                    <div className="space-y-2">
                      {response.documents.map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors"
                        >
                          <FileText className="w-5 h-5 text-primary" />
                          <span className="flex-1 text-sm text-slate-700">{doc.filename}</span>
                          <div className="flex gap-2">
                            <button className="p-1.5 rounded-lg hover:bg-slate-100">
                              <Eye className="w-4 h-4 text-slate-600" />
                            </button>
                            <button className="p-1.5 rounded-lg hover:bg-slate-100">
                              <Download className="w-4 h-4 text-slate-600" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Acciones */}
                <div className="mt-4 pt-4 border-t border-slate-200 flex gap-2">
                  <button className="px-4 py-2 rounded-lg hover:bg-slate-50 flex items-center gap-2 text-sm text-slate-700">
                    <Copy className="w-4 h-4" />
                    Copiar
                  </button>
                  <button className="px-4 py-2 rounded-lg hover:bg-slate-50 flex items-center gap-2 text-sm text-slate-700">
                    <Star className="w-4 h-4" />
                    Marcar importante
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <FloatingActionButton />
    </div>
  );
};

export default IA;



