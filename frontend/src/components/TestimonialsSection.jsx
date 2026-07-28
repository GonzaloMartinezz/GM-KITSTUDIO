import React from 'react';
import { Marquee } from './ui/Marquee';

const TestimonialCard = ({ author, text }) => {
  return (
    <div className="bg-[#111] border border-white/5 p-6 md:p-8 rounded-[1.5rem] w-[320px] md:w-[400px] shadow-lg flex flex-col gap-4 text-left mx-4 hover:border-white/20 transition-colors relative">
      
      {/* X (Twitter) Logo */}
      <svg className="absolute top-6 right-6 w-5 h-5 text-white/50" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>

      <div className="flex items-center gap-4 mb-2">
        {author.avatar ? (
          <img src={author.avatar} alt={author.name} className="w-12 h-12 rounded-full object-cover" />
        ) : (
          <div className="w-12 h-12 rounded-full bg-brand-3 text-brand-5 flex items-center justify-center font-bebas text-2xl tracking-wider">
             {author.name.charAt(0)}
          </div>
        )}
        <div className="flex flex-col">
          <div className="font-bebas tracking-wide text-white text-xl leading-none">{author.name}</div>
          <div className="font-geist text-xs text-white/50 mt-1">{author.handle}</div>
        </div>
      </div>

      <p className="font-geist text-white/80 text-sm md:text-base leading-relaxed">
        "{text}"
      </p>
    </div>
  );
};

const LogoCard = ({ name }) => (
  <div className="bg-transparent border border-transparent p-6 flex items-center justify-center w-[200px] md:w-[250px] mx-4">
    <div className="flex items-center gap-3 opacity-30 hover:opacity-100 transition-opacity cursor-pointer">
      <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center">
        <div className="w-4 h-4 bg-white rounded-sm rotate-45"></div>
      </div>
      <h3 className="font-bebas text-4xl text-white tracking-widest lowercase">{name}</h3>
    </div>
  </div>
);

export const TestimonialsSection = ({ title, description, testimonials, className }) => {
  
  // Split items for two rows if there are enough, and interleave logos
  const row1 = [
    { type: 'card', ...testimonials[0] },
    { type: 'logo', name: 'amara' },
    { type: 'card', ...testimonials[1] },
    { type: 'logo', name: 'kanba' },
  ];
  
  const row2 = [
    { type: 'logo', name: 'hexa' },
    { type: 'card', ...testimonials[2] },
    { type: 'logo', name: 'vertex' },
    { type: 'card', ...testimonials[3] },
  ];

  return (
    <section className={`bg-[#0A0A0A] py-24 md:py-32 px-0 overflow-hidden relative z-40 rounded-t-[60px] -mt-10 shadow-[0_-20px_40px_rgba(0,0,0,0.5)] ${className || ''}`}>
      
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '4rem 4rem' }}></div>

      <div className="relative z-10 max-w-[1400px] mx-auto flex flex-col items-center gap-12 md:gap-16 text-center">
        
        <div className="flex flex-col items-center gap-4 px-4 max-w-3xl">
          <h2 className="text-5xl md:text-7xl font-bebas text-white leading-[0.9] tracking-wider uppercase">
            {title}
          </h2>
          <p className="text-sm md:text-lg font-geist text-white/60 font-medium">
            {description}
          </p>
        </div>

        <div className="relative w-full flex flex-col justify-center overflow-hidden py-8 gap-6">
          
          <Marquee pauseOnHover className="[--duration:45s] [--gap:0]">
            {row1.map((item, i) => (
              item.type === 'card' ? 
                <TestimonialCard key={`r1-${i}`} author={item.author} text={item.text} /> :
                <LogoCard key={`r1-${i}`} name={item.name} />
            ))}
          </Marquee>

          <Marquee pauseOnHover reverse className="[--duration:55s] [--gap:0]">
            {row2.map((item, i) => (
              item.type === 'card' ? 
                <TestimonialCard key={`r2-${i}`} author={item.author} text={item.text} /> :
                <LogoCard key={`r2-${i}`} name={item.name} />
            ))}
          </Marquee>

          {/* Fade gradients */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10" />
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
