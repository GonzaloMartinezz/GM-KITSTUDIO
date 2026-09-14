import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, MessageCircle, Mail, FileText, Ruler, Activity, BookOpen, HeartHandshake } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Particles } from '../components/ui/Particles';
import { Text3DFlip } from '../components/ui/Text3DFlip';
import FeaturesSection from '../components/FeaturesSection';
import FaqSection from '../components/FaqSection';
import CatalogSpecsSection from '../components/CatalogSpecsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import { ScrollVelocityContainer, ScrollVelocityRow } from '../components/ui/ScrollBasedVelocity';

const Home = () => {
  const [_products, setProducts] = useState([]);
  const [_loading, setLoading] = useState(true);
  const { addToCart: _addToCart } = useCart();

  useEffect(() => {
    setTimeout(() => {
      setProducts([
        {
          _id: '1',
          name: "Kit Básico",
          description: "Kit esterilizado descartable.",
          price: 6500,
          image: "https://images.unsplash.com/photo-1598449356475-b9f71db7d847?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          _id: '2',
          name: "Bioseguridad Completo",
          description: "Kit para dos personas.",
          price: 8900,
          image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          _id: '3',
          name: "Implante Premium",
          description: "Máxima barrera bacteriológica.",
          price: 12500,
          image: "https://images.unsplash.com/photo-1584308666744-24d5e4a83e0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        }
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const servicesList = [
    {
      title: "Protección Total",
      desc: "Sistemas integrales de barrera bacteriológica diseñados para entornos clínicos de alta exigencia."
    },
    {
      title: "Logística Segura",
      desc: "Envíos protegidos y controlados para garantizar que el material llegue en condiciones óptimas."
    },
    {
      title: "Soporte Técnico",
      desc: "Asesoramiento especializado en la elección del kit adecuado para cada tipo de intervención."
    }
  ];

  const bentoCards = [
    {
      icon: FileText,
      title: "ESPECIFICACIONES",
      desc: "Detalle técnico de los materiales SMS y gramajes por capa."
    },
    {
      icon: ShieldCheck,
      title: "CERTIFICACIONES",
      desc: "Avalados por normativas nacionales e internacionales vigentes."
    },
    {
      icon: Ruler,
      title: "TALLAS Y MEDIDAS",
      desc: "Guía completa de dimensiones de camisolines y campos quirúrgicos."
    },
    {
      icon: Activity,
      title: "USOS CLÍNICOS",
      desc: "Indicaciones específicas para cirugía general e implantes odontológicos."
    },
    {
      icon: BookOpen,
      title: "GUÍA DE DESCARTE",
      desc: "Manual de colocación estéril y protocolos de disposición final."
    },
    {
      icon: HeartHandshake,
      title: "SOPORTE PROFESIONAL",
      desc: "Línea directa para consultas técnicas exclusivas para médicos."
    }
  ];

  return (
    <div className="bg-brand-1 min-h-screen text-brand-5 font-geist">

      {/* Asymmetric Split Layout (Hero) */}
      <div className="flex flex-col lg:flex-row min-h-screen relative">

        {/* Left Side: Typography & Content */}
        <div className="w-full lg:w-[45%] px-6 md:px-12 pt-40 pb-32 flex flex-col justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl lg:text-[7rem] font-bebas leading-[0.9] tracking-tight mb-8"
          >
            Siente la <br />
            Seguridad <br />
            Con GM Kit - <br />
            Bioseguridad
          </motion.h1>

          {/* Removed Scroll Indicator as requested */}

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="max-w-sm"
          >
            <div className="w-4 h-4 bg-brand-3 mb-4"></div>
            <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-brand-5/80 leading-relaxed">
              GM Kit Studio es una opción premium y confiable para profesionales con un sistema eficiente de protección.
            </p>
          </motion.div>
        </div>

        {/* Right Side: Massive Image & Floating Elements */}
        <div className="w-full lg:w-[55%] p-4 lg:p-8 lg:pl-0 h-[60vh] lg:h-screen relative">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full h-full rounded-[3rem] overflow-hidden relative shadow-2xl"
          >
            <img
              src="/images/kitsodontologico.jpg"
              alt="Kit Quirúrgico"
              className="w-full h-full object-cover"
            />

            {/* Top Left Vertical Tag */}
            <div className="absolute top-12 left-8 bg-brand-1 text-brand-5 px-3 py-6 rounded-full flex flex-col items-center gap-4">
              <span className="[writing-mode:vertical-lr] rotate-180 font-bebas tracking-widest text-lg">GM KIT STUDIO</span>
              <div className="bg-brand-5 text-brand-1 w-8 h-8 rounded-full flex items-center justify-center">
                <ArrowRight className="w-4 h-4 -rotate-45" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Original Services Section */}
      <section className="bg-brand-5 text-brand-1 rounded-t-[60px] mt-8 lg:-mt-10 relative z-40 py-24 px-6 md:px-12 lg:px-24 overflow-hidden">
        {/* Particles Background */}
        <Particles
          className="absolute inset-0 z-0"
          quantity={40}
          ease={80}
          color="#F1E8D9"
        />
        <div className="relative z-10 flex flex-col gap-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-bebas text-center mb-4 md:mb-8 text-[clamp(4rem,12vw,120px)] uppercase leading-none tracking-wider text-brand-1"
          >
            SERVICES
          </motion.h2>

          {servicesList.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative flex flex-col items-center text-center border-b border-brand-1/20 pb-12 pt-8 group hover:border-brand-1 transition-colors overflow-hidden"
            >
              {/* Background Watermark Number */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[clamp(8rem,15vw,12rem)] leading-none font-bebas text-brand-1/3 group-hover:text-brand-1/10 transition-colors pointer-events-none select-none z-0">
                {String(index + 1).padStart(2, '0')}
              </div>

              <div className="flex flex-col items-center relative z-10">
                <h3 className="text-[clamp(2rem,4vw,3rem)] font-bebas uppercase mb-3 group-hover:text-brand-3 transition-colors text-brand-1">
                  {service.title}
                </h3>
                <p className="text-base md:text-lg text-brand-1/70 font-light font-geist max-w-2xl">
                  {service.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services Section (Bento Box Layout) */}
      <section className="bg-brand-1 rounded-t-[60px] -mt-10 relative z-40 py-32 px-4 md:px-12 lg:px-24 shadow-[0_-20px_40px_rgba(0,0,0,0.1)]">

        <div className="max-w-350 mx-auto relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-bebas text-center mb-16 text-[clamp(4rem,8vw,90px)] uppercase leading-[0.9] tracking-wider text-brand-5"
          >
            SERVICIOS <span className="text-brand-3">PREMIUM</span>
          </motion.h2>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6">

            {bentoCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative overflow-hidden group bg-brand-5 rounded-4xl md:rounded-[3rem] p-8 md:p-10 h-62.5 md:h-75 flex flex-col justify-center items-center shadow-xl cursor-pointer"
              >
                {/* Wave effect */}
                <div className="absolute top-[120%] left-1/2 -translate-x-1/2 w-[250%] aspect-square bg-[#88C9C4] rounded-[45%] group-hover:top-[-50%] group-hover:rotate-170 transition-all duration-1200 ease-in-out z-0 pointer-events-none"></div>

                {/* Content */}
                <div className="relative z-10 pointer-events-none w-full flex flex-col items-center text-center gap-4">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#88C9C4] text-[#0C3B45] group-hover:bg-[#0C3B45] group-hover:text-[#88C9C4] flex items-center justify-center transition-colors duration-800 shadow-sm">
                    <card.icon size={28} />
                  </div>
                  <h3 className="font-bebas text-[clamp(1.5rem,2vw,2rem)] leading-none text-[#88C9C4] group-hover:text-[#0C3B45] transition-colors duration-800">
                    {card.title}
                  </h3>
                  <p className="font-geist text-brand-1 group-hover:text-[#0C3B45] transition-colors duration-800 text-sm md:text-base font-light px-2">
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Wide Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="md:col-span-2 relative overflow-hidden group bg-[#88C9C4] rounded-4xl md:rounded-[3rem] p-8 md:p-12 min-h-87.5 flex flex-col justify-center shadow-xl cursor-pointer"
            >
              {/* Wave effect for wide card */}
              <div className="absolute top-[120%] left-1/2 -translate-x-1/2 w-[200%] md:w-[150%] aspect-square bg-[#0C3B45] rounded-[40%] group-hover:top-[-120%] md:group-hover:-top-full group-hover:rotate-150 transition-all duration-1500 ease-in-out z-0 pointer-events-none"></div>
              <div className="relative z-10 w-full flex flex-col md:flex-row md:items-center justify-between gap-8 pointer-events-none">
                <div className="max-w-lg">
                  <h3 className="font-bebas text-5xl md:text-7xl text-[#0C3B45] group-hover:text-[#88C9C4] transition-colors duration-700 mb-4 leading-[0.9]">
                    CONTÁCTANOS
                  </h3>
                  <p className="font-geist text-[#0C3B45]/80 group-hover:text-[#88C9C4]/90 transition-colors duration-700 text-base md:text-lg font-medium">
                    Contáctanos para brindarte información detallada del producto, nuestros sistemas de bioseguridad y resolver todas tus dudas.
                  </p>
                </div>

                <div className="flex flex-col gap-3 pointer-events-auto shrink-0 w-full md:w-auto">
                  <a href="#" className="bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-3 rounded-full font-bebas text-xl tracking-wider transition-colors shadow-lg flex items-center justify-center gap-3">
                    <MessageCircle size={22} /> WhatsApp
                  </a>
                  <a href="#" className="bg-[#EA4335] hover:bg-[#C5221F] text-white px-8 py-3 rounded-full font-bebas text-xl tracking-wider transition-colors shadow-lg flex items-center justify-center gap-3">
                    <Mail size={22} /> Gmail
                  </a>
                  <button className="bg-[#0C3B45] group-hover:bg-[#88C9C4] text-[#88C9C4] group-hover:text-[#0C3B45] px-8 py-3 rounded-full font-bebas text-xl tracking-wider transition-colors duration-700 flex items-center justify-center">
                    OBTENER PROPUESTA
                  </button>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* NEW COMPONENTS ADDED FROM USER REQUESTS */}
      <TestimonialsSection
        title="LO QUE DICEN NUESTROS CLIENTES"
        description="Descubre por qué cientos de profesionales odontológicos en Tucumán confían en GM Kit Studio para sus procedimientos diarios."
        testimonials={[
          {
            author: {
              name: "Dr. Roberto Sánchez",
              handle: "@rsanchez_odonto",
              avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
            },
            text: "La bioseguridad es innegociable. Con GM Kit tengo la tranquilidad de que cada insumo cumple con los más altos estándares. Mis pacientes y yo estamos seguros."
          },
          {
            author: {
              name: "Dra. María Gómez",
              handle: "@mariagomez_implantes",
              avatar: "https://images.unsplash.com/photo-1594824432240-84c6c2162ebc?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
            },
            text: "El servicio y la rapidez de entrega han transformado la forma en que organizo mis cirugías. Excelente atención y calidad de primera."
          },
          {
            author: {
              name: "Dr. Carlos Ruiz",
              handle: "@cruiz_dental",
              avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
            },
            text: "Encontrar un proveedor local con esta calidad era impensado. Los kits quirúrgicos son excepcionales y el trato es súper profesional."
          },
          {
            author: {
              name: "Dra. Laura Fernández",
              handle: "@laura_ortodoncia",
              avatar: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
            },
            text: "Cada kit viene en perfectas condiciones, listo para usar. Recomiendo GM Kit Studio a todos mis colegas sin dudarlo."
          }
        ]}
      />
      <FeaturesSection />
      <FaqSection />
      <CatalogSpecsSection />

      {/* Scroll Based Velocity Section */}
      <section className="bg-brand-1 py-12 overflow-hidden relative z-50 rounded-t-[60px] -mt-10 shadow-[0_-20px_40px_rgba(0,0,0,0.1)]">
        <ScrollVelocityContainer className="text-4xl md:text-7xl font-bebas text-brand-5">
          <ScrollVelocityRow baseVelocity={5} direction={1}>
            <span className="mx-4">PRODUCTO PREMIUM</span> <span className="text-brand-3">✦</span> <span className="mx-4">PRODUCTOS DESCARTABLES</span> <span className="text-brand-3">✦</span>
          </ScrollVelocityRow>
          <ScrollVelocityRow baseVelocity={5} direction={-1}>
            <span className="mx-4">KITS QUIRÚRGICOS</span> <span className="text-brand-3">✦</span> <span className="mx-4">KIT DE CIRUGÍA</span> <span className="text-brand-3">✦</span>
          </ScrollVelocityRow>
        </ScrollVelocityContainer>
      </section>

      {/* 3D Text Flip Section */}
      <section className="bg-brand-1 py-24 md:py-32 flex flex-col justify-center items-center overflow-hidden relative z-40">

        {/* Enhanced decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 md:w-200 h-150 md:h-200 bg-brand-2/20 rounded-full blur-[100px] md:blur-[120px] z-0 pointer-events-none mix-blend-overlay"></div>

        {/* Dynamic Glow Trail */}
        <motion.div
          animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.05, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-50 md:h-75 bg-linear-to-r from-transparent via-brand-3/30 to-transparent blur-[60px] md:blur-[80px] z-0"
        ></motion.div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-25 md:h-37.5 bg-linear-to-r from-transparent via-brand-4/40 to-transparent blur-2xl md:blur-[50px] z-0 transform -rotate-2"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-25 md:h-37.5 bg-linear-to-r from-transparent via-[#88C9C4]/20 to-transparent blur-[50px] md:blur-[60px] z-0 transform rotate-2"></div>

        <div className="absolute -top-10 md:top-10 left-4 md:left-10 text-brand-5/10 font-bebas text-[10rem] md:text-[15rem] select-none z-0 leading-none blur-[2px]">"</div>
        <div className="absolute -bottom-10 md:bottom-10 right-4 md:right-10 text-brand-5/10 font-bebas text-[10rem] md:text-[15rem] select-none z-0 leading-none rotate-180 blur-[2px]">"</div>

        <div className="relative z-10 flex flex-col items-center px-4">
          <p className="font-geist text-brand-5 uppercase tracking-[0.3em] text-xs md:text-sm font-bold mb-6 md:mb-8 flex items-center gap-4">
            <span className="w-8 md:w-16 h-px bg-brand-5"></span>
            Tu opinión es clave
            <span className="w-8 md:w-16 h-px bg-brand-5"></span>
          </p>

          <Text3DFlip
            className="font-bebas text-center cursor-pointer text-[clamp(4rem,9vw,9rem)] tracking-wider leading-[0.9]"
            textClassName="text-brand-5 drop-shadow-[0_10px_30px_rgba(62,92,118,0.3)]"
            flipTextClassName="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]"
            rotateDirection="bottom"
            staggerDuration={0.02}
          >
            CUÉNTANOS TU EXPERIENCIA
          </Text3DFlip>

          <p className="font-geist text-brand-5/70 mt-8 max-w-lg text-center mx-auto text-sm md:text-base font-medium">
            Pasa el cursor sobre el texto. Cada detalle ha sido diseñado pensando en los mejores profesionales.
          </p>
        </div>
      </section>

      {/* Validation & Support Section (Premium Arches) */}
      <section className="bg-linear-to-br from-brand-5 via-brand-5 to-[#061F24] pt-32 pb-0 overflow-hidden relative z-50 rounded-t-[60px] -mt-10 shadow-[0_-20px_50px_rgba(0,0,0,0.2)]">

        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-3/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-2/10 rounded-full blur-[120px]"></div>
        </div>

        <div className="text-center mb-24 relative z-10 px-4">
          <h2 className="text-brand-1 text-[clamp(3rem,8vw,6rem)] font-bebas tracking-wider leading-[0.9]">
            VALIDACIÓN DE <span className="text-brand-2">PRODUCTO</span>
          </h2>
          <p className="text-brand-1/70 font-geist mt-6 max-w-2xl mx-auto text-lg md:text-xl font-light">
            Transparencia y calidad garantizada. Descubre cómo nuestros clientes validan cada kit en tiempo real.
          </p>
        </div>

        {/* Arches Container */}
        <div className="max-w-350 mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 relative z-10 items-end">

          {/* Column 1 */}
          <div className="bg-brand-1 rounded-[40px] md:rounded-b-none md:rounded-t-[60px] pb-110 md:pb-0 md:h-150 flex flex-col items-center pt-16 px-6 md:px-10 relative w-full shadow-[0_-10px_40px_rgba(0,0,0,0.1)] group overflow-hidden md:overflow-visible">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bebas text-brand-5 tracking-wide mb-2 group-hover:text-brand-3 transition-colors">Trazabilidad</h3>
              <p className="font-geist text-brand-5/60 text-sm">Escanea y verifica el origen.</p>
            </div>

            {/* Phone Mockup */}
            <div className="w-70 h-140 bg-white border-8 border-[#111] rounded-[3rem] shadow-2xl absolute -bottom-10 md:-bottom-30 flex flex-col overflow-hidden group-hover:-translate-y-4 transition-transform duration-700">
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-24 h-7 bg-[#111] rounded-full z-20"></div>

              <div className="flex-1 bg-brand-5 p-6 pt-20 flex flex-col items-center relative overflow-hidden">
                {/* Camera Viewfinder Fake */}
                <div className="absolute inset-0 bg-black z-0 opacity-20"></div>

                <div className="relative z-10 w-48 h-48 mb-8 mt-4 flex items-center justify-center">
                  {/* Scanner Corners */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-brand-2 rounded-tl-lg"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-brand-2 rounded-tr-lg"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-brand-2 rounded-bl-lg"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-brand-2 rounded-br-lg"></div>

                  {/* QR Code Fake */}
                  <div className="w-32 h-32 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-2 flex flex-wrap gap-1">
                    {[...Array(16)].map((_, i) => (
                      <div key={i} className={`w-[22%] h-[22%] rounded-sm m-[1.5%] ${i % 3 === 0 || i % 5 === 0 ? 'bg-white' : 'bg-transparent'}`}></div>
                    ))}
                  </div>

                  {/* Scan Line */}
                  <div className="absolute top-1/2 left-0 w-full h-1 bg-brand-2 shadow-[0_0_15px_rgba(136,201,196,0.8)] animate-pulse"></div>
                </div>

                <div className="relative z-10 bg-white/10 backdrop-blur-md w-full p-4 rounded-2xl border border-white/20 text-center">
                  <p className="text-white font-geist text-sm mb-1">Escaneando Lote...</p>
                  <p className="text-brand-2 font-bebas text-xl">L-2026-993</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2 */}
          <div className="bg-brand-1 rounded-[40px] md:rounded-b-none md:rounded-t-[60px] pt-120 md:pt-0 md:h-175 flex flex-col items-center px-6 md:px-10 relative w-full z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.15)] group overflow-hidden md:overflow-visible">
            {/* Phone Mockup */}
            <div className="w-70 h-140 bg-white border-8 border-[#111] rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.3)] absolute -top-10 md:-top-20 flex flex-col overflow-hidden group-hover:-translate-y-4 transition-transform duration-700">
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-24 h-7 bg-[#111] rounded-full z-20"></div>

              <div className="flex-1 bg-brand-1/40 p-6 pt-20 flex flex-col items-center relative">
                {/* Decorative blob */}
                <div className="absolute top-0 left-0 w-full h-64 bg-linear-to-b from-brand-3/20 to-transparent z-0"></div>

                <div className="relative z-10 w-20 h-20 bg-[#20666B] rounded-full flex items-center justify-center mb-6 shadow-xl shadow-[#20666B]/30">
                  <ShieldCheck className="w-10 h-10 text-white" />
                </div>

                <h4 className="text-center font-bebas text-brand-5 text-3xl mb-2 relative z-10">Kit Validado</h4>
                <p className="text-center font-geist text-brand-5/60 text-xs mb-8 relative z-10">Autenticidad comprobada por GM Kit Studio.</p>

                <div className="w-full relative z-10">
                  <div className="bg-white p-5 rounded-3xl shadow-sm border border-brand-5/5 flex flex-col gap-4 mb-4">
                    <div className="flex justify-between items-center border-b border-brand-5/5 pb-3">
                      <span className="text-xs text-brand-5/50 font-geist">Feedback</span>
                      <span className="text-sm font-bold text-brand-5">¡Calidad 10/10!</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-brand-5/5 pb-3">
                      <span className="text-xs text-brand-5/50 font-geist">Doctor/a</span>
                      <span className="text-sm font-bold text-brand-5">Dr. Wagner</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-brand-5/50 font-geist">Valoración</span>
                      <span className="text-sm font-bold text-brand-3 tracking-widest">★★★★★</span>
                    </div>
                  </div>

                  <button className="mt-12 bg-transparent border border-brand-5 text-brand-5 px-12 py-4 rounded-full font-bebas tracking-widest text-xl hover:bg-brand-5 hover:text-brand-1 transition-all duration-300 shadow-[0_0_20px_rgba(62,92,118,0.1)] hover:shadow-[0_0_30px_rgba(62,92,118,0.3)] relative overflow-hidden group">
                    <span className="relative z-10">Dejar Reseña</span>
                    <div className="absolute inset-0 bg-brand-5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
                  </button>
                </div>
              </div>
            </div>

            <div className="absolute bottom-12 md:bottom-28 w-full px-8 text-center">
              <h3 className="text-3xl md:text-4xl font-bebas text-brand-5 tracking-wide mb-2 group-hover:text-brand-3 transition-colors">Comunidad</h3>
              <p className="font-geist text-brand-5/60 text-sm">Validado por cientos de profesionales.</p>
            </div>
          </div>

          {/* Column 3 */}
          <div className="bg-brand-1 rounded-[40px] md:rounded-b-none md:rounded-t-[60px] pb-110 md:pb-0 md:h-150 flex flex-col items-center pt-16 px-6 md:px-10 relative w-full shadow-[0_-10px_40px_rgba(0,0,0,0.1)] group overflow-hidden md:overflow-visible">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bebas text-brand-5 tracking-wide mb-2 group-hover:text-brand-3 transition-colors">Control Total</h3>
              <p className="font-geist text-brand-5/60 text-sm">Gestiona tu stock inteligentemente.</p>
            </div>

            {/* Phone Mockup */}
            <div className="w-70 h-140 bg-white border-8 border-[#111] rounded-[3rem] shadow-2xl absolute -bottom-10 md:-bottom-30 flex flex-col overflow-hidden group-hover:-translate-y-4 transition-transform duration-700">
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-24 h-7 bg-[#111] rounded-full z-20"></div>

              <div className="flex-1 bg-[#F8F9FA] p-6 pt-20 flex flex-col">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <p className="text-[10px] text-brand-5/50 uppercase tracking-widest font-bold mb-1">Stock Actual</p>
                    <h5 className="font-bebas text-4xl text-brand-5 leading-none">2,450</h5>
                  </div>
                  <div className="w-12 h-12 bg-brand-1 rounded-full border border-brand-2 flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-[#20666B]" />
                  </div>
                </div>

                {/* Premium Dashboard Card */}
                <div className="w-full h-40 bg-linear-to-br from-brand-5 via-[#20666B] to-brand-5 rounded-3xl mb-6 p-5 flex flex-col justify-between shadow-xl relative overflow-hidden">
                  <div className="absolute -right-5 -top-5 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

                  <div className="relative z-10 flex justify-between items-start text-brand-1">
                    <span className="text-xs font-geist uppercase tracking-widest opacity-80">Alerta Stock</span>
                    <span className="w-2 h-2 bg-brand-2 rounded-full animate-pulse shadow-[0_0_8px_#88C9C4]"></span>
                  </div>
                  <div className="relative z-10">
                    <p className="text-brand-1/70 text-xs mb-1 font-geist">Kits de Cirugía</p>
                    <div className="text-brand-1 font-bebas tracking-wider text-3xl">DISPONIBLE</div>
                  </div>
                </div>

                {/* List items */}
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded-2xl flex items-center gap-3 shadow-sm border border-brand-5/5">
                    <div className="w-10 h-10 bg-brand-1 rounded-xl flex items-center justify-center text-[#20666B]">✦</div>
                    <div className="flex-1">
                      <div className="h-2 w-20 bg-brand-5/20 rounded-full mb-2"></div>
                      <div className="h-1.5 w-12 bg-brand-5/10 rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-2xl flex items-center gap-3 shadow-sm border border-brand-5/5">
                    <div className="w-10 h-10 bg-brand-1 rounded-xl flex items-center justify-center text-[#20666B]">✦</div>
                    <div className="flex-1">
                      <div className="h-2 w-24 bg-brand-5/20 rounded-full mb-2"></div>
                      <div className="h-1.5 w-16 bg-brand-5/10 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Fill bottom space so white columns connect to footer/bottom seamlessly */}
        <div className="h-62.5 bg-brand-1 absolute bottom-0 left-0 w-full z-0 border-t border-brand-1"></div>
      </section>

    </div>
  );
};

export default Home;
