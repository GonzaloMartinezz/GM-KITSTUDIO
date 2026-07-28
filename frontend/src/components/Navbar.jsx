import React, { useState } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cartItems, setIsCartOpen } = useCart();
  const location = useLocation();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const isActive = (path) => location.pathname === path;
  const isContactPage = location.pathname === '/contacto';

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="absolute top-0 left-0 w-full z-50 py-4 md:py-8 px-4 md:px-12 pointer-events-none">
        <div className="max-w-[1600px] mx-auto flex justify-between items-center">
          
          {/* Mobile Menu Toggle (Visible only on small screens) */}
          <div className="pointer-events-auto md:hidden flex items-center bg-brand-1 rounded-full p-2 shadow-sm border border-brand-2/20">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 text-brand-5 hover:text-brand-4"
            >
              <Menu size={24} />
            </button>
          </div>

          {/* Left Navigation Pills (Hidden on mobile) */}
          <div className={`pointer-events-auto hidden md:flex ${isContactPage ? 'fixed left-8 top-1/2 -translate-y-1/2 flex-col gap-4 z-50 bg-[#F5F2EB]/90 backdrop-blur-md shadow-2xl p-6 rounded-[2rem] border border-[#0C3B45]/10' : 'items-center bg-brand-1 rounded-full px-2 py-2 shadow-sm border border-brand-2/20'}`}>
            <Link to="/" className={`relative px-6 py-2 rounded-full font-geist text-sm tracking-wide transition-colors z-10 text-center ${isActive('/') ? 'text-brand-1' : 'text-brand-5 hover:text-brand-4'} ${isContactPage && isActive('/') ? '!bg-[#0C3B45] !text-[#F5F2EB]' : ''} ${isContactPage && !isActive('/') ? 'hover:bg-[#0C3B45]/10' : ''}`}>
              {isActive('/') && !isContactPage && <motion.div layoutId="nav-pill" className="absolute inset-0 bg-brand-5 rounded-full -z-10" />}
              Inicio
            </Link>
            <Link to="/productos" className={`relative px-6 py-2 rounded-full font-geist text-sm tracking-wide transition-colors z-10 text-center ${isActive('/productos') ? 'text-brand-1' : 'text-brand-5 hover:text-brand-4'} ${isContactPage && isActive('/productos') ? '!bg-[#0C3B45] !text-[#F5F2EB]' : ''} ${isContactPage && !isActive('/productos') ? 'hover:bg-[#0C3B45]/10' : ''}`}>
              {isActive('/productos') && !isContactPage && <motion.div layoutId="nav-pill" className="absolute inset-0 bg-brand-5 rounded-full -z-10" />}
              Productos
            </Link>
            <Link to="/nosotros" className={`relative px-6 py-2 rounded-full font-geist text-sm tracking-wide transition-colors z-10 text-center ${isActive('/nosotros') ? 'text-brand-1' : 'text-brand-5 hover:text-brand-4'} ${isContactPage && isActive('/nosotros') ? '!bg-[#0C3B45] !text-[#F5F2EB]' : ''} ${isContactPage && !isActive('/nosotros') ? 'hover:bg-[#0C3B45]/10' : ''}`}>
              {isActive('/nosotros') && !isContactPage && <motion.div layoutId="nav-pill" className="absolute inset-0 bg-brand-5 rounded-full -z-10" />}
              Nosotros
            </Link>
          </div>

          {/* Right Action Pills */}
          <div className="pointer-events-auto flex items-center gap-2 md:gap-4 mr-0 md:mr-2 lg:mr-4 mt-2 md:mt-6">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCartOpen(true)}
              className="relative bg-brand-5 text-brand-1 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-brand-4 transition-colors"
            >
              <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-3 text-brand-5 w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center text-[9px] md:text-[10px] font-bold border-2 border-brand-5">
                  {totalItems}
                </span>
              )}
            </motion.button>

            <Link to="/contacto" className="hidden sm:block">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-brand-1 text-brand-5 px-4 md:px-6 py-2 md:py-3 rounded-full font-bebas text-base md:text-lg tracking-widest shadow-sm border border-brand-2/20 hover:bg-brand-2 hover:text-brand-5 transition-colors"
              >
                CONTACTO
              </motion.button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-60 bg-brand-5 flex flex-col items-center justify-center"
          >
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 text-brand-1 p-2 rounded-full hover:bg-brand-4 transition-colors"
            >
              <X size={32} />
            </button>
            
            <div className="flex flex-col items-center gap-8">
              <Link onClick={() => setIsMobileMenuOpen(false)} to="/" className={`font-bebas text-5xl tracking-widest ${isActive('/') ? 'text-brand-3' : 'text-brand-1'}`}>INICIO</Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} to="/productos" className={`font-bebas text-5xl tracking-widest ${isActive('/productos') ? 'text-brand-3' : 'text-brand-1'}`}>PRODUCTOS</Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} to="/nosotros" className={`font-bebas text-5xl tracking-widest ${isActive('/nosotros') ? 'text-brand-3' : 'text-brand-1'}`}>NOSOTROS</Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} to="/contacto" className={`font-bebas text-5xl tracking-widest ${isActive('/contacto') ? 'text-brand-3' : 'text-brand-1'}`}>CONTACTO</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
