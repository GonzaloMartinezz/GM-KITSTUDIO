import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CartDrawer from '../components/CartDrawer';
import FloatingProductButton from '../components/FloatingProductButton';
import ScrollToTopButton from '../components/ScrollToTopButton';
import PreFooterContact from '../components/PreFooterContact';
import { SmoothCursor } from '../components/ui/SmoothCursor';

const PublicLayout = () => {
  return (
    <>
      <SmoothCursor />
      <div className="min-h-screen flex flex-col font-geist relative">
        <Navbar />
        <CartDrawer />
        <FloatingProductButton />
        <ScrollToTopButton />
        <main className="grow">
          <Outlet />
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
    </>
  );
};

export default PublicLayout;
