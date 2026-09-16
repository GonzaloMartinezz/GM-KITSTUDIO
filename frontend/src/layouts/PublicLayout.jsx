import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CartDrawer from '../components/CartDrawer';
import FloatingProductButton from '../components/FloatingProductButton';
import ScrollToTopButton from '../components/ScrollToTopButton';
import PreFooterContact from '../components/PreFooterContact';
import Footer from '../components/Footer';
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
        <Footer />
      </div>
    </>
  );
};

export default PublicLayout;
