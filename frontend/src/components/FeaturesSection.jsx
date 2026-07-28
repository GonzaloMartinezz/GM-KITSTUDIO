import React from 'react';
import { ShieldCheck, Activity, PackageCheck, HeartPulse } from 'lucide-react';

const FeaturesSection = () => {
  return (
    <section className="bg-brand-1 text-brand-5 py-32 px-6 md:px-12 lg:px-24 font-geist relative z-30 rounded-t-[60px] -mt-10">
      <div className="max-w-350 mx-auto">
        
        {/* Top Part: Features */}
        <div className="flex flex-col lg:flex-row gap-16 mb-16 lg:mb-20">
          {/* Left Text */}
          <div className="lg:w-5/12 flex flex-col justify-center">
            <span className="text-brand-3 font-bold tracking-[0.3em] text-sm uppercase mb-4">CÓMO TRABAJAMOS</span>
            <h2 className="text-6xl lg:text-7xl font-bebas leading-[0.9] mb-8 text-brand-5 uppercase">
              Nuestro proceso de excelencia
            </h2>
            <p className="text-brand-5/80 text-lg mb-12 max-w-md font-medium">
              Detrás de cada kit odontológico hay un riguroso proceso de validación, esterilización y ensamblaje meticuloso. Nos encargamos de todo para que tú solo te enfoques en la salud de tus pacientes.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <button className="bg-brand-5 text-brand-1 hover:bg-[#88C9C4] hover:text-[#0C3B45] px-8 py-4 rounded-full font-bebas text-xl tracking-wider transition-colors duration-500 shadow-lg">
                NUESTRO CATÁLOGO
              </button>
              <button className="text-brand-5 font-bebas text-xl tracking-wider hover:text-brand-3 transition-colors">
                SABER MÁS
              </button>
            </div>
          </div>
          
          {/* Right Grid */}
          <div className="lg:w-7/12 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            {/* Card 1 */}
            <div className="bg-brand-2/30 border border-brand-2/50 backdrop-blur-md p-8 md:p-10 rounded-4xl flex flex-col items-center text-center justify-center gap-4 hover:bg-brand-2/50 transition-colors">
              <ShieldCheck size={48} className="text-brand-4 mb-2" strokeWidth={1.5} />
              <h3 className="font-bebas text-3xl text-brand-5 tracking-wide">Validación Estricta</h3>
              <p className="text-brand-5/70 text-sm font-medium">Garantizamos que cada lote cumple con los más altos estándares bioseguros del mercado.</p>
            </div>
            {/* Card 2 (Dark) */}
            <div className="bg-brand-5 text-brand-1 p-8 md:p-10 rounded-4xl flex flex-col items-center text-center justify-center gap-4 shadow-[0_20px_40px_rgba(62,92,118,0.3)] transform lg:-translate-y-6 relative overflow-hidden group cursor-default">
              <h3 className="font-bebas text-3xl text-brand-1 tracking-wide">Esterilización Total</h3>
              <Activity size={56} className="text-[#88C9C4] my-2 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
              <p className="text-brand-1/70 text-sm font-medium">Tecnología de punta para erradicar cualquier agente patógeno garantizando inocuidad.</p>
              <div className="absolute inset-0 bg-linear-to-tr from-[#88C9C4]/10 to-transparent pointer-events-none"></div>
            </div>
            {/* Card 3 */}
            <div className="bg-brand-2/30 border border-brand-2/50 backdrop-blur-md p-8 md:p-10 rounded-4xl flex flex-col items-center text-center justify-center gap-4 hover:bg-brand-2/50 transition-colors">
              <PackageCheck size={48} className="text-brand-4 mb-2" strokeWidth={1.5} />
              <h3 className="font-bebas text-3xl text-brand-5 tracking-wide">Ensamblaje Preciso</h3>
              <p className="text-brand-5/70 text-sm font-medium">Cada kit es armado en salas blancas certificadas, evitando cualquier contaminación cruzada.</p>
            </div>
            {/* Card 4 */}
            <div className="bg-brand-2/30 border border-brand-2/50 backdrop-blur-md p-8 md:p-10 rounded-4xl flex flex-col items-center text-center justify-center gap-4 hover:bg-brand-2/50 transition-colors">
              <HeartPulse size={48} className="text-brand-4 mb-2" strokeWidth={1.5} />
              <h3 className="font-bebas text-3xl text-brand-5 tracking-wide">Cuidado Integral</h3>
              <p className="text-brand-5/70 text-sm font-medium">Entregas seguras y puntuales manteniendo la integridad absoluta del empaque.</p>
            </div>
          </div>
        </div>

        {/* Bottom stats moved to PreFooterContact */}
      </div>
    </section>
  );
};

export default FeaturesSection;
