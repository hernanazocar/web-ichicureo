"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, MapPin, Leaf } from "lucide-react";

export default function UpcomingProjects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

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
              Nuevos proyectos,
              <br />
              grandes oportunidades
            </h2>
            <p className="text-sm text-text-light mb-8 leading-relaxed max-w-lg">
              Seguimos creciendo para ofrecerte los mejores lugares de Chile.
              Conoce nuestros próximos lanzamientos y sé parte desde el inicio.
            </p>
            <button className="text-sm text-primary-dark hover:text-primary font-medium">
              Ver próximos lanzamientos →
            </button>
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
                backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80')`
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
