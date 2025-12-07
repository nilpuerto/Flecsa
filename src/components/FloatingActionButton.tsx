import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Plus, Upload, FolderPlus, FileUp, Sparkles, X } from "lucide-react";

const FloatingActionButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // No mostrar en el visor de PDFs
  if (location.pathname.includes("/document/")) {
    return null;
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const actions = [
    {
      icon: FileUp,
      label: "Subir archivo",
      onClick: () => {
        navigate("/app/archivos?action=upload");
        setIsOpen(false);
      },
      color: "text-blue-600"
    },
    {
      icon: FolderPlus,
      label: "Crear carpeta",
      onClick: () => {
        navigate("/app/archivos?action=create-folder");
        setIsOpen(false);
      },
      color: "text-purple-600"
    },
    {
      icon: Upload,
      label: "Subir carpeta",
      onClick: () => {
        navigate("/app/archivos?action=upload-folder");
        setIsOpen(false);
      },
      color: "text-green-600"
    },
    {
      icon: Sparkles,
      label: "Importar con IA",
      onClick: () => {
        navigate("/app/ia?action=import");
        setIsOpen(false);
      },
      color: "text-primary"
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50" ref={menuRef}>
      {/* Menu de acciones */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 mb-2 space-y-2 animate-in fade-in slide-in-from-bottom-4">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                onClick={action.onClick}
                className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-lg border border-slate-200 hover:shadow-xl transition-all min-w-[180px] group animate-in fade-in slide-in-from-right"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Icon className={`w-5 h-5 ${action.color} group-hover:scale-110 transition-transform`} />
                <span className="text-slate-700 font-medium">{action.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Botón principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full bg-primary text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center ${
          isOpen ? "rotate-45" : "rotate-0"
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Plus className="w-6 h-6" />
        )}
      </button>
    </div>
  );
};

export default FloatingActionButton;

