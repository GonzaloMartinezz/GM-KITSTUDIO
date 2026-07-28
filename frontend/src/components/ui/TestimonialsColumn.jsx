import React from "react";
import { motion } from "framer-motion";

export const TestimonialsColumn = ({ className = "", testimonials, duration = 15 }) => {
  return (
    <div className={className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {testimonials.map(({ text, name, role, stars = 5 }, i) => (
                <div 
                  className="bg-brand-4/40 p-8 rounded-[2rem] border border-brand-3/20 shadow-lg shadow-brand-5/5 max-w-sm w-full text-left mx-auto hover:border-brand-3/50 transition-colors" 
                  key={`${index}-${i}`}
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(stars)].map((_, idx) => (
                      <svg key={idx} xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-brand-3 fill-brand-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                    ))}
                  </div>
                  <p className="font-geist text-brand-1/80 leading-relaxed text-sm">"{text}"</p>
                  
                  <div className="flex items-center gap-3 mt-6">
                    <div className="w-12 h-12 rounded-full bg-brand-3 text-brand-5 flex items-center justify-center font-bebas text-2xl tracking-wider">
                       {name.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <div className="font-bebas tracking-wide text-brand-2 text-xl leading-none">{name}</div>
                      <div className="font-geist text-xs text-brand-1/50 mt-1">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
