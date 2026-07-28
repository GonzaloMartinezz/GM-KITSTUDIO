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
    <section className="relative flex flex-col w-full bg-[#F3F3F3]">
      {/* Map Background */}
      <div className="w-full h-[500px] relative z-0 border-b border-brand-2/10">
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
      <div className="max-w-6xl w-full mx-auto px-4 relative z-10 -mt-[250px] mb-0">
        <div className="bg-brand-1 rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col md:flex-row border border-brand-5/5">
          
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
                <div className="flex-grow">
                  <label className="block text-xs uppercase tracking-widest text-brand-5/60 mb-2 font-semibold">Mensaje</label>
                  <textarea rows="1" placeholder="Hola, me gustaría cotizar..." className="w-full bg-transparent border-b-2 border-brand-5/10 py-2 focus:outline-none focus:border-brand-3 text-brand-5 placeholder:text-brand-5/30 transition-colors resize-none"></textarea>
                </div>
                
                {/* Submit Button similar to the green circle in the reference image */}
                <button type="button" className="w-14 h-14 bg-brand-3 text-brand-5 rounded-full flex items-center justify-center hover:bg-brand-2 transition-transform hover:scale-105 shadow-[0_10px_20px_rgba(241,232,217,0.3)] shrink-0 group">
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
              <a href="#" className="w-10 h-10 rounded-full bg-brand-5 border border-brand-1/20 flex items-center justify-center hover:bg-brand-1 hover:text-brand-5 transition-colors">
                <Camera size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-brand-5 border border-brand-1/20 flex items-center justify-center hover:bg-brand-1 hover:text-brand-5 transition-colors">
                <Briefcase size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-brand-5 border border-brand-1/20 flex items-center justify-center hover:bg-brand-1 hover:text-brand-5 transition-colors">
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
