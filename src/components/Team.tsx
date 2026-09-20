"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface TeamMember {
  nombre: string;
  cargo: string;
  foto: string;
}

interface TeamContent {
  etiqueta: string;
  titulo: string;
  subtitulo: string;
  textoBoton: string;
  miembros: TeamMember[];
  mostrar: boolean;
}

export default function Team() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [content, setContent] = useState<TeamContent>({
    etiqueta: "NUESTRO EQUIPO",
    titulo: "Asesores que te acompañan",
    subtitulo: "Te guiamos en todo el proceso, con un trato cercano y profesional.",
    textoBoton: "Conoce a todo el equipo",
    miembros: [
      { nombre: "Andrea", cargo: "Asesora Comercial", foto: "" },
      { nombre: "Cony", cargo: "Asesora Comercial", foto: "" },
      { nombre: "Angélica", cargo: "Asesora Comercial", foto: "" },
      { nombre: "Carolina", cargo: "Asesora Comercial", foto: "" },
      { nombre: "Fabrizio", cargo: "Asesor Comercial", foto: "" },
      { nombre: "Daniela", cargo: "Asesora Comercial", foto: "" }
    ],
    mostrar: true
  });

  useEffect(() => {
    fetch('/api/contenido')
      .then(res => res.json())
      .then(data => {
        if (data.home?.equipo) {
          setContent(data.home.equipo);
        }
      })
      .catch(err => console.error('Error loading team:', err));
  }, []);

  if (!content.mostrar) {
    return null;
  }

  return (
    <section ref={ref} className="py-16 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-widest text-text-light mb-3 font-medium">
              {content.etiqueta}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-3">
              {content.titulo}
            </h2>
            <p className="text-sm text-text-light">
              {content.subtitulo}
            </p>
          </div>
          {content.textoBoton && (
            <button className="hidden lg:flex text-sm text-text-dark hover:text-primary font-medium">
              {content.textoBoton} →
            </button>
          )}
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
          {content.miembros.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="text-center"
            >
              {/* Photo - circular placeholder or image */}
              <div className="relative w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-gray-200 to-gray-100">
                {member.foto ? (
                  <img src={member.foto} alt={member.nombre} className="w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                )}
              </div>

              {/* Info */}
              <h3 className="text-sm font-semibold text-text-dark mb-0.5">
                {member.nombre}
              </h3>
              <p className="text-xs text-text-light">
                {member.cargo}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
