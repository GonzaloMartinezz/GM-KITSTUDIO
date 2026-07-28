import React from 'react';
import { ShieldCheck, PackageCheck, MessageCircle, Clock, Tag, CheckCircle2 } from 'lucide-react';

const CatalogSpecsSection = () => {
  const services = [
    { title: "Validar Productos", icon: <PackageCheck size={24} />, desc: "Sistemas integrales para certificar la calidad y el estado de cada insumo antes de la entrega." },
    { title: "Precios", icon: <Tag size={24} />, desc: "Ofrecemos los costos más competitivos del mercado sin comprometer la bioseguridad ni la calidad." },
  { title: "Confianza", icon: <ShieldCheck size={24} />, desc: "Cientos de profesionales en Tucumán respaldan la seguridad y efectividad de nuestros kits quirúrgicos." },
  { title: "Material Premium", icon: <CheckCircle2 size={24} />, desc: "Insumos de la más alta calidad que cumplen con estrictas normativas nacionales e internacionales." },
  { title: "Asesoría Continua", icon: <MessageCircle size={24} />, desc: "Acompañamiento constante y comunicación directa para resolver cualquier duda de tu equipo." },
  { title: "Entregas Rápidas", icon: <Clock size={24} />, desc: "Tiempos de entrega optimizados para que tu consultorio nunca se quede sin stock operativo." },
  ];

return (
  <section className="bg-brand-1 text-brand-5 py-32 px-4 md:px-12 lg:px-24 font-geist relative z-30">
    <div className="max-w-350 mx-auto bg-white rounded-[3rem] p-4 md:p-6 lg:p-8 flex flex-col lg:flex-row gap-8 shadow-2xl">

      {/* Left Dark Card */}
      <div className="lg:w-[45%] bg-brand-5 text-brand-1 rounded-[2.5rem] p-10 md:p-12 flex flex-col justify-between min-h-112.5 relative overflow-hidden shadow-inner group">
        <div className="relative z-10">
          <h2 className="text-5xl md:text-6xl font-bebas leading-none mb-6 tracking-wide">
            NUESTROS<br />SERVICIOS<br />PREMIUM.
          </h2>
          <p className="text-brand-1/70 mt-6 max-w-87.5 font-medium">
            Soluciones integrales pensadas para potenciar la eficiencia y seguridad en cada intervención de tu clínica.
          </p>
        </div>

        <div className="relative z-10 mt-12">
          <button className="w-full bg-[#0C0C0C] hover:bg-brand-2 hover:text-brand-5 text-white py-4 md:py-5 rounded-2xl font-bebas text-xl tracking-wider transition-colors shadow-lg">
            VER TODOS LOS SERVICIOS
          </button>
        </div>

        {/* Decorative background wave/circle */}
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-brand-1/5 rounded-full blur-3xl pointer-events-none group-hover:bg-brand-1/10 transition-colors duration-700"></div>
      </div>

      {/* Right Grid */}
      <div className="lg:w-[55%] py-10 px-4 lg:px-12">

        <div className="flex justify-between items-center mb-10 pb-6 border-b border-gray-100">
          <span className="font-bebas text-xl text-gray-400 tracking-widest">Servicios</span>
          <span className="font-bebas text-xl text-gray-400 tracking-widest hidden md:block">Beneficios</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
          {services.map((spec, idx) => (
            <div key={idx} className="flex gap-6 group cursor-pointer">
              <div className="w-16 h-16 shrink-0 rounded-2xl bg-brand-1 flex items-center justify-center text-brand-5 group-hover:bg-brand-5 group-hover:text-brand-1 group-hover:shadow-lg transition-all duration-300">
                {spec.icon}
              </div>
              <div className="flex flex-col justify-center">
                <h4 className="font-bebas tracking-wide text-2xl mb-1.5 text-gray-800">{spec.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{spec.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  </section>
);
};

export default CatalogSpecsSection;
