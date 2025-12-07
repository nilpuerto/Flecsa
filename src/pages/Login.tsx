import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, Sparkles, Shield, Zap } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isGoogleAvailable, setIsGoogleAvailable] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/auth/google/login?redirect_uri=${encodeURIComponent(window.location.origin + "/app")}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => setIsGoogleAvailable(res.ok))
      .catch(() => setIsGoogleAvailable(false));
  }, []);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError("");

    try {
      const redirectUri = `${window.location.origin}/app`;
      const response = await fetch(
        `${API_BASE_URL}/auth/google/login?redirect_uri=${encodeURIComponent(redirectUri)}`,
        { method: "GET", headers: { "Content-Type": "application/json" } }
      );
      const data = await response.json();

      if (!response.ok) {
        if (response.status === 503 || data.error?.includes("no está configurado")) {
          setIsGoogleAvailable(false);
          setIsLoading(false);
          setError("Google OAuth no está disponible en este momento");
          return;
        }
        throw new Error(data.error || "Error obteniendo URL de Google");
      }

      window.location.href = data.authUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error con Google OAuth");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Section - Login Form */}
      <div className="flex-1 flex flex-col p-8 sm:p-12 lg:p-16">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors mb-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </button>

        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-md w-full space-y-8">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="font-bold text-lg text-white">F</span>
              </div>
              <span className="text-2xl font-bold text-slate-900">Flecsa</span>
            </div>

            {/* Slogan */}
            <h1 className="text-4xl sm:text-5xl font-semibold leading-tight text-slate-900">
              Un lugar para todos tus documentos
            </h1>

            {/* Error Message */}
            {error && (
              <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Google Login Button */}
            {isGoogleAvailable ? (
              <button
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full rounded-xl border-2 border-slate-300 py-3.5 px-6 flex items-center justify-center gap-3 text-slate-700 hover:border-slate-400 hover:bg-slate-50 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="font-medium">Conectando...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    <span className="font-medium">Log in with Google</span>
                  </>
                )}
              </button>
            ) : (
              <div className="text-center space-y-4">
                <p className="text-slate-500">Google OAuth no está disponible en este momento.</p>
                <button
                  onClick={() => navigate("/")}
                  className="text-primary hover:text-primary/80 transition-colors text-sm font-medium"
                >
                  Volver al inicio
                </button>
              </div>
            )}

            {/* Learn More Link */}
            <div className="pt-4">
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors"
              >
                <span>Saber más</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Decorative Art */}
      <div className="hidden lg:flex flex-[2.5] bg-[#eef5ff] items-center justify-center p-12 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#eef5ff] via-[#dbe9ff] to-[#c7e2ff]" />
        
        {/* Decorative SVG Art - Documents & AI Organization */}
        <svg
          className="w-full h-full max-w-2xl relative z-10"
          viewBox="0 0 600 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Central document/folder icon */}
          <g opacity="0.85">
            {/* Folder shape */}
            <path
              d="M200 250 L200 450 L400 450 L400 280 L320 280 L300 250 Z"
              stroke="white"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Document lines inside folder */}
            <line x1="240" y1="320" x2="360" y2="320" stroke="white" strokeWidth="2.5" />
            <line x1="240" y1="350" x2="360" y2="350" stroke="white" strokeWidth="2.5" />
            <line x1="240" y1="380" x2="320" y2="380" stroke="white" strokeWidth="2.5" />
          </g>

          {/* Connected documents/cards */}
          <g opacity="0.5">
            {/* Top left card */}
            <rect x="80" y="120" width="100" height="80" rx="8" stroke="white" strokeWidth="2.5" fill="none" />
            <line x1="180" y1="160" x2="240" y2="280" stroke="white" strokeWidth="2" strokeDasharray="4 4" />
            
            {/* Top right card */}
            <rect x="420" y="140" width="100" height="80" rx="8" stroke="white" strokeWidth="2.5" fill="none" />
            <line x1="420" y1="180" x2="360" y2="280" stroke="white" strokeWidth="2" strokeDasharray="4 4" />
            
            {/* Bottom left card */}
            <rect x="100" y="420" width="100" height="80" rx="8" stroke="white" strokeWidth="2.5" fill="none" />
            <line x1="200" y1="420" x2="240" y2="450" stroke="white" strokeWidth="2" strokeDasharray="4 4" />
            
            {/* Bottom right card */}
            <rect x="400" y="400" width="100" height="80" rx="8" stroke="white" strokeWidth="2.5" fill="none" />
            <line x1="400" y1="440" x2="360" y2="450" stroke="white" strokeWidth="2" strokeDasharray="4 4" />
          </g>

          {/* AI/Sparkle elements */}
          <g opacity="0.5">
            <circle cx="150" cy="200" r="4" fill="white" />
            <circle cx="450" cy="220" r="4" fill="white" />
            <circle cx="120" cy="460" r="4" fill="white" />
            <circle cx="480" cy="440" r="4" fill="white" />
            
            {/* Sparkle lines */}
            <line x1="150" y1="200" x2="160" y2="190" stroke="white" strokeWidth="1.5" />
            <line x1="150" y1="200" x2="160" y2="210" stroke="white" strokeWidth="1.5" />
            <line x1="150" y1="200" x2="140" y2="190" stroke="white" strokeWidth="1.5" />
            <line x1="150" y1="200" x2="140" y2="210" stroke="white" strokeWidth="1.5" />
          </g>

          {/* Connecting lines/flow */}
          <g opacity="0.4">
            <path
              d="M300 200 Q 250 180, 200 200 Q 150 220, 100 240"
              stroke="white"
              strokeWidth="2"
              fill="none"
              strokeDasharray="6 6"
            />
            <path
              d="M300 200 Q 350 180, 400 200 Q 450 220, 500 240"
              stroke="white"
              strokeWidth="2"
              fill="none"
              strokeDasharray="6 6"
            />
          </g>
        </svg>

        {/* Small Flecsa logo in corner */}
        <div className="absolute bottom-8 right-8 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <span className="font-bold text-sm text-primary">F</span>
          </div>
          <span className="text-sm font-semibold text-primary/60">Flecsa</span>
        </div>
      </div>
    </div>
  );
};

export default Login;

