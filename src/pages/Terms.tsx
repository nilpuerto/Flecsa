import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const Terms = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-12 sm:py-16 md:py-20 max-w-4xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 font-['Montserrat']">Términos y Condiciones</h1>
        <p className="text-base text-slate-600 mb-8 font-['Montserrat']">
          Condiciones de uso del servicio Flecsa
        </p>
        
        <div className="space-y-8 text-slate-700">
          <div>
            <h3 className="font-semibold text-xl mb-3 font-['Montserrat']">Aceptación de términos</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-['Montserrat']">
              Al acceder y utilizar Flecsa, aceptas cumplir con estos términos y condiciones. 
              Si no estás de acuerdo con alguna parte de estos términos, no debes utilizar nuestro servicio.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-xl mb-3 font-['Montserrat']">Uso del servicio</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-['Montserrat']">
              Flecsa te permite organizar y gestionar tus documentos mediante inteligencia artificial. 
              Eres responsable de mantener la confidencialidad de tu cuenta y de todas las actividades 
              que ocurran bajo tu cuenta.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-xl mb-3 font-['Montserrat']">Contenido del usuario</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-['Montserrat']">
              Conservas todos los derechos sobre tus documentos. Al utilizar nuestro servicio, 
              nos otorgas una licencia limitada para procesar tus documentos únicamente para proporcionar 
              el servicio.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-xl mb-3 font-['Montserrat']">Limitación de responsabilidad</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-['Montserrat']">
              Flecsa se proporciona "tal cual" sin garantías de ningún tipo. No seremos responsables 
              de ningún daño indirecto, incidental o consecuente derivado del uso de nuestro servicio.
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

export default Terms;






