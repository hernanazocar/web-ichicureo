"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TrendingUp, MapPin, FileCheck, Clock, Calculator, User, Mail, Phone, MessageSquare, CheckCircle2, Home } from "lucide-react";

export default function CompramosTuCampoPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    size: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const benefits = [
    { icon: TrendingUp, title: "Tasación justa", description: "Evaluación profesional al precio de mercado" },
    { icon: Clock, title: "Pago rápido", description: "Proceso expedito en menos de 30 días" },
    { icon: FileCheck, title: "Sin complicaciones", description: "Nos encargamos de toda la documentación" },
    { icon: Calculator, title: "Sin comisiones", description: "No cobramos comisiones por intermediación" }
  ];

  const process = [
    "Completa el formulario con los datos de tu propiedad",
    "Nuestro equipo realiza una tasación preliminar",
    "Agendamos visita técnica al terreno",
    "Te presentamos una oferta formal",
    "Firmamos promesa de compraventa",
    "Cerramos el trato y recibes tu pago"
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.3) 100%), url('https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=1600&q=80')`,
              backgroundPosition: 'center center',
              filter: 'brightness(1.05) contrast(1.1) saturate(1.08)'
            }}
          ></div>
        </div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Home size={28} className="text-white" strokeWidth={2.5} />
              </div>
              <p className="text-sm uppercase tracking-[0.3em] font-bold text-white/90">
                Vendenos tu Campo
              </p>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              ¿Quieres vender tu campo o parcela?
            </h1>
            <p className="text-white/90 text-xl leading-relaxed">
              Compramos terrenos agrícolas y parcelas en la zona central de Chile.
              Tasación gratuita y pago rápido garantizado.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section ref={ref} className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-dark mb-6">¿Por qué vendernos a nosotros?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:border-primary/30 hover:shadow-lg transition-all text-center"
                >
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-dark to-primary flex items-center justify-center mx-auto mb-6">
                    <Icon size={28} className="text-white" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-xl font-bold text-text-dark mb-3">{benefit.title}</h3>
                  <p className="text-text-light">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
          <h2 className="text-4xl font-bold text-text-dark mb-12 text-center">¿Cómo funciona?</h2>
          <div className="space-y-4">
            {process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 bg-white rounded-xl p-6 border border-gray-200"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-dark to-primary flex items-center justify-center text-white font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-text-dark font-medium pt-2">{step}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-text-dark mb-4">Solicita tu tasación gratuita</h2>
            <p className="text-text-light text-lg">Completa el formulario y te contactaremos en menos de 24 horas</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-text-dark mb-2">Nombre completo *</label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    placeholder="Juan Pérez"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-dark mb-2">Email *</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    placeholder="juan@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-dark mb-2">Teléfono *</label>
                <div className="relative">
                  <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    placeholder="+56 9 1234 5678"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-dark mb-2">Ubicación del terreno *</label>
                <div className="relative">
                  <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light" />
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    placeholder="Los Andes, V Región"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-text-dark mb-2">Superficie (m²) *</label>
                <div className="relative">
                  <Calculator size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light" />
                  <input
                    type="text"
                    required
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    placeholder="5.000 m²"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-text-dark mb-2">Información adicional</label>
                <div className="relative">
                  <MessageSquare size={18} className="absolute left-4 top-4 text-text-light" />
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary min-h-[120px]"
                    placeholder="Cuéntanos más sobre tu propiedad..."
                  ></textarea>
                </div>
              </div>
            </div>

            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                <CheckCircle2 className="text-green-600" size={24} />
                <div>
                  <p className="font-semibold text-green-800">¡Solicitud enviada!</p>
                  <p className="text-sm text-green-700">Te contactaremos pronto para coordinar la tasación.</p>
                </div>
              </div>
            ) : (
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary-dark to-primary text-white font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-primary/40 transition-all"
              >
                Solicitar Tasación Gratuita
              </button>
            )}
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
