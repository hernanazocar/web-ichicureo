"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Phone, Mail, MapPin, User, MessageSquare } from "lucide-react";

interface ContactContent {
  titulo: string;
  descripcion: string;
  imagenFondo: string;
  textoDecorativo: string;
  botonTexto: string;
  infoContacto: {
    telefono: string;
    email: string;
    direccion: string;
  };
  mostrar: boolean;
}

export default function Contact() {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    email: "",
    mensaje: ""
  });

  const [content, setContent] = useState<ContactContent>({
    titulo: "Hablemos de tu proyecto",
    descripcion: "Completa el formulario y uno de nuestros asesores te contactará a la brevedad.",
    imagenFondo: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=1920&q=80",
    textoDecorativo: "LA\nNATURALEZA\nTAMBIÉN\nES PARTE\nDE TU HISTORIA",
    botonTexto: "Quiero que me contacten",
    infoContacto: {
      telefono: "+58 9 1234 5678",
      email: "contacto@inmobiliariachicureo.cl",
      direccion: "Santiago, Chile"
    },
    mostrar: true
  });

  useEffect(() => {
    fetch('/api/contenido')
      .then(res => res.json())
      .then(data => {
        if (data.home?.contacto) {
          setContent(data.home.contacto);
        }
      })
      .catch(err => console.error('Error loading contact:', err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    alert("¡Gracias por contactarnos! Te responderemos pronto.");
    setFormData({ nombre: "", telefono: "", email: "", mensaje: "" });
  };

  if (!content.mostrar) {
    return null;
  }

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${content.imagenFondo}')`
        }}
      ></div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-primary-dark/85"></div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {content.titulo}
            </h2>
            <p className="text-white/90 mb-8 text-sm">
              {content.descripcion}
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Phone size={20} />
                </div>
                <span className="text-sm font-medium">{content.infoContacto.telefono}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Mail size={20} />
                </div>
                <span className="text-sm font-medium">{content.infoContacto.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <MapPin size={20} />
                </div>
                <span className="text-sm font-medium">{content.infoContacto.direccion}</span>
              </div>
            </div>
          </motion.div>

          {/* Right Form with background */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Background text overlay */}
            {content.textoDecorativo && (
              <div className="absolute -right-12 top-1/2 -translate-y-1/2 hidden xl:block pointer-events-none">
                <div className="text-white/10 text-7xl font-bold leading-tight whitespace-pre-line">
                  {content.textoDecorativo}
                </div>
              </div>
            )}

            {/* Form */}
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <User size={14} />
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    placeholder="Ingresa tu nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 text-sm rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none font-medium text-gray-900 placeholder:text-gray-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <Phone size={14} />
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    placeholder="+56 9 1234 5678"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 text-sm rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none font-medium text-gray-900 placeholder:text-gray-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <Mail size={14} />
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="tucorreo@ejemplo.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 text-sm rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none font-medium text-gray-900 placeholder:text-gray-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <MessageSquare size={14} />
                    Mensaje (opcional)
                  </label>
                  <textarea
                    name="mensaje"
                    placeholder="Cuéntanos sobre tu proyecto..."
                    value={formData.mensaje}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3.5 text-sm rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none font-medium text-gray-900 placeholder:text-gray-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary-dark hover:bg-primary text-white text-sm font-bold py-4 rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                >
                  {content.botonTexto} →
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
