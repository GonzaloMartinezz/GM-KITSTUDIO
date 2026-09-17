import React from 'react';
import { useLocation } from 'react-router-dom';
import { Send, MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

const InstagramIcon = ({ size = 20, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const PreFooterContact = () => {
  const location = useLocation();

  // Hide this component on pages that have their own full-screen layout or dedicated contact info
  if (['/productos', '/contact'].includes(location.pathname)) {
    return null;
  }

  return (
    <section className="relative flex flex-col w-full bg-brand-5 pb-20">
      {/* Stats Block (Moved from FeaturesSection to sit above the map) */}
      <div className="w-full px-4 sm:px-6 md:px-12 lg:px-24 mb-0 relative z-20 pt-12 sm:pt-20 pb-8 sm:pb-12 bg-brand-1">
        <div className="bg-brand-5 text-brand-1 rounded-3xl sm:rounded-[3rem] md:rounded-[4rem] p-6 sm:p-10 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.2)] mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-16 mb-10 sm:mb-16">
            <div className="lg:w-1/2">
              <span className="text-brand-2 font-bold tracking-[0.3em] text-xs sm:text-sm uppercase mb-3 sm:mb-4 block">NUESTRA PROMESA</span>
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bebas leading-[0.9] text-white uppercase">
                EL ESTÁNDAR DE<br />BIOSEGURIDAD
              </h2>
            </div>
            <div className="lg:w-1/2 flex items-end">
              <p className="text-white text-base sm:text-lg max-w-md font-medium leading-relaxed">
                No somos solo proveedores; somos tus aliados estratégicos en el quirófano. Nuestro compromiso es entregar soluciones impecables para que ejerzas tu profesión con total tranquilidad.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-brand-1/5 border border-brand-1/10 backdrop-blur-md p-6 sm:p-8 md:p-10 text-center rounded-2xl sm:rounded-[2.5rem] hover:bg-brand-1/10 transition-colors">
              <div className="text-5xl sm:text-6xl md:text-[6rem] font-bebas text-brand-2 mb-1 sm:mb-2 leading-none">ISO</div>
              <p className="text-brand-1 text-xs sm:text-sm font-bold uppercase tracking-wider">Calidad certificada</p>
            </div>
            <div className="bg-brand-1/5 border border-brand-1/10 backdrop-blur-md p-6 sm:p-8 md:p-10 text-center rounded-2xl sm:rounded-[2.5rem] hover:bg-brand-1/10 transition-colors">
              <div className="text-5xl sm:text-6xl md:text-[6rem] font-bebas text-brand-2 mb-1 sm:mb-2 leading-none">0%</div>
              <p className="text-brand-1 text-xs sm:text-sm font-bold uppercase tracking-wider">Margen de contaminación</p>
            </div>
            <div className="bg-brand-1/5 border border-brand-1/10 backdrop-blur-md p-6 sm:p-8 md:p-10 text-center rounded-2xl sm:rounded-[2.5rem] hover:bg-brand-1/10 transition-colors">
              <div className="text-5xl sm:text-6xl md:text-[6rem] font-bebas text-white mb-1 sm:mb-2 leading-none">100%</div>
              <p className="text-brand-1 text-xs sm:text-sm font-bold uppercase tracking-wider">Satisfacción clínica</p>
            </div>
          </div>
        </div>
      </div>

      {/* Map Background */}
      <div className="w-full h-72 sm:h-96 md:h-125 relative z-0 border-b border-brand-2/10">
        <iframe
          title="San Miguel de Tucumán Map"
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          src="https://maps.google.com/maps?q=San%20Miguel%20de%20Tucuman,%20Argentina&t=m&z=14&output=embed&iwloc=near"
          className="grayscale-[0.5] contrast-[1.05] opacity-90"
        ></iframe>
        {/* Overlay gradient to slightly tint the map with the app's colors */}
        <div className="absolute inset-0 bg-brand-5/10 pointer-events-none mix-blend-multiply"></div>
      </div>

      {/* Overlapping Card */}
      <div className="max-w-6xl w-full mx-auto px-4 relative z-10 -mt-20 sm:-mt-36 md:-mt-62.5 mb-0">
        <div className="bg-brand-1 rounded-3xl sm:rounded-4xl shadow-[0_30px_60px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col md:flex-row border border-brand-5/5">

          {/* Left: Form Area */}
          <div className="w-full md:w-[60%] p-6 sm:p-10 md:p-14 bg-brand-1">
            <h2 className="text-3xl sm:text-4xl font-bebas text-brand-5 mb-6 sm:mb-10 tracking-wider">ENVIAR MENSAJE</h2>

            <form className="space-y-6 sm:space-y-8 font-geist">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-brand-5/60 mb-2 font-semibold">Nombre Completo</label>
                  <input type="text" placeholder="Dr. Juan Pérez" className="w-full bg-transparent border-b-2 border-brand-5/10 py-2 focus:outline-none focus:border-brand-3 text-brand-5 placeholder:text-brand-5/30 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-brand-5/60 mb-2 font-semibold">Clínica / Empresa</label>
                  <input type="text" placeholder="Centro Odontológico" className="w-full bg-transparent border-b-2 border-brand-5/10 py-2 focus:outline-none focus:border-brand-3 text-brand-5 placeholder:text-brand-5/30 transition-colors" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-brand-5/60 mb-2 font-semibold">Teléfono</label>
                  <input type="tel" placeholder="+54 9 381..." className="w-full bg-transparent border-b-2 border-brand-5/10 py-2 focus:outline-none focus:border-brand-3 text-brand-5 placeholder:text-brand-5/30 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-brand-5/60 mb-2 font-semibold">Presupuesto</label>
                  <input type="text" placeholder="$50,000 - $100,000" className="w-full bg-transparent border-b-2 border-brand-5/10 py-2 focus:outline-none focus:border-brand-3 text-brand-5 placeholder:text-brand-5/30 transition-colors" />
                </div>
              </div>

              <div className="relative pt-2 sm:pt-4 flex items-end gap-3 sm:gap-4">
                <div className="grow">
                  <label className="block text-xs uppercase tracking-widest text-brand-5/60 mb-2 font-semibold">Mensaje</label>
                  <textarea rows="1" placeholder="Hola, me gustaría cotizar..." className="w-full bg-transparent border-b-2 border-brand-5/10 py-2 focus:outline-none focus:border-brand-3 text-brand-5 placeholder:text-brand-5/30 transition-colors resize-none"></textarea>
                </div>

                {/* Submit Button */}
                <button type="button" aria-label="Enviar mensaje" className="w-12 h-12 sm:w-14 sm:h-14 bg-brand-3 text-brand-5 rounded-full flex items-center justify-center hover:bg-brand-2 transition-transform hover:scale-105 shadow-[0_10px_20px_rgba(241,232,217,0.3)] shrink-0 group cursor-pointer">
                  <Send className="w-4 h-4 sm:w-5 sm:h-5 -ml-1 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          </div>

          {/* Right: Contact Information */}
          <div className="w-full md:w-[40%] p-6 sm:p-10 md:p-14 bg-brand-5 text-brand-1 flex flex-col justify-between relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-brand-4 rounded-full opacity-50 blur-3xl pointer-events-none"></div>

            <div className="relative z-10">
              <h2 className="text-3xl font-bebas mb-10 tracking-widest text-brand-1">INFORMACIÓN DE CONTACTO</h2>

              <div className="space-y-8 font-geist text-sm">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-brand-3 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-brand-1">Barrio Sur</p>
                    <p className="leading-relaxed opacity-80 text-xs sm:text-sm">San Miguel de Tucumán, Argentina</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Phone className="w-6 h-6 text-brand-3 shrink-0" />
                  <a
                    href="https://wa.me/5493816242482?text=¡Hola!%20Quiero%20más%20información%20sobre%20los%20kits%20quirúrgicos%20de%20GM%20Kit%20Studio."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-90 hover:text-[#25D366] hover:underline transition-colors font-medium flex items-center gap-2"
                  >
                    <span>+54 9 381 6242482</span>
                    <span className="text-[10px] bg-[#25D366]/20 text-[#25D366] px-2 py-0.5 rounded-full border border-[#25D366]/30 font-bold uppercase tracking-wider">WhatsApp</span>
                  </a>
                </div>

                <div className="flex items-center gap-4">
                  <Mail className="w-6 h-6 text-brand-3 shrink-0" />
                  <a
                    href="mailto:gonzalomartinezzz04@gmail.com?subject=Consulta%20GM%20Kit%20Studio"
                    className="opacity-90 hover:text-brand-3 hover:underline transition-colors break-all font-medium"
                  >
                    gonzalomartinezzz04@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3.5 mt-8 md:mt-0 relative z-10">
              {/* WhatsApp Directo */}
              <a
                href="https://wa.me/5493816242482?text=¡Hola!%20Quiero%20más%20información%20sobre%20los%20kits%20quirúrgicos%20de%20GM%20Kit%20Studio."
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp Directo (+54 9 381 6242482)"
                aria-label="WhatsApp Directo"
                className="w-11 h-11 rounded-full bg-brand-5 border border-brand-1/20 flex items-center justify-center text-brand-1 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] hover:scale-110 transition-all shadow-md group cursor-pointer"
              >
                <MessageCircle size={20} className="group-hover:scale-110 transition-transform" />
              </a>

              {/* Instagram Gonchi Martinez */}
              <a
                href="https://www.instagram.com/gonchi_martinezz/"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram: @gonchi_martinezz"
                aria-label="Instagram Gonchi Martinez"
                className="w-11 h-11 rounded-full bg-brand-5 border border-brand-1/20 flex items-center justify-center text-brand-1 hover:bg-linear-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white hover:border-transparent hover:scale-110 transition-all shadow-md group cursor-pointer"
              >
                <InstagramIcon size={20} className="group-hover:scale-110 transition-transform" />
              </a>

              {/* Instagram Studio Dental Carcara Martinez */}
              <a
                href="https://www.instagram.com/studiodentalcarcaramartinez/"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram: @studiodentalcarcaramartinez (Studio Dental)"
                aria-label="Instagram Studio Dental"
                className="w-11 h-11 rounded-full bg-brand-5 border border-brand-1/20 flex items-center justify-center text-brand-1 hover:bg-[#88C9C4] hover:text-[#0C3B45] hover:border-[#88C9C4] hover:scale-110 transition-all shadow-md group cursor-pointer"
              >
                <InstagramIcon size={20} className="group-hover:scale-110 transition-transform" />
              </a>

              {/* Mail Directo */}
              <a
                href="mailto:gonzalomartinezzz04@gmail.com?subject=Consulta%20GM%20Kit%20Studio"
                title="Email: gonzalomartinezzz04@gmail.com"
                aria-label="Email gonzalomartinezzz04@gmail.com"
                className="w-11 h-11 rounded-full bg-brand-5 border border-brand-1/20 flex items-center justify-center text-brand-1 hover:bg-[#EA4335] hover:text-white hover:border-[#EA4335] hover:scale-110 transition-all shadow-md group cursor-pointer"
              >
                <Mail size={20} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PreFooterContact;
