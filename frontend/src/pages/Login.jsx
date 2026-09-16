import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const Login = () => {
  const navigate = useNavigate();
  const [view, setView] = useState('home');
  const [mode, setMode] = useState('login');
  const [formData, setFormData] = useState({ email: '', name: '', password: '' });

  const updateForm = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const switchMode = (newMode) => {
    setMode(newMode);
    setView(newMode === 'login' ? 'login-form' : 'step-email');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('currentUser', formData.email.split('@')[0]);
    localStorage.setItem('userEmail', formData.email);
    navigate('/admin');
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('currentUser', formData.name);
    localStorage.setItem('userEmail', formData.email);
    navigate('/admin');
  };

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

          <AnimatePresence mode="wait">

            {/* HOME */}
            {view === 'home' && (
              <motion.div key="home" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-center space-y-7">
                <div>
                  <h2 className="font-display font-bold text-4xl uppercase tracking-tight text-[#1e2f3e]">GM KIT STUDIO</h2>
                  <p className="text-sm text-[#546A7E] mt-1">Ingresá o registrate para comenzar</p>
                </div>
                <div className="flex flex-col gap-3 pt-1">
                  <button onClick={() => { setMode('login'); setView('login-form'); }} className="action-btn w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-widest text-[#1e2f3e]">Iniciar Sesión</button>
                  <button onClick={() => { setMode('register'); setView('step-email'); }} className="action-btn w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-widest text-[#1e2f3e]">Crear Cuenta Nueva</button>
                </div>
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
                  <label className="pill-input rounded-full px-5 py-3.5 flex items-center gap-3">
                    <svg className="w-4 h-4 text-[#546A7E] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" /></svg>
                    <input required type="password" placeholder="Contraseña segura" value={formData.password} onChange={e => updateForm('password', e.target.value)} className="w-full bg-transparent border-0 p-0 text-sm text-[#1e2f3e] placeholder-[#546A7E]/60 focus:ring-0 outline-none" />
                  </label>
                  <button type="submit" className="action-btn w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-widest text-[#1e2f3e]">Crear Cuenta</button>
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
                  <label className="pill-input rounded-full px-5 py-3.5 flex items-center gap-3">
                    <svg className="w-4 h-4 text-[#546A7E] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" /></svg>
                    <input required type="password" placeholder="Contraseña" value={formData.password} onChange={e => updateForm('password', e.target.value)} className="w-full bg-transparent border-0 p-0 text-sm text-[#1e2f3e] placeholder-[#546A7E]/60 focus:ring-0 outline-none" />
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
    </div>
  );
};

export default Login;
