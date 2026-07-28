import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Products from './pages/Products';
import CartDrawer from './components/CartDrawer';
import PreFooterContact from './components/PreFooterContact';
import { SmoothCursor } from './components/ui/SmoothCursor';

function App() {
  return (
    <Router>
      <SmoothCursor />
      <div className="min-h-screen flex flex-col font-geist relative">
        <Navbar />
        <CartDrawer />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/productos" element={<Products />} />
            <Route path="/nosotros" element={<About />} />
            <Route path="/contacto" element={<Contact />} />
          </Routes>
        </main>
        <PreFooterContact />
        <footer className="bg-brand-4 text-brand-1 py-10 border-t border-brand-3/20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="font-bebas text-3xl mb-4 text-brand-2">GM KIT STUDIO</h2>
            <p className="font-geist text-sm text-brand-1/60 max-w-md mx-auto mb-6">El aliado estratégico en bioseguridad para consultorios odontológicos y cirujanos en Tucumán.</p>
            <p className="font-changa text-brand-1/40">&copy; 2026 Todos los derechos reservados.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
