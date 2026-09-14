import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cartItems');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const [draftOrder, setDraftOrder] = useState(() => {
    const saved = localStorage.getItem('draftOrder');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (draftOrder) {
      localStorage.setItem('draftOrder', JSON.stringify(draftOrder));
    } else {
      localStorage.removeItem('draftOrder');
    }
  }, [draftOrder]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item._id === product._id);
      if (existing) {
        return prev.map(item => 
          item._id === product._id ? { ...item, quantity: item.quantity + (product.quantity || 1) } : item
        );
      }
      return [...prev, { ...product, quantity: product.quantity || 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item._id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if(quantity < 1) return;
    setCartItems(prev => prev.map(item => item._id === id ? { ...item, quantity } : item));
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      cartTotal,
      isCartOpen,
      setIsCartOpen,
      draftOrder,
      setDraftOrder
    }}>
      {children}
    </CartContext.Provider>
  );
};
