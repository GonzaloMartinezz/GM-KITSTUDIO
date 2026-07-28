import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, Camera, MapPin, Banknote, CreditCard, ArrowRightLeft, Smartphone } from 'lucide-react';

const Contact = () => {
  const [activeIndex, setActiveIndex] = useState(0); 
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const items = [
    { id: 1, label: "01", title: "Bienvenida" },
    { id: 2, label: "02", title: "Producto" },
    { id: 3, label: "03", title: "Hablemos" },
    { id: 4, label: "04", title: "Ubicación" },
    { id: 5, label: "05", title: "Pagos" }
  ];

  const circleRadius = isMobile ? 320 : 600; 
  const angleStep = isMobile ? 18 : 20; 

  const sectionVariants = {
    initial: { opacity: 0, filter: 'blur(15px)', y: 30, scale: 0.95 },
    animate: { opacity: 1, filter: 'blur(0px)', y: 0, scale: 1 },
    exit: { opacity: 0, filter: 'blur(15px)', y: -30, scale: 1.05 },
  };

  // Alternating themes
  const isAlternate = activeIndex % 2 !== 0;
  
  // Custom colors for Cream and Blue
  const blueColor = '#0C3B45'; // brand-5
  const creamColor = '#F5F2EB';

  const theme = {
    bg: isAlternate ? 'bg-[#0C3B45]' : 'bg-[#F5F2EB]',
    text: isAlternate ? 'text-[#F5F2EB]' : 'text-[#0C3B45]',
    textMuted: isAlternate ? 'text-[#F5F2EB]/70' : 'text-[#0C3B45]/70',
    border: isAlternate ? 'border-[#F5F2EB]/20' : 'border-[#0C3B45]/20',
    dot: isAlternate ? 'bg-[#F5F2EB]' : 'bg-[#0C3B45]',
    iconBg: isAlternate ? 'bg-[#F5F2EB]' : 'bg-[#0C3B45]',
    iconText: isAlternate ? 'text-[#0C3B45]' : 'text-[#F5F2EB]',
    hoverIconBg: isAlternate ? 'hover:bg-[#3E9B94]' : 'hover:bg-[#3E9B94]',
    hoverIconText: isAlternate ? 'hover:text-[#F5F2EB]' : 'hover:text-[#0C3B45]',
    cardBg: isAlternate ? 'bg-white/10' : 'bg-white/40',
    cardHoverBg: isAlternate ? 'hover:bg-[#F5F2EB]' : 'hover:bg-[#0C3B45]',
    cardHoverText: isAlternate ? 'hover:text-[#0C3B45]' : 'hover:text-[#F5F2EB]',
  };

  const renderSection = () => {
    switch(activeIndex) {
      case 0:
        return (
          <div className="flex flex-col items-center text-center px-4">
            <h1 className={`font-bebas text-7xl md:text-[8rem] ${theme.text} mb-6 tracking-tighter leading-none transition-colors duration-700`}>
              GM KIT STUDIO<span className="text-[#3E9B94]">.</span>
            </h1>
            <p className={`font-geist text-xl md:text-2xl ${theme.textMuted} max-w-2xl font-light transition-colors duration-700`}>
              El aliado estratégico en bioseguridad para consultorios odontológicos y cirujanos en Tucumán.
            </p>
          </div>
        );
      case 1:
        return (
          <div className="flex flex-col items-center text-center px-4">
            <h2 className={`font-bebas text-5xl md:text-7xl ${theme.text} mb-8 tracking-tight transition-colors duration-700`}>MÁXIMA BARRERA BACTERIOLÓGICA</h2>
            <p className={`font-geist text-lg md:text-xl ${theme.textMuted} max-w-3xl mb-10 leading-relaxed transition-colors duration-700`}>
              Nuestros kits esterilizados descartables están diseñados con tela SMS tricapa repelente a fluidos, garantizando la bioseguridad en cada intervención quirúrgica.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className={`px-6 py-2 border ${theme.border} rounded-full text-sm font-bold ${theme.text} transition-colors duration-700`}>Premium</span>
              <span className={`px-6 py-2 border ${theme.border} rounded-full text-sm font-bold ${theme.text} transition-colors duration-700`}>Estéril</span>
              <span className={`px-6 py-2 border ${theme.border} rounded-full text-sm font-bold ${theme.text} transition-colors duration-700`}>Eco-Friendly</span>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col items-center text-center px-4">
            <h2 className={`font-bebas text-5xl md:text-7xl ${theme.text} mb-12 tracking-wide transition-colors duration-700`}>MEDIOS DE COMUNICACIÓN</h2>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              <a href="#" className="flex flex-col items-center gap-6 group">
                <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full ${theme.iconBg} ${theme.iconText} flex items-center justify-center group-hover:scale-110 ${theme.hoverIconBg} ${theme.hoverIconText} transition-all shadow-xl duration-500`}>
                  <Phone size={36} strokeWidth={1.5} />
                </div>
                <span className={`font-bebas text-2xl ${theme.text} tracking-widest transition-colors duration-700`}>WhatsApp</span>
              </a>
              <a href="#" className="flex flex-col items-center gap-6 group">
                <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full ${theme.iconBg} ${theme.iconText} flex items-center justify-center group-hover:scale-110 ${theme.hoverIconBg} ${theme.hoverIconText} transition-all shadow-xl duration-500`}>
                  <Camera size={36} strokeWidth={1.5} />
                </div>
                <span className={`font-bebas text-2xl ${theme.text} tracking-widest transition-colors duration-700`}>Instagram</span>
              </a>
              <a href="#" className="flex flex-col items-center gap-6 group">
                <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full ${theme.iconBg} ${theme.iconText} flex items-center justify-center group-hover:scale-110 ${theme.hoverIconBg} ${theme.hoverIconText} transition-all shadow-xl duration-500`}>
                  <Mail size={36} strokeWidth={1.5} />
                </div>
                <span className={`font-bebas text-2xl ${theme.text} tracking-widest transition-colors duration-700`}>Email</span>
              </a>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col items-center text-center px-4">
            <MapPin size={56} strokeWidth={1.5} className="text-[#3E9B94] mb-6 animate-bounce" />
            <h2 className={`font-bebas text-5xl md:text-7xl ${theme.text} mb-4 tracking-wide transition-colors duration-700`}>DÓNDE ESTAMOS</h2>
            <p className={`font-geist text-2xl ${theme.text} mb-2 font-medium opacity-90 transition-colors duration-700`}>San Martín Centro</p>
            <p className={`font-geist text-xl ${theme.textMuted} mb-10 transition-colors duration-700`}>San Miguel de Tucumán, Argentina</p>
            
            <div className={`flex flex-col md:flex-row gap-6 md:gap-12 mt-4 ${theme.text} opacity-90 bg-white/10 backdrop-blur-sm py-4 px-8 rounded-full shadow-sm border ${theme.border} transition-colors duration-700`}>
              <div className="flex items-center justify-center gap-3"><Phone size={20} className="text-[#3E9B94]"/> <span className="font-medium">+54 9 381 500-0000</span></div>
              <div className="flex items-center justify-center gap-3"><Mail size={20} className="text-[#3E9B94]"/> <span className="font-medium">contacto@gmkitstudio.com.ar</span></div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="flex flex-col items-center text-center px-4">
            <h2 className={`font-bebas text-5xl md:text-7xl ${theme.text} mb-12 tracking-wide transition-colors duration-700`}>MEDIOS DE PAGO</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full max-w-4xl">
              <div className={`${theme.cardBg} border ${theme.border} rounded-3xl p-8 flex flex-col items-center gap-4 ${theme.cardHoverBg} ${theme.cardHoverText} transition-all duration-500 group cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-2`}>
                <Banknote size={40} strokeWidth={1.5} className={`${theme.text} group-hover:text-inherit transition-colors duration-500`} />
                <span className={`font-bold text-sm tracking-widest uppercase ${theme.text} group-hover:text-inherit transition-colors duration-500`}>Efectivo</span>
              </div>
              <div className={`${theme.cardBg} border ${theme.border} rounded-3xl p-8 flex flex-col items-center gap-4 ${theme.cardHoverBg} ${theme.cardHoverText} transition-all duration-500 group cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-2`}>
                <CreditCard size={40} strokeWidth={1.5} className={`${theme.text} group-hover:text-inherit transition-colors duration-500`} />
                <span className={`font-bold text-sm tracking-widest uppercase ${theme.text} group-hover:text-inherit transition-colors duration-500`}>Tarjetas</span>
              </div>
              <div className={`${theme.cardBg} border ${theme.border} rounded-3xl p-8 flex flex-col items-center gap-4 ${theme.cardHoverBg} ${theme.cardHoverText} transition-all duration-500 group cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-2`}>
                <ArrowRightLeft size={40} strokeWidth={1.5} className={`${theme.text} group-hover:text-inherit transition-colors duration-500`} />
                <span className={`font-bold text-sm tracking-widest uppercase ${theme.text} group-hover:text-inherit transition-colors duration-500`}>Transferencia</span>
              </div>
              <div className={`${theme.cardBg} border ${theme.border} rounded-3xl p-8 flex flex-col items-center gap-4 ${theme.cardHoverBg} ${theme.cardHoverText} transition-all duration-500 group cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-2`}>
                <Smartphone size={40} strokeWidth={1.5} className={`${theme.text} group-hover:text-inherit transition-colors duration-500`} />
                <span className={`font-bold text-sm tracking-widest uppercase ${theme.text} group-hover:text-inherit transition-colors duration-500`}>MercadoPago</span>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <div className={`min-h-screen ${theme.bg} overflow-hidden flex flex-col relative font-geist pt-24 pb-12 transition-colors duration-1000 ease-in-out`}>
      
      {/* TOP ARC NAVIGATION */}
      <div className="relative w-full h-37.5 md:h-50 z-20">
        <motion.div 
          className={`absolute left-1/2 border ${theme.border} rounded-full transition-colors duration-1000`}
          initial={false}
          animate={{
            rotate: - (activeIndex - 2) * angleStep
          }}
          transition={{ type: "spring", stiffness: 40, damping: 12, mass: 1 }}
          style={{
            width: `${circleRadius * 2}px`,
            height: `${circleRadius * 2}px`,
            top: `-${circleRadius * 2 - 160}px`,
            marginLeft: `-${circleRadius}px`,
          }}
        >
          {items.map((item, i) => {
            const angle = (i - 2) * angleStep;
            const isActive = activeIndex === i;
            
            return (
              <motion.div 
                key={i}
                onClick={() => setActiveIndex(i)}
                className="absolute top-1/2 left-1/2 flex flex-col items-center justify-center cursor-pointer group"
                initial={false}
                animate={{
                  rotate: - (- (activeIndex - 2) * angleStep) // counter-rotate to stay upright
                }}
                transition={{ type: "spring", stiffness: 40, damping: 12, mass: 1 }}
                style={{
                  width: '120px',
                  height: '100px',
                  marginTop: '-50px',
                  marginLeft: '-60px',
                  // Base transform for positioning on circle
                  transformOrigin: 'center center',
                }}
                // Custom style function for the initial layout
                ref={(node) => {
                   if(node) node.style.transform = `rotate(${angle}deg) translateY(${circleRadius}px) rotate(${-angle}deg)`;
                }}
              >
                {/* We use a wrapper for the position to keep the counter-rotation simple */}
                <div 
                  className="absolute inset-0 flex flex-col items-center justify-center"
                  style={{
                    transform: `rotate(${angle}deg) translateY(${circleRadius}px) rotate(${-angle}deg)`
                  }}
                >
                  <motion.div
                    animate={{
                      rotate: (activeIndex - 2) * angleStep
                    }}
                    transition={{ type: "spring", stiffness: 40, damping: 12, mass: 1 }}
                    className="flex flex-col items-center justify-center"
                  >
                    <motion.span 
                      animate={{ 
                        scale: isActive ? (isMobile ? 1.3 : 1.6) : (isMobile ? 0.8 : 1),
                        opacity: isActive ? 1 : 0.4,
                        color: isActive ? (isAlternate ? creamColor : blueColor) : (isAlternate ? '#ffffff' : '#000000') 
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="font-bebas text-5xl md:text-[5.5rem] drop-shadow-sm origin-bottom"
                      style={{
                        WebkitTextStroke: isActive ? (isAlternate ? `1px ${creamColor}` : `1px ${blueColor}`) : '0px transparent',
                      }}
                    >
                      {item.label}
                    </motion.span>
                    
                    {/* Small indicator dot below active item */}
                    <motion.div 
                      animate={{ scale: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className={`w-2 h-2 rounded-full ${theme.dot} mt-4 transition-colors duration-1000`}
                    />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* DYNAMIC CONTENT AREA WITH BLUR TRANSITION */}
      <div className="grow flex items-center justify-center relative z-10 px-4 md:px-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            variants={sectionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Background purely decorative accents */}
      <div className={`absolute bottom-[-10%] left-[-10%] w-125 h-125 ${isAlternate ? 'bg-[#3E9B94]/20' : 'bg-[#0C3B45]/5'} rounded-full blur-3xl pointer-events-none transition-colors duration-1000`}></div>
      <div className={`absolute top-[20%] right-[-10%] w-100 h-100 ${isAlternate ? 'bg-[#CFF0EA]/10' : 'bg-[#3E9B94]/10'} rounded-full blur-3xl pointer-events-none transition-colors duration-1000`}></div>
    </div>
  );
};

export default Contact;
