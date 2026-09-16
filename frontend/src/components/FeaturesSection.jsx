import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Activity, PackageCheck, HeartPulse, ArrowRight } from 'lucide-react';

const FeaturesSection = () => {
  return (
    <section className="bg-brand-1 text-brand-5 py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-24 font-geist relative z-30 rounded-t-[60px] -mt-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Part: Features */}
        <div className="flex flex-col lg:flex-row gap-10 sm:gap-16 mb-12 sm:mb-16 lg:mb-20">
          {/* Left Text */}
          <div className="lg:w-5/12 flex flex-col justify-center">
            <span className="text-brand-3 font-bold tracking-[0.3em] text-xs sm:text-sm uppercase mb-3 sm:mb-4">CÓMO TRABAJAMOS</span>
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bebas leading-[0.9] mb-6 sm:mb-8 text-brand-5 uppercase">
              Nuestro proceso de excelencia
            </h2>
            <p className="text-brand-5/80 text-base sm:text-lg mb-8 sm:mb-12 max-w-md font-medium leading-relaxed">
              Detrás de cada kit odontológico hay un riguroso proceso de validación, esterilización y ensamblaje meticuloso. Nos encargamos de todo para que tú solo te enfoques en la salud de tus pacientes.
            </p>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <Link
                to="/productos"
                className="bg-brand-5 text-brand-1 hover:bg-[#88C9C4] hover:text-[#0C3B45] px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bebas text-lg sm:text-xl tracking-wider transition-all duration-300 shadow-lg cursor-pointer inline-flex items-center gap-2 active:scale-95"
              >
                <span>NUESTRO CATÁLOGO</span>
              </Link>
              <Link
                to="/product/1"
                className="text-brand-5 font-bebas text-lg sm:text-xl tracking-wider hover:text-[#0C3B45] transition-colors cursor-pointer inline-flex items-center gap-1.5 group active:scale-95"
              >
                <span>SABER MÁS</span>
                <ArrowRight size={18} className="text-[#88C9C4] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          
          {/* Right Grid */}
          <div className="lg:w-7/12 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            {/* Card 1 */}
            <div className="bg-brand-2/30 border border-brand-2/50 backdrop-blur-md p-6 sm:p-8 md:p-10 rounded-3xl sm:rounded-4xl flex flex-col items-center text-center justify-center gap-3 sm:gap-4 hover:bg-brand-2/50 transition-colors">
              <ShieldCheck size={44} className="text-brand-4 mb-1" strokeWidth={1.5} />
              <h3 className="font-bebas text-2xl sm:text-3xl text-brand-5 tracking-wide">Validación Estricta</h3>
              <p className="text-brand-5/70 text-xs sm:text-sm font-medium leading-relaxed">Garantizamos que cada lote cumple con los más altos estándares bioseguros del mercado.</p>
            </div>
            {/* Card 2 (Dark) */}
            <div className="bg-brand-5 text-brand-1 p-6 sm:p-8 md:p-10 rounded-3xl sm:rounded-4xl flex flex-col items-center text-center justify-center gap-3 sm:gap-4 shadow-[0_20px_40px_rgba(62,92,118,0.3)] relative overflow-hidden group cursor-default">
              <h3 className="font-bebas text-2xl sm:text-3xl text-brand-1 tracking-wide">Esterilización Total</h3>
              <Activity size={50} className="text-[#88C9C4] my-1 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
              <p className="text-brand-1/70 text-xs sm:text-sm font-medium leading-relaxed">Tecnología de punta para erradicar cualquier agente patógeno garantizando inocuidad.</p>
              <div className="absolute inset-0 bg-linear-to-tr from-[#88C9C4]/10 to-transparent pointer-events-none"></div>
            </div>
            {/* Card 3 (Dark - Ensamblaje Preciso) */}
            <div className="bg-brand-5 text-brand-1 p-6 sm:p-8 md:p-10 rounded-3xl sm:rounded-4xl flex flex-col items-center text-center justify-center gap-3 sm:gap-4 shadow-[0_20px_40px_rgba(62,92,118,0.3)] relative overflow-hidden group cursor-default">
              <h3 className="font-bebas text-2xl sm:text-3xl text-brand-1 tracking-wide">Ensamblaje Preciso</h3>
              <PackageCheck size={50} className="text-[#88C9C4] my-1 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
              <p className="text-brand-1/70 text-xs sm:text-sm font-medium leading-relaxed">Cada kit es armado en salas blancas certificadas, evitando cualquier contaminación cruzada.</p>
              <div className="absolute inset-0 bg-linear-to-tr from-[#88C9C4]/10 to-transparent pointer-events-none"></div>
            </div>
            {/* Card 4 */}
            <div className="bg-brand-2/30 border border-brand-2/50 backdrop-blur-md p-6 sm:p-8 md:p-10 rounded-3xl sm:rounded-4xl flex flex-col items-center text-center justify-center gap-3 sm:gap-4 hover:bg-brand-2/50 transition-colors">
              <HeartPulse size={44} className="text-brand-4 mb-1" strokeWidth={1.5} />
              <h3 className="font-bebas text-2xl sm:text-3xl text-brand-5 tracking-wide">Cuidado Integral</h3>
              <p className="text-brand-5/70 text-xs sm:text-sm font-medium leading-relaxed">Entregas seguras y puntuales manteniendo la integridad absoluta del empaque.</p>
            </div>
          </div>
        </div>

        {/* Bottom stats moved to PreFooterContact */}
      </div>
    </section>
  );
};

export default FeaturesSection;
