import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, MessageCircle, Mail, FileText, Ruler, Activity, BookOpen, HeartHandshake, Star, Award, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Particles } from '../components/ui/Particles';
import FeaturesSection from '../components/FeaturesSection';
import FaqSection from '../components/FaqSection';
import CatalogSpecsSection from '../components/CatalogSpecsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import { ScrollVelocityContainer, ScrollVelocityRow } from '../components/ui/ScrollBasedVelocity';
import ReviewModal from '../components/ReviewModal';

const Home = () => {
  const [_products, setProducts] = useState([]);
  const [_loading, setLoading] = useState(true);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
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
        <div className="w-full lg:w-[45%] px-6 sm:px-8 md:px-12 pt-28 sm:pt-36 lg:pt-40 pb-12 lg:pb-32 flex flex-col justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-bebas leading-[0.9] tracking-tight mb-6 sm:mb-8 break-words"
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
        <div className="w-full lg:w-[55%] p-4 sm:p-6 lg:p-8 lg:pl-0 h-[48vh] sm:h-[60vh] lg:h-screen relative">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full h-full rounded-[2rem] sm:rounded-[3rem] overflow-hidden relative shadow-2xl"
          >
            <img
              src="/images/kitsodontologico.jpg"
              alt="Kit Quirúrgico"
              className="w-full h-full object-cover"
            />

            {/* Top Left Vertical Tag */}
            <div className="absolute top-6 left-6 sm:top-12 sm:left-8 bg-brand-1 text-brand-5 px-2.5 py-4 sm:px-3 sm:py-6 rounded-full flex flex-col items-center gap-3 sm:gap-4 shadow-md">
              <span className="[writing-mode:vertical-lr] rotate-180 font-bebas tracking-widest text-base sm:text-lg">GM KIT STUDIO</span>
              <div className="bg-brand-5 text-brand-1 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center">
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 -rotate-45" />
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
      <section className="bg-brand-1 rounded-t-[60px] -mt-10 relative z-40 py-20 sm:py-28 lg:py-32 px-4 sm:px-6 md:px-12 lg:px-24 shadow-[0_-20px_40px_rgba(0,0,0,0.1)]">

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-bebas text-center mb-10 sm:mb-16 text-[clamp(3.5rem,8vw,90px)] uppercase leading-[0.9] tracking-wider text-brand-5"
          >
            SERVICIOS <span className="text-brand-3">PREMIUM</span>
          </motion.h2>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

            {bentoCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative overflow-hidden group bg-brand-5 rounded-3xl sm:rounded-4xl md:rounded-[3rem] p-6 sm:p-8 md:p-10 min-h-[260px] h-auto md:h-75 flex flex-col justify-center items-center shadow-xl cursor-pointer"
              >
                {/* Wave effect */}
                <div className="absolute top-[120%] left-1/2 -translate-x-1/2 w-[250%] aspect-square bg-[#88C9C4] rounded-[45%] group-hover:top-[-50%] group-hover:rotate-170 transition-all duration-1200 ease-in-out z-0 pointer-events-none"></div>

                {/* Content */}
                <div className="relative z-10 pointer-events-none w-full flex flex-col items-center text-center gap-3 sm:gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl bg-[#88C9C4] text-[#0C3B45] group-hover:bg-[#0C3B45] group-hover:text-[#88C9C4] flex items-center justify-center transition-colors duration-800 shadow-sm shrink-0">
                    <card.icon size={26} />
                  </div>
                  <h3 className="font-bebas text-[clamp(1.5rem,2vw,2rem)] leading-none text-[#88C9C4] group-hover:text-[#0C3B45] transition-colors duration-800">
                    {card.title}
                  </h3>
                  <p className="font-geist text-brand-1 group-hover:text-[#0C3B45] transition-colors duration-800 text-xs sm:text-sm md:text-base font-light px-2 leading-relaxed">
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
              className="md:col-span-2 relative overflow-hidden group bg-[#88C9C4] rounded-3xl sm:rounded-4xl md:rounded-[3rem] p-6 sm:p-8 md:p-12 min-h-auto md:min-h-87.5 flex flex-col justify-center shadow-xl cursor-pointer"
            >
              {/* Wave effect for wide card */}
              <div className="absolute top-[120%] left-1/2 -translate-x-1/2 w-[200%] md:w-[150%] aspect-square bg-[#0C3B45] rounded-[40%] group-hover:top-[-120%] md:group-hover:-top-full group-hover:rotate-150 transition-all duration-1500 ease-in-out z-0 pointer-events-none"></div>
              <div className="relative z-10 w-full flex flex-col md:flex-row md:items-center justify-between gap-8 pointer-events-none">
                <div className="max-w-lg">
                  <h3 className="font-bebas text-4xl sm:text-5xl md:text-7xl text-[#0C3B45] group-hover:text-[#88C9C4] transition-colors duration-700 mb-4 leading-[0.9]">
                    CONTÁCTANOS
                  </h3>
                  <p className="font-geist text-[#0C3B45]/80 group-hover:text-[#88C9C4]/90 transition-colors duration-700 text-sm sm:text-base md:text-lg font-medium">
                    Contáctanos para brindarte información detallada del producto, nuestros sistemas de bioseguridad y resolver todas tus dudas.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row md:flex-col gap-3 pointer-events-auto shrink-0 w-full md:w-auto">
                  <a href="#" className="bg-[#25D366] hover:bg-[#128C7E] text-white px-6 sm:px-8 py-3 rounded-full font-bebas text-lg sm:text-xl tracking-wider transition-colors shadow-lg flex items-center justify-center gap-3">
                    <MessageCircle size={22} /> WhatsApp
                  </a>
                  <a href="#" className="bg-[#EA4335] hover:bg-[#C5221F] text-white px-6 sm:px-8 py-3 rounded-full font-bebas text-lg sm:text-xl tracking-wider transition-colors shadow-lg flex items-center justify-center gap-3">
                    <Mail size={22} /> Gmail
                  </a>
                  <button className="bg-[#0C3B45] group-hover:bg-[#88C9C4] text-[#88C9C4] group-hover:text-[#0C3B45] px-6 sm:px-8 py-3 rounded-full font-bebas text-lg sm:text-xl tracking-wider transition-colors duration-700 flex items-center justify-center">
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
            Transparencia y excelencia en cada detalle. Descubre la máxima calidad del mercado comprobada por especialistas.
          </p>
        </div>

        {/* Arches Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 relative z-10 items-end">

          {/* Column 1 — La Mejor Calidad del Mercado */}
          <div className="bg-brand-1 rounded-3xl sm:rounded-[40px] lg:rounded-b-none lg:rounded-t-[60px] p-6 sm:p-8 lg:p-0 lg:pt-14 lg:px-10 lg:h-150 flex flex-col items-center relative w-full shadow-[0_-10px_40px_rgba(0,0,0,0.1)] group overflow-hidden lg:overflow-visible">
            <div className="text-center mb-6 lg:mb-8">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bebas text-brand-5 tracking-wide mb-1 group-hover:text-brand-3 transition-colors">
                La Mejor Calidad
              </h3>
              <p className="font-geist text-brand-5/70 text-xs sm:text-sm max-w-xs mx-auto font-medium">
                Usamos la mejor calidad del mercado actualmente.
              </p>
            </div>

            {/* Phone Mockup */}
            <div className="w-full max-w-[270px] sm:max-w-[280px] h-[480px] sm:h-[540px] lg:w-70 lg:h-140 bg-white border-8 border-[#111] rounded-[2.5rem] sm:rounded-[3rem] shadow-2xl relative lg:absolute lg:-bottom-12 flex flex-col overflow-hidden group-hover:-translate-y-2 lg:group-hover:-translate-y-4 transition-transform duration-700 my-2 lg:my-0">
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-20 sm:w-24 h-6 sm:h-7 bg-[#111] rounded-full z-20"></div>

              <div className="flex-1 bg-brand-5 p-5 sm:p-6 pt-16 sm:pt-18 flex flex-col items-center justify-between relative overflow-hidden pb-6 sm:pb-8">
                <div className="absolute inset-0 bg-black z-0 opacity-25"></div>

                <div className="relative z-10 w-44 sm:w-48 h-40 sm:h-44 mb-3 mt-1 flex flex-col items-center justify-center">
                  {/* Scanner Corners */}
                  <div className="absolute top-0 left-0 w-7 sm:w-8 h-7 sm:h-8 border-t-4 border-l-4 border-brand-2 rounded-tl-lg"></div>
                  <div className="absolute top-0 right-0 w-7 sm:w-8 h-7 sm:h-8 border-t-4 border-r-4 border-brand-2 rounded-tr-lg"></div>
                  <div className="absolute bottom-0 left-0 w-7 sm:w-8 h-7 sm:h-8 border-b-4 border-l-4 border-brand-2 rounded-bl-lg"></div>
                  <div className="absolute bottom-0 right-0 w-7 sm:w-8 h-7 sm:h-8 border-b-4 border-r-4 border-brand-2 rounded-br-lg"></div>

                  {/* Quality Badge Display */}
                  <div className="w-34 sm:w-38 h-30 sm:h-34 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-3 flex flex-col items-center justify-center text-center shadow-inner">
                    <Award className="w-9 h-9 sm:w-11 sm:h-11 text-brand-3 mb-1.5 animate-bounce" />
                    <span className="text-brand-1 font-bebas text-lg sm:text-xl leading-none">MEJOR CALIDAD</span>
                    <span className="text-brand-2 font-geist text-[9px] sm:text-[10px] font-bold uppercase tracking-widest mt-1">100% Comprobada</span>
                  </div>

                  {/* Laser Scan Line */}
                  <div className="absolute top-1/2 left-0 w-full h-1 bg-brand-2 shadow-[0_0_15px_rgba(136,201,196,0.9)] animate-pulse"></div>
                </div>

                <div className="relative z-10 bg-white/10 backdrop-blur-md w-full p-3 sm:p-3.5 rounded-2xl border border-white/20 text-center">
                  <p className="text-brand-2 font-geist text-[10px] sm:text-[11px] uppercase tracking-wider font-bold mb-0.5">Estándar N°1</p>
                  <p className="text-white font-bebas text-lg sm:text-xl tracking-wide leading-tight">MEJOR CALIDAD DEL MERCADO</p>
                  <p className="text-white/80 text-[9px] sm:text-[10px] font-geist mt-1 leading-snug">
                    Usamos la mejor calidad del mercado actualmente. SMS Trilaminado estéril.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2 — Kit Validado Especialista Gonzalo Martinez */}
          <div className="bg-brand-1 rounded-3xl sm:rounded-[40px] lg:rounded-b-none lg:rounded-t-[60px] p-6 sm:p-8 lg:p-0 lg:px-10 lg:h-175 flex flex-col items-center relative w-full z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.15)] group overflow-hidden lg:overflow-visible">
            {/* Phone Mockup */}
            <div className="w-full max-w-[270px] sm:max-w-[280px] h-[480px] sm:h-[540px] lg:w-70 lg:h-140 bg-white border-8 border-[#111] rounded-[2.5rem] sm:rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.3)] relative lg:absolute lg:-top-20 flex flex-col overflow-hidden group-hover:-translate-y-2 lg:group-hover:-translate-y-4 transition-transform duration-700 my-2 lg:my-0">
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-20 sm:w-24 h-6 sm:h-7 bg-[#111] rounded-full z-20"></div>

              <div className="flex-1 bg-brand-1/40 p-5 sm:p-6 pt-14 sm:pt-16 flex flex-col items-center relative">
                {/* Decorative blob */}
                <div className="absolute top-0 left-0 w-full h-64 bg-linear-to-b from-brand-3/20 to-transparent z-0"></div>

                <div className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 bg-[#20666B] rounded-full flex items-center justify-center mb-2 sm:mb-3 shadow-xl shadow-[#20666B]/30 shrink-0">
                  <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>

                <h4 className="text-center font-bebas text-brand-5 text-2xl sm:text-3xl mb-1 relative z-10">Kit Validado</h4>
                <p className="text-center font-geist text-brand-5/70 text-xs mb-3 sm:mb-5 relative z-10 font-medium">
                  Especialista Gonzalo Martínez
                </p>

                <div className="w-full relative z-10">
                  <div className="bg-white p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl shadow-sm border border-brand-5/5 flex flex-col gap-2.5 sm:gap-3 mb-2">
                    <div className="flex justify-between items-center border-b border-brand-5/5 pb-2">
                      <span className="text-[11px] sm:text-xs text-brand-5/50 font-geist">Especialista</span>
                      <span className="text-[11px] sm:text-xs font-bold text-brand-5">Gonzalo Martínez</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-brand-5/5 pb-2">
                      <span className="text-[11px] sm:text-xs text-brand-5/50 font-geist">Comprobación</span>
                      <span className="text-[11px] sm:text-xs font-bold text-brand-5">Calidad 10/10</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] sm:text-xs text-brand-5/50 font-geist">Valoración</span>
                      <div className="flex items-center gap-1">
                        <span className="text-[11px] sm:text-xs font-bold text-brand-5">5.0</span>
                        <span className="text-xs sm:text-sm font-bold text-[#F59E0B] tracking-widest">★★★★★</span>
                      </div>
                    </div>
                  </div>

                  {/* Button inside Phone */}
                  <button
                    onClick={() => setIsReviewModalOpen(true)}
                    className="mt-3 sm:mt-4 w-full bg-[#5D7E8E] hover:bg-[#6E93A5] text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl sm:rounded-2xl font-bebas tracking-widest text-sm sm:text-base flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(93,126,142,0.4)] transition-all cursor-pointer"
                  >
                    <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white text-white" />
                    <span>DEJA TU RESEÑA DEL PRODUCTO</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Arch Bottom Text & Button */}
            <div className="relative lg:absolute lg:bottom-12 w-full px-4 sm:px-5 text-center flex flex-col items-center mt-6 lg:mt-0">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bebas text-brand-5 tracking-wide mb-1 group-hover:text-brand-3 transition-colors">Kit Validado</h3>
              <p className="font-geist text-brand-5/70 text-xs sm:text-sm mb-3 font-medium">Validado por Especialista Gonzalo Martínez.</p>
              
              <button
                onClick={() => setIsReviewModalOpen(true)}
                className="inline-flex items-center gap-2 bg-[#5D7E8E] hover:bg-[#6E93A5] text-white px-6 sm:px-7 py-2.5 sm:py-3 rounded-full font-bebas tracking-widest text-sm sm:text-lg shadow-[0_0_20px_rgba(93,126,142,0.4)] hover:shadow-[0_0_30px_rgba(93,126,142,0.6)] transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Star className="w-4 h-4 fill-white text-white" />
                <span>DEJA TU RESEÑA DEL PRODUCTO</span>
              </button>
            </div>
          </div>

          {/* Column 3 — Recomendación del Producto & Comprobación del Material */}
          <div className="bg-brand-1 rounded-3xl sm:rounded-[40px] lg:rounded-b-none lg:rounded-t-[60px] p-6 sm:p-8 lg:p-0 lg:pt-14 lg:px-10 lg:h-150 flex flex-col items-center relative w-full shadow-[0_-10px_40px_rgba(0,0,0,0.1)] group overflow-hidden lg:overflow-visible">
            <div className="text-center mb-6 lg:mb-8">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bebas text-brand-5 tracking-wide mb-1 group-hover:text-brand-3 transition-colors">Recomendación del Producto</h3>
              <p className="font-geist text-brand-5/60 text-xs sm:text-sm max-w-xs mx-auto">Comprueba el material del descartable y valoraciones.</p>
            </div>

            {/* Phone Mockup */}
            <div className="w-full max-w-[270px] sm:max-w-[280px] h-[480px] sm:h-[540px] lg:w-70 lg:h-140 bg-white border-8 border-[#111] rounded-[2.5rem] sm:rounded-[3rem] shadow-2xl relative lg:absolute lg:-bottom-6 flex flex-col overflow-hidden group-hover:-translate-y-2 lg:group-hover:-translate-y-4 transition-transform duration-700 my-2 lg:my-0">
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-20 sm:w-24 h-6 sm:h-7 bg-[#111] rounded-full z-20"></div>

              <div className="flex-1 bg-[#F8F9FA] p-4 sm:p-4.5 pt-14 sm:pt-18 flex flex-col justify-between pb-5 sm:pb-6">
                {/* 1. Comprobación del Producto */}
                <div className="bg-linear-to-br from-brand-5 via-[#20666B] to-brand-5 rounded-2xl p-3 sm:p-3.5 text-brand-1 shadow-md relative overflow-hidden mb-2 sm:mb-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[8px] sm:text-[9px] uppercase font-geist tracking-widest text-brand-2 font-bold">Comprobación</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-2" />
                  </div>
                  <p className="font-bebas text-base sm:text-lg text-brand-1 tracking-wide mb-1 leading-tight">Descartable Comprobado</p>
                  <div className="space-y-1 text-[9px] sm:text-[10px] font-geist text-brand-1/80">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-brand-2 shrink-0" />
                      <span>SMS Trilaminado 50g antidesgarro</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-brand-2 shrink-0" />
                      <span>100% Barrera impermeable</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-brand-2 shrink-0" />
                      <span>Esterilidad grado quirúrgico</span>
                    </div>
                  </div>
                </div>

                {/* 2. Star rating breakdown card */}
                <div className="bg-white p-3 sm:p-3.5 rounded-2xl shadow-sm border border-brand-5/5">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bebas text-2xl sm:text-3xl text-brand-5 leading-none">4.9</span>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-[#F59E0B] text-[#F59E0B]" />
                          ))}
                        </div>
                      </div>
                      <p className="text-[8px] sm:text-[9px] text-brand-5/50 font-bold uppercase tracking-wider mt-0.5">Recomendación Clínica</p>
                    </div>
                    <span className="px-2 py-0.5 bg-[#10B981]/15 text-[#10B981] font-bold text-[8px] sm:text-[9px] rounded-full uppercase tracking-wider">
                      99% Aprobado
                    </span>
                  </div>

                  {/* Opciones de las estrellas */}
                  <div className="space-y-1 pt-2 border-t border-brand-5/5">
                    <div className="flex items-center text-[9px] sm:text-[10px] font-medium text-brand-5/70 gap-2">
                      <span className="w-12 sm:w-14">5 Estrellas</span>
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#F59E0B] rounded-full w-[96%]"></div>
                      </div>
                      <span className="w-6 text-right font-bold text-brand-5">96%</span>
                    </div>
                    <div className="flex items-center text-[9px] sm:text-[10px] font-medium text-brand-5/70 gap-2">
                      <span className="w-12 sm:w-14">4 Estrellas</span>
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#F59E0B] rounded-full w-[4%]"></div>
                      </div>
                      <span className="w-6 text-right font-bold text-brand-5">4%</span>
                    </div>
                    <div className="flex items-center text-[9px] sm:text-[10px] font-medium text-brand-5/40 gap-2">
                      <span className="w-12 sm:w-14">3 Estrellas</span>
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gray-200 rounded-full w-[0%]"></div>
                      </div>
                      <span className="w-6 text-right">0%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Review CTA Capsule Banner */}
        <div className="max-w-3xl mx-auto px-4 mt-12 md:mt-16 mb-8 relative z-20">
          <div className="bg-[#121A20] backdrop-blur-md p-4 sm:p-5 md:px-8 rounded-2xl sm:rounded-full border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-white/50 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-0.5">
                Tu opinión nos importa
              </p>
              <h4 className="text-white font-bebas text-2xl sm:text-3xl tracking-wide leading-none">
                DEJA TU RESEÑA DEL PRODUCTO
              </h4>
            </div>

            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="bg-[#5D7E8E] hover:bg-[#6E93A5] text-white px-6 sm:px-8 py-3 rounded-full font-bebas text-sm sm:text-base tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(93,126,142,0.5)] hover:shadow-[0_0_30px_rgba(93,126,142,0.7)] transition-all transform hover:scale-105 active:scale-95 cursor-pointer shrink-0"
            >
              <Star className="w-4 h-4 fill-white text-white" />
              <span>¡NOS AYUDARÍA UN MONTÓN!</span>
            </button>
          </div>
        </div>

        {/* Fill bottom space so white columns connect to footer/bottom seamlessly on desktop */}
        <div className="hidden lg:block h-62.5 bg-brand-1 absolute bottom-0 left-0 w-full z-0 border-t border-brand-1"></div>
      </section>

      {/* Review Modal */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
      />

    </div>
  );
};

export default Home;
