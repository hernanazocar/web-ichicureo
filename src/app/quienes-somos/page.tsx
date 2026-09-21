"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Team from "@/components/Team";
import { Award, Target, Heart, Shield, TrendingUp, Users, MapPin, Home, Leaf, CheckCircle2 } from "lucide-react";

export default function QuienesSomos() {
  const heroRef = useRef(null);
  const misionRef = useRef(null);
  const valoresRef = useRef(null);
  const statsRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true });
  const isMisionInView = useInView(misionRef, { once: true });
  const isValoresInView = useInView(valoresRef, { once: true });
  const isStatsInView = useInView(statsRef, { once: true });

  const valores = [
    {
      icon: Shield,
      title: "Confianza",
      description: "Transparencia en cada etapa del proceso"
    },
    {
      icon: Heart,
      title: "Compromiso",
      description: "Con nuestros clientes y sus sueños"
    },
    {
      icon: Award,
      title: "Excelencia",
      description: "Calidad en cada proyecto que desarrollamos"
    },
    {
      icon: Leaf,
      title: "Sostenibilidad",
      description: "Respeto por el medio ambiente"
    }
  ];

  const stats = [
    { number: "15+", label: "Años de experiencia" },
    { number: "2.000+", label: "Parcelas vendidas" },
    { number: "20+", label: "Proyectos completados" },
    { number: "95%", label: "Clientes satisfechos" }
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-20 text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.3) 100%), url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80')`,
              backgroundPosition: 'center center',
              filter: 'brightness(1.05) contrast(1.1) saturate(1.08)'
            }}
          ></div>
        </div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Home size={28} className="text-white" strokeWidth={2.5} />
              </div>
              <p className="text-sm uppercase tracking-[0.3em] font-bold text-white/90">
                Nuestra Historia
              </p>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Más de 15 años haciendo realidad tus sueños
            </h1>
            <p className="text-white/90 text-xl leading-relaxed">
              Somos una empresa familiar dedicada a conectar personas con la tierra,
              transformando parcelas en proyectos de vida.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Historia Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left - Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&q=80')`
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/40 to-transparent"></div>
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-dark to-primary flex items-center justify-center shadow-lg">
                  <Home size={24} className="text-white" strokeWidth={2.5} />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-text-dark">
                  Nuestra Historia
                </h2>
              </div>

              <div className="space-y-6 text-text-light leading-relaxed">
                <p className="text-lg font-semibold text-text-dark">
                  Desde 2009, hemos sido parte de los sueños de miles de familias chilenas.
                </p>
                <p>
                  <span className="font-bold text-primary">Inmobiliaria Chicureo</span> nació con una
                  misión clara: devolver el acceso a la tierra a personas que luchan por construir
                  su patrimonio. Comenzamos con un pequeño proyecto de 15 parcelas en Los Andes y,
                  impulsados por la confianza de nuestros primeros clientes, no paramos.
                </p>
                <p>
                  Hoy somos más que números: <span className="font-bold text-primary">2.000+ parcelas
                  vendidas, 20+ proyectos exitosos, 15+ años</span> de experiencia. Pero lo que realmente
                  importa es que hemos visto cómo nuestros clientes cultivan, construyen y crean
                  memorias en cada propiedad que adquieren con nosotros.
                </p>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-sm uppercase tracking-[0.2em] text-primary font-bold mb-4">
                    Por qué confían en nosotros
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                      <CheckCircle2 size={18} className="text-primary" strokeWidth={2.5} />
                      <span className="text-sm font-semibold text-primary">Rol propio garantizado</span>
                    </div>
                    <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                      <CheckCircle2 size={18} className="text-primary" strokeWidth={2.5} />
                      <span className="text-sm font-semibold text-primary">Facilidades de pago</span>
                    </div>
                    <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                      <CheckCircle2 size={18} className="text-primary" strokeWidth={2.5} />
                      <span className="text-sm font-semibold text-primary">Acompañamiento total</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section ref={misionRef} className="py-20 bg-gradient-to-br from-primary-dark to-primary text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary-light rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Misión */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isMisionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                  <Target size={28} className="text-white" strokeWidth={2.5} />
                </div>
                <h2 className="text-3xl font-bold">Nuestra Misión</h2>
              </div>
              <p className="text-white/90 text-lg leading-relaxed">
                Facilitar el acceso a parcelas de calidad, brindando oportunidades de inversión
                seguras y rentables, con un acompañamiento personalizado que convierte el proceso
                de compra en una experiencia transparente y confiable.
              </p>
            </motion.div>

            {/* Visión */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isMisionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                  <TrendingUp size={28} className="text-white" strokeWidth={2.5} />
                </div>
                <h2 className="text-3xl font-bold">Nuestra Visión</h2>
              </div>
              <p className="text-white/90 text-lg leading-relaxed">
                Ser la inmobiliaria líder en parcelas de Chile, reconocida por la calidad de
                nuestros proyectos, la confianza de nuestros clientes y nuestro compromiso con
                el desarrollo sostenible del sector inmobiliario rural.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section ref={valoresRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isValoresInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-primary font-bold mb-4">
              Lo que nos define
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-text-dark mb-6">
              Nuestros Valores
            </h2>
            <p className="text-text-light text-lg max-w-2xl mx-auto">
              Estos principios guían cada decisión que tomamos y cada proyecto que desarrollamos
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valores.map((valor, index) => {
              const Icon = valor.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isValoresInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all border border-gray-100 hover:border-primary/30"
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-dark to-primary flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-primary/40 transition-all"
                  >
                    <Icon size={28} className="text-white" strokeWidth={2.5} />
                  </motion.div>
                  <h3 className="text-xl font-bold text-text-dark mb-3">{valor.title}</h3>
                  <p className="text-text-light leading-relaxed">{valor.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section ref={statsRef} className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isStatsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary-dark to-primary bg-clip-text text-transparent mb-3">
                  {stat.number}
                </div>
                <div className="text-text-light font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <Team />

      {/* CTA Final */}
      <section className="py-20 bg-primary-dark text-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              ¿Listo para encontrar tu parcela ideal?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Nuestro equipo está listo para ayudarte a dar el siguiente paso hacia tu proyecto de vida
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/proyectos">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-primary-dark font-bold px-8 py-4 rounded-xl hover:shadow-xl transition-all"
                >
                  Ver Proyectos Disponibles
                </motion.button>
              </Link>
              <Link href="/contacto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 backdrop-blur-md border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-white/20 transition-all"
                >
                  Agendar Asesoría
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
