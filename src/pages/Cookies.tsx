import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const Cookies = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-12 sm:py-16 md:py-20 max-w-4xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 font-['Montserrat']">Uso de cookies por parte de Flecsa</h1>
        <p className="text-base text-slate-600 mb-8 font-['Montserrat']">
          Información sobre cómo utilizamos las cookies en nuestros servicios
        </p>
        
        <div className="space-y-8 text-slate-700">
          <div>
            <p className="text-sm text-slate-600 leading-relaxed font-['Montserrat']">
              Los sitios web y los servicios online de Flecsa pueden usar «cookies». Las cookies te permiten 
              personalizar los sitios y utilizar nuestros servicios, y a nosotros nos permiten saber qué páginas 
              visitan los usuarios. Nos ayudan a medir la eficacia de nuestras funcionalidades y búsquedas, 
              y nos dan información sobre el comportamiento de los usuarios, que utilizamos para mejorar nuestros 
              productos y mensajes.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-xl mb-3 font-['Montserrat']">Cómo gestionar las cookies</h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-3 font-['Montserrat']">
              Si quieres desactivar las cookies en el navegador Safari, ve a Preferencias y, en el panel Privacidad, 
              elige Bloquear Cookies. En tu iPad, iPhone o iPod touch, ve a Ajustes, selecciona Safari y dirígete 
              al apartado Cookies. Para otros navegadores, consulta con el proveedor cómo desactivar las cookies.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed font-['Montserrat']">
              Muchos de nuestros sitios utilizan cookies, por lo que es posible que no puedas acceder a determinadas 
              secciones si las desactivas.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-xl mb-4 font-['Montserrat']">Categorías de cookies</h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4 font-['Montserrat']">
              Las cookies empleadas en nuestras páginas han sido catalogadas según las directrices de la guía sobre 
              cookies de la Cámara de Comercio Internacional (ICC) del Reino Unido. En nuestros sitios web y servicios 
              online aplicamos las siguientes categorías:
            </p>
            
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <h4 className="font-semibold text-slate-900 mb-2 font-['Montserrat']">Categoría 1: cookies estrictamente necesarias</h4>
                <p className="text-sm text-slate-600 leading-relaxed font-['Montserrat']">
                  Estas cookies son imprescindibles para que puedas navegar por las páginas y usar sus prestaciones. 
                  Sin estas cookies, no podemos ofrecerte servicios como la autenticación, el almacenamiento seguro 
                  de documentos o el procesamiento con inteligencia artificial.
                </p>
              </div>

              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <h4 className="font-semibold text-slate-900 mb-2 font-['Montserrat']">Categoría 2: cookies sobre comportamiento</h4>
                <p className="text-sm text-slate-600 leading-relaxed font-['Montserrat']">
                  Estas cookies recogen información sobre cómo utilizas nuestros sitios, por ejemplo las páginas que más 
                  visitas o las funciones que más utilizas. Estos datos nos permiten optimizar los sitios y facilitar 
                  su navegación. Estas cookies también permiten saber cómo interactúas con nuestras funcionalidades de 
                  IA y organización de documentos. Estas cookies no contienen información que permita identificarte. 
                  Todos los datos recogidos en estas cookies se recopilan de manera anónima.
                </p>
              </div>

              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <h4 className="font-semibold text-slate-900 mb-2 font-['Montserrat']">Categoría 3: cookies de funcionalidad</h4>
                <p className="text-sm text-slate-600 leading-relaxed font-['Montserrat']">
                  Estas cookies permiten que nuestros sitios recuerden las opciones que seleccionas cuando navegas. 
                  Por ejemplo, podemos almacenar tu preferencia de idioma en una cookie para asegurarnos de que el 
                  contenido mostrado está en tu idioma preferido. También pueden conservar preferencias como el tema 
                  visual, las configuraciones de organización de documentos y demás elementos personalizables. Otro 
                  posible uso es recordar tus documentos recientes o búsquedas frecuentes. Los datos recogidos en estas 
                  cookies no te identifican personalmente y no permiten seguir tu actividad cuando navegas fuera de los 
                  sitios web de Flecsa.
                </p>
              </div>
            </div>
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

export default Cookies;





