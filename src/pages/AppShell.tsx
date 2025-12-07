import { Outlet, Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Sparkles, Cloud, User, Settings, LogOut, ChevronDown, Menu, X, Search, PanelLeftClose, PanelRightOpen, Mic } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { apiService } from "@/services/api";
import CreditsDisplay from "@/components/CreditsDisplay";

const AppShell = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { user, logout, isAuthenticated, isLoading, login } = useAuth();
  const [isProcessingOAuth, setIsProcessingOAuth] = useState(false);
  const [aiCredits, setAiCredits] = useState<{ used: number; limit: number } | null>(null);
  
  // Cerrar menús al hacer clic fuera - MUST be before any conditional returns
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Fetch user credits
  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const response = await apiService.getUserProfile();
        if (!response.error && response.data) {
          const userData = (response.data as any).user;
          setAiCredits({
            used: userData.aiCreditsUsed || 0,
            limit: userData.aiCreditsLimit || 100
          });
        }
      } catch (error) {
        console.error('Error fetching credits:', error);
      }
    };
    
    if (isAuthenticated) {
      fetchCredits();
    }
  }, [isAuthenticated]);

  // Handle Google OAuth callback when tokens are in URL - MUST be before auth check
  useEffect(() => {
    const token = searchParams.get('token');
    const refreshToken = searchParams.get('refreshToken');
    const userData = searchParams.get('user');

    if (token && refreshToken && userData && !isProcessingOAuth) {
      setIsProcessingOAuth(true);
      try {
        // Clear old tokens first to avoid conflicts
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        
        const parsedUser = JSON.parse(decodeURIComponent(userData));
        console.log('Processing OAuth callback, user:', parsedUser);
        login(parsedUser, token, refreshToken);
        
        // Clean URL parameters after a short delay to ensure state is updated
        setTimeout(() => {
          navigate(location.pathname, { replace: true });
          setIsProcessingOAuth(false);
        }, 100);
      } catch (error) {
        console.error('Error processing Google OAuth callback:', error);
        setIsProcessingOAuth(false);
      }
    }
  }, [searchParams, login, navigate, location.pathname, isProcessingOAuth]);

  // Cerrar menús al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    if (isUserMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isUserMenuOpen]);

  // Show loading while processing OAuth or initial auth check
  if (isLoading || isProcessingOAuth || (searchParams.get('token') && !isAuthenticated)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Procesando autenticación...</p>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated (but only after processing OAuth params)
  if (!isAuthenticated) {
    window.location.href = '/';
    return null;
  }

  const isAISection = location.pathname.startsWith('/app/ia') || location.pathname === '/app' || location.pathname === '/app/';
  const isCloudSection = location.pathname.startsWith('/app/archivos') || location.pathname.startsWith('/app/document');

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Navbar - Simple with logo, name, credits, and user menu */}
      <nav className="h-12 md:h-14 border-b border-primary/20 bg-[#eef5ff] flex items-center justify-between px-3 md:px-4 z-50">
        <div className="flex items-center gap-4">
          {/* Logo and Name */}
          <Link to="/app" className="flex items-center space-x-2 md:space-x-2.5">
            <div className="w-7 h-7 md:w-8 md:h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs md:text-sm">F</span>
            </div>
            <span className="text-lg md:text-xl font-bold text-slate-900">Flecsa</span>
          </Link>
        </div>

        {/* User Menu with Credits */}
        <div className="flex items-center gap-3">
          {/* Credits Display */}
          <CreditsDisplay 
            credits={aiCredits} 
            onCreditsUpdate={() => {
              // Refetch credits
              apiService.getUserProfile().then(response => {
                if (!response.error && response.data) {
                  const userData = (response.data as any).user;
                  setAiCredits({
                    used: userData.aiCreditsUsed || 0,
                    limit: userData.aiCreditsLimit || 100
                  });
                }
              });
            }}
          />
          
          <div className="relative" ref={userMenuRef}>
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                >
              <span className="text-sm font-medium text-slate-700">{user?.name || user?.email}</span>
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center overflow-hidden">
                    {user?.avatarUrl ? (
                      <img 
                        src={user.avatarUrl} 
                        alt={user.name || user.email}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                  <User className="w-4 h-4 text-primary" />
                    )}
                  </div>
              <ChevronDown className="w-4 h-4 text-slate-600" />
                </button>
                
                {isUserMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-slate-200 rounded-lg shadow-lg z-50">
                    <div className="py-2">
                  <div className="px-4 py-2 border-b border-slate-200">
                    <p className="text-sm font-medium text-slate-900">
                          {user?.name || 'Mi cuenta'}
                        </p>
                    <p className="text-xs text-slate-500">{user?.email}</p>
                      </div>
                  <Link
                    to="/app/perfil"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    <span>Perfil</span>
                  </Link>
                  <Link
                    to="/app/perfil"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                        <Settings className="w-4 h-4" />
                        <span>Configuración</span>
                  </Link>
                  <div className="border-t border-slate-200 mt-2 pt-2">
                        <button 
                          onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-50 flex items-center gap-2"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Cerrar sesión</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
        </div>
      </nav>
              
      {/* Main Layout with Sidebar */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar - ChatGPT style - Narrow with collapse */}
        <aside className={`${isSidebarCollapsed ? 'w-0 overflow-hidden' : 'w-16'} border-r border-primary/20 bg-[#eef5ff] flex flex-col transition-all duration-300 relative`}>
          {/* Sidebar Navigation */}
          <div className="flex-1 py-2 md:py-4 overflow-y-auto">
            <nav className="space-y-1 px-2">
              {/* Zerlo AI Section */}
              <Link
                to="/app/ia"
                className={`flex flex-col items-center gap-1 md:gap-1.5 px-2 py-2 md:py-3 rounded-lg transition-colors ${
                  isAISection
                    ? "bg-primary/10 text-primary"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
                title="Zerlo AI"
              >
                <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
              </Link>

              {/* Nube Section */}
              <Link
                to="/app/archivos"
                className={`flex flex-col items-center gap-1 md:gap-1.5 px-2 py-2 md:py-3 rounded-lg transition-colors ${
                  isCloudSection
                    ? "bg-primary/10 text-primary"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
                title="Nube"
              >
                <Cloud className="w-4 h-4 md:w-5 md:h-5" />
              </Link>
            </nav>
          </div>
        </aside>
        
        {/* Collapse Button - Fixed position, same place always, always visible */}
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="fixed z-[100] text-slate-600 hover:text-slate-700 transition-colors bg-[#eef5ff] hover:bg-[#dbe9ff] rounded-r-lg shadow-sm"
          title={isSidebarCollapsed ? "Expandir" : "Colapsar"}
          style={{ 
            bottom: '2rem',
            left: isSidebarCollapsed ? '0' : '4rem', // Always at main sidebar edge
            padding: '0.5rem',
            width: '2.5rem',
            height: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'left 0.3s ease'
          }}
        >
          {isSidebarCollapsed ? (
            <PanelRightOpen className="w-4 h-4 md:w-5 md:h-5" />
          ) : (
            <PanelLeftClose className="w-4 h-4 md:w-5 md:h-5" />
          )}
        </button>

        {/* Secondary Sidebar - Sub-navigation for AI - Hidden when collapsed */}
        {isAISection && !isSidebarCollapsed && (
          <aside className="w-52 md:w-56 border-r border-primary/20 bg-[#f5f9ff] flex flex-col">
            <div className="flex-1 py-2 md:py-4 overflow-y-auto">
              <nav className="space-y-1 px-2 md:px-3">
                <div className="px-2 md:px-3 py-1 md:py-2 mb-1 md:mb-2">
                  <h2 className="text-[10px] md:text-xs font-semibold text-slate-500 uppercase tracking-wider">Zerlo AI</h2>
                </div>
                <Link
                  to="/app/ia/ask"
                  className={`flex items-center gap-2 md:gap-3 px-2 md:px-3 py-1.5 md:py-2 rounded-lg text-xs md:text-sm transition-colors ${
                    location.pathname.includes('/ask') || location.pathname === '/app/ia' || location.pathname === '/app' || location.pathname === '/app/'
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <Mic className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" />
                  <span>Preguntar IA</span>
                </Link>
              </nav>
            </div>
          </aside>
        )}


        {/* Main Content Area - Click to collapse sidebar on mobile */}
        <main 
          className="flex-1 overflow-y-auto bg-[#f8fbff] min-w-0"
          onClick={(e) => {
            // On mobile, collapse sidebar when clicking main content (but not on interactive elements)
            const target = e.target as HTMLElement;
            if (
              window.innerWidth < 768 && 
              !isSidebarCollapsed &&
              !target.closest('button') &&
              !target.closest('a') &&
              !target.closest('input') &&
              !target.closest('textarea') &&
              !target.closest('select')
            ) {
              setIsSidebarCollapsed(true);
            }
          }}
        >
          <Outlet context={{ isSidebarCollapsed }} />
        </main>
      </div>
    </div>
  );
};

export default AppShell;
