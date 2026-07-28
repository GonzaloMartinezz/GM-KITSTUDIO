import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Target, Users } from 'lucide-react';
import ReviewsSection from '../components/ReviewsSection';

const About = () => {
  return (
    <div className="min-h-screen bg-brand-5 text-brand-1 py-20 px-4 relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-4/30 blur-[150px] -z-10 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-8xl font-bebas text-brand-2 mb-6">SOBRE NOSOTROS</h1>
          <p className="text-xl font-geist text-brand-1/70 max-w-2xl mx-auto">
            Somos la nueva generación en provisión de insumos odontológicos en San Miguel de Tucumán.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-brand-4/50 p-8 rounded-3xl border border-brand-3/20"
          >
            <Target className="w-12 h-12 text-brand-3 mb-6" />
            <h2 className="font-bebas text-4xl mb-4">NUESTRA MISIÓN</h2>
            <p className="font-geist text-brand-1/80 leading-relaxed">
              Transformar y agilizar la manera en que los profesionales de la salud dental adquieren sus kits quirúrgicos. Queremos eliminar las demoras y complicaciones, brindando un e-commerce rápido, intuitivo y estético que entregue calidad certificada en tiempo récord.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-brand-4/50 p-8 rounded-3xl border border-brand-3/20"
          >
            <ShieldCheck className="w-12 h-12 text-brand-3 mb-6" />
            <h2 className="font-bebas text-4xl mb-4">COMPROMISO DE CALIDAD</h2>
            <p className="font-geist text-brand-1/80 leading-relaxed">
              Sabemos que en el quirófano no hay margen de error. Por eso, todos nuestros productos están rigurosamente testeados, esterilizados bajo normas internacionales y cuentan con aprobación de ANMAT. Tu seguridad y la de tu paciente es nuestra prioridad.
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-brand-4 rounded-3xl p-10 text-center border-2 border-brand-3/30 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-brand-3/5 group-hover:bg-brand-3/10 transition-colors duration-500"></div>
          <Users className="w-16 h-16 text-brand-2 mx-auto mb-6 relative z-10" />
          <h2 className="font-bebas text-5xl mb-4 relative z-10">¿QUIÉNES SOMOS?</h2>
          <p className="font-geist text-lg text-brand-1/80 max-w-2xl mx-auto relative z-10">
            GM Kit Studio nace del esfuerzo emprendedor con una visión clara: ser el proveedor líder y el mayor exportador de kits individuales odontológicos en Tucumán. Detrás de esta plataforma hay un equipo apasionado por la tecnología y la salud, listo para atenderte.
          </p>
        </motion.div>
        
        <ReviewsSection />
      </div>
    </div>
  );
};

export default About;
