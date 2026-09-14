import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Target, Users, Activity, MapPin, Stethoscope, Truck } from 'lucide-react';
import ReviewsSection from '../components/ReviewsSection';
import { Hero } from '../components/ui/hero-1';

const About = () => {
  return (
    <div className="min-h-screen bg-[#F3F3F3] text-[#0C0C0C] font-geist pb-0" style={{ overflowX: 'clip' }}>

      {/* 1. Hero */}
      <Hero
        title="HOLA, SOMOS <br/> GM KIT STUDIO."
        subtitle="BIOSEGURIDAD ✦ KITS DESCARTABLES ✦ IMPLANTES"
        eyebrow="TUCUMÁN, ARGENTINA"
        ctaLabel="CATÁLOGO"
        ctaHref="/productos"
      />

      {/* 2. Slanted Marquee Bar */}
      <div className="relative w-[110%] left-[-5%] bg-brand-5 text-brand-1 py-5 md:py-7 transform -rotate-2 md:-rotate-3 shadow-[0_-15px_40px_rgba(0,0,0,0.25),0_15px_40px_rgba(0,0,0,0.3)] z-30 overflow-x-hidden flex whitespace-nowrap -mt-16 md:-mt-24 border-y border-brand-3/30 backdrop-blur-md">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex items-center gap-8 font-bebas text-2xl md:text-3xl tracking-widest uppercase"
        >
          {Array(10).fill("✦ DISEÑO ✦ BIOSEGURIDAD ✦ PROTECCIÓN TOTAL ✦ LOGÍSTICA").map((text, i) => (
            <span key={i}>{text}</span>
          ))}
        </motion.div>
      </div>

      {/* 3. About info */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24 max-w-350 mx-auto relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-24">
        <div className="lg:w-1/2">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-brand-5/5 border border-brand-5/10 mb-8">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-brand-5/80">GM KIT STUDIO</span>
            <span className="text-brand-3">✦</span>
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-brand-5/80">SAN MIGUEL DE TUCUMÁN</span>
          </div>
          <h2 className="font-bebas text-5xl md:text-7xl text-brand-5 leading-[0.9] tracking-tight">
            NUESTRA MISIÓN:<br />
            <span className="text-brand-3">TRANSFORMAR Y AGILIZAR</span><br />
            LA COMPRA DE KITS QUIRÚRGICOS.
          </h2>
        </div>

        <div className="lg:w-1/2 flex flex-col justify-center">
          <p className="text-lg md:text-2xl text-brand-5/80 leading-relaxed font-geist font-light mb-12">
            Queremos eliminar las demoras y complicaciones, brindando un e-commerce rápido, intuitivo y estético que entregue calidad certificada en tiempo récord. Sabemos que en el quirófano no hay margen de error. Por eso, todos nuestros productos están rigurosamente testeados, esterilizados bajo normas internacionales y cuentan con aprobación. Tu seguridad y la de tu paciente es nuestra prioridad.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-brand-5/10">
            {[
              { Icon: MapPin, label: 'UBICACIÓN', value: 'TUCUMÁN, ARG' },
              { Icon: Stethoscope, label: 'ESPECIALIDAD', value: 'ODONTOLOGÍA' },
              { Icon: Truck, label: 'ENVÍOS', value: 'NACIONALES' },
            ].map(({ Icon, label, value }) => (
              <div key={label} className="flex flex-col gap-3 p-6 rounded-2xl bg-white border border-brand-5/5 shadow-sm hover:shadow-md transition-shadow">
                <Icon className="w-6 h-6 text-brand-3" />
                <div>
                  <p className="text-[10px] text-brand-5/50 font-bold uppercase tracking-widest mb-1">{label}</p>
                  <p className="font-bebas text-2xl text-brand-5 leading-none">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Stat Blocks */}
      <section className="px-6 md:px-12 lg:px-24 max-w-350 mx-auto relative z-10 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="flex flex-col items-start p-8 md:p-10 rounded-2xl bg-brand-1 border-2 border-brand-5 transition-transform hover:-translate-y-1">
            <Activity className="w-8 h-8 text-brand-5 mb-16" strokeWidth={1.5} />
            <h3 className="font-bebas text-6xl md:text-7xl text-brand-5 leading-none mb-2">5+</h3>
            <p className="text-base font-geist font-medium text-brand-5/80">Años de experiencia en el sector.</p>
          </div>
          <div className="flex flex-col items-start p-8 md:p-10 rounded-2xl bg-white border-2 border-brand-5 transition-transform hover:-translate-y-1">
            <Users className="w-8 h-8 text-brand-5 mb-16" strokeWidth={1.5} />
            <h3 className="font-bebas text-6xl md:text-7xl text-brand-5 leading-none mb-2">50+</h3>
            <p className="text-base font-geist font-medium text-brand-5/80">Clínicas asociadas en todo el país.</p>
          </div>
          <div className="flex flex-col items-start p-8 md:p-10 rounded-2xl bg-white border-2 border-brand-5 transition-transform hover:-translate-y-1">
            <ShieldCheck className="w-8 h-8 text-brand-5 mb-16" strokeWidth={1.5} />
            <h3 className="font-bebas text-6xl md:text-7xl text-brand-5 leading-none mb-2">100%</h3>
            <p className="text-base font-geist font-medium text-brand-5/80">Aprobación y certificación ANMAT.</p>
          </div>
        </div>
      </section>

      {/* 5. Compromiso de Calidad — Sticky stacking cards (light style) */}
      <section className="px-4 md:px-12 lg:px-24 mx-auto relative z-10" style={{ paddingBottom: '50vh' }}>
        <div className="text-center mb-16 md:mb-32">
          <Target className="w-10 h-10 text-brand-3 mx-auto mb-4" />
          <h2 className="font-bebas text-5xl md:text-7xl text-brand-5 mb-2">COMPROMISO DE CALIDAD</h2>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-5/60">RECONOCIMIENTOS & ESTÁNDARES</p>
        </div>

        <div className="flex flex-col relative w-full max-w-5xl mx-auto">
          {[
            { num: "01", title: "VALIDACIÓN ESTRICTA", subtitle: "Normas ISO - Aprobación ANMAT", desc: "Cada insumo es rigurosamente testeado bajo los más altos estándares nacionales e internacionales. Nuestra prioridad es garantizar que cada kit quirúrgico llegue a tus manos en perfectas condiciones.", category: "CALIDAD", year: "2026", bg: "bg-[#F3F3F3] border-2 border-brand-5/10", text: "text-brand-5" },
            { num: "02", title: "ESTERILIZACIÓN TOTAL", subtitle: "Tecnología de Rayos Gamma", desc: "Implementamos procesos de esterilización de vanguardia, erradicando cualquier microorganismo. Tu seguridad y la de tu paciente es innegociable en el quirófano.", category: "BIOSEGURIDAD", year: "2026", bg: "bg-brand-1", text: "text-brand-5" },
            { num: "03", title: "ENSAMBLAJE PRECISO", subtitle: "Salas Blancas Certificadas", desc: "Nuestros kits se preparan en ambientes controlados, libres de partículas y bajo un estricto monitoreo. Cada componente es manipulado por personal altamente capacitado.", category: "PROCESOS", year: "2026", bg: "bg-brand-3", text: "text-white" },
            { num: "04", title: "CUIDADO INTEGRAL", subtitle: "Logística y Empaque", desc: "Protegemos nuestro producto desde que sale de la planta hasta que llega a tu clínica. Empaques herméticos y envíos controlados que mantienen la esterilidad al 100%.", category: "DISTRIBUCIÓN", year: "2026", bg: "bg-brand-5", text: "text-brand-1" },
          ].map((award, i, arr) => (
            <div
              key={i}
              className={`sticky flex flex-col justify-between p-8 md:p-16 min-h-[50vh] md:min-h-[60vh] rounded-4xl md:rounded-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] overflow-hidden ${award.bg} ${award.text}`}
              style={{
                top: `calc(10vh + ${i * 40}px)`,
                marginBottom: '60vh',
                zIndex: i + 1,
              }}
            >
              {/* Watermark number */}
              <div className={`absolute -right-10 -bottom-10 text-[15rem] md:text-[25rem] font-bebas leading-none font-bold opacity-5 pointer-events-none select-none ${award.text === 'text-white' || award.text === 'text-brand-1' ? 'text-white' : 'text-brand-5'
                }`}>
                {award.num}
              </div>

              <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-8 mb-12">
                <div className="flex items-center gap-6">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center font-bebas text-3xl ${award.text === 'text-brand-5' ? 'bg-brand-5 text-white' : 'bg-white text-brand-5'
                    }`}>
                    {award.num}
                  </div>
                  <div>
                    <h4 className="font-bebas text-4xl md:text-5xl mb-1 tracking-wide">{award.title}</h4>
                    <p className={`text-base md:text-lg font-geist font-medium ${award.text === 'text-brand-5' ? 'text-brand-5/70' : 'text-current/80'
                      }`}>{award.subtitle}</p>
                  </div>
                </div>
                <div className={`flex items-center gap-4 text-sm font-bold uppercase tracking-widest ${award.text === 'text-brand-5' ? 'text-brand-5/50' : 'text-current/60'
                  }`}>
                  <span className="hidden md:inline">{award.category}</span>
                  <span>{award.year}</span>
                </div>
              </div>

              <div className="relative z-10 max-w-2xl mt-auto">
                <p className={`text-lg md:text-2xl font-geist font-light leading-relaxed ${award.text === 'text-brand-5' ? 'text-brand-5/80' : 'text-current/90'
                  }`}>
                  {award.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Reviews */}
      <div className="bg-brand-5 pt-32 pb-20 rounded-t-[60px] relative z-20 mt-20">
        <div className="text-center mb-16">
          <ShieldCheck className="w-10 h-10 text-brand-2 mx-auto mb-4" />
          <h2 className="font-bebas text-5xl text-brand-1 mb-2">LO QUE DICEN NUESTROS CLIENTES</h2>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-1/50">CONFIANZA CLÍNICA</p>
        </div>
        <ReviewsSection />
      </div>

    </div>
  );
};

export default About;
