"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { TrendingUp, MapPin, Leaf, Mail, CheckCircle } from "lucide-react";

export default function UpcomingProjects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Aquí iría la integración con tu backend/CRM
      console.log("Email registrado:", email);
      setSubmitted(true);
      setEmail("");

      // Reset después de 5 segundos
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <section ref={ref} className="py-16 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
          >
            <p className="text-xs uppercase tracking-widest text-text-light mb-3 font-medium">
              Próximos lanzamientos
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-6 leading-tight">
              Sé el primero en conocer
              <br />
              nuestros{" "}
              <span className="bg-gradient-to-r from-primary-dark to-primary bg-clip-text text-transparent">
                nuevos proyectos
              </span>
            </h2>
            <p className="text-sm text-text-light mb-8 leading-relaxed max-w-lg">
              Regístrate en nuestra lista de espera y recibe en primicia información sobre próximos lanzamientos,
              ubicaciones exclusivas y condiciones especiales para compradores anticipados.
            </p>

            {/* Waitlist Form */}
            {!submitted ? (
              <form onSubmit={handleSubmit} className="max-w-md">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Tu correo electrónico"
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-primary-dark to-primary hover:from-primary hover:to-primary-dark text-white font-semibold px-6 py-3 rounded-lg transition-all hover:scale-105 hover:shadow-lg text-sm whitespace-nowrap"
                  >
                    Unirme
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Al registrarte, aceptas recibir información sobre nuevos proyectos.
                </p>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg p-4 max-w-md"
              >
                <CheckCircle className="text-green-600 flex-shrink-0" size={24} />
                <div>
                  <p className="text-sm font-semibold text-green-800">¡Registro exitoso!</p>
                  <p className="text-xs text-green-700">Te notificaremos sobre nuevos lanzamientos.</p>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Right Image with overlay */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="relative h-96 rounded-2xl overflow-hidden"
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&q=80')`
              }}
            ></div>

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/80 to-primary/60"></div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-between p-8 text-white">
              <div>
                <p className="text-xs uppercase tracking-widest mb-3 opacity-90">
                  Próximamente
                </p>
                <h3 className="text-3xl font-bold mb-2">
                  Invierte en
                  <br />
                  tu futuro
                </h3>
                <p className="text-xs uppercase tracking-wider opacity-75">
                  En los Andes y VI Región
                </p>
              </div>

              {/* Bottom features */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/20">
                <div className="flex flex-col items-center text-center">
                  <TrendingUp size={24} strokeWidth={1.5} className="mb-2" />
                  <span className="text-xs">Alta plusvalía</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <MapPin size={24} strokeWidth={1.5} className="mb-2" />
                  <span className="text-xs">Ubicaciones estratégicas</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Leaf size={24} strokeWidth={1.5} className="mb-2" />
                  <span className="text-xs">Entornos naturales</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
