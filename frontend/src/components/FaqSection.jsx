import React from 'react';
import { Mail } from 'lucide-react';
import { Particles } from './ui/Particles';

const FaqSection = () => {
  const faqs = [
    { num: "01", title: "¿QUÉ INCLUYE EL SERVICIO?", subtitle: "Kits Listos para Usar", text: "Nuestros kits incluyen todo el material esterilizado y descartable necesario para la intervención elegida, empaquetado bajo estrictas normas de bioseguridad y listo para su uso inmediato en quirófano.", category: "PRODUCTOS", bg: "bg-[#F3F3F3] border-2 border-brand-5/10", text_color: "text-brand-5" },
    { num: "02", title: "¿CUÁLES SON LOS PRECIOS?", subtitle: "Adaptables a tu volumen", text: "Ofrecemos precios competitivos adaptados al volumen de tu clínica. Los envíos se realizan de manera ágil y segura, garantizando la recepción en el menor tiempo posible para que nunca te falte stock.", category: "VENTAS", bg: "bg-brand-1", text_color: "text-brand-5" },
    { num: "03", title: "¿CÓMO ES LA BIOSEGURIDAD?", subtitle: "Esterilización Total", text: "Todos nuestros productos pasan por procesos de esterilización validados internacionalmente (como rayos Gamma o ETO) y cuentan con aprobación de la ANMAT, garantizando una barrera bacteriológica total.", category: "CALIDAD", bg: "bg-brand-3", text_color: "text-white" },
    { num: "04", title: "¿TIENEN SOPORTE A CLÍNICAS?", subtitle: "Atención Personalizada", text: "Sí, contamos con atención personalizada y soporte excepcional para resolver dudas técnicas sobre especificaciones, usos clínicos y guías de descarte de nuestros kits quirúrgicos.", category: "SOPORTE", bg: "bg-[#1E293B]", text_color: "text-[#F3F3F3]" },
    { num: "05", title: "¿ENVÍOS A TODO EL PAÍS?", subtitle: "Logística Nacional", text: "Por supuesto. Tenemos un dominio integral de logística que nos permite llegar a clínicas de toda Argentina con empaques especialmente diseñados para proteger la esterilidad durante el transporte.", category: "LOGÍSTICA", bg: "bg-brand-5", text_color: "text-brand-1" },
    { num: "06", title: "¿FORMAS DE PAGO?", subtitle: "Múltiples Opciones", text: "Aceptamos transferencias bancarias, tarjetas de crédito, tarjetas de débito y pagos en efectivo para brindar la mayor comodidad y flexibilidad financiera a tu clínica odontológica.", category: "PAGOS", bg: "bg-white border-2 border-brand-3/20", text_color: "text-brand-5" }
  ];

  return (
    <section className="py-24 px-4 md:px-8 font-geist relative z-30 bg-[#0C0C0C] text-white">
      <Particles
        className="absolute inset-0 z-0 pointer-events-none"
        quantity={60}
        ease={80}
        color="#ffffff"
        refresh
      />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col">

        {/* Header: Contact Info */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 sm:mb-16 bg-white/5 backdrop-blur-md p-5 sm:p-6 md:p-8 rounded-3xl sm:rounded-4xl border border-white/10">
          <div>
            <p className="text-white/50 text-xs font-bold mb-1 ml-1 uppercase tracking-wider">Email Directo</p>
            <a href="mailto:gonzalomartinezzz04@gmail.com" className="text-white font-bebas tracking-wide text-xl sm:text-2xl md:text-3xl hover:text-brand-3 transition-colors break-all sm:break-normal">
              gonzalomartinezzz04@gmail.com
            </a>
          </div>

          <a href="mailto:gonzalomartinezzz04@gmail.com?subject=Consulta%20GM%20Kit%20Studio" className="bg-brand-3 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-xs sm:text-sm uppercase tracking-widest flex items-center gap-3 hover:bg-brand-4 transition-colors shadow-xl shadow-brand-3/20 cursor-pointer">
            <Mail size={18} />
            <span>Ponerse en contacto</span>
          </a>
        </div>

        {/* FAQ Sticky Cards */}
        <div className="flex flex-col relative w-full">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`sticky flex flex-col p-6 sm:p-8 md:p-10 min-h-[28vh] sm:min-h-[35vh] rounded-3xl sm:rounded-4xl md:rounded-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.15)] overflow-hidden ${faq.bg} ${faq.text_color}`}
              style={{
                top: `calc(10vh + ${i * 16}px)`, 
                marginBottom: '25vh',
                zIndex: i
              }}
            >
              {/* Large Background Watermark Number */}
              <div className={`absolute -right-5 -bottom-5 text-[8rem] sm:text-[10rem] md:text-[14rem] font-bebas leading-none font-bold opacity-5 pointer-events-none select-none ${faq.text_color === 'text-white' || faq.text_color === 'text-brand-1' || faq.text_color === 'text-[#F3F3F3]' ? 'text-white' : 'text-brand-5'}`}>
                {faq.num}
              </div>

              <div className="relative z-10 flex flex-col gap-4 sm:gap-6">
                <div className="flex items-center gap-3 sm:gap-4 border-b border-current/10 pb-4 sm:pb-6">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bebas text-xl sm:text-2xl shrink-0 ${faq.text_color === 'text-brand-5' ? 'bg-brand-5 text-white' : 'bg-white text-brand-5'}`}>
                    {faq.num}
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] opacity-60 mb-0.5 sm:mb-1">{faq.category}</p>
                    <h4 className="font-bebas text-2xl sm:text-3xl md:text-4xl tracking-wide leading-none">{faq.title}</h4>
                  </div>
                </div>

                <div>
                  <h5 className="font-bold text-sm uppercase tracking-widest mb-3 opacity-80">{faq.subtitle}</h5>
                  <p className="opacity-90 font-light text-base md:text-lg leading-relaxed max-w-2xl">
                    {faq.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
