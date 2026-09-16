import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, PackageCheck, MessageCircle, ArrowRight, Sparkles, CheckCircle2, Truck } from 'lucide-react';

const CatalogSpecsSection = () => {
  const [activeTab, setActiveTab] = useState(1); // Default to featured card (02) on mobile

  const premiumServices = [
    {
      id: "01",
      shortTitle: "Bioseguridad",
      tag: "ESTÁNDAR QUIRÚRGICO",
      title: "BIOSEGURIDAD & ESTERILIDAD TOTAL",
      subtitle: "Barrera bacteriológica al 99.8% libre de partículas",
      description: "Insumos confeccionados en tela no tejida SMS 45g de triple capa hemorrepelente. Procesados con esterilización certificada por Óxido de Etileno (ETO) para garantizar campos estériles sin riesgo de contaminación cruzada en el quirófano.",
      specs: [
        { label: "Material", val: "SMS 45g Tricapa" },
        { label: "Barrera", val: "99.8% Bacteriológica" },
        { label: "Normativa", val: "Certificación ANMAT" },
      ],
      badge: "100% Estéril ETO",
      icon: ShieldCheck,
      featured: false,
    },
    {
      id: "02",
      shortTitle: "Kits Listos",
      tag: "LISTO PARA OPERAR",
      title: "KITS ESTÉRILES DESCARTABLES",
      subtitle: "Todo listo para abrir directo en la mesa quirúrgica",
      description: "Eliminamos el armado manual y las demoras preoperatorias. Cada kit integral incluye 8 insumos críticos con doble envoltorio estéril termosellado. Un único valor transparente de $8.500 por kit completo.",
      specs: [
        { label: "Precio Kit", val: "$8.500 Final" },
        { label: "Contenido", val: "8 Insumos Estériles" },
        { label: "Empaque", val: "Doble Envoltorio" },
      ],
      badge: "✦ MÁS ELEGIDO",
      icon: PackageCheck,
      featured: true,
    },
    {
      id: "03",
      shortTitle: "Asesoría & Logística",
      tag: "SOPORTE 1 A 1",
      title: "ASESORÍA CLÍNICA & LOGÍSTICA EXPRESS",
      subtitle: "Atención personalizada para que tu clínica nunca se detenga",
      description: "Canal prioritario directo para coordinar despachos express y asesorarte en el dimensionamiento exacto de kits para cirugías odontológicas, implantes o periodoncia. Envíos en 24/48h a todo el país.",
      specs: [
        { label: "Despachos", val: "24/48h Nacional" },
        { label: "Canal", val: "WhatsApp Directo" },
        { label: "Respuesta", val: "< 15 minutos" },
      ],
      badge: "Atención Dedicada",
      icon: MessageCircle,
      featured: false,
    },
  ];

  return (
    <section id="servicios-premium" className="bg-brand-1 text-brand-5 py-14 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 font-geist relative z-30">
      <div className="max-w-7xl mx-auto">
        
        {/* Compact Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-5/5 border border-brand-5/15 text-brand-5 font-bebas text-xs sm:text-sm tracking-widest uppercase mb-3 shadow-xs">
              <Sparkles size={14} className="text-brand-3" />
              <span>EXCELENCIA QUIRÚRGICA ✦ GM KIT STUDIO</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bebas leading-[0.95] text-brand-5 tracking-wide uppercase">
              SERVICIOS PREMIUM <br className="hidden sm:inline" />
              <span className="text-brand-3">CON MÁXIMA PROFUNDIDAD.</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/productos"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-5 text-brand-1 font-bebas text-base sm:text-lg tracking-wider hover:bg-[#0C3B45] hover:scale-105 transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <span>EXPLORAR KITS ($8.500)</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        {/* Mobile View: Compact Tab Switcher (Takes very little vertical space!) */}
        <div className="block md:hidden mb-6">
          <div className="flex items-center justify-between p-1 bg-white/70 backdrop-blur-md rounded-2xl border border-brand-5/10 shadow-xs mb-4">
            {premiumServices.map((service, idx) => (
              <button
                key={service.id}
                onClick={() => setActiveTab(idx)}
                className={`flex-1 py-2.5 px-2 rounded-xl font-bebas text-xs sm:text-sm tracking-wider transition-all text-center cursor-pointer ${
                  activeTab === idx
                    ? 'bg-brand-5 text-brand-1 shadow-md'
                    : 'text-brand-5/70 hover:text-brand-5'
                }`}
              >
                {service.id}. {service.shortTitle}
              </button>
            ))}
          </div>

          {/* Active Card on Mobile */}
          {(() => {
            const service = premiumServices[activeTab];
            const Icon = service.icon;
            return (
              <div
                className={`rounded-3xl p-6 transition-all duration-300 shadow-xl ${
                  service.featured
                    ? 'bg-linear-to-br from-[#0C3B45] via-[#0A2E36] to-[#061F24] text-brand-1 border-2 border-[#88C9C4]/40 shadow-[0_20px_50px_rgba(12,59,69,0.3)]'
                    : 'bg-white text-brand-5 border border-brand-5/10'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bebas text-base ${
                      service.featured ? 'bg-[#88C9C4]/20 text-[#88C9C4] border border-[#88C9C4]/40' : 'bg-brand-5/5 text-brand-5 border border-brand-5/15'
                    }`}>
                      {service.id}
                    </span>
                    <span className={`text-[11px] font-bold tracking-widest uppercase ${
                      service.featured ? 'text-[#88C9C4]' : 'text-brand-5/60'
                    }`}>
                      {service.tag}
                    </span>
                  </div>
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${
                    service.featured ? 'bg-[#88C9C4]/15 text-[#88C9C4]' : 'bg-brand-5/5 text-brand-3'
                  }`}>
                    <Icon size={22} />
                  </div>
                </div>

                <h3 className={`font-bebas text-2xl tracking-wide mb-1 ${
                  service.featured ? 'text-brand-1' : 'text-brand-5'
                }`}>
                  {service.title}
                </h3>
                <p className={`text-xs font-semibold uppercase tracking-wider mb-3 ${
                  service.featured ? 'text-[#88C9C4]' : 'text-brand-3'
                }`}>
                  {service.subtitle}
                </p>
                <p className={`text-sm leading-relaxed mb-6 font-normal ${
                  service.featured ? 'text-brand-1/80' : 'text-brand-5/75'
                }`}>
                  {service.description}
                </p>

                {/* Specs Box */}
                <div className={`p-4 rounded-2xl border flex flex-col gap-2.5 ${
                  service.featured
                    ? 'bg-black/20 border-white/10'
                    : 'bg-brand-1/40 border-brand-5/10'
                }`}>
                  {service.specs.map(spec => (
                    <div key={spec.label} className="flex items-center justify-between text-xs">
                      <span className={service.featured ? 'text-brand-1/60' : 'text-brand-5/60'}>{spec.label}</span>
                      <span className={`font-bold px-2 py-0.5 rounded-md ${
                        service.featured ? 'bg-[#88C9C4]/15 text-[#88C9C4]' : 'bg-white text-brand-5 shadow-2xs'
                      }`}>{spec.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>

        {/* Desktop View: Symmetrical 3-Column Bento Grid with Rich Depth */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 items-stretch">
          {premiumServices.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className={`rounded-3xl p-7 lg:p-8 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1.5 ${
                  service.featured
                    ? 'bg-linear-to-br from-[#0C3B45] via-[#0A2E36] to-[#061F24] text-brand-1 border-2 border-[#88C9C4]/40 shadow-[0_25px_60px_rgba(12,59,69,0.35)] relative overflow-hidden'
                    : 'bg-white text-brand-5 border border-brand-5/10 shadow-sm hover:shadow-xl hover:border-brand-3/40'
                }`}
              >
                {/* Top Section */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2.5">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bebas text-base ${
                        service.featured
                          ? 'bg-[#88C9C4]/20 text-[#88C9C4] border border-[#88C9C4]/40'
                          : 'bg-brand-5/5 text-brand-5 border border-brand-5/15'
                      }`}>
                        {service.id}
                      </span>
                      <span className={`text-[11px] font-bold tracking-widest uppercase ${
                        service.featured ? 'text-[#88C9C4]' : 'text-brand-5/60'
                      }`}>
                        {service.tag}
                      </span>
                    </div>

                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                      service.featured ? 'bg-[#88C9C4]/15 text-[#88C9C4]' : 'bg-brand-5/5 text-brand-3 group-hover:bg-brand-5 group-hover:text-brand-1'
                    }`}>
                      <Icon size={24} strokeWidth={1.75} />
                    </div>
                  </div>

                  <h3 className={`font-bebas text-2xl lg:text-3xl tracking-wide mb-1 leading-tight ${
                    service.featured ? 'text-brand-1' : 'text-brand-5'
                  }`}>
                    {service.title}
                  </h3>
                  
                  <p className={`text-xs font-semibold uppercase tracking-wider mb-4 ${
                    service.featured ? 'text-[#88C9C4]' : 'text-brand-3'
                  }`}>
                    {service.subtitle}
                  </p>

                  <p className={`text-sm leading-relaxed mb-6 font-normal ${
                    service.featured ? 'text-brand-1/80' : 'text-brand-5/75'
                  }`}>
                    {service.description}
                  </p>
                </div>

                {/* Bottom Technical Specifications */}
                <div className={`pt-5 border-t mt-auto flex flex-col gap-2.5 ${
                  service.featured ? 'border-white/10' : 'border-brand-5/10'
                }`}>
                  {service.specs.map(spec => (
                    <div key={spec.label} className="flex items-center justify-between text-xs">
                      <span className={service.featured ? 'text-brand-1/60 font-medium' : 'text-brand-5/60 font-medium'}>
                        {spec.label}
                      </span>
                      <span className={`font-bold font-geist px-2.5 py-0.5 rounded-full border ${
                        service.featured
                          ? 'bg-[#88C9C4]/15 text-[#88C9C4] border-[#88C9C4]/30'
                          : 'bg-brand-5/5 text-brand-5 border-brand-5/10'
                      }`}>
                        {spec.val}
                      </span>
                    </div>
                  ))}

                  <div className="pt-2 flex items-center justify-between">
                    <span className={`text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                      service.featured ? 'text-brand-1/70' : 'text-brand-5/60'
                    }`}>
                      <CheckCircle2 size={13} className={service.featured ? 'text-[#88C9C4]' : 'text-brand-3'} />
                      {service.badge}
                    </span>
                  </div>
                </div>

                {/* Decorative background glow on featured card */}
                {service.featured && (
                  <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#88C9C4]/10 rounded-full blur-2xl pointer-events-none"></div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default CatalogSpecsSection;
