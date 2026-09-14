import React, { useState } from 'react';
import { ShoppingCart, Menu, X, User, LogOut, Shield } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cartItems, setIsCartOpen } = useCart();
  const location = useLocation();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const currentUser = localStorage.getItem('currentUser');
  const userEmail = localStorage.getItem('userEmail');
  const isAdmin = userEmail === 'gonchimartinez9@gmail.com' || userEmail === 'admin@gmkitstudio.com' || currentUser?.toLowerCase() === 'admin';

  const isActive = (path) => location.pathname === path;
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
          <div className="pointer-events-auto hidden md:flex items-center bg-brand-1 rounded-full px-2 py-2 shadow-sm border border-brand-2/20">
            <Link to="/" className={`relative px-6 py-2 rounded-full font-geist text-sm tracking-wide transition-colors z-10 text-center ${isActive('/') ? 'text-brand-1' : 'text-brand-5 hover:text-brand-4'}`}>
              {isActive('/') && <motion.div layoutId="nav-pill" className="absolute inset-0 bg-brand-5 rounded-full -z-10" />}
              Inicio
            </Link>
            <Link to="/productos" className={`relative px-6 py-2 rounded-full font-geist text-sm tracking-wide transition-colors z-10 text-center ${isActive('/productos') ? 'text-brand-1' : 'text-brand-5 hover:text-brand-4'}`}>
              {isActive('/productos') && <motion.div layoutId="nav-pill" className="absolute inset-0 bg-brand-5 rounded-full -z-10" />}
              Productos
            </Link>
            <Link to="/nosotros" className={`relative px-6 py-2 rounded-full font-geist text-sm tracking-wide transition-colors z-10 text-center ${isActive('/nosotros') ? 'text-brand-1' : 'text-brand-5 hover:text-brand-4'}`}>
              {isActive('/nosotros') && <motion.div layoutId="nav-pill" className="absolute inset-0 bg-brand-5 rounded-full -z-10" />}
              Nosotros
            </Link>
          </div>

          {/* Right Action Pills */}
          <div className="pointer-events-auto flex items-center gap-2 md:gap-4 mr-0 md:mr-2 lg:mr-4 mt-2 md:mt-6">
            
            {/* User Profile / Login */}
            {currentUser ? (
              <div className="flex items-center gap-2 bg-brand-5 text-brand-1 px-2 py-2 md:px-3 rounded-full border border-brand-2/20 shadow-lg">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-brand-3 text-brand-5 flex items-center justify-center font-bebas text-sm md:text-lg">
                  {currentUser.charAt(0).toUpperCase()}
                </div>
                <span className="font-geist text-sm md:text-base hidden sm:block">
                  Hola, <b className="capitalize">{currentUser}</b>
                </span>
                
                {isAdmin && (
                  <Link to="/admin" className="ml-1 md:ml-2 text-brand-3 hover:text-white transition-colors" title="Panel de Admin">
                    <Shield className="w-4 h-4 md:w-5 md:h-5" />
                  </Link>
                )}

                <button 
                  onClick={() => {
                    localStorage.removeItem('currentUser');
                    localStorage.removeItem('userEmail');
                    window.location.reload();
                  }}
                  className={`ml-1 ${isAdmin ? 'md:ml-1' : 'md:ml-2'} mr-1 text-brand-1/50 hover:text-red-500 transition-colors`}
                  title="Cerrar sesión"
                >
                  <LogOut className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
            ) : (
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-brand-5 text-brand-1 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-brand-4 transition-colors border border-brand-2/20"
                  title="Iniciar Sesión"
                >
                  <User className="w-4 h-4 md:w-5 md:h-5" />
                </motion.button>
              </Link>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCartOpen(true)}
              className="relative bg-brand-5 text-brand-1 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-brand-4 transition-colors border border-brand-2/20"
            >
              <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-3 text-brand-5 w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center text-[9px] md:text-[10px] font-bold border-2 border-brand-5">
                  {totalItems}
                </span>
              )}
            </motion.button>
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
