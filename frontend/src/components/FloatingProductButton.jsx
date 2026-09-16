import React from 'react';
import { useNavigate } from 'react-router-dom';

const FloatingProductButton = () => {
  const navigate = useNavigate();

  return (
    <>
      <button
        onClick={() => navigate('/cargarproductos')}
        className="fixed bottom-6 md:bottom-12 left-0 bg-[#1E293B] hover:bg-[#0C1517] text-[#F3E6D5] py-2.5 pr-4 pl-3.5 sm:py-3.5 sm:pr-6 sm:pl-4 md:py-4 md:pr-8 md:pl-5 rounded-r-[2rem] md:rounded-r-[2.5rem] font-geist font-bold text-xs sm:text-sm md:text-[15px] tracking-[0.12em] md:tracking-[0.15em] shadow-[6px_8px_20px_rgba(0,0,0,0.35)] z-40 hover:pr-6 sm:hover:pr-8 md:hover:pr-10 active:scale-95 transition-all duration-300 flex items-center cursor-pointer border-y border-r border-[#88C9C4]/30"
      >
        COMPRAR PRODUCTOS
      </button>
    </>
  );
};

export default FloatingProductButton;
