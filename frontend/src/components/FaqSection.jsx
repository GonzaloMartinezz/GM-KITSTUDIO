import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Mail } from 'lucide-react';
import { Particles } from './ui/Particles';

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { 
      title: "¿Qué incluye el servicio de GM Kit?", 
      text: "Nuestros kits incluyen todo el material esterilizado y descartable necesario para la intervención elegida, empaquetado bajo estrictas normas de bioseguridad y listo para su uso inmediato en quirófano." 
    },
    { 
      title: "¿Cuáles son los precios y tiempos de entrega?", 
      text: "Ofrecemos precios competitivos adaptados al volumen de tu clínica. Los envíos se realizan de manera ágil y segura, garantizando la recepción de los insumos en el menor tiempo posible para que nunca te falte stock." 
    },
    { 
      title: "¿Cómo garantizan la bioseguridad?", 
      text: "Todos nuestros productos pasan por procesos de esterilización validados internacionalmente (como rayos Gamma o ETO) y cuentan con aprobación de la ANMAT, garantizando una barrera bacteriológica total." 
    },
    { 
      title: "¿Tienen soporte y atención a clínicas?", 
      text: "Sí, contamos con atención personalizada y soporte excepcional para resolver dudas técnicas sobre especificaciones, usos clínicos y guías de descarte de nuestros kits quirúrgicos." 
    },
    { 
      title: "¿Realizan envíos a todo el país?", 
      text: "Por supuesto. Tenemos un dominio integral de logística que nos permite llegar a clínicas de toda Argentina con empaques especialmente diseñados para proteger la esterilidad durante el transporte." 
    }
  ];

  return (
    <section className="py-32 px-4 font-geist relative z-30 bg-[#0C0C0C] overflow-hidden">
      <Particles
        className="absolute inset-0 z-0"
        quantity={60}
        ease={80}
        color="#ffffff"
        refresh
      />
      <div className="relative z-10 max-w-3xl mx-auto bg-white rounded-[2.5rem] p-6 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.3)] border border-brand-5/5">
        
        {/* Header: Contact Info */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <p className="text-brand-5/50 text-xs font-bold mb-1 ml-1 uppercase tracking-wider">Email</p>
            <a href="mailto:contacto@gmkitstudio.com" className="text-[#1E293B] font-bold text-lg hover:text-brand-3 transition-colors underline decoration-brand-5/20 underline-offset-4">
              contacto@gmkitstudio.com
            </a>
          </div>
          
          <button className="bg-[#1C1C1C] text-white px-6 py-3.5 rounded-2xl font-medium text-sm flex items-center gap-3 hover:bg-black transition-colors shadow-xl shadow-black/10">
            <Mail size={18} />
            <span>Ponerse en contacto</span>
          </button>
        </div>

        {/* FAQ List */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div 
                key={idx}
                layout
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="bg-[#F8F9FA] rounded-2xl overflow-hidden cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <div className="p-5 md:p-6 flex justify-between items-center gap-4">
                  <h3 className="text-[#1E293B] font-medium text-[15px] md:text-[17px] leading-snug">{faq.title}</h3>
                  <div className="w-8 h-8 shrink-0 rounded-full flex items-center justify-center bg-[#1C1C1C] text-white shadow-sm transition-transform hover:scale-105">
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </div>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="px-5 md:px-6 pb-6"
                    >
                      <p className="text-[#1E293B]/70 text-sm md:text-[15px] leading-relaxed pr-8">
                        {faq.text}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
