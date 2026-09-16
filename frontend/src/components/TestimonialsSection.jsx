import React from 'react';
import { Building2 } from 'lucide-react';
import { Marquee } from './ui/Marquee';

const TestimonialCard = ({ author, text }) => {
  return (
    <div className="bg-[#111] border border-white/10 p-6 md:p-8 rounded-3xl w-77.5 sm:w-90 md:w-96 shadow-lg flex flex-col gap-4 text-left mx-3 hover:border-[#88C9C4]/40 transition-colors relative shrink-0">

      <div className="flex items-center justify-between gap-3 mb-1">
        <div className="flex items-center gap-3 min-w-0">
          {author.avatar ? (
            <img src={author.avatar} alt={author.name} className="w-12 h-12 rounded-full object-cover border border-[#88C9C4]/40 shrink-0" />
          ) : (
            <div className="w-12 h-12 rounded-full bg-[#0C3B45] text-[#88C9C4] border border-[#88C9C4]/40 flex items-center justify-center font-bebas text-2xl tracking-wider shrink-0">
              {author.name.charAt(0)}
            </div>
          )}
          <div className="flex flex-col min-w-0">
            <div className="font-bebas tracking-wide text-white text-lg sm:text-xl leading-tight truncate">{author.name}</div>
            <div className="font-geist text-xs text-[#88C9C4] truncate">{author.handle}</div>
          </div>
        </div>

        <div className="shrink-0 flex items-center gap-1 bg-[#0C3B45] text-[#88C9C4] px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold tracking-wider">
          <span>✓ VERIFICADO</span>
        </div>
      </div>

      <p className="font-geist text-white/80 text-xs sm:text-sm md:text-[15px] leading-relaxed">
        "{text}"
      </p>
    </div>
  );
};

const LogoCard = ({ name, subtitle }) => (
  <div className="bg-[#161616] border border-white/10 hover:border-[#88C9C4]/40 px-5 py-4 rounded-2xl flex items-center gap-3.5 mx-3 shrink-0 shadow-md group transition-all duration-300">
    <div className="w-10 h-10 rounded-xl bg-[#0C3B45] text-[#88C9C4] border border-[#88C9C4]/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
      <Building2 size={20} />
    </div>
    <div className="flex flex-col text-left">
      <h4 className="font-bebas text-lg md:text-xl text-white tracking-wider leading-none group-hover:text-[#88C9C4] transition-colors">
        {name}
      </h4>
      <span className="font-geist text-[10px] md:text-[11px] text-[#88C9C4] font-medium tracking-wide mt-0.5">
        {subtitle || 'Centro Clínico Odontológico'}
      </span>
    </div>
  </div>
);

export const TestimonialsSection = ({ title, description, testimonials = [], className }) => {

  // Row 1 items: First batch of testimonials interleaved with clinic badges
  const row1 = [
    { type: 'card', ...(testimonials[0] || {}) },
    { type: 'logo', name: 'CENTRO ODONTOLÓGICO C&M', subtitle: 'Atención Quirúrgica' },
    { type: 'card', ...(testimonials[1] || {}) },
    { type: 'logo', name: 'STUDIO DENTAL', subtitle: 'Clínica Odontológica' },
    { type: 'card', ...(testimonials[2] || {}) },
  ];

  // Row 2 items: Second batch of testimonials interleaved with clinic badges
  const row2 = [
    { type: 'logo', name: '3D DENTAL STUDIO', subtitle: 'Implantología & 3D' },
    { type: 'card', ...(testimonials[3] || {}) },
    { type: 'card', ...(testimonials[4] || {}) },
    { type: 'logo', name: 'CENTRO ODONTOLÓGICO C&M', subtitle: 'Cirugía Bucal' },
    { type: 'card', ...(testimonials[5] || {}) },
    { type: 'card', ...(testimonials[6] || {}) },
  ];

  return (
    <section className={`bg-[#0A0A0A] py-20 md:py-28 px-0 overflow-hidden relative z-40 rounded-t-[60px] -mt-10 shadow-[0_-20px_40px_rgba(0,0,0,0.5)] ${className || ''}`}>

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '4rem 4rem' }}></div>

      <div className="relative z-10 max-w-350 mx-auto flex flex-col items-center gap-10 md:gap-14 text-center">

        <div className="flex flex-col items-center gap-3 px-4 max-w-3xl">
          <h2 className="text-4xl xs:text-5xl md:text-7xl font-bebas text-white leading-[0.9] tracking-wider uppercase">
            {title}
          </h2>
          <p className="text-xs sm:text-sm md:text-base font-geist text-white/60 font-medium max-w-xl">
            {description}
          </p>
        </div>

        <div className="relative w-full flex flex-col justify-center overflow-hidden py-4 gap-4 sm:gap-6">

          {/* Row 1: Fast Marquee */}
          <Marquee pauseOnHover duration={12} className="[--gap:0]">
            {row1.map((item, i) => (
              item.type === 'card' && item.author ?
                <TestimonialCard key={`r1-${i}`} author={item.author} text={item.text} /> :
                item.type === 'logo' ?
                  <LogoCard key={`r1-${i}`} name={item.name} subtitle={item.subtitle} /> : null
            ))}
          </Marquee>

          {/* Row 2: Fast Reverse Marquee */}
          <Marquee pauseOnHover reverse duration={14} className="[--gap:0]">
            {row2.map((item, i) => (
              item.type === 'card' && item.author ?
                <TestimonialCard key={`r2-${i}`} author={item.author} text={item.text} /> :
                item.type === 'logo' ?
                  <LogoCard key={`r2-${i}`} name={item.name} subtitle={item.subtitle} /> : null
            ))}
          </Marquee>

          {/* Fade gradients */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-40 bg-linear-to-r from-[#0A0A0A] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-40 bg-linear-to-l from-[#0A0A0A] to-transparent z-10" />
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;

