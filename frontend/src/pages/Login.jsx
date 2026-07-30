import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle, useMemo, useCallback, Children } from "react";
import { useNavigate } from 'react-router-dom';
import { cva } from "class-variance-authority";
import { ArrowRight, Mail, Lock, Eye, EyeOff, ArrowLeft, X, AlertCircle, PartyPopper, Loader, User, Phone } from "lucide-react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import confetti from "canvas-confetti";
import { cn } from "../lib/utils";

// --- CONFETTI LOGIC ---
const Confetti = forwardRef((props, ref) => {
  const { options, globalOptions = { resize: true, useWorker: true }, manualstart = false, ...rest } = props;
  const instanceRef = useRef(null);
  const canvasRef = useCallback((node) => {
    if (node !== null) {
      if (instanceRef.current) return;
      instanceRef.current = confetti.create(node, { ...globalOptions, resize: true });
    } else {
      if (instanceRef.current) {
        instanceRef.current.reset();
        instanceRef.current = null;
      }
    }
  }, [globalOptions]);
  const fire = useCallback((opts = {}) => instanceRef.current?.({ ...options, ...opts }), [options]);
  const api = useMemo(() => ({ fire }), [fire]);
  useImperativeHandle(ref, () => api, [api]);
  useEffect(() => { if (!manualstart) fire() }, [manualstart, fire]);
  return <canvas ref={canvasRef} {...rest} />;
});
Confetti.displayName = "Confetti";

