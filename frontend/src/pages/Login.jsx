import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, googleLogin, authError, clearError, isAuthenticated, isAdmin } = useAuth();

  const [view, setView] = useState('home');
  const [mode, setMode] = useState('login');
  
  console.log("GOOGLE_CLIENT_ID IS:", GOOGLE_CLIENT_ID, "import.meta.env:", import.meta.env);
  const [formData, setFormData] = useState({ email: '', name: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [isWelcoming, setIsWelcoming] = useState(false);
  const [welcomeUser, setWelcomeUser] = useState(null);

  const redirectTarget = location.state?.from?.pathname;

  // Si ya hay sesión activa, redirigir directamente (evita re-loguear)
  useEffect(() => {
    if (isAuthenticated && !isWelcoming) {
      navigate(redirectTarget || (isAdmin ? '/admin' : '/'), { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWelcoming]);

  const handleSuccess = (user) => {
    setWelcomeUser(user);
    setIsWelcoming(true);
    setTimeout(() => {
      navigate(redirectTarget || (user?.role === 'admin' ? '/admin' : '/'), { replace: true });
    }, 2500);
  };

  const updateForm = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const switchMode = (newMode) => {
    clearError();
    setMode(newMode);
    setView(newMode === 'login' ? 'login-form' : 'step-email');
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const result = await login({ email: formData.email, password: formData.password, rememberMe });
    setSubmitting(false);
    if (result.ok) {
      handleSuccess(result.user);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const result = await register({ name: formData.name, email: formData.email, password: formData.password });
    setSubmitting(false);
    if (result.ok) {
      handleSuccess(result.user);
    }
  };

  const handleGoogleCredential = async (credential) => {
    setSubmitting(true);
    const result = await googleLogin(credential);
    setSubmitting(false);
    if (result.ok) {
      handleSuccess(result.user);
    }
  };

  const googleBtnRef = React.useRef(null);

  // Carga el script de Google Identity Services y renderiza el botón (solo si hay Client ID configurado)
  useEffect(() => {
    if (!GOOGLE_CLIENT_ID || view !== 'home') return undefined;

    const initGoogle = () => {
      if (!window.google?.accounts?.id) {
        console.error("Google accounts script failed to load properly.");
        return;
      }
      
      try {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: (response) => handleGoogleCredential(response.credential),
        });
        
        if (googleBtnRef.current) {
          googleBtnRef.current.innerHTML = '';
          window.google.accounts.id.renderButton(googleBtnRef.current, { theme: 'outline', size: 'large', shape: 'pill', width: 280 });
          console.log("Google button rendered successfully.");
        } else {
          console.error("googleBtnRef is null, cannot render button.");
        }
      } catch (err) {
        console.error("Error initializing Google Identity Services:", err);
      }
    };

    if (window.google?.accounts?.id) {
      initGoogle();
      return undefined;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = initGoogle;
    script.onerror = () => console.error("Failed to load Google script. Check network or adblockers.");
    document.body.appendChild(script);
    
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view]);

  return (
    <div className="min-h-screen font-sans antialiased flex flex-col lg:flex-row overflow-y-auto" style={{ background: 'transparent' }}>
      <style>{`
        html, body { min-height: 100%; margin: 0; }
        body {
          background-color: #f1ede5;
          background-image:
            radial-gradient(at 8% 20%, #f7f3eb 0px, transparent 50%),
            radial-gradient(at 85% 15%, #5d758a 0px, transparent 55%),
            radial-gradient(at 90% 80%, #475d71 0px, transparent 60%),
            radial-gradient(at 30% 90%, #e6ded2 0px, transparent 45%),
            radial-gradient(at 50% 50%, #cad7de 0px, transparent 65%);
          background-size: cover;
          background-attachment: fixed;
        }
        .glass-card {
          background: rgba(255,255,255,0.4);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          border: 1px solid rgba(255,255,255,0.65);
          box-shadow: 0 32px 64px -16px rgba(54,75,93,0.18), 0 8px 24px -8px rgba(0,0,0,0.06);
        }
        .pill-input {
          background: rgba(245,247,250,0.85);
          border: 1.5px solid rgba(255,255,255,0.9);
          transition: all 0.25s ease;
        }
        .pill-input:focus-within {
          background: rgba(255,255,255,0.98);
          border-color: #61798d;
          box-shadow: 0 0 0 4px rgba(84,106,126,0.13);
        }
        .action-btn {
          background: linear-gradient(135deg, rgba(255,255,255,0.96), rgba(232,238,244,0.9));
          border: 1.5px solid rgba(255,255,255,0.85);
          box-shadow: 0 8px 22px -4px rgba(69,90,109,0.2);
          transition: all 0.2s ease;
        }
        .action-btn:hover {
          background: #fff;
          box-shadow: 0 14px 28px -4px rgba(69,90,109,0.28);
          transform: translateY(-1px);
        }
        .action-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }
        .right-pill {
          background: rgba(255,255,255,0.18);
          border: 1px solid rgba(255,255,255,0.35);
          backdrop-filter: blur(12px);
        }
        .stat-block {
          border-right: 1px solid rgba(255,255,255,0.2);
        }
        .testimonial-card {
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.25);
          backdrop-filter: blur(16px);
        }
      `}</style>

      {/* Back to Home (Fixed so it doesn't break layout) */}
      <Link to="/" className="fixed top-6 left-6 sm:top-10 sm:left-10 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#364B5D] hover:text-[#0C3B45] transition-colors z-50">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 19l-7-7m0 0l7-7m-7 7h18" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" /></svg>
        Volver al Inicio
      </Link>

      {/* LEFT — Auth Card */}
      <section className="w-full lg:w-[45%] flex items-center justify-center lg:justify-end px-4 sm:px-8 lg:pr-14 xl:pr-20 py-8 sm:py-12 min-h-screen lg:min-h-0">
        <div className="glass-card w-full max-w-105 rounded-3xl sm:rounded-4xl p-6 sm:p-10 my-auto">

          {/* Tabs */}
          <div className="flex p-1 bg-[#364B5D]/10 rounded-full mb-8 border border-white/40">
            {['login', 'register'].map(m => (
              <button
                key={m}
                onClick={() => switchMode(m)}
                className={`flex-1 py-2 text-[11px] font-bold tracking-wider rounded-full transition-all duration-200 ${mode === m ? 'bg-white text-[#1e2f3e] shadow-sm' : 'text-[#364B5D]/70 hover:text-[#1e2f3e]'
                  }`}
              >
                {m === 'login' ? 'INICIAR SESIÓN' : 'CREAR CUENTA'}
              </button>
            ))}
          </div>

          {authError && (
            <div className="mb-5 px-4 py-2.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-700 text-xs font-medium text-center">
              {authError}
            </div>
          )}

          <AnimatePresence mode="wait">

            {/* HOME */}
            {view === 'home' && (
              <motion.div key="home" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-center space-y-7">
                <div>
                  <h2 className="font-display font-bold text-4xl uppercase tracking-tight text-[#1e2f3e]">GM KIT STUDIO</h2>
                  <p className="text-sm text-[#546A7E] mt-1">Ingresá o registrate para comenzar</p>
                </div>
                <div className="flex flex-col gap-3 pt-1">
                  <button onClick={() => { clearError(); setMode('login'); setView('login-form'); }} className="action-btn w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-widest text-[#1e2f3e]">Iniciar Sesión</button>
                  <button onClick={() => { clearError(); setMode('register'); setView('step-email'); }} className="action-btn w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-widest text-[#1e2f3e]">Crear Cuenta Nueva</button>
                </div>
                {GOOGLE_CLIENT_ID && (
                  <div className="pt-2 flex flex-col items-center gap-2">
                    <div className="flex items-center gap-3 w-full">
                      <div className="flex-1 h-px bg-[#364B5D]/15" />
                      <span className="text-[10px] uppercase tracking-widest text-[#546A7E]/70">o continuá con</span>
                      <div className="flex-1 h-px bg-[#364B5D]/15" />
                    </div>
                    <div ref={googleBtnRef} className="mt-1" />
                  </div>
                )}
              </motion.div>
            )}

            {/* EMAIL */}
            {view === 'step-email' && (
              <motion.div key="email" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div>
                  <h2 className="font-display font-bold text-3xl uppercase tracking-tight text-[#1e2f3e]">INGRESA TU CORREO</h2>
                  <p className="text-xs text-[#546A7E] mt-1">Escribe aquí para continuar</p>
                </div>
                <form onSubmit={(e) => { e.preventDefault(); setView('step-name'); }} className="space-y-4">
                  <label className="pill-input rounded-full px-5 py-3.5 flex items-center gap-3">
                    <svg className="w-4 h-4 text-[#546A7E] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" /></svg>
                    <input required type="email" placeholder="Correo" value={formData.email} onChange={e => updateForm('email', e.target.value)} className="w-full bg-transparent border-0 p-0 text-sm text-[#1e2f3e] placeholder-[#546A7E]/60 focus:ring-0 outline-none" />
                  </label>
                  <button type="submit" className="action-btn w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-widest text-[#1e2f3e] flex items-center justify-center gap-2">
                    Continuar <svg className="w-4 h-4 text-[#546A7E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                  </button>
                </form>
                <button onClick={() => setView('home')} className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-[#546A7E] hover:text-[#1e2f3e] transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 19l-7-7m0 0l7-7m-7 7h18" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" /></svg> Volver
                </button>
              </motion.div>
            )}

            {/* NAME */}
            {view === 'step-name' && (
              <motion.div key="name" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div>
                  <h2 className="font-display font-bold text-3xl uppercase tracking-tight text-[#1e2f3e]">¿CUÁL ES TU NOMBRE?</h2>
                  <p className="text-xs text-[#546A7E] mt-1">Escribe aquí para continuar</p>
                </div>
                <form onSubmit={(e) => { e.preventDefault(); setView('step-password'); }} className="space-y-4">
                  <label className="pill-input rounded-full px-5 py-3.5 flex items-center gap-3">
                    <svg className="w-4 h-4 text-[#546A7E] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" /></svg>
                    <input required type="text" placeholder="Nombre completo" value={formData.name} onChange={e => updateForm('name', e.target.value)} className="w-full bg-transparent border-0 p-0 text-sm text-[#1e2f3e] placeholder-[#546A7E]/60 focus:ring-0 outline-none" />
                  </label>
                  <button type="submit" className="action-btn w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-widest text-[#1e2f3e] flex items-center justify-center gap-2">
                    Continuar <svg className="w-4 h-4 text-[#546A7E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                  </button>
                </form>
                <button onClick={() => setView('step-email')} className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-[#546A7E] hover:text-[#1e2f3e] transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 19l-7-7m0 0l7-7m-7 7h18" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" /></svg> Volver
                </button>
              </motion.div>
            )}

            {/* PASSWORD */}
            {view === 'step-password' && (
              <motion.div key="password" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div>
                  <h2 className="font-display font-bold text-3xl uppercase tracking-tight text-[#1e2f3e]">CREA TU CONTRASEÑA</h2>
                  <p className="text-xs text-[#546A7E] mt-1">Último paso para proteger tu cuenta</p>
                </div>
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <label className="pill-input rounded-full px-5 py-3.5 flex items-center gap-3 relative">
                    <svg className="w-4 h-4 text-[#546A7E] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" /></svg>
                    <input required minLength={6} type={showPassword ? 'text' : 'password'} placeholder="Contraseña segura (mín. 6 caracteres)" value={formData.password} onChange={e => updateForm('password', e.target.value)} className="w-full bg-transparent border-0 p-0 pr-8 text-sm text-[#1e2f3e] placeholder-[#546A7E]/60 focus:ring-0 outline-none" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 text-[#546A7E] hover:text-[#1e2f3e] focus:outline-none">
                      {showPassword ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      )}
                    </button>
                  </label>
                  <button type="submit" disabled={submitting} className="action-btn w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-widest text-[#1e2f3e]">
                    {submitting ? 'Creando cuenta...' : 'Crear Cuenta'}
                  </button>
                </form>
                <button onClick={() => setView('step-name')} className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-[#546A7E] hover:text-[#1e2f3e] transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 19l-7-7m0 0l7-7m-7 7h18" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" /></svg> Volver
                </button>
              </motion.div>
            )}

            {/* LOGIN FORM */}
            {view === 'login-form' && (
              <motion.div key="login" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div>
                  <h2 className="font-display font-bold text-3xl uppercase tracking-tight text-[#1e2f3e]">INGRESA TU CORREO</h2>
                  <p className="text-xs text-[#546A7E] mt-1">Escribe aquí para continuar</p>
                </div>
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <label className="pill-input rounded-full px-5 py-3.5 flex items-center gap-3">
                    <svg className="w-4 h-4 text-[#546A7E] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" /></svg>
                    <input required type="email" placeholder="Correo" value={formData.email} onChange={e => updateForm('email', e.target.value)} className="w-full bg-transparent border-0 p-0 text-sm text-[#1e2f3e] placeholder-[#546A7E]/60 focus:ring-0 outline-none" />
                  </label>
                  <label className="pill-input rounded-full px-5 py-3.5 flex items-center gap-3 relative">
                    <svg className="w-4 h-4 text-[#546A7E] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" /></svg>
                    <input required type={showPassword ? 'text' : 'password'} placeholder="Contraseña" value={formData.password} onChange={e => updateForm('password', e.target.value)} className="w-full bg-transparent border-0 p-0 pr-8 text-sm text-[#1e2f3e] placeholder-[#546A7E]/60 focus:ring-0 outline-none" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 text-[#546A7E] hover:text-[#1e2f3e] focus:outline-none">
                      {showPassword ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      )}
                    </button>
                  </label>
                  <div className="flex items-center justify-between px-1">
                    <label className="flex items-center gap-2 text-[11px] font-medium text-[#546A7E] cursor-pointer select-none">
                      <input type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} className="rounded border-[#546A7E]/40 text-[#364B5D] focus:ring-[#364B5D]" />
                      Recordar sesión
                    </label>
                  </div>
                  <button type="submit" disabled={submitting} className="action-btn w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-widest text-[#1e2f3e] flex items-center justify-center gap-2">
                    {submitting ? 'Ingresando...' : 'Continuar'}
                    {!submitting && <svg className="w-4 h-4 text-[#546A7E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>}
                  </button>
                </form>
                <button onClick={() => setView('home')} className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-[#546A7E] hover:text-[#1e2f3e] transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 19l-7-7m0 0l7-7m-7 7h18" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" /></svg> Volver
                </button>
              </motion.div>
            )}

          </AnimatePresence>

          {/* Security badge */}
          <div className="mt-8 pt-5 border-t border-white/40 flex items-center gap-2 text-[10px] text-[#546A7E]/70">
            <svg className="w-3.5 h-3.5 text-emerald-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path clipRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" fillRule="evenodd" /></svg>
            <span>Conexión cifrada de grado odontológico HIPAA & RGPD</span>
          </div>
        </div>
      </section>

      {/* RIGHT — Branding */}
      <section className="hidden lg:flex flex-col justify-between w-[55%] px-14 xl:px-20 py-14">

        {/* Top pill badge */}
        <div className="flex items-center gap-3">
          <div className="right-pill flex items-center gap-3 px-4 py-2 rounded-full text-xs font-semibold text-[#1e2f3e]/80 tracking-wide">
            <img src="/images/LOGOia.png" alt="logo" className="w-5 h-5 rounded-full object-cover" />
            PLATAFORMA GM KIT STUDIO
          </div>
          <span className="text-[#1e2f3e]/40 text-xs">•</span>
          <span className="text-[#1e2f3e]/60 text-xs font-medium">Acceso a clínicas y especialistas</span>
        </div>

        {/* Main headline */}
        <div className="space-y-6">
          <div className="flex items-center gap-6 xl:gap-8">
            <h1 className="font-display font-bold leading-[0.88] text-[#1e2f3e]" style={{ fontSize: 'clamp(3.5rem, 6vw, 5.5rem)' }}>
              GM KIT<br />
              <span className="text-[#1e2f3e]/35">STUDIO</span>
            </h1>
            <div className="relative group shrink-0">
              <div className="w-28 h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 aspect-square rounded-full overflow-hidden border-2 border-white/60 shadow-[0_14px_38px_rgba(30,47,62,0.22)] transition-transform duration-300 group-hover:scale-105 bg-black flex items-center justify-center">
                <img
                  src="/images/LOGOia.png"
                  alt="GM KIT STUDIO Logo"
                  className="w-full h-full aspect-square rounded-full object-cover block select-none pointer-events-none"
                  style={{ clipPath: 'circle(50% at 50% 50%)' }}
                />
              </div>
            </div>
          </div>
          <p className="text-[#1e2f3e]/65 text-base leading-relaxed max-w-sm">
            Ingresá a tu portal de gestión para consultar pedidos, administrar tu cuenta y acceder a kits de bioseguridad certificados en tiempo real.
          </p>
        </div>

        {/* Stats row */}
        <div className="flex items-stretch gap-0 divide-x divide-white/20">
          {[
            { value: 'ISO & ANMAT', label: 'Certificación' },
            { value: '24 / 7', label: 'Soporte activo' },
            { value: 'SSL-256', label: 'Encriptación' },
          ].map(stat => (
            <div key={stat.value} className="px-8 first:pl-0 flex flex-col gap-1">
              <span className="font-display font-bold text-2xl text-[#1e2f3e] tracking-tight">{stat.value}</span>
              <span className="text-[11px] font-medium text-[#1e2f3e]/50 uppercase tracking-widest">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Testimonial card */}
        <div className="testimonial-card rounded-2xl p-5 max-w-sm flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-[#364B5D] flex items-center justify-center text-white font-display font-bold text-sm shrink-0">
            GM
          </div>
          <div>
            <p className="text-sm font-medium text-[#1e2f3e]/85 leading-snug">
              "La calidad y puntualidad de los kits es excepcional. No volvemos a trabajar con otro proveedor."
            </p>
            <p className="text-[11px] text-[#1e2f3e]/45 mt-1.5">Clínica certificada en Tucumán, Argentina.</p>
          </div>
        </div>
      </section>

    {/* Welcome Modal */ }
  <AnimatePresence>
    {isWelcoming && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-md px-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 max-w-lg w-full text-center border border-white/50 relative overflow-hidden"
        >
          {/* Decorative Background Elements */}
          <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-[#88C9C4]/20 to-transparent -z-10" />
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#0C3B45]/5 rounded-full blur-3xl -z-10" />

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 sm:w-24 sm:h-24 bg-[#0C3B45] rounded-full mx-auto flex items-center justify-center shadow-xl mb-6 border-4 border-[#88C9C4]/30"
          >
            <span className="font-bebas text-4xl sm:text-5xl text-white">
              {welcomeUser?.name?.charAt(0).toUpperCase() || 'G'}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-bebas text-4xl sm:text-5xl text-[#364B5D] mb-2 leading-none"
          >
            ¡BIENVENIDO!
          </motion.h2>

          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="font-geist text-xl sm:text-2xl font-bold text-[#0C3B45] mb-4 capitalize"
          >
            {welcomeUser?.name || 'Usuario'}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="font-geist text-sm sm:text-base text-[#8CA0B2]"
          >
            Ingresando a <span className="font-bold text-[#88C9C4]">GM KIT STUDIO</span>...
          </motion.p>

          {/* Loading Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 flex justify-center gap-2"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                className="w-2.5 h-2.5 bg-[#88C9C4] rounded-full"
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
    </div >
  );
};

export default Login;
