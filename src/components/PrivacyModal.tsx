import { X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacyModal = ({ isOpen, onClose }: PrivacyModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Política de Privacidad</DialogTitle>
          <DialogDescription className="text-base">
            Cómo protegemos y gestionamos tus datos personales
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 text-slate-700">
          <div>
            <h3 className="font-semibold text-lg mb-2">Recopilación de información</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Recopilamos información que nos proporcionas directamente, como cuando creas una cuenta, 
              subes documentos o te comunicas con nosotros. También recopilamos información automáticamente 
              sobre cómo utilizas nuestro servicio.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Uso de la información</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Utilizamos tu información para proporcionar, mantener y mejorar nuestros servicios, 
              procesar tus documentos, comunicarnos contigo y proteger nuestros servicios y usuarios.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Seguridad</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Implementamos medidas de seguridad técnicas y organizativas para proteger tus datos personales 
              contra el acceso no autorizado, la alteración, divulgación o destrucción.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Tus derechos</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Tienes derecho a acceder, rectificar, eliminar o portar tus datos personales, 
              así como a oponerte o limitar ciertos tratamientos de datos.
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

export default PrivacyModal;

