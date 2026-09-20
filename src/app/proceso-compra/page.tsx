"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Search, FileText, CreditCard, Key, Home, CheckCircle2,
  HelpCircle, Clock, Shield, TrendingUp, Users, Phone
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Elige tu parcela",
    description: "Explora nuestros proyectos disponibles y selecciona el terreno que mejor se adapte a tus necesidades y presupuesto.",
    icon: Search,
    duration: "1-2 días",
    color: "from-blue-500 to-blue-600"
  },
  {
    number: "02",
    title: "Reserva",
    description: "Reserva tu parcela con un abono inicial. Te entregaremos un certificado de reserva que garantiza el terreno por 15 días.",
    icon: FileText,
    duration: "Mismo día",
    color: "from-purple-500 to-purple-600"
  },
  {
    number: "03",
    title: "Firma de promesa",
    description: "Firmamos la promesa de compraventa. Definimos condiciones, plazos y formas de pago. Asesoría legal incluida.",
    icon: CreditCard,
    duration: "3-5 días",
    color: "from-green-500 to-green-600"
  },
  {
    number: "04",
    title: "Escrituración",
    description: "Completamos la escrituración ante notario. Transferencia del dominio y entrega de documentación legal completa.",
    icon: Key,
    duration: "15-30 días",
    color: "from-orange-500 to-orange-600"
  },
  {
    number: "05",
    title: "Entrega del terreno",
    description: "Hacemos entrega física del terreno. Visita guiada, entrega de llaves (si aplica) y toda la documentación al día.",
    icon: Home,
    duration: "Inmediata",
    color: "from-primary-dark to-primary"
  }
];

const documents = [
  "Cédula de Identidad vigente",
  "Certificado de matrimonio (si aplica)",
  "Liquidaciones de sueldo (últimos 3 meses)",
  "Declaración de impuestos (si es independiente)",
  "Certificado de residencia",
  "Antecedentes comerciales"
];

const faqs = [
  {
    question: "¿Qué formas de pago aceptan?",
    answer: "Aceptamos contado, crédito hipotecario y facilidades de pago directo hasta 24 meses. También trabajamos con subsidios habitacionales."
  },
  {
    question: "¿Los terrenos tienen rol propio?",
    answer: "Sí, todos nuestros terrenos cuentan con rol individual, lo que garantiza la propiedad legal y facilita futuras transacciones."
  },
  {
    question: "¿Cuánto tiempo demora el proceso completo?",
    answer: "El proceso completo puede tomar entre 30 a 60 días dependiendo del método de pago y la rapidez en la entrega de documentos."
  },
  {
    question: "¿Incluyen asesoría legal?",
    answer: "Sí, incluimos asesoría legal durante todo el proceso de compra sin costo adicional."
  },
  {
    question: "¿Puedo visitar el terreno antes de comprar?",
    answer: "¡Por supuesto! Agendamos visitas guiadas personalizadas para que conozcas el proyecto y el terreno específico."
  },
  {
    question: "¿Qué pasa si no califico para crédito hipotecario?",
    answer: "Ofrecemos facilidades de pago directo con nosotros, permitiendo comprar sin necesidad de banco."
  }
];

