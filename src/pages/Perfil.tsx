import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { 
  User, CreditCard, Bell, Palette, Globe, Download, 
  Shield, LogOut, Moon, Sun, Settings
} from "lucide-react";
import FloatingActionButton from "@/components/FloatingActionButton";

const Perfil = () => {
  const { user, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(false);

  const sections = [
    {
      title: "Perfil",
      icon: User,
      items: [
        { label: "Nombre", value: user?.name || "No especificado" },
        { label: "Email", value: user?.email || "" },
        { label: "Plan", value: user?.subscriptionPlan === "free" ? "Gratuito" : "Premium" }
      ]
    },
    {
      title: "Suscripción y Créditos",
      icon: CreditCard,
      items: [
        { label: "Plan actual", value: user?.subscriptionPlan === "free" ? "Gratuito" : "Premium" },
        { label: "Almacenamiento usado", value: `${((user?.storageUsed || 0) / (1024 * 1024 * 1024)).toFixed(2)} GB` },
        { label: "Almacenamiento total", value: `${((user?.storageLimit || 0) / (1024 * 1024 * 1024)).toFixed(2)} GB` }
      ]
    },
    {
      title: "Notificaciones",
      icon: Bell,
      items: [
        { label: "Email", value: "Activado", type: "toggle" },
        { label: "Push", value: "Desactivado", type: "toggle" }
      ]
    },
    {
      title: "Apariencia",
      icon: Palette,
      items: [
        { label: "Modo oscuro", value: darkMode ? "Activado" : "Desactivado", type: "toggle", action: () => setDarkMode(!darkMode) }
      ]
    },
    {
      title: "Idioma",
      icon: Globe,
      items: [
        { label: "Idioma", value: "Español", type: "select" }
      ]
    },
    {
      title: "Exportar datos",
      icon: Download,
      items: [
        { label: "Descargar mis datos", value: "Exportar", type: "button" }
      ]
    },
    {
      title: "Seguridad y sesiones",
      icon: Shield,
      items: [
        { label: "Cambiar contraseña", value: "Cambiar", type: "button" },
        { label: "Sesiones activas", value: "Ver todas", type: "button" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            {user?.avatarUrl ? (
              <img 
                src={user.avatarUrl} 
                alt={user.name || user.email} 
                className="w-20 h-20 rounded-full border-4 border-primary/20"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center border-4 border-primary/20">
                <span className="text-primary font-bold text-3xl">
                  {(user?.name || user?.email || "U")[0].toUpperCase()}
                </span>
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                {user?.name || user?.email?.split("@")[0] || "Usuario"}
              </h1>
              <p className="text-slate-600">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Secciones */}
        <div className="space-y-6">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <div key={section.title} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">{section.title}</h2>
                </div>
                
                <div className="space-y-4">
                  {section.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                      <div>
                        <p className="font-medium text-slate-900">{item.label}</p>
                        {item.type !== "toggle" && item.type !== "button" && (
                          <p className="text-sm text-slate-500 mt-1">{item.value}</p>
                        )}
                      </div>
                      {item.type === "toggle" && (
                        <button
                          onClick={item.action}
                          className={`relative w-12 h-6 rounded-full transition-colors ${
                            item.value.includes("Activado") || darkMode ? "bg-primary" : "bg-slate-300"
                          }`}
                        >
                          <div
                            className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                              item.value.includes("Activado") || darkMode ? "translate-x-6" : "translate-x-0"
                            }`}
                          />
                        </button>
                      )}
                      {item.type === "button" && (
                        <button className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm transition-colors">
                          {item.value}
                        </button>
                      )}
                      {item.type === "select" && (
                        <select className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-700">
                          <option>Español</option>
                          <option>English</option>
                          <option>Català</option>
                        </select>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Cerrar sesión */}
          <div className="bg-white rounded-2xl border border-red-200 shadow-sm p-6">
            <button
              onClick={logout}
              className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-semibold transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>

      <FloatingActionButton />
    </div>
  );
};

export default Perfil;



