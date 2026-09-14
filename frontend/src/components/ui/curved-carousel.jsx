import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

export function CurvedCarousel({ items = [] }) {
  const containerRef = useRef(null);

  // Motion values for drag
  const dragX = useMotionValue(0);
  // Sensitivity of drag to rotation
  const rotateY = useTransform(dragX, (value) => value * 0.15);

  if (!items || items.length === 0) return null;

  const itemWidth = 320;
  const itemHeight = 440;
  const numItems = items.length;
  const angle = 360 / numItems;
  // Radius calculation: R = (width / 2) / tan(PI / N) + gap
  const radius = Math.round((itemWidth / 2) / Math.tan(Math.PI / numItems)) + 40;

  return (
    <div className="relative w-full overflow-hidden flex flex-col items-center justify-center py-20" style={{ perspective: "1500px" }}>

      {/* Invisible draggable layer */}
      <motion.div
        ref={containerRef}
        drag="x"
        dragConstraints={{ left: -10000, right: 10000 }} // virtually infinite
        dragElastic={0}
        dragMomentum={true}
        style={{ x: dragX }}
        className="absolute inset-0 z-50 cursor-grab active:cursor-grabbing"
      />

      {/* 3D Scene */}
      <div
        className="relative flex items-center justify-center pointer-events-none"
        style={{ width: itemWidth, height: itemHeight, transformStyle: "preserve-3d" }}
      >
        <motion.div
          style={{
            rotateY,
            transformStyle: "preserve-3d"
          }}
          className="relative flex items-center justify-center w-full h-full"
        >
          {items.map((item, idx) => {
            const itemRotation = idx * angle;
            return (
              <div
                key={item._id || idx}
                className="absolute top-0 left-0"
                style={{
                  width: itemWidth,
                  height: itemHeight,
                  transform: `rotateY(${itemRotation}deg) translateZ(${radius}px)`,
                  backfaceVisibility: "hidden", // optional: hide when facing away
                }}
              >
                {/* The Card */}
                <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-[#EBEAE5] relative group pointer-events-auto">
                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out mix-blend-multiply opacity-90"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80" />

                  {/* Text Content */}
                  <div className="absolute bottom-0 left-0 w-full p-6 text-white text-left z-10 flex flex-col gap-2">
                    <span className="text-xs font-semibold text-brand-3 tracking-widest uppercase flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-brand-3 inline-block"></span>
                      Incluido
                    </span>
                    <h3 className="text-2xl font-bebas tracking-wide leading-tight">{item.name}</h3>
                    <p className="text-sm text-white/70 font-light line-clamp-2">{item.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Hint */}
      <p className="text-brand-1/40 text-sm mt-12 flex items-center gap-2 pointer-events-none uppercase tracking-widest font-bebas">
        <span>←</span> Desliza para explorar <span>→</span>
      </p>

    </div>
  );
}
