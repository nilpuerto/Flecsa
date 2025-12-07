import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsModal = ({ isOpen, onClose }: TermsModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Términos y Condiciones</DialogTitle>
          <DialogDescription className="text-base">
            Condiciones de uso del servicio Flecsa
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 text-slate-700">
          <div>
            <h3 className="font-semibold text-lg mb-2">Aceptación de términos</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Al acceder y utilizar Flecsa, aceptas cumplir con estos términos y condiciones. 
              Si no estás de acuerdo con alguna parte de estos términos, no debes utilizar nuestro servicio.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Uso del servicio</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Flecsa te permite organizar y gestionar tus documentos mediante inteligencia artificial. 
              Eres responsable de mantener la confidencialidad de tu cuenta y de todas las actividades 
              que ocurran bajo tu cuenta.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Contenido del usuario</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Conservas todos los derechos sobre tus documentos. Al utilizar nuestro servicio, 
              nos otorgas una licencia limitada para procesar tus documentos únicamente para proporcionar 
              el servicio.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Limitación de responsabilidad</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Flecsa se proporciona "tal cual" sin garantías de ningún tipo. No seremos responsables 
              de ningún daño indirecto, incidental o consecuente derivado del uso de nuestro servicio.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-200">
            <Button onClick={onClose} className="w-full rounded-full bg-primary text-white hover:bg-primary/90" variant="default">
              Cerrar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TermsModal;

