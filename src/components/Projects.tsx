"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ChevronRight, MapPin, Maximize2, Droplet, Zap, Award, Users } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Mirador de Rinconada",
    location: "Rinconada, Los Andes",
    price: "$34.900.000",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
    featured: true,
    status: "Disponible",
    parcelas: 45,
    size: "5.000 m²",
    amenities: ["Agua", "Luz", "Rol propio"],
    availableUnits: 12
  },
  {
    id: 2,
    title: "Hacienda Calle Larga",
    location: "Calle Larga, Los Andes",
    price: "$49.900.000",
    image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&q=80",
    featured: false,
    status: "Últimas unidades",
    parcelas: 32,
    size: "8.000 m²",
    amenities: ["Agua", "Luz", "Rol propio"],
    availableUnits: 5
  },
  {
    id: 3,
    title: "Villas de Requínoa",
    location: "Requínoa, VI Región",
    price: "$25.900.000",
    image: "https://images.unsplash.com/photo-1523741543316-7f152662c031?w=800&q=80",
    featured: false,
    status: "Disponible",
    parcelas: 60,
    size: "5.000 m²",
    amenities: ["Agua", "Luz", "Rol propio"],
    availableUnits: 28
  },
  {
    id: 4,
    title: "Hacienda Las Higueras",
    location: "Graneros, VI Región",
    price: "$45.900.000",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
    featured: false,
    status: "Disponible",
    parcelas: 38,
    size: "6.500 m²",
    amenities: ["Agua", "Luz", "Rol propio"],
    availableUnits: 22
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
          <button className="hidden lg:flex text-sm text-text-dark hover:text-primary font-medium items-center gap-1 transition-colors">
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
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-52 bg-gray-100 overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                  style={{ backgroundImage: `url(${project.image})` }}
                ></div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60"></div>

                {/* Tags */}
                <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
                  <div className="flex flex-wrap gap-2">
                    {project.featured && (
                      <span className="bg-gradient-to-r from-primary-dark to-primary text-white text-[10px] px-2.5 py-1 rounded-full font-semibold uppercase tracking-wide shadow-lg">
                        Destacado
                      </span>
                    )}
                    <span className={`${
                      project.status === "Últimas unidades"
                        ? "bg-orange-500"
                        : "bg-green-500"
                    } text-white text-[10px] px-2.5 py-1 rounded-full font-semibold shadow-lg`}>
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Bottom info overlay */}
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-2.5 py-1">
                      <Users size={12} className="text-white" strokeWidth={2.5} />
                      <span className="text-white text-[10px] font-semibold">{project.availableUnits} disponibles</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-2.5 py-1">
                      <Maximize2 size={12} className="text-white" strokeWidth={2.5} />
                      <span className="text-white text-[10px] font-semibold">{project.size}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-text-dark mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>

                <div className="flex items-center gap-1.5 text-sm text-text-light mb-4">
                  <MapPin size={14} className="text-primary" />
                  <span>{project.location}</span>
                </div>

                {/* Amenities */}
                <div className="flex items-center gap-2 mb-4">
                  {project.amenities.includes("Agua") && (
                    <div className="flex items-center gap-1 text-xs text-text-light">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <Droplet size={12} className="text-primary" strokeWidth={2.5} />
                      </div>
                    </div>
                  )}
                  {project.amenities.includes("Luz") && (
                    <div className="flex items-center gap-1 text-xs text-text-light">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <Zap size={12} className="text-primary" strokeWidth={2.5} />
                      </div>
                    </div>
                  )}
                  {project.amenities.includes("Rol propio") && (
                    <div className="flex items-center gap-1 text-xs text-text-light">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <Award size={12} className="text-primary" strokeWidth={2.5} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div>
                    <div className="text-[10px] text-text-light mb-0.5 uppercase tracking-wide">Desde</div>
                    <div className="text-lg font-bold bg-gradient-to-r from-primary-dark to-primary bg-clip-text text-transparent">
                      {project.price}
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary/10 group-hover:bg-primary flex items-center justify-center transition-colors">
                    <ChevronRight size={16} className="text-primary group-hover:text-white group-hover:translate-x-0.5 transition-all" strokeWidth={2.5} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
