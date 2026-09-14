import React from 'react';
import { useLocation } from 'react-router-dom';
import { Send, MapPin, Phone, Mail, Camera, Briefcase, Users } from 'lucide-react';

const PreFooterContact = () => {
  const location = useLocation();
  
  // Hide this component on pages that have their own full-screen layout or dedicated contact info
  if (['/productos', '/contact'].includes(location.pathname)) {
    return null;
  }

  return (
    <section className="relative flex flex-col w-full bg-brand-5 pb-20">
      {/* Stats Block (Moved from FeaturesSection to sit above the map) */}
      <div className="w-full px-6 md:px-12 lg:px-24 mb-0 relative z-20 pt-20 pb-12 bg-brand-1">
        <div className="bg-brand-5 text-brand-1 rounded-[3rem] md:rounded-[4rem] p-8 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.2)] mx-auto max-w-350">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 mb-16">
            <div className="lg:w-1/2">
              <span className="text-brand-2 font-bold tracking-[0.3em] text-sm uppercase mb-4 block">NUESTRA PROMESA</span>
              <h2 className="text-6xl lg:text-7xl font-bebas leading-[0.9] text-white uppercase">
                EL ESTÁNDAR DE<br/>BIOSEGURIDAD
              </h2>
            </div>
            <div className="lg:w-1/2 flex items-end">
              <p className="text-white text-lg max-w-md font-medium">
                No somos solo proveedores; somos tus aliados estratégicos en el quirófano. Nuestro compromiso es entregar soluciones impecables para que ejerzas tu profesión con total tranquilidad.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-brand-1/5 border border-brand-1/10 backdrop-blur-md p-10 text-center rounded-[2.5rem] hover:bg-brand-1/10 transition-colors">
              <div className="text-[5rem] md:text-[6rem] font-bebas text-brand-2 mb-2 leading-none">10K+</div>
              <p className="text-brand-1 text-sm font-bold uppercase tracking-wider">Kits validados este año</p>
            </div>
            <div className="bg-brand-1/5 border border-brand-1/10 backdrop-blur-md p-10 text-center rounded-[2.5rem] hover:bg-brand-1/10 transition-colors">
              <div className="text-[5rem] md:text-[6rem] font-bebas text-brand-2 mb-2 leading-none">0%</div>
              <p className="text-brand-1 text-sm font-bold uppercase tracking-wider">Margen de contaminación</p>
            </div>
            <div className="bg-brand-1/5 border border-brand-1/10 backdrop-blur-md p-10 text-center rounded-[2.5rem] hover:bg-brand-1/10 transition-colors">
              <div className="text-[5rem] md:text-[6rem] font-bebas text-white mb-2 leading-none">100%</div>
              <p className="text-brand-1 text-sm font-bold uppercase tracking-wider">Satisfacción clínica</p>
            </div>
          </div>
        </div>
      </div>

      {/* Map Background */}
      <div className="w-full h-125 relative z-0 border-b border-brand-2/10">
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
      <div className="max-w-6xl w-full mx-auto px-4 relative z-10 -mt-62.5 mb-0">
        <div className="bg-brand-1 rounded-4xl shadow-[0_30px_60px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col md:flex-row border border-brand-5/5">
          
          {/* Left: Form Area */}
          <div className="w-full md:w-[60%] p-10 md:p-14 bg-brand-1">
            <h2 className="text-4xl font-bebas text-brand-5 mb-10 tracking-wider">ENVIAR MENSAJE</h2>
            
            <form className="space-y-8 font-geist">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-brand-5/60 mb-2 font-semibold">Nombre Completo</label>
                  <input type="text" placeholder="Dr. Juan Pérez" className="w-full bg-transparent border-b-2 border-brand-5/10 py-2 focus:outline-none focus:border-brand-3 text-brand-5 placeholder:text-brand-5/30 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-brand-5/60 mb-2 font-semibold">Clínica / Empresa</label>
                  <input type="text" placeholder="Centro Odontológico" className="w-full bg-transparent border-b-2 border-brand-5/10 py-2 focus:outline-none focus:border-brand-3 text-brand-5 placeholder:text-brand-5/30 transition-colors" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-brand-5/60 mb-2 font-semibold">Teléfono</label>
                  <input type="tel" placeholder="+54 9 381..." className="w-full bg-transparent border-b-2 border-brand-5/10 py-2 focus:outline-none focus:border-brand-3 text-brand-5 placeholder:text-brand-5/30 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-brand-5/60 mb-2 font-semibold">Presupuesto</label>
                  <input type="text" placeholder="$50,000 - $100,000" className="w-full bg-transparent border-b-2 border-brand-5/10 py-2 focus:outline-none focus:border-brand-3 text-brand-5 placeholder:text-brand-5/30 transition-colors" />
                </div>
              </div>

              <div className="relative pt-4 flex items-end gap-4">
                <div className="grow">
                  <label className="block text-xs uppercase tracking-widest text-brand-5/60 mb-2 font-semibold">Mensaje</label>
                  <textarea rows="1" placeholder="Hola, me gustaría cotizar..." className="w-full bg-transparent border-b-2 border-brand-5/10 py-2 focus:outline-none focus:border-brand-3 text-brand-5 placeholder:text-brand-5/30 transition-colors resize-none"></textarea>
                </div>
                
                {/* Submit Button similar to the green circle in the reference image */}
                <button type="button" aria-label="Enviar mensaje" className="w-14 h-14 bg-brand-3 text-brand-5 rounded-full flex items-center justify-center hover:bg-brand-2 transition-transform hover:scale-105 shadow-[0_10px_20px_rgba(241,232,217,0.3)] shrink-0 group">
                  <Send className="w-5 h-5 -ml-1 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          </div>
          
          {/* Right: Contact Information */}
          <div className="w-full md:w-[40%] p-10 md:p-14 bg-brand-5 text-brand-1 flex flex-col justify-between relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-brand-4 rounded-full opacity-50 blur-3xl pointer-events-none"></div>

            <div className="relative z-10">
              <h2 className="text-3xl font-bebas mb-10 tracking-widest text-brand-1">INFORMACIÓN DE CONTACTO</h2>
              
              <div className="space-y-8 font-geist text-sm">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-brand-3 shrink-0" />
                  <p className="leading-relaxed opacity-90">San Martín Centro<br/>San Miguel de Tucumán, Argentina</p>
                </div>
                
                <div className="flex items-center gap-4">
                  <Phone className="w-6 h-6 text-brand-3 shrink-0" />
                  <p className="opacity-90">+54 9 381 500-0000</p>
                </div>
                
                <div className="flex items-center gap-4">
                  <Mail className="w-6 h-6 text-brand-3 shrink-0" />
                  <p className="opacity-90">contacto@gmkitstudio.com.ar</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-12 md:mt-0 relative z-10">
              <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-brand-5 border border-brand-1/20 flex items-center justify-center hover:bg-brand-1 hover:text-brand-5 transition-colors">
                <Camera size={20} />
              </a>
              <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-brand-5 border border-brand-1/20 flex items-center justify-center hover:bg-brand-1 hover:text-brand-5 transition-colors">
                <Briefcase size={20} />
              </a>
              <a href="#" aria-label="Comunidad" className="w-10 h-10 rounded-full bg-brand-5 border border-brand-1/20 flex items-center justify-center hover:bg-brand-1 hover:text-brand-5 transition-colors">
                <Users size={20} />
              </a>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default PreFooterContact;
