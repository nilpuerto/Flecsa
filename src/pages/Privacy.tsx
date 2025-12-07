import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-12 sm:py-16 md:py-20 max-w-4xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 font-['Montserrat']">Política de Privacidad</h1>
        <p className="text-base text-slate-600 mb-8 font-['Montserrat']">
          Cómo protegemos y gestionamos tus datos personales
        </p>
        
        <div className="space-y-8 text-slate-700">
          <div>
            <h3 className="font-semibold text-xl mb-3 font-['Montserrat']">Recopilación de información</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-['Montserrat']">
              Recopilamos información que nos proporcionas directamente, como cuando creas una cuenta, 
              subes documentos o te comunicas con nosotros. También recopilamos información automáticamente 
              sobre cómo utilizas nuestro servicio.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-xl mb-3 font-['Montserrat']">Uso de la información</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-['Montserrat']">
              Utilizamos tu información para proporcionar, mantener y mejorar nuestros servicios, 
              procesar tus documentos, comunicarnos contigo y proteger nuestros servicios y usuarios.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-xl mb-3 font-['Montserrat']">Seguridad</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-['Montserrat']">
              Implementamos medidas de seguridad técnicas y organizativas para proteger tus datos personales 
              contra el acceso no autorizado, la alteración, divulgación o destrucción.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-xl mb-3 font-['Montserrat']">Tus derechos</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-['Montserrat']">
              Tienes derecho a acceder, rectificar, eliminar o portar tus datos personales, 
              así como a oponerte o limitar ciertos tratamientos de datos.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200">
          <Link to="/" className="text-primary hover:underline font-['Montserrat']">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Privacy;



