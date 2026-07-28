import React, { useState } from 'react';
import { Star, CheckCircle2 } from 'lucide-react';

const ReviewForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-brand-5 rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.15)] mt-8 md:mt-12 text-brand-1">
      <h2 className="font-bebas text-4xl md:text-5xl text-brand-3 mb-10 tracking-wide text-center">Dejanos tu Reseña</h2>
      
      {submitted ? (
        <div className="bg-brand-1/10 rounded-3xl p-12 flex flex-col items-center justify-center text-center h-[400px] border border-white/5">
          <CheckCircle2 className="w-20 h-20 text-[#10B981] mb-6" />
          <h4 className="font-bebas text-4xl mb-3 text-white">¡GRACIAS POR TU RESEÑA!</h4>
          <p className="text-white/60 text-lg">Tu opinión ha sido enviada y será publicada a la brevedad.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          
          <div className="flex flex-col items-center mb-4">
            <label className="block text-sm font-medium mb-3 text-white/80 uppercase tracking-widest">
              Tu Calificación <span className="text-brand-3">*</span>
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(star => (
                <Star 
                  key={star}
                  onClick={() => setRating(star)}
                  className={`w-10 h-10 cursor-pointer transition-transform hover:scale-110 ${star <= rating ? 'text-[#F59E0B] fill-[#F59E0B]' : 'text-white/10 fill-white/10 hover:text-white/30 hover:fill-white/30'}`}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-white/80">
                Nombre <span className="text-brand-3">*</span>
              </label>
              <input 
                type="text" 
                required
                placeholder="Ej. Dr. Juan Pérez"
                className="w-full bg-brand-1/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:bg-white/10 focus:border-brand-3 transition-all text-white placeholder-white/30"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-white/80">
                Email <span className="text-brand-3">*</span>
              </label>
              <input 
                type="email" 
                required
                placeholder="juan@ejemplo.com"
                className="w-full bg-brand-1/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:bg-white/10 focus:border-brand-3 transition-all text-white placeholder-white/30"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-white/80">
              Tu Reseña <span className="text-brand-3">*</span>
            </label>
            <textarea 
              required
              rows="4"
              placeholder="Escribe tu experiencia aquí..."
              className="w-full bg-brand-1/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:bg-white/10 focus:border-brand-3 transition-all text-white placeholder-white/30 resize-none"
            ></textarea>
          </div>

          <button 
            type="submit"
            className="w-full bg-brand-3 text-brand-5 font-bebas text-xl tracking-widest py-5 rounded-2xl hover:bg-[#E8CBA3] transition-colors shadow-[0_10px_20px_rgba(243,230,213,0.1)] mt-4 flex justify-center items-center gap-2"
          >
            Enviar Reseña
          </button>
        </form>
      )}
    </div>
  );
};

export default ReviewForm;
