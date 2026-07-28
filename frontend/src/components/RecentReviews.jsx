import React from 'react';
import { Star } from 'lucide-react';

const RecentReviews = () => {
  const recentReviews = [
    {
      name: "Dr. Roberto Sánchez",
      text: "Excelente calidad de los kits, la entrega siempre es puntual y el soporte técnico es de primera. Muy recomendados.",
      stars: 5,
      img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Dra. María Gómez",
      text: "Los precios son muy competitivos y los materiales cumplen con todas las normativas. Me da mucha confianza trabajar con GM Kit.",
      stars: 5,
      img: "https://images.unsplash.com/photo-1594824436951-7f126f5fb5fb?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Dr. Carlos Ruiz",
      text: "Increíble la rapidez de los envíos. Los kits llegaron en perfectas condiciones y la calidad es indiscutible.",
      stars: 4,
      img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=150&q=80"
    }
  ];

  return (
    <div className="bg-white rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-brand-5/5 mt-8 md:mt-12">
      <h2 className="font-bebas text-4xl text-[#1E293B] mb-10 tracking-wide text-center">Reseñas Recientes</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recentReviews.map((review, i) => (
          <div key={i} className="bg-[#F8F9FA] rounded-3xl p-6 md:p-8 flex flex-col gap-4 hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 bg-gray-200">
                <img 
                  src={review.img} 
                  alt={review.name} 
                  className="w-full h-full object-cover" 
                  onError={(e) => { e.target.style.display = 'none'; }} 
                />
              </div>
              <div>
                <h4 className="font-semibold text-[17px] text-[#1E293B]">{review.name}</h4>
                <div className="flex gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star 
                      key={star} 
                      className={`w-4 h-4 ${star <= review.stars ? 'text-[#F59E0B] fill-[#F59E0B]' : 'text-gray-300 fill-gray-300'}`} 
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-[#1E293B]/70 text-[15px] leading-relaxed mt-2">{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentReviews;
