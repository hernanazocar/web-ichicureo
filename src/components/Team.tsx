"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const team = [
  { id: 1, name: "Andrea", role: "Asesora Comercial" },
  { id: 2, name: "Cony", role: "Asesora Comercial" },
  { id: 3, name: "Angélica", role: "Asesora Comercial" },
  { id: 4, name: "Carolina", role: "Asesora Comercial" },
  { id: 5, name: "Fabrizio", role: "Asesor Comercial" },
  { id: 6, name: "Daniela", role: "Asesora Comercial" }
];

export default function Team() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-16 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-widest text-text-light mb-3 font-medium">
              Nuestro equipo
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-3">
              Asesores que te acompañan
            </h2>
            <p className="text-sm text-text-light">
              Te guiamos en todo el proceso, con un trato cercano y profesional.
            </p>
          </div>
          <button className="hidden lg:flex text-sm text-text-dark hover:text-primary font-medium">
            Conoce a todo el equipo →
          </button>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="text-center"
            >
              {/* Photo - circular placeholder */}
              <div className="relative w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-gray-200 to-gray-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </div>

              {/* Info */}
              <h3 className="text-sm font-semibold text-text-dark mb-0.5">
                {member.name}
              </h3>
              <p className="text-xs text-text-light">
                {member.role}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
