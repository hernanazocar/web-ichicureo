"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Leaf, ArrowRight, Sparkles, Maximize2, Award, Zap, Droplet, Key, MapPin, TrendingUp, BadgeDollarSign } from "lucide-react";

const rotatingTexts = [
  "en la naturaleza",
  "que siempre soñaste",
  "ideal te espera",
  "perfecta existe aquí",
  "con futuro",
  "tu mejor inversión",
];

export default function Hero() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, 3000); // Cambia cada 3 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-start pt-32">
      {/* Background Image with enhanced gradient */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover scale-105 animate-[scale_20s_ease-in-out_infinite]"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.1) 100%), url('/hero.png')`,
            backgroundPosition: 'center 10%',
            filter: 'brightness(1.05) contrast(1.1) saturate(1.08)'
          }}
        ></div>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1, 1.3, 1]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary-dark/10 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-2xl">
            {/* Small tag with icon */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2"
            >
              <MapPin size={14} className="text-primary-light" />
              <span className="text-white text-[10px] uppercase tracking-[0.15em] font-semibold">
                Parcelas en Chile
              </span>
            </motion.div>

            {/* Main Heading with gradient and rotating text */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight"
            >
              <span className="block">Tu parcela</span>
              <div className="block relative h-[1.2em] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentTextIndex}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute left-0 top-0 text-white"
                  >
                    {rotatingTexts[currentTextIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-white text-sm md:text-base mb-7 max-w-xl leading-relaxed font-medium"
              style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 1px 4px rgba(0,0,0,0.6)' }}
            >
              Invierte, vive o construye ese proyecto de vida en un entorno único,
              con plusvalía y la tranquilidad que siempre soñaste.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex flex-wrap gap-3"
            >
              <button className="group bg-primary-dark hover:bg-primary text-white text-sm font-semibold px-6 py-3 rounded-lg transition-all hover:scale-105 hover:shadow-xl flex items-center gap-2">
                Ver proyectos
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="group bg-white/15 backdrop-blur-md hover:bg-white/25 border border-white/30 text-white text-sm font-semibold px-6 py-3 rounded-lg transition-all hover:scale-105 flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                Quiero asesoría
              </button>
            </motion.div>
          </div>

          {/* Decorative badges */}
          <div className="absolute top-24 right-32 hidden xl:block space-y-12">
            <motion.div
              initial={{ opacity: 0, x: 30, rotate: 3 }}
              animate={{ 
                opacity: 1, 
                x: 0, 
                rotate: 3,
                y: [0, -10, 0]
              }}
              transition={{ 
                delay: 0.6, 
                duration: 0.8,
                y: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              whileHover={{ rotate: 0, scale: 1.08, y: -15 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 shadow-2xl hover:shadow-[0_20px_50px_rgba(122,143,92,0.3)] max-w-[280px] group cursor-pointer transition-shadow"
            >
              <div className="flex items-start gap-3">
                <motion.div
                  className="bg-primary/20 p-2.5 rounded-lg group-hover:bg-primary/30 transition-colors"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Award className="text-white" size={20} />
                </motion.div>
                <div>
                  <p className="text-white/60 text-[10px] uppercase tracking-widest mb-1.5 font-medium">
                    REFERENTES
                  </p>
                  <p className="text-white text-base font-semibold leading-tight">
                    Líderes en el mercado
                    <br />
                    de parcelas en Chile
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30, rotate: -3 }}
              animate={{ 
                opacity: 1, 
                x: 0, 
                rotate: -3,
                y: [0, -15, 0]
              }}
              transition={{ 
                delay: 0.8, 
                duration: 0.8,
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }
              }}
              whileHover={{ rotate: 0, scale: 1.08, y: -15 }}
              className="bg-primary-dark/30 backdrop-blur-xl border border-primary-light/30 rounded-xl p-6 shadow-2xl hover:shadow-[0_20px_50px_rgba(122,143,92,0.3)] max-w-[280px] group cursor-pointer transition-shadow"
            >
              <div className="flex items-start gap-3">
                <motion.div
                  className="bg-white/20 p-2.5 rounded-lg group-hover:bg-white/30 transition-colors"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <TrendingUp className="text-primary-light" size={20} />
                </motion.div>
                <div>
                  <p className="text-white text-sm font-bold uppercase tracking-wide leading-snug">
                    Tu parcela ideal
                    <br />
                    está más cerca
                    <br />
                    <span className="text-primary-light">de lo que imaginas</span>
                  </p>
                  <p className="text-white/90 text-[11px] font-semibold mt-2.5 leading-tight">
                    Facilidades de pago
                    <br />
                    a tu medida
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Bar - Integrated into hero */}
      <div className="absolute bottom-16 left-0 right-0 z-20">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 md:px-8 py-3 md:py-2 shadow-xl"
          >
            <div className="grid grid-cols-2 md:flex md:flex-wrap items-center justify-center md:justify-between gap-x-4 md:gap-x-6 gap-y-4 md:gap-y-4">
              {[
                { icon: Maximize2, label: "Parcelas de 5.000 mt2" },
                { icon: Award, label: "Rol propio" },
                { icon: Zap, label: "Factibilidad eléctrica" },
                { icon: Droplet, label: "Derechos de agua de riego" },
                { icon: Key, label: "Portón de Acceso" },
                { icon: MapPin, label: "Caminos Estabilizados" },
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.05 }}
                    whileHover={{ y: -4 }}
                    className="flex flex-col items-center gap-2 md:gap-2.5 group text-center cursor-default"
                  >
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="relative"
                    >
                      <div className="relative bg-gradient-to-br from-primary-light/30 to-primary-dark/30 backdrop-blur-sm rounded-full p-2.5 md:p-3 border border-white/20 shadow-lg group-hover:shadow-primary/40 group-hover:border-white/40 transition-all duration-300">
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <Icon
                          size={18}
                          strokeWidth={2.5}
                          className="relative text-white md:w-5 md:h-5"
                        />
                      </div>
                    </motion.div>
                    <span className="text-white text-[10px] md:text-xs font-semibold whitespace-nowrap">
                      {feature.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
