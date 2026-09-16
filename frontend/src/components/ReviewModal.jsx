import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, X, CheckCircle2, MessageSquare, ThumbsUp } from 'lucide-react';

const ReviewModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('write'); // 'write' | 'view'
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Stats data matching user reference
  const ratingsStats = [
    { label: '5 Estrellas', percent: 85, count: '989' },
    { label: '4 Estrellas', percent: 45, count: '4.5K' },
    { label: '3 Estrellas', percent: 15, count: '50' },
    { label: '2 Estrellas', percent: 5, count: '16' },
    { label: '1 Estrella', percent: 2, count: '8' },
  ];

  // Recent reviews matching user reference
  const recentReviews = [
    {
      name: "Dr. Roberto Sánchez",
      specialty: "Cirugía General",
      text: "Excelente calidad de los kits, el material descartable es de primera y la entrega puntual.",
      stars: 5,
      img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Dra. María Gómez",
      specialty: "Odontología Quirúrgica",
      text: "Los materiales descartables cumplen con todas las normativas más exigentes de bioseguridad.",
      stars: 5,
      img: "https://images.unsplash.com/photo-1594824436951-7f126f5fb5fb?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Dr. Carlos Ruiz",
      specialty: "Implantología",
      text: "Increíble rapidez de entrega y la calidad del trilaminado es indiscutible.",
      stars: 5,
      img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=150&q=80"
    }
  ];

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      try {
        const savedReviews = JSON.parse(localStorage.getItem('gm_user_reviews') || '[]');
        const newReview = {
          id: Date.now(),
          name,
          email,
          rating,
          comment,
          date: new Date().toLocaleDateString('es-AR'),
        };
        savedReviews.unshift(newReview);
        localStorage.setItem('gm_user_reviews', JSON.stringify(savedReviews));
      } catch {
        // storage fallback
      }

      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setName('');
    setEmail('');
    setComment('');
    setRating(5);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#09141A]/85 backdrop-blur-md"
          />

          {/* Modal Container — Compact & proportional */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative w-full max-w-[460px] bg-[#1A2832] border border-white/10 rounded-3xl shadow-[0_20px_70px_rgba(0,0,0,0.6)] text-white my-auto z-10 overflow-hidden"
          >
            {/* Ambient subtle glow */}
            <div className="absolute top-0 right-0 w-60 h-60 bg-[#5D7E8E]/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-brand-2/10 rounded-full blur-[80px] pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/15 transition-all cursor-pointer z-30"
              aria-label="Cerrar modal"
            >
              <X className="w-4 h-4" />
            </button>

            {isSuccess ? (
              /* Success Confirmation */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 sm:p-8 text-center flex flex-col items-center"
              >
                <div className="w-14 h-14 rounded-full bg-[#10B981]/20 border border-[#10B981]/40 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 className="w-7 h-7 text-[#10B981]" />
                </div>
                <h3 className="font-bebas text-3xl text-white tracking-wide mb-2">
                  ¡GRACIAS POR TU RESEÑA!
                </h3>
                <p className="font-geist text-white/70 text-xs sm:text-sm max-w-xs mx-auto mb-6 font-light leading-relaxed">
                  Tu opinión nos ayuda un montón a seguir ofreciendo la mejor calidad de materiales descartables del mercado.
                </p>
                <button
                  onClick={handleResetAndClose}
                  className="bg-[#5D7E8E] hover:bg-[#6E93A5] text-white font-bebas text-base tracking-widest px-8 py-2.5 rounded-full shadow-md transition-all cursor-pointer"
                >
                  VOLVER A LA PÁGINA
                </button>
              </motion.div>
            ) : (
              /* Main Content */
              <div 
                className="p-4 sm:p-6 max-h-[88vh] overflow-y-auto [&::-webkit-scrollbar]:hidden"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {/* Tabs Switcher: Write vs View */}
                <div className="flex items-center justify-center gap-1.5 mb-5 bg-black/25 p-1 rounded-full border border-white/10 max-w-xs mx-auto">
                  <button
                    type="button"
                    onClick={() => setActiveTab('write')}
                    className={`flex-1 py-1.5 px-2.5 sm:px-3 rounded-full font-bebas text-[11px] sm:text-xs tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1 ${
                      activeTab === 'write'
                        ? 'bg-[#5D7E8E] text-white shadow-sm'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>DEJAR RESEÑA</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('view')}
                    className={`flex-1 py-1.5 px-2.5 sm:px-3 rounded-full font-bebas text-[11px] sm:text-xs tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1 ${
                      activeTab === 'view'
                        ? 'bg-[#5D7E8E] text-white shadow-sm'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>OPINIONES (4.8 ★)</span>
                  </button>
                </div>

                {activeTab === 'write' ? (
                  /* TAB 1: Review Form (compact & well-proportioned) */
                  <div>
                    {/* Header */}
                    <div className="text-center mb-4">
                      <h2 className="font-bebas text-2xl sm:text-4xl text-white tracking-wide leading-none mb-0.5">
                        DÉJANOS TU RESEÑA
                      </h2>
                      <p className="text-brand-2 font-geist text-[10px] uppercase tracking-wider font-semibold">
                        ¡Tu opinión nos ayudaría un montón!
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-3.5">
                      {/* Rating Stars */}
                      <div className="flex flex-col items-center">
                        <label className="text-[10px] font-bold text-white/70 uppercase tracking-widest mb-1.5">
                          Tu Calificación <span className="text-[#F59E0B]">*</span>
                        </label>
                        <div className="flex gap-1 sm:gap-1.5">
                          {[1, 2, 3, 4, 5].map((star) => {
                            const active = (hoverRating || rating) >= star;
                            return (
                              <button
                                type="button"
                                key={star}
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                className="p-0.5 cursor-pointer transition-transform hover:scale-120 focus:outline-none"
                              >
                                <Star
                                  className={`w-6 h-6 sm:w-8 sm:h-8 transition-colors duration-150 ${
                                    active
                                      ? 'text-[#F59E0B] fill-[#F59E0B] drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]'
                                      : 'text-white/20 fill-white/10'
                                  }`}
                                />
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Inputs Grid: Name & Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1 text-white/80">
                            Nombre <span className="text-brand-2">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Ej. Dr. Juan Pérez"
                            className="w-full bg-[#243542]/70 border border-white/10 rounded-xl px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs sm:text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#5D7E8E] focus:bg-[#243542] transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1 text-white/80">
                            Email <span className="text-brand-2">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="juan@ejemplo.com"
                            className="w-full bg-[#243542]/70 border border-white/10 rounded-xl px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs sm:text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#5D7E8E] focus:bg-[#243542] transition-all"
                          />
                        </div>
                      </div>

                      {/* Review Textarea */}
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1 text-white/80">
                          Tu Reseña <span className="text-brand-2">*</span>
                        </label>
                        <textarea
                          required
                          rows="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Escribe tu experiencia con el material descartable y el servicio..."
                          className="w-full bg-[#243542]/70 border border-white/10 rounded-xl px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs sm:text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#5D7E8E] focus:bg-[#243542] transition-all resize-none"
                        ></textarea>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#5D7E8E] hover:bg-[#6E93A5] text-white font-bebas text-base sm:text-xl tracking-widest py-2.5 sm:py-3 rounded-xl transition-all duration-200 shadow-md mt-1 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                      >
                        {isSubmitting ? (
                          <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          'ENVIAR RESEÑA'
                        )}
                      </button>
                    </form>
                  </div>
                ) : (
                  /* TAB 2: Stats & Recent Reviews (compact layout) */
                  <div className="flex flex-col gap-3.5 sm:gap-4">
                    {/* Top Stats Box */}
                    <div className="bg-white rounded-2xl p-3 sm:p-4 text-[#1E293B] shadow-sm border border-brand-5/5">
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center">
                        {/* Rating Number */}
                        <div className="flex sm:flex-col items-center justify-between sm:justify-center bg-[#F8F9FA] rounded-xl px-3 py-2 sm:p-3 border border-brand-5/5 w-full sm:w-28 shrink-0 text-center">
                          <span className="font-bebas text-3xl sm:text-4xl leading-none text-[#1E293B] sm:mb-1">4.8</span>
                          <div className="flex gap-0.5 sm:mb-1">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star key={s} className="w-3 h-3 fill-[#F59E0B] text-[#F59E0B]" />
                            ))}
                          </div>
                          <span className="text-[9px] font-bold uppercase tracking-wider text-[#1E293B]/60">
                            5.5K RESEÑAS
                          </span>
                        </div>

                        {/* Progress Bars */}
                        <div className="w-full sm:flex-1 space-y-1.5">
                          {ratingsStats.map((stat, i) => (
                            <div key={i} className="flex items-center gap-2 text-[11px] font-medium">
                              <span className="w-16 text-[#1E293B] shrink-0 text-[10px]">{stat.label}</span>
                              <div className="flex-1 h-1.5 bg-[#F1F3F5] rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-[#F59E0B] rounded-full"
                                  style={{ width: `${stat.percent}%` }}
                                ></div>
                              </div>
                              <span className="w-8 text-right text-[#1E293B]/50 shrink-0 text-[10px]">{stat.count}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Recent Reviews List */}
                    <div>
                      <h4 className="font-bebas text-lg text-white tracking-wide mb-2">
                        RESEÑAS RECIENTES
                      </h4>
                      <div className="space-y-2">
                        {recentReviews.map((rev, i) => (
                          <div
                            key={i}
                            className="bg-[#243542]/70 border border-white/10 rounded-xl p-3 flex gap-3 items-start"
                          >
                            <img
                              src={rev.img}
                              alt={rev.name}
                              className="w-9 h-9 rounded-full object-cover shrink-0 border border-white/20"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between gap-1">
                                <h5 className="font-bold text-xs text-white">{rev.name}</h5>
                                <div className="flex gap-0.5">
                                  {[1, 2, 3, 4, 5].map((s) => (
                                    <Star
                                      key={s}
                                      className={`w-2.5 h-2.5 ${
                                        s <= rev.stars ? 'fill-[#F59E0B] text-[#F59E0B]' : 'text-white/20'
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="text-brand-2 text-[10px] font-medium">{rev.specialty}</p>
                              <p className="text-white/80 text-[11px] mt-1 leading-snug">{rev.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Call to action to switch to write review */}
                    <div className="text-center pt-1">
                      <button
                        type="button"
                        onClick={() => setActiveTab('write')}
                        className="bg-[#5D7E8E] hover:bg-[#6E93A5] text-white font-bebas text-base tracking-wider px-6 py-2 rounded-full shadow-sm transition-all cursor-pointer inline-flex items-center gap-1.5"
                      >
                        <Star className="w-3.5 h-3.5 fill-white" />
                        <span>QUIERO DEJAR MI RESEÑA</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ReviewModal;
