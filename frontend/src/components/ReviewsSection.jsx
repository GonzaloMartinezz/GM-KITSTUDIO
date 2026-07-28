import React from 'react';
import { Star } from 'lucide-react';
import RecentReviews from './RecentReviews';
import ReviewForm from './ReviewForm';

const ReviewsSection = () => {
  const ratingsStats = [
    { label: '5 Estrellas', percent: 85, count: '989' },
    { label: '4 Estrellas', percent: 45, count: '4.5K' },
    { label: '3 Estrellas', percent: 15, count: '50' },
    { label: '2 Estrellas', percent: 5, count: '16' },
    { label: '1 Estrella', percent: 2, count: '8' },
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-20 font-geist relative z-30 flex flex-col gap-6 md:gap-10">
      
      {/* 1. TOP SECTION: Stats */}
      <div className="bg-white rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-brand-5/5">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Left: Big Rating Box */}
          <div className="w-full lg:w-1/3 flex flex-col items-center justify-center bg-[#F8F9FA] rounded-[2rem] p-10 border border-brand-5/5">
            <h3 className="font-bebas text-[5rem] leading-none text-[#1E293B] mb-4">4.8</h3>
            <div className="flex gap-1.5 mb-4">
              {[1, 2, 3, 4, 5].map(star => (
                <Star key={star} className="w-7 h-7 text-[#F59E0B] fill-[#F59E0B]" />
              ))}
            </div>
            <p className="font-medium text-[#1E293B]/60 text-sm tracking-wide uppercase">5.5K Reseñas de Clientes</p>
          </div>

          {/* Right: Progress Bars */}
          <div className="w-full lg:w-2/3 flex flex-col justify-center gap-5">
            {ratingsStats.map((stat, i) => (
              <div key={i} className="flex items-center gap-6">
                <span className="w-24 text-sm font-medium text-[#1E293B]">{stat.label}</span>
                <div className="flex-1 h-2.5 bg-[#F8F9FA] rounded-full overflow-hidden border border-brand-5/5">
                  <div 
                    className="h-full bg-[#F59E0B] rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${stat.percent}%` }}
                  ></div>
                </div>
                <span className="w-12 text-right text-sm font-medium text-[#1E293B]/50">{stat.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. MIDDLE SECTION: Horizontal Recent Reviews */}
      <RecentReviews />

      {/* 3. BOTTOM SECTION: Centered Form */}
      <ReviewForm />

    </div>
  );
};

export default ReviewsSection;
