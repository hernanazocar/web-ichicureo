"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail, Clock, Send, User, MessageSquare, CheckCircle2, Share2 } from "lucide-react";

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
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

  const contactInfo = [
    { icon: Phone, title: "Teléfono", detail: "+56 9 1234 5678", link: "tel:+56912345678" },
    { icon: Mail, title: "Email", detail: "contacto@ichicureo.cl", link: "mailto:contacto@ichicureo.cl" },
    { icon: MapPin, title: "Oficina", detail: "Los Andes, V Región", link: "#" },
    { icon: Clock, title: "Horario", detail: "Lun - Vie: 9:00 - 18:00", link: "#" }
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
              backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.3) 100%), url('https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=1600&q=80')`,
              backgroundPosition: 'center center',
              filter: 'brightness(1.05) contrast(1.1) saturate(1.08)'
            }}
          ></div>
        </div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Send size={28} className="text-white" strokeWidth={2.5} />
              </div>
              <p className="text-sm uppercase tracking-[0.3em] font-bold text-white/90">Contáctanos</p>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Estamos aquí para ayudarte
            </h1>
            <p className="text-white/90 text-xl leading-relaxed">
              ¿Tienes dudas? ¿Quieres agendar una visita? Nuestro equipo está listo para atenderte.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.a
                  key={index}
                  href={info.link}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:border-primary/30 hover:shadow-lg transition-all text-center group"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-dark to-primary flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Icon size={24} className="text-white" strokeWidth={2.5} />
                  </div>
                  <h3 className="font-bold text-text-dark mb-2">{info.title}</h3>
                  <p className="text-text-light text-sm">{info.detail}</p>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form & Map */}
      <section ref={ref} className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
            >
              <h2 className="text-3xl font-bold text-text-dark mb-6">Envíanos un mensaje</h2>
              <p className="text-text-light mb-8">
                Completa el formulario y te responderemos en menos de 24 horas
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-dark mb-2">Asunto *</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    placeholder="¿En qué podemos ayudarte?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-dark mb-2">Mensaje *</label>
                  <div className="relative">
                    <MessageSquare size={18} className="absolute left-4 top-4 text-text-light" />
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary min-h-[150px]"
                      placeholder="Cuéntanos más..."
                    ></textarea>
                  </div>
                </div>

                {submitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                    <CheckCircle2 className="text-green-600" size={24} />
                    <div>
                      <p className="font-semibold text-green-800">¡Mensaje enviado!</p>
                      <p className="text-sm text-green-700">Te contactaremos pronto.</p>
                    </div>
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary-dark to-primary text-white font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-primary/40 transition-all flex items-center justify-center gap-2"
                  >
                    <Send size={20} strokeWidth={2.5} />
                    Enviar Mensaje
                  </button>
                )}
              </form>
            </motion.div>

            {/* Map & Social */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              className="space-y-8"
            >
              {/* Map */}
              <div>
                <h3 className="text-2xl font-bold text-text-dark mb-6">Nuestra ubicación</h3>
                <div className="aspect-video rounded-2xl overflow-hidden bg-gray-200">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26794.49481765639!2d-70.60!3d-32.83!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDUwJzAwLjAiUyA3MMKwMzYnMDAuMCJX!5e0!3m2!1ses!2scl!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                <h3 className="text-xl font-bold text-text-dark mb-6">Síguenos en redes sociales</h3>
                <div className="space-y-3">
                  <a
                    href="#"
                    className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200 hover:border-primary/30 hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-dark to-primary flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      <Share2 size={18} strokeWidth={2.5} />
                    </div>
                    <div>
                      <div className="font-semibold text-text-dark text-sm">Instagram</div>
                      <div className="text-xs text-text-light">@inmobiliariachicureo</div>
                    </div>
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200 hover:border-primary/30 hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-dark to-primary flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      <Share2 size={18} strokeWidth={2.5} />
                    </div>
                    <div>
                      <div className="font-semibold text-text-dark text-sm">Facebook</div>
                      <div className="text-xs text-text-light">Inmobiliaria Chicureo</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                <h3 className="font-bold text-green-900 mb-3">¿Prefieres WhatsApp?</h3>
                <p className="text-sm text-green-800 mb-4">
                  Chatea directamente con un asesor y recibe respuesta inmediata
                </p>
                <a
                  href="https://wa.me/56912345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-green-700 transition-all"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  Abrir WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
