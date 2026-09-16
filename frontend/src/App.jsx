import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';

// Loading fallback component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-brand-5">
    <div className="w-8 h-8 border-4 border-brand-3 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Lazy Loaded Pages
const Home = lazy(() => import('./pages/Home'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const About = lazy(() => import('./pages/About'));
const Products = lazy(() => import('./pages/Products'));
const Login = lazy(() => import('./pages/Login'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminVentas = lazy(() => import('./pages/admin/AdminVentas'));
const CargarProductos = lazy(() => import('./pages/CargarProductos'));

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          
          {/* === AUTH ROUTES === */}
          <Route path="/login" element={<Login />} />

          {/* === PUBLIC E-COMMERCE ROUTES === */}
          <Route path="/cargarproductos" element={<CargarProductos />} />
          <Route path="/comprarproducto" element={<Navigate to="/cargarproductos" replace />} />
          <Route path="/comprarproductos" element={<Navigate to="/cargarproductos" replace />} />
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/productos" element={<Products />} />
            <Route path="/nosotros" element={<About />} />
          </Route>

          {/* === ADMIN DASHBOARD ROUTES === */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="ventas" element={<AdminVentas />} />
            {/* Future admin routes like /admin/employees can go here */}
          </Route>

        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