// --- TEXT LOOP ANIMATION COMPONENT ---
export function TextLoop({ children, className, interval = 2, transition = { duration: 0.3 }, variants, onIndexChange, stopOnEnd = false }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = Children.toArray(children);
  useEffect(() => {
    const intervalMs = interval * 1000;
    const timer = setInterval(() => {
      setCurrentIndex((current) => {
        if (stopOnEnd && current === items.length - 1) {
          clearInterval(timer);
          return current;
        }
        const next = (current + 1) % items.length;
        onIndexChange?.(next);
        return next;
      });
    }, intervalMs);
    return () => clearInterval(timer);
  }, [items.length, interval, onIndexChange, stopOnEnd]);
  const motionVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  };
  return (
    <div className={cn('relative inline-block whitespace-nowrap', className)}>
      <AnimatePresence mode='popLayout' initial={false}>
        <motion.div key={currentIndex} initial='initial' animate='animate' exit='exit' transition={transition} variants={variants || motionVariants}>
          {items[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// --- BUILT-IN BLUR FADE ANIMATION COMPONENT ---
function BlurFade({ children, className, variant, duration = 0.4, delay = 0, yOffset = 6, inView = true, inViewMargin = "-50px", blur = "6px" }) {
  const ref = useRef(null);
  const inViewResult = useInView(ref, { once: true, margin: inViewMargin });
  const isInView = !inView || inViewResult;
  const defaultVariants = {
    hidden: { y: yOffset, opacity: 0, filter: `blur(${blur})` },
    visible: { y: -yOffset, opacity: 1, filter: `blur(0px)` },
  };
  const combinedVariants = variant || defaultVariants;
  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} exit="hidden" variants={combinedVariants} transition={{ delay: 0.04 + delay, duration, ease: "easeOut" }} className={className}>
      {children}
    </motion.div>
  );
}

// --- BUILT-IN GLASS BUTTON COMPONENT ---
const glassButtonVariants = cva("relative isolate all-unset cursor-pointer rounded-full transition-all", { variants: { size: { default: "text-base font-medium", sm: "text-sm font-medium", lg: "text-lg font-medium", icon: "h-10 w-10" } }, defaultVariants: { size: "default" } });
const glassButtonTextVariants = cva("glass-button-text relative block select-none tracking-tighter", { variants: { size: { default: "px-6 py-3.5", sm: "px-4 py-2", lg: "px-8 py-4", icon: "flex h-10 w-10 items-center justify-center" } }, defaultVariants: { size: "default" } });
const GlassButton = React.forwardRef(({ className, children, size, contentClassName, onClick, ...props }, ref) => {
    const handleWrapperClick = (e) => {
      const button = e.currentTarget.querySelector('button');
      if (button && e.target !== button) button.click();
    };
    return (
      <div className={cn("glass-button-wrap cursor-pointer rounded-full relative", className)} onClick={handleWrapperClick}>
        <button className={cn("glass-button relative z-10", glassButtonVariants({ size }))} ref={ref} onClick={onClick} {...props}>
          <span className={cn(glassButtonTextVariants({ size }), contentClassName)}>{children}</span>
        </button>
        <div className="glass-button-shadow rounded-full pointer-events-none"></div>
      </div>
    );
  }
);
GlassButton.displayName = "GlassButton";

// --- THEME-AWARE SVG GRADIENT BACKGROUND ---
const GradientBackground = () => (
    <>
        <style>
            {` @keyframes float1 { 0% { transform: translate(0, 0); } 50% { transform: translate(-10px, 10px); } 100% { transform: translate(0, 0); } } @keyframes float2 { 0% { transform: translate(0, 0); } 50% { transform: translate(10px, -10px); } 100% { transform: translate(0, 0); } } `}
        </style>
        <svg width="100%" height="100%" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" className="absolute top-0 left-0 w-full h-full">
            <defs>
                <linearGradient id="rev_grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#F1E8D9', stopOpacity:1}} />
                    <stop offset="100%" style={{stopColor: '#E3D4C1', stopOpacity:0.8}} />
                </linearGradient>
                <linearGradient id="rev_grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#7A93A7', stopOpacity:0.9}} />
                    <stop offset="50%" style={{stopColor: '#54728C', stopOpacity:0.7}} />
                    <stop offset="100%" style={{stopColor: '#3E5C76', stopOpacity:0.6}} />
                </linearGradient>
                <radialGradient id="rev_grad3" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" style={{stopColor: '#54728C', stopOpacity:0.8}} />
                    <stop offset="100%" style={{stopColor: '#F1E8D9', stopOpacity:0.4}} />
                </radialGradient>
                <filter id="rev_blur1" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="35"/></filter>
                <filter id="rev_blur2" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="25"/></filter>
                <filter id="rev_blur3" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="45"/></filter>
            </defs>
            <rect width="100%" height="100%" fill="#F1E8D9" />
            <g style={{ animation: 'float1 20s ease-in-out infinite' }}>
                <ellipse cx="200" cy="500" rx="350" ry="280" fill="url(#rev_grad1)" filter="url(#rev_blur1)" transform="rotate(-30 200 500)"/>
                <rect x="400" y="50" width="400" height="350" rx="80" fill="url(#rev_grad2)" filter="url(#rev_blur2)" transform="rotate(15 650 225)"/>
            </g>
            <g style={{ animation: 'float2 25s ease-in-out infinite' }}>
                <circle cx="650" cy="450" r="200" fill="url(#rev_grad3)" filter="url(#rev_blur3)" opacity="0.7"/>
                <ellipse cx="50" cy="150" rx="200" ry="150" fill="#E3D4C1" filter="url(#rev_blur2)" opacity="0.8"/>
            </g>
        </svg>
    </>
);

const modalSteps = [
    { message: "Verificando datos...", icon: <Loader className="w-12 h-12 text-[#3E5C76] animate-spin" /> },
    { message: "Preparando acceso...", icon: <Loader className="w-12 h-12 text-[#3E5C76] animate-spin" /> },
    { message: "Casi listo...", icon: <Loader className="w-12 h-12 text-[#3E5C76] animate-spin" /> },
    { message: "¡Bienvenido!", icon: <PartyPopper className="w-12 h-12 text-green-600" /> }
];
const TEXT_LOOP_INTERVAL = 1.2;

const Login = () => {
  const navigate = useNavigate();
  // Flows: 'choice' -> 'login' or 'register'
  // Login Steps: 'login_email', 'login_password'
  // Register Steps: 'reg_name', 'reg_lastName', 'reg_phone', 'reg_email', 'reg_password', 'reg_confirm'
  const [authStep, setAuthStep] = useState("choice");
  const [flow, setFlow] = useState(null);
  
  const [formData, setFormData] = useState({ name: '', lastName: '', phone: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [modalStatus, setModalStatus] = useState('closed');
  const [modalErrorMessage, setModalErrorMessage] = useState('');
  const confettiRef = useRef(null);
  const inputRef = useRef(null);

  const isValid = {
    name: formData.name.length >= 2,
    lastName: formData.lastName.length >= 2,
    phone: formData.phone.length >= 6,
    email: /\\S+@\\S+\\.\\S+/.test(formData.email) || formData.email.includes('@'),
    password: formData.password.length >= 6,
    confirmPassword: formData.confirmPassword.length >= 6,
  };

  const updateForm = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const fireSideCanons = () => {
    const fire = confettiRef.current?.fire;
    if (fire) {
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };
        fire({ ...defaults, particleCount: 50, origin: { x: 0, y: 1 }, angle: 60 });
        fire({ ...defaults, particleCount: 50, origin: { x: 1, y: 1 }, angle: 120 });
    }
  };

  const handleFinalSubmit = (e) => {
    if (e) e.preventDefault();
    if (modalStatus !== 'closed') return;
    
    if (flow === 'register' && formData.password !== formData.confirmPassword) {
        setModalErrorMessage("Las contraseñas no coinciden");
        setModalStatus('error');
    } else {
        setModalStatus('loading');
        const loadingStepsCount = modalSteps.length - 1;
        const totalDuration = loadingStepsCount * TEXT_LOOP_INTERVAL * 1000;
        setTimeout(() => {
            setModalStatus('success');
        }, totalDuration);
    }
  };

  const handleProgressStep = (e) => {
    if (e) e.preventDefault();
    if (flow === 'login') {
        if (authStep === 'login_email' && isValid.email) setAuthStep("login_password");
        else if (authStep === 'login_password' && isValid.password) handleFinalSubmit();
    } else if (flow === 'register') {
        if (authStep === 'reg_name' && isValid.name) setAuthStep("reg_lastName");
        else if (authStep === 'reg_lastName' && isValid.lastName) setAuthStep("reg_phone");
        else if (authStep === 'reg_phone' && isValid.phone) setAuthStep("reg_email");
        else if (authStep === 'reg_email' && isValid.email) setAuthStep("reg_password");
        else if (authStep === 'reg_password' && isValid.password) setAuthStep("reg_confirm");
        else if (authStep === 'reg_confirm' && isValid.confirmPassword) handleFinalSubmit();
    }
  };

  const handleGoBack = () => {
    if (flow === 'login') {
        if (authStep === 'login_password') setAuthStep('login_email');
        else if (authStep === 'login_email') setAuthStep('choice');
    } else if (flow === 'register') {
        if (authStep === 'reg_confirm') setAuthStep('reg_password');
        else if (authStep === 'reg_password') setAuthStep('reg_email');
        else if (authStep === 'reg_email') setAuthStep('reg_phone');
        else if (authStep === 'reg_phone') setAuthStep('reg_lastName');
        else if (authStep === 'reg_lastName') setAuthStep('reg_name');
        else if (authStep === 'reg_name') setAuthStep('choice');
    }
  };

  const selectFlow = (newFlow) => {
      setFlow(newFlow);
      if (newFlow === 'login') setAuthStep('login_email');
      else setAuthStep('reg_name');
  };

  useEffect(() => {
    if (authStep !== 'choice') setTimeout(() => inputRef.current?.focus(), 400);
  }, [authStep]);

  useEffect(() => {
    if (modalStatus === 'success') {
        fireSideCanons();
        setTimeout(() => {
            navigate('/admin');
        }, 2000);
    }
  }, [modalStatus, navigate]);

  const closeModal = () => {
    setModalStatus('closed');
    setModalErrorMessage('');
  };

  const renderInput = (field, type, placeholder, icon, validator, isPassword = false, isConfirm = false) => {
    const valid = isValid[field];
    const value = formData[field];
    const showPw = isConfirm ? showConfirmPassword : showPassword;
    const setShowPw = isConfirm ? setShowConfirmPassword : setShowPassword;
    
    return (
        <div className="relative w-full">
            <AnimatePresence>
                {value.length > 0 && <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3 }} className="absolute -top-6 left-4 z-10"><label className="text-xs text-[#3E5C76] font-bold">{placeholder}</label></motion.div>}
            </AnimatePresence>
            <div className="glass-input-wrap w-full"><div className="glass-input">
                <span className="glass-input-text-area"></span>
                <div className={cn( "relative z-10 flex-shrink-0 flex items-center justify-center overflow-hidden transition-all duration-300 ease-in-out", value.length > 20 && !isPassword ? "w-0 px-0" : "w-10 pl-2" )}>
                    {isPassword ? (valid ? <button type="button" onClick={() => setShowPw(!showPw)} className="text-[#3E5C76] hover:text-[#54728C] p-2">{showPw ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}</button> : icon) : icon}
                </div>
                <input ref={inputRef} type={isPassword && showPw ? "text" : type} placeholder={placeholder} value={value} onChange={(e) => updateForm(field, e.target.value)} onKeyDown={(e) => { if(e.key === 'Enter'){ e.preventDefault(); handleProgressStep(); } }} className="relative z-10 h-full w-0 flex-grow bg-transparent text-[#3E5C76] font-medium placeholder:text-[#3E5C76]/60 focus:outline-none" />
                <div className={cn( "relative z-10 flex-shrink-0 overflow-hidden transition-all duration-300 ease-in-out", valid ? "w-10 pr-1" : "w-0" )}>
                    <GlassButton type="button" onClick={handleProgressStep} size="icon" contentClassName="text-[#3E5C76]">
                        <ArrowRight className="w-5 h-5" />
                    </GlassButton>
                </div>
            </div></div>
        </div>
    );
  };

  const getStepTitle = () => {
    switch(authStep) {
        case 'login_email': return 'Ingresa tu correo';
        case 'login_password': return 'Ingresa tu contraseña';
        case 'reg_name': return '¿Cuál es tu nombre?';
        case 'reg_lastName': return '¿Tu apellido?';
        case 'reg_phone': return 'Tu número de teléfono';
        case 'reg_email': return 'Tu correo electrónico';
        case 'reg_password': return 'Crea una contraseña';
        case 'reg_confirm': return 'Confirma la contraseña';
        default: return '';
    }
  };

  const getStepSubtitle = () => {
    if (authStep === 'reg_password' || authStep === 'login_password') return "Debe tener al menos 6 caracteres.";
    return "Escribe aquí para continuar";
  };

  return (
    <div className="bg-[#F1E8D9] min-h-screen w-screen flex flex-col font-geist">
        <style>{`
            :root { --background: #F1E8D9; --foreground: #3E5C76; }
            .glass-button-wrap { --anim-time: 400ms; --anim-ease: cubic-bezier(0.25, 1, 0.5, 1); --border-width: 2px; position: relative; z-index: 2; transform-style: preserve-3d; transition: transform var(--anim-time) var(--anim-ease); } 
            .glass-button-wrap:has(.glass-button:active) { transform: rotateX(15deg); } 
            .glass-button-shadow { position: absolute; inset: -4px; filter: blur(4px); transition: filter var(--anim-time) var(--anim-ease); pointer-events: none; z-index: 0; } 
            .glass-button { backdrop-filter: blur(8px); transition: all var(--anim-time) var(--anim-ease); background: linear-gradient(-75deg, rgba(255,255,255,0.4), rgba(255,255,255,0.8), rgba(255,255,255,0.4)); box-shadow: 0 4px 6px -1px rgba(62,92,118,0.1); border: 1px solid rgba(255,255,255,0.6); } 
            .glass-button:hover { transform: scale(0.98); background: linear-gradient(-75deg, rgba(255,255,255,0.6), rgba(255,255,255,0.9), rgba(255,255,255,0.6)); } 
            .glass-button-text { color: #3E5C76; transition: all var(--anim-time) var(--anim-ease); font-weight: 600; } 
            .glass-input-wrap { position: relative; z-index: 2; transform-style: preserve-3d; border-radius: 9999px; } 
            .glass-input { display: flex; position: relative; width: 100%; align-items: center; gap: 0.5rem; border-radius: 9999px; padding: 0.5rem; backdrop-filter: blur(12px); background: rgba(255,255,255,0.5); border: 1px solid rgba(255,255,255,0.8); box-shadow: inset 0 2px 4px rgba(62,92,118,0.05), 0 4px 8px rgba(62,92,118,0.1); transition: all 300ms ease; } 
            .glass-input-wrap:focus-within .glass-input { background: rgba(255,255,255,0.8); box-shadow: inset 0 2px 4px rgba(62,92,118,0.02), 0 6px 12px rgba(62,92,118,0.15); border: 1px solid #7A93A7; }
        `}</style>

        <Confetti ref={confettiRef} manualstart className="fixed top-0 left-0 w-full h-full pointer-events-none z-[999]" />
        
        <AnimatePresence>
            {modalStatus !== 'closed' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white border-2 border-[#E3D4C1] rounded-2xl p-8 w-full max-w-sm flex flex-col items-center gap-4 mx-2 shadow-2xl">
                        {(modalStatus === 'error' || modalStatus === 'success') && <button onClick={closeModal} className="absolute top-2 right-2 p-1 text-[#7A93A7] hover:text-[#3E5C76]"><X className="w-5 h-5" /></button>}
                        {modalStatus === 'error' && <>
                            <AlertCircle className="w-12 h-12 text-red-500" />
                            <p className="text-lg font-bold text-[#3E5C76]">{modalErrorMessage}</p>
                            <GlassButton onClick={closeModal} size="sm" className="mt-4">Intentar de nuevo</GlassButton>
                        </>}
                        {modalStatus === 'loading' && 
                            <TextLoop interval={TEXT_LOOP_INTERVAL} stopOnEnd={true}>
                                {modalSteps.slice(0, -1).map((step, i) => 
                                    <div key={i} className="flex flex-col items-center gap-4">
                                        {step.icon}
                                        <p className="text-lg font-bold text-[#3E5C76]">{step.message}</p>
                                    </div>
                                )}
                            </TextLoop>
                        }
                        {modalStatus === 'success' &&
                            <div className="flex flex-col items-center gap-4">
                                {modalSteps[modalSteps.length - 1].icon}
                                <p className="text-lg font-bold text-[#3E5C76]">{modalSteps[modalSteps.length - 1].message}</p>
                            </div>
                        }
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

        <div className="flex w-full flex-1 h-full items-center justify-center bg-[#F1E8D9] relative overflow-hidden">
            <div className="absolute inset-0 z-0"><GradientBackground /></div>
            
            <fieldset disabled={modalStatus !== 'closed'} className="relative z-10 flex flex-col items-center gap-8 w-full max-w-[340px] mx-auto p-4">
                
                {authStep === "choice" && (
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }} className="w-full flex flex-col items-center gap-6">
                        <BlurFade delay={0.1} className="w-full text-center">
                            <h1 className="font-bebas text-5xl md:text-6xl text-[#3E5C76] tracking-wide mb-2">DENTAL STUDIO</h1>
                            <p className="font-geist text-[#54728C] font-medium text-sm">Ingresa o regístrate para comenzar</p>
                        </BlurFade>
                        <BlurFade delay={0.3} className="w-full flex flex-col gap-4 mt-4">
                            <GlassButton onClick={() => selectFlow('login')} className="w-full" contentClassName="flex justify-center w-full">
                                Iniciar Sesión
                            </GlassButton>
                            <GlassButton onClick={() => selectFlow('register')} className="w-full" contentClassName="flex justify-center w-full">
                                Crear Cuenta Nueva
                            </GlassButton>
                        </BlurFade>
                    </motion.div>
                )}

                {authStep !== "choice" && (
                    <div className="w-full space-y-8">
                        <motion.div key={authStep + "title"} initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3 }} className="text-center w-full">
                            <h2 className="font-bebas text-4xl text-[#3E5C76] tracking-wide">{getStepTitle()}</h2>
                            <p className="font-geist text-sm text-[#7A93A7] font-medium mt-1">{getStepSubtitle()}</p>
                        </motion.div>

                        <form onSubmit={(e) => e.preventDefault()} className="w-full space-y-4">
                            <AnimatePresence mode="wait">
                                <motion.div key={authStep} initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} transition={{ duration: 0.2 }} className="w-full">
                                    {authStep === 'login_email' && renderInput('email', 'email', 'Correo', <Mail className="h-5 w-5 text-[#7A93A7]"/>)}
                                    {authStep === 'login_password' && renderInput('password', 'password', 'Contraseña', <Lock className="h-5 w-5 text-[#7A93A7]"/>, true)}
                                    
                                    {authStep === 'reg_name' && renderInput('name', 'text', 'Nombre', <User className="h-5 w-5 text-[#7A93A7]"/>)}
                                    {authStep === 'reg_lastName' && renderInput('lastName', 'text', 'Apellido', <User className="h-5 w-5 text-[#7A93A7]"/>)}
                                    {authStep === 'reg_phone' && renderInput('phone', 'tel', 'Teléfono', <Phone className="h-5 w-5 text-[#7A93A7]"/>)}
                                    {authStep === 'reg_email' && renderInput('email', 'email', 'Correo', <Mail className="h-5 w-5 text-[#7A93A7]"/>)}
                                    {authStep === 'reg_password' && renderInput('password', 'password', 'Contraseña', <Lock className="h-5 w-5 text-[#7A93A7]"/>, true)}
                                    {authStep === 'reg_confirm' && renderInput('confirmPassword', 'password', 'Confirmar Contraseña', <Lock className="h-5 w-5 text-[#7A93A7]"/>, true, true)}
                                </motion.div>
                            </AnimatePresence>
                        </form>

                        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={handleGoBack} className="flex items-center gap-2 text-sm text-[#7A93A7] hover:text-[#3E5C76] font-bold mx-auto mt-6 transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Volver
                        </motion.button>
                    </div>
                )}
            </fieldset>
        </div>
    </div>
  );
};

export default Login;
