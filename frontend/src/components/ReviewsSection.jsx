import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Send, CheckCircle2 } from 'lucide-react';
import { TestimonialsColumn } from './ui/TestimonialsColumn';

const ReviewsSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [ratings, setRatings] = useState({
    envios: 0,
    confianza: 0,
    precios: 0,
    producto: 0,
    atencion: 0
  });

  const handleStarClick = (category, value) => {
    setRatings(prev => ({ ...prev, [category]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate DB save
    setTimeout(() => {
      setSubmitted(true);
    }, 800);
  };

  const categories = [
    { id: 'envios', label: 'Envíos' },
    { id: 'confianza', label: 'Confianza' },
    { id: 'precios', label: 'Precios' },
    { id: 'producto', label: 'Producto' },
    { id: 'atencion', label: 'Atención' }
  ];

  const mockReviews1 = [
    {
      name: "Dr. Roberto Sánchez",
      role: "Centro Odontológico RS",
      text: "Excelente calidad de los kits, la entrega siempre es puntual y el soporte técnico es de primera. Muy recomendados.",
      stars: 5
    },
    {
      name: "Dra. María Gómez",
      role: "Implantes Tucumán",
      text: "Los precios son muy competitivos y los materiales cumplen con todas las normativas. Me da mucha confianza trabajar con GM Kit.",
      stars: 5
    },
    {
      name: "Dr. Carlos Ruiz",
      role: "Clínica Dental Sonrisas",
      text: "Increíble la rapidez de los envíos. Los kits llegaron en perfectas condiciones y la calidad es indiscutible.",
      stars: 5
    }
  ];

  const mockReviews2 = [
    {
      name: "Dra. Laura Fernández",
      role: "Ortodoncia Integral",
      text: "La plataforma es súper intuitiva. Hacer un pedido me toma dos minutos y sé que llega a tiempo para mis cirugías.",
      stars: 5
    },
    {
      name: "Dr. Esteban Quirós",
      role: "Maxilofacial Especialistas",
      text: "La bioseguridad es fundamental para nosotros y GM Kit nunca decepciona. Sus productos son nuestra primera opción.",
      stars: 5
    },
    {
      name: "Dra. Ana López",
      role: "Odontología Preventiva",
      text: "El trato personalizado y la facilidad para gestionar el stock nos ha salvado de muchos apuros. ¡Excelente servicio!",
      stars: 5
    }
  ];

  return (
    <div className="w-full mt-24">
      {/* Existing Reviews */}
      <div className="mb-20 text-center">
        <h2 className="text-4xl md:text-5xl font-bebas text-brand-2 mb-4 tracking-wide">LA GENTE QUE CONFÍA EN NOSOTROS</h2>
        <p className="font-geist text-brand-1/70 max-w-2xl mx-auto mb-12">
          Profesionales que ya eligieron la seguridad y eficiencia de nuestros productos.
        </p>
        
        <div className="flex justify-center gap-6 overflow-hidden h-[600px] max-w-5xl mx-auto px-4 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
          <TestimonialsColumn 
            testimonials={mockReviews1} 
            duration={20} 
            className="w-full max-w-sm hidden md:block" 
          />
          <TestimonialsColumn 
            testimonials={mockReviews2} 
            duration={25} 
            className="w-full max-w-sm" 
          />
        </div>
      </div>

      {/* Leave a Review Card (Matching the CONTÁCTANOS structure) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-4"
      >
        <div className="relative overflow-hidden group bg-[#0C3B45] rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 min-h-[400px] flex flex-col md:flex-row shadow-2xl border border-[#88C9C4]/10">
          
          {/* Wave effect */}
          <div className="absolute top-[120%] left-1/2 -translate-x-1/2 w-[200%] md:w-[150%] aspect-square bg-[#88C9C4]/10 rounded-[40%] group-hover:top-[-80%] transition-all duration-[2000ms] ease-in-out z-0 pointer-events-none"></div>
          
          <div className="relative z-10 w-full flex flex-col md:flex-row justify-between gap-12">
            
            {/* Left side text */}
            <div className="max-w-md flex flex-col justify-center">
              <h3 className="font-bebas text-5xl md:text-6xl text-white group-hover:text-[#88C9C4] transition-colors duration-700 mb-4 leading-[0.9] tracking-wide">
                DEJANOS TU RESEÑA
              </h3>
              <p className="font-geist text-white/70 group-hover:text-[#88C9C4]/90 transition-colors duration-700 text-sm md:text-base font-medium leading-relaxed">
                Tu opinión es fundamental para nosotros. Evalúa nuestros servicios y ayúdanos a seguir mejorando para brindarte la mejor experiencia.
              </p>
            </div>
            
            {/* Right side form */}
            <div className="flex-grow w-full md:max-w-lg bg-white/5 backdrop-blur-sm border border-white/10 p-6 md:p-8 rounded-[2rem] z-20">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-8">
                  <div className="w-16 h-16 bg-[#88C9C4]/20 rounded-full flex items-center justify-center text-[#88C9C4]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-bebas text-3xl text-white">¡GRACIAS POR TU RESEÑA!</h4>
                  <p className="font-geist text-white/60 text-sm">Tu opinión ha sido enviada y será publicada a la brevedad.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {categories.map((cat) => (
                      <div key={cat.id} className="flex flex-col gap-1">
                        <span className="font-geist text-xs uppercase tracking-widest text-white/50">{cat.label}</span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star}
                              onClick={() => handleStarClick(cat.id, star)}
                              className={`w-5 h-5 cursor-pointer transition-colors ${
                                star <= ratings[cat.id] ? 'text-[#88C9C4] fill-[#88C9C4]' : 'text-white/20'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-1 mt-2">
                    <label className="font-geist text-xs uppercase tracking-widest text-white/50">Tu Comentario</label>
                    <textarea 
                      required
                      placeholder="Escribe tu experiencia aquí..."
                      className="w-full bg-transparent border-b border-white/20 py-2 text-white font-geist placeholder:text-white/30 focus:outline-none focus:border-[#88C9C4] resize-none h-20 transition-colors"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="mt-2 bg-[#88C9C4] hover:bg-[#6EB8B3] text-[#0C3B45] w-full py-4 rounded-xl font-bebas text-xl tracking-wider transition-colors shadow-lg flex items-center justify-center gap-2"
                  >
                    ENVIAR RESEÑA <Send size={20} className="-mt-1" />
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ReviewsSection;
