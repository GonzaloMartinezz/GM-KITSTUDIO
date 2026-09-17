import React, { useState } from 'react';
import { ShoppingCart, Menu, X, User, LogOut, Shield } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { cartItems, setIsCartOpen } = useCart();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const location = useLocation();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const isActive = (path) => location.pathname === path;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="absolute top-0 left-0 w-full z-50 py-4 md:py-8 px-4 md:px-12 pointer-events-none">
        <div className="max-w-400 mx-auto flex justify-between items-center">

          {/* Mobile Menu & Logo (Visible only on small screens) */}
          <div className="pointer-events-auto md:hidden flex items-center gap-2.5">
            <div className="flex items-center bg-brand-1 rounded-full p-1 shadow-xs border border-brand-2/20">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 text-brand-5 hover:text-brand-4 active:scale-95 transition-transform cursor-pointer"
                aria-label="Abrir menú"
              >
                <Menu size={20} />
              </button>
            </div>

          </div>

          {/* Desktop Logo & Navigation Pills (Hidden on mobile) */}
          <div className="pointer-events-auto hidden md:flex items-center gap-6">


            <div className="flex items-center bg-brand-1 rounded-full px-2 py-2 shadow-sm border border-brand-2/20">
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
          </div>

          {/* Right Action Pills */}
          <div className="pointer-events-auto flex items-center gap-2 md:gap-4">

            {/* User Profile / Login */}
            {isAuthenticated ? (
              <div className="flex items-center gap-1.5 sm:gap-2 bg-brand-5 text-brand-1 px-2 py-1.5 md:px-3 md:py-2 rounded-full border border-brand-2/20 shadow-lg group relative cursor-default">
                
                {isAdmin ? (
                  <Link to="/admin" className="flex items-center gap-2 hover:text-[#88C9C4] transition-colors pl-2 pr-1 cursor-pointer">
                    <Shield className="w-4 h-4 md:w-5 md:h-5 text-brand-3" />
                    <span className="font-bebas text-sm sm:text-base tracking-wider hidden sm:inline leading-none">
                      ADMINISTRADOR
                    </span>
                  </Link>
                ) : (
                  <>
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-brand-3 text-brand-5 flex items-center justify-center font-bebas text-sm md:text-lg shrink-0">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-geist text-xs sm:text-sm md:text-base hidden sm:inline max-w-30 truncate">
                      Hola, <b className="capitalize">{user?.name}</b>
                    </span>
                    
                    {/* Hover Dropdown with user details */}
                    <div className="absolute top-full right-0 mt-3 w-56 bg-white border border-brand-2/20 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-4 z-50 text-brand-5 flex flex-col gap-3">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-bold uppercase tracking-widest text-brand-5/50">Mi Cuenta</span>
                        <span className="font-bold truncate text-brand-5">{user?.name}</span>
                        <span className="text-sm truncate text-brand-5/70">{user?.email}</span>
                      </div>
                      {user?.phone && (
                        <div className="text-sm truncate text-brand-5/70 border-t border-brand-5/10 pt-2">
                          Tel: {user?.phone}
                        </div>
                      )}
                      {user?.clinicName && (
                        <div className="text-sm truncate text-brand-5/70">
                          {user?.clinicName}
                        </div>
                      )}
                    </div>
                  </>
                )}

                <button
                  onClick={logout}
                  className={`ml-1 md:ml-2 mr-1 text-brand-1/50 hover:text-red-500 transition-colors shrink-0`}
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
                  className="bg-brand-5 text-brand-1 w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-brand-4 transition-colors border border-brand-2/20"
                  title="Iniciar Sesión"
                >
                  <User className="w-4 h-4 md:w-5 md:h-5" />
                </motion.button>
              </Link>
            )}


          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 28, stiffness: 200 }}
            className="fixed inset-0 z-60 bg-brand-5/95 backdrop-blur-2xl flex flex-col justify-between px-6 py-8 sm:px-10 sm:py-12"
          >
            {/* Top Bar inside Menu */}
            <div className="flex justify-between items-center w-full">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-brand-1 font-bebas text-xl sm:text-2xl tracking-widest flex items-center gap-2"
              >
                {isAdmin && <Shield size={20} className="text-brand-3" />}
                {isAdmin ? 'ADMINISTRADOR' : 'GM KIT STUDIO'}
              </motion.div>

              <motion.button
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.1 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-brand-1 p-2 rounded-full hover:bg-white/10 active:scale-95 transition-all"
                aria-label="Cerrar menú"
              >
                <X size={32} strokeWidth={1.5} />
              </motion.button>
            </div>

            {/* Menu Links */}
            <div className="flex flex-col items-start gap-6 sm:gap-8 mt-12 flex-1 justify-center w-full max-w-md mx-auto">
              {[
                { name: 'INICIO', path: '/' },
                { name: 'PRODUCTOS', path: '/productos' },
                { name: 'NOSOTROS', path: '/nosotros' }
              ].map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.1 }}
                  className="w-full"
                >
                  <Link
                    onClick={() => setIsMobileMenuOpen(false)}
                    to={item.path}
                    className="group flex items-center justify-between w-full border-b border-brand-1/10 pb-4"
                  >
                    <span className={`font-bebas text-5xl sm:text-6xl tracking-widest transition-colors ${isActive(item.path) ? 'text-brand-3' : 'text-brand-1 group-hover:text-white'}`}>
                      {item.name}
                    </span>
                    <span className={`transition-all duration-300 ${isActive(item.path) ? 'text-brand-3 translate-x-0 opacity-100' : 'text-brand-1 -translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'}`}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Footer inside Menu */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col gap-1.5 mt-8 text-left text-brand-1/40 font-geist text-[10px] sm:text-xs uppercase tracking-widest"
            >
              <span>Bioseguridad Odontológica</span>
              <span>© {new Date().getFullYear()} GM Kit Studio</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
