import { useState, useRef, useEffect } from "react";
import { Sparkles, X, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { apiService } from "@/services/api";

interface CreditsDisplayProps {
  credits: { used: number; limit: number } | null;
  onCreditsUpdate?: () => void;
}

const CreditsDisplay = ({ credits, onCreditsUpdate }: CreditsDisplayProps) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [creditValue, setCreditValue] = useState(1200);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const creditPrice = (creditValue * 0.013).toFixed(2); // 50 créditos = 0.65€

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

  const handlePurchase = async () => {
    setIsPurchasing(true);
    try {
      // Create Stripe checkout session
      const response = await apiService.createCheckoutSession({
        type: 'credits',
        amount: creditValue,
        price: Number(creditPrice)
      });
      
      if (!response.error && response.data) {
        // Redirect to Stripe checkout
        const { url } = response.data as { url: string };
        window.location.href = url;
      } else {
        console.error('Error creating checkout session:', response.error);
        alert('Error al procesar el pago. Por favor, intenta de nuevo.');
        setIsPurchasing(false);
      }
    } catch (error) {
      console.error('Purchase error:', error);
      alert('Error al procesar el pago. Por favor, intenta de nuevo.');
      setIsPurchasing(false);
    }
  };
  
  const handleViewPlans = () => {
    setIsOpen(false);
    // Navigate to plans page
    window.location.href = '/app/planes';
  };

  if (!credits) return null;

  const remaining = credits.limit - credits.used;
  const percentage = (credits.used / credits.limit) * 100;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 rounded-full bg-slate-100 border border-slate-200 hover:bg-slate-200 transition-colors"
      >
        <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
        <span className="text-xs md:text-sm font-medium text-slate-700">
          {remaining} / {credits.limit}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-[calc(100vw-2rem)] md:w-96 max-w-sm bg-white border border-slate-200 rounded-xl shadow-xl z-50">
          <div className="p-4 md:p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h3 className="text-base md:text-lg font-semibold text-slate-900">Créditos IA</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-4 h-4 text-slate-600" />
              </button>
            </div>

            {/* Credits Usage */}
            <div className="mb-4 md:mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs md:text-sm text-slate-600">Créditos restantes</span>
                <span className="text-xs md:text-sm font-medium text-slate-900">
                  {remaining} / {credits.limit}
                </span>
              </div>
              <div className="w-full h-1.5 md:h-2 rounded-full overflow-hidden flex">
                {/* Used credits - Gray (left side) */}
                <div
                  className="h-full bg-slate-400 transition-all"
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                ></div>
                {/* Remaining credits - Blue (right side) */}
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${Math.min((remaining / credits.limit) * 100, 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Calculator */}
            <div className="border-t border-slate-200 pt-4 md:pt-6">
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <h4 className="text-xs md:text-sm font-semibold text-slate-900">Comprar créditos</h4>
                <div className="text-right">
                  <p className="text-[10px] md:text-xs text-slate-500">Precio estimado</p>
                  <p className="text-lg md:text-2xl font-bold text-slate-900">
                    {Number(creditPrice).toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
                  </p>
                </div>
              </div>

              <div className="space-y-3 md:space-y-4">
                <input
                  type="range"
                  min={50}
                  max={10000}
                  step={50}
                  value={creditValue}
                  onChange={(e) => setCreditValue(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex items-center justify-between text-xs md:text-sm text-slate-500">
                  <span>50</span>
                  <span className="text-slate-900 font-semibold">
                    {creditValue.toLocaleString('es-ES')} créditos
                  </span>
                  <span>10.000</span>
                </div>

                <button
                  onClick={handlePurchase}
                  disabled={isPurchasing}
                  className="w-full flex items-center justify-center gap-2 px-3 md:px-4 py-2 md:py-3 text-sm md:text-base bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
                >
                  <ShoppingCart className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  {isPurchasing ? 'Procesando...' : 'Comprar créditos'}
                </button>
              </div>
            </div>

            {/* Link to Plans */}
            <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-slate-200">
              <button
                onClick={handleViewPlans}
                className="w-full text-center text-xs md:text-sm text-primary hover:text-primary/80 font-medium"
              >
                Ver planes de suscripción →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreditsDisplay;