export default function ProcesoCompraPage() {
  const stepsRef = useRef(null);
  const docsRef = useRef(null);
  const faqsRef = useRef(null);

  const isStepsInView = useInView(stepsRef, { once: true });
  const isDocsInView = useInView(docsRef, { once: true });
  const isFaqsInView = useInView(faqsRef, { once: true });

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.3) 100%), url('https://images.unsplash.com/photo-1560493676-04071c5f467b?w=1600&q=80')`,
              backgroundPosition: 'center center',
              filter: 'brightness(1.05) contrast(1.1) saturate(1.08)'
            }}
          ></div>
        </div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                <CheckCircle2 size={28} className="text-white" strokeWidth={2.5} />
              </div>
              <p className="text-sm uppercase tracking-[0.3em] font-bold text-white/90">
                Proceso Transparente
              </p>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Proceso de Compra Simple y Seguro
            </h1>
            <p className="text-white/90 text-xl leading-relaxed">
              Te acompañamos en cada paso del camino hacia tu parcela ideal.
              Proceso transparente, con asesoría legal incluida.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps Timeline */}
      <section ref={stepsRef} className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isStepsInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-primary font-bold mb-4">
              5 Pasos Simples
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-text-dark mb-6">
              Cómo Funciona el Proceso
            </h2>
            <p className="text-text-light text-lg max-w-2xl mx-auto">
              Desde la elección de tu parcela hasta la entrega de llaves,
              te acompañamos en cada etapa
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={isStepsInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative mb-12 last:mb-0"
                >
                  <div className="flex items-start gap-8">
                    {/* Number & Icon */}
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg mb-3`}>
                        <Icon size={32} className="text-white" strokeWidth={2.5} />
                      </div>
                      <span className="text-4xl font-bold text-gray-200">{step.number}</span>
                      {index < steps.length - 1 && (
                        <div className="w-1 h-24 bg-gradient-to-b from-gray-300 to-transparent mt-4"></div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:border-primary/30 hover:shadow-md transition-all">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-2xl font-bold text-text-dark">{step.title}</h3>
                        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-gray-200">
                          <Clock size={14} className="text-primary" strokeWidth={2.5} />
                          <span className="text-xs font-semibold text-text-light">{step.duration}</span>
                        </div>
                      </div>
                      <p className="text-text-light leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Documents Required */}
      <section ref={docsRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isDocsInView ? { opacity: 1, x: 0 } : {}}
              className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/60 to-transparent"></div>
            </motion.div>

            {/* Right - Documents */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isDocsInView ? { opacity: 1, x: 0 } : {}}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-dark to-primary flex items-center justify-center">
                  <FileText size={24} className="text-white" strokeWidth={2.5} />
                </div>
                <h2 className="text-4xl font-bold text-text-dark">
                  Documentos Necesarios
                </h2>
              </div>

              <p className="text-text-light text-lg mb-8">
                Para agilizar el proceso, te recomendamos tener estos documentos listos:
              </p>

              <div className="space-y-3">
                {documents.map((doc, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white rounded-xl p-4 border border-gray-200">
                    <CheckCircle2 size={20} className="text-primary flex-shrink-0" strokeWidth={2.5} />
                    <span className="text-text-dark font-medium">{doc}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <Shield size={24} className="text-blue-600 flex-shrink-0" strokeWidth={2.5} />
                  <div>
                    <h4 className="font-bold text-blue-900 mb-1">Protección de Datos</h4>
                    <p className="text-sm text-blue-800">
                      Tus documentos están protegidos bajo la Ley de Protección de Datos Personales.
                      Solo los usamos para el proceso de compra.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Payment Options */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-dark mb-6">Facilidades de Pago</h2>
            <p className="text-text-light text-lg max-w-2xl mx-auto">
              Ofrecemos múltiples opciones para que puedas adquirir tu parcela
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: CreditCard,
                title: "Contado",
                description: "Pago único con descuento especial",
                benefits: ["Hasta 15% descuento", "Escrituración inmediata", "Sin intereses"]
              },
              {
                icon: TrendingUp,
                title: "Crédito Hipotecario",
                description: "Te ayudamos con la gestión bancaria",
                benefits: ["Asesoría incluida", "Pie desde 20%", "Hasta 30 años plazo"]
              },
              {
                icon: Users,
                title: "Facilidades Directas",
                description: "Paga directamente con nosotros",
                benefits: ["Hasta 24 meses", "Pie desde 30%", "Sin comisiones"]
              }
            ].map((option, index) => {
              const Icon = option.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:border-primary/30 hover:shadow-lg transition-all"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-dark to-primary flex items-center justify-center mb-6">
                    <Icon size={28} className="text-white" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-xl font-bold text-text-dark mb-2">{option.title}</h3>
                  <p className="text-text-light mb-6">{option.description}</p>
                  <ul className="space-y-2">
                    {option.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 size={16} className="text-primary" strokeWidth={2.5} />
                        <span className="text-text-light">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section ref={faqsRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isFaqsInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-dark to-primary flex items-center justify-center">
                <HelpCircle size={24} className="text-white" strokeWidth={2.5} />
              </div>
              <h2 className="text-4xl font-bold text-text-dark">
                Preguntas Frecuentes
              </h2>
            </div>
            <p className="text-text-light text-lg">
              Resolvemos tus dudas más comunes sobre el proceso de compra
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isFaqsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:border-primary/30 hover:shadow-md transition-all"
              >
                <h3 className="font-bold text-text-dark mb-3 text-lg">{faq.question}</h3>
                <p className="text-text-light leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary-dark text-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              ¿Listo para comenzar?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Nuestro equipo está listo para guiarte en cada paso del proceso
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
                  className="bg-white/10 backdrop-blur-md border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-white/20 transition-all flex items-center gap-2"
                >
                  <Phone size={20} strokeWidth={2.5} />
                  Contactar Asesor
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
