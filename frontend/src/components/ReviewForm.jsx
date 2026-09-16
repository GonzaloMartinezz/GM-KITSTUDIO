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
    <div className="w-full max-w-4xl mx-auto bg-linear-to-b from-[#2A3A48] to-[#1e2f3e] rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-14 shadow-2xl border border-white/10 mt-8 md:mt-12 text-white">
      <h2 className="font-bebas text-4xl md:text-5xl text-white mb-2 tracking-wide text-center">Dejanos tu Reseña</h2>
      <p className="text-center text-white/60 text-sm mb-10">Tu opinión nos ayuda a seguir mejorando.</p>

      {submitted ? (
        <div className="bg-white/5 rounded-3xl p-12 flex flex-col items-center justify-center text-center h-100 border border-white/10">
          <CheckCircle2 className="w-20 h-20 text-[#88C9C4] mb-6" />
          <h4 className="font-bebas text-4xl mb-3 text-white">¡GRACIAS POR TU RESEÑA!</h4>
          <p className="text-white/70 text-lg">Tu experiencia ha sido enviada y será publicada a la brevedad.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          {/* Calificación interactiva con hover */}
          <div className="flex flex-col items-center mb-6">
            <label className="block text-xs font-bold mb-3 text-white/50 uppercase tracking-widest">
              Tu Calificación <span className="text-[#88C9C4]">*</span>
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(star => (
                <Star
                  key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className={`w-12 h-12 cursor-pointer transition-all duration-200 ${star <= (hoverRating || rating)
                    ? 'text-amber-400 fill-amber-400 scale-110 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]'
                    : 'text-white/20 fill-white/10 hover:text-white/40'
                    }`}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold mb-2 text-white/70 uppercase tracking-wider">
                Nombre <span className="text-[#88C9C4]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ej. Dr. Juan Pérez"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:bg-white/10 focus:border-[#88C9C4] focus:ring-1 focus:ring-[#88C9C4] transition-all text-white placeholder-white/30 shadow-inner"
              />
            </div>

            <div>
              <label className="block text-xs font-bold mb-2 text-white/70 uppercase tracking-wider">
                Email <span className="text-[#88C9C4]">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="juan@ejemplo.com"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:bg-white/10 focus:border-[#88C9C4] focus:ring-1 focus:ring-[#88C9C4] transition-all text-white placeholder-white/30 shadow-inner"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold mb-2 text-white/70 uppercase tracking-wider">
              Tu Reseña <span className="text-[#88C9C4]">*</span>
            </label>
            <textarea
              required
              rows="4"
              placeholder="Escribe tu experiencia aquí..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:bg-white/10 focus:border-[#88C9C4] focus:ring-1 focus:ring-[#88C9C4] transition-all text-white placeholder-white/30 resize-none shadow-inner"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-[#88C9C4] text-[#0C3B45] font-bold text-sm tracking-widest uppercase py-5 rounded-2xl hover:bg-[#6EB8B2] hover:scale-[1.01] transition-all shadow-[0_8px_20px_rgba(136,201,196,0.25)] mt-4 flex justify-center items-center gap-2"
          >
            Enviar Reseña
          </button>
        </form>
      )}
    </div>
  );
};

export default ReviewForm;
