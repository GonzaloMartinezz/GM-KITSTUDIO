import React, { useState } from 'react';
import ProductModal from './ProductModal';

const FloatingProductButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 md:bottom-12 left-0 bg-[#1E293B] text-[#F3E6D5] py-3.5 pr-6 pl-4 md:py-4 md:pr-8 md:pl-5 rounded-r-[2.5rem] font-geist font-bold text-sm md:text-[15px] tracking-[0.15em] shadow-[8px_10px_25px_rgba(0,0,0,0.3)] z-[90] hover:pr-8 md:hover:pr-10 transition-all duration-300 flex items-center"
      >
        VER PRODUCTO
      </button>

      <ProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default FloatingProductButton;
