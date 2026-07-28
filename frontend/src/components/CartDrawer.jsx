import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const CartDrawer = () => {
  const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-brand-5/80 backdrop-blur-sm z-50"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-brand-5 border-l border-brand-4 z-50 flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between p-6 border-b border-brand-4">
              <h2 className="text-3xl font-bebas text-brand-1 flex items-center gap-2">
                <ShoppingBag className="w-6 h-6 text-brand-2" />
                CARRITO
              </h2>
              <button onClick={() => setIsCartOpen(false)} className="text-brand-1/50 hover:text-brand-2 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-brand-1/50">
                  <ShoppingBag className="w-16 h-16 mb-4 opacity-50" />
                  <p className="font-geist">Tu carrito está vacío</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <motion.div layout key={item._id} className="flex gap-4 bg-brand-4 p-3 rounded-xl border border-brand-3/20">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                    <div className="flex-1 flex flex-col">
                      <h4 className="font-changa text-brand-1 text-sm leading-tight mb-1">{item.name}</h4>
                      <p className="font-bebas text-brand-2 text-lg mb-2">${item.price}</p>
                      
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center bg-brand-5 rounded-lg border border-brand-3/30">
                          <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="p-1 hover:text-brand-2 text-brand-1/70">
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-geist text-sm">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="p-1 hover:text-brand-2 text-brand-1/70">
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button onClick={() => removeFromCart(item._id)} className="text-red-400 hover:text-red-300 p-1">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-6 border-t border-brand-4 bg-brand-5/90 backdrop-blur">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-changa text-brand-1/70">Total</span>
                  <span className="font-bebas text-4xl text-brand-2">${cartTotal}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckout}
                  className="w-full bg-brand-3 hover:bg-brand-2 text-brand-5 py-4 rounded-xl font-bebas text-2xl transition-colors shadow-lg"
                >
                  PROCEDER AL PAGO
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
