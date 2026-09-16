"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { ChevronRight, MapPin } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Mirador de Rinconada",
    location: "Rinconada, Los Andes",
    price: "$34.900.000",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
    featured: true
  },
  {
    id: 2,
    title: "Hacienda Calle Larga",
    location: "Calle Larga, Los Andes",
    price: "$49.900.000",
    image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&q=80",
    featured: false
  },
  {
    id: 3,
    title: "Villas de Requínoa",
    location: "Requínoa, VI Región",
    price: "$25.900.000",
    image: "https://images.unsplash.com/photo-1523741543316-7f152662c031?w=800&q=80",
    featured: false
  },
  {
    id: 4,
    title: "Hacienda Las Higueras",
    location: "Graneros, VI Región",
    price: "$45.900.000",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
    featured: false
  }
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-widest text-text-light mb-3 font-medium">
              Proyectos disponibles
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-text-dark">
              Encuentra tu parcela ideal
            </h2>
          </div>
          <button className="hidden lg:flex text-sm text-text-dark hover:text-primary font-medium items-center gap-1">
            Ver todos los proyectos →
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group cursor-pointer bg-white rounded-lg overflow-hidden hover:shadow-xl transition-all"
            >
              {/* Image */}
              <div className="relative h-52 bg-gray-100 overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                  style={{ backgroundImage: `url(${project.image})` }}
                ></div>
                {project.featured && (
                  <div className="absolute top-3 left-3">
                    <span className="bg-primary-dark text-white text-xs px-3 py-1.5 rounded font-medium uppercase tracking-wide">
                      Destacado
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="text-base font-semibold text-text-dark mb-2">
                  {project.title}
                </h3>
                <div className="flex items-center gap-1.5 text-sm text-text-light mb-4">
                  <MapPin size={14} />
                  <span>{project.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-text-light mb-0.5">Desde</div>
                    <div className="text-base font-bold text-text-dark">{project.price}</div>
                  </div>
                  <ChevronRight size={20} className="text-text-light group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
