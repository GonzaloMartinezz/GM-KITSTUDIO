import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

const FloatingProductButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide on checkout / order page and admin
  if (location.pathname === '/cargarproductos' || location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <button
      onClick={() => navigate('/cargarproductos')}
      className="flex fixed bottom-6 sm:bottom-8 left-0 bg-[#0C3B45] hover:bg-[#124b57] text-[#88C9C4] py-2.5 sm:py-3 pr-5 sm:pr-6 pl-3 sm:pl-4 rounded-r-full font-bebas text-base sm:text-lg tracking-wider shadow-2xl z-50 hover:pr-8 active:scale-95 transition-all duration-300 items-center gap-2 cursor-pointer border-y border-r border-[#88C9C4]/40"
      title="Comprar Kit Odontológico Completo"
    >
      <ShoppingBag size={18} className="text-[#88C9C4]" />
      <span>COMPRAR KIT</span>
    </button>
  );
};

export default FloatingProductButton;
