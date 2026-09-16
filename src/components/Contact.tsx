"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    email: "",
    mensaje: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1464207687429-7505649dae38?w=1920&q=80')`
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
              Hablemos de tu proyecto
            </h2>
            <p className="text-white/90 mb-8 text-sm">
              Completa el formulario y uno de nuestros asesores
              te contactará a la brevedad.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone size={20} />
                <span className="text-sm">+58 9 1234 5678</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={20} />
                <span className="text-sm">contacto@inmobiliariachicureo.cl</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={20} />
                <span className="text-sm">Santiago, Chile</span>
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
            <div className="absolute -right-12 top-1/2 -translate-y-1/2 hidden xl:block">
              <div className="text-white/10 text-7xl font-bold leading-tight">
                LA
                <br />
                NATURALEZA
                <br />
                TAMBIÉN
                <br />
                ES PARTE
                <br />
                DE TU HISTORIA
              </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-sm rounded-lg bg-gray-50 border border-gray-200 focus:border-primary focus:bg-white transition-all"
                  required
                />
                <input
                  type="tel"
                  name="telefono"
                  placeholder="Teléfono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-sm rounded-lg bg-gray-50 border border-gray-200 focus:border-primary focus:bg-white transition-all"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Correo"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-sm rounded-lg bg-gray-50 border border-gray-200 focus:border-primary focus:bg-white transition-all"
                  required
                />
                <textarea
                  name="mensaje"
                  placeholder="Mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 text-sm rounded-lg bg-gray-50 border border-gray-200 focus:border-primary focus:bg-white transition-all resize-none"
                />
                <button
                  type="submit"
                  className="w-full bg-primary-dark hover:bg-primary text-white text-sm font-medium py-3 rounded-lg transition-all"
                >
                  Quiero que me contacten →
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
