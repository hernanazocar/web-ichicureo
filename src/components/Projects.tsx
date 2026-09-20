"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ChevronRight, MapPin, Droplet, Zap, Award, TrendingUp, Calendar, Sparkles, Home, Building2, Percent, Tag, FileCheck, ClipboardCheck, DoorOpen, Waypoints, Lightbulb, Square, RadioTower } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Mirador de Rinconada",
    location: "Rinconada, Los Andes",
    price: "$34.900.000",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80&fit=crop",
    featured: true,
    status: "Recién lanzado",
    statusColor: "blue",
    promotion: "15% descuento Septiembre",
    promotionType: "discount",
    parcelas: 45,
    size: "5.000 m²",
    amenities: ["Portón", "Caminos", "Agua", "Luz", "Terreno plano", "Sin torres"],
    availableUnits: 12,
    totalUnits: 45,
    delivery: "Inmediata",
    rolStatus: "Aprobado"
  },
  {
    id: 2,
    title: "Hacienda Calle Larga",
    location: "Calle Larga, Los Andes",
    price: "$49.900.000",
    image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&q=80",
    featured: false,
    status: "Últimas unidades",
    statusColor: "orange",
    promotion: null,
    promotionType: null,
    parcelas: 32,
    size: "8.000 m²",
    amenities: ["Portón", "Caminos", "Agua", "Luz", "Terreno plano", "Sin torres"],
    availableUnits: 5,
    totalUnits: 32,
    delivery: "Inmediata",
    rolStatus: "Aprobado"
  },
  {
    id: 3,
    title: "Villas de Requínoa",
    location: "Requínoa, VI Región",
    price: "$25.900.000",
    image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&q=80",
    featured: false,
    status: "Disponible",
    statusColor: "green",
    promotion: "Bono Septiembre $1.000.000",
    promotionType: "special",
    parcelas: 60,
    size: "5.000 m²",
    amenities: ["Portón", "Caminos", "Agua", "Luz", "Terreno plano", "Sin torres"],
    availableUnits: 28,
    totalUnits: 60,
    delivery: "Inmediata",
    rolStatus: "Aprobado"
  },
  {
    id: 4,
    title: "Hacienda Las Higueras",
    location: "Graneros, VI Región",
    price: "$45.900.000",
    image: "https://images.unsplash.com/photo-1595209457335-235f23d5e838?w=800&q=80",
    featured: false,
    status: "Próximamente",
    statusColor: "purple",
    promotion: "Pre-venta 20% off",
    promotionType: "discount",
    parcelas: 38,
    size: "6.500 m²",
    amenities: ["Portón", "Caminos", "Agua", "Luz", "Terreno plano", "Sin torres"],
    availableUnits: 22,
    totalUnits: 38,
    delivery: "Marzo 2027",
    rolStatus: "En proceso"
  }
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-12">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-4"
            >
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-dark to-primary flex items-center justify-center shadow-lg ring-2 ring-primary/20"
              >
                <Building2 size={24} className="text-white" strokeWidth={2.5} />
              </motion.div>
              <p className="text-sm uppercase tracking-[0.3em] text-primary font-bold">
                Proyectos disponibles
              </p>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-dark leading-tight"
            >
              Encuentra tu{" "}
              <span className="bg-gradient-to-r from-primary-dark via-primary to-primary-light bg-clip-text text-transparent">
                parcela ideal
              </span>
            </motion.h2>
          </div>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:flex text-sm text-text-dark hover:text-white font-semibold items-center gap-2 transition-all bg-white hover:bg-primary border-2 border-gray-200 hover:border-primary px-6 py-3 rounded-xl shadow-sm hover:shadow-lg group"
          >
            Ver todos los proyectos
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
          </motion.button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, index) => {
            const statusColors = {
              blue: "bg-blue-500",
              orange: "bg-orange-500",
              green: "bg-green-500",
              purple: "bg-purple-500"
            };

            const percentageSold = Math.round(((project.totalUnits - project.availableUnits) / project.totalUnits) * 100);

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group cursor-pointer bg-white rounded-2xl hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-primary/30"
              >
                {/* Image */}
                <div className="relative h-52 bg-gray-100 overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                    style={{ backgroundImage: `url(${project.image})` }}
                  ></div>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                  {/* Tags Top */}
                  <div className="absolute top-3 left-3 right-3 flex flex-col items-start gap-2">
                    {/* Línea 1: STATUS */}
                    <span className={`${statusColors[project.statusColor]} text-white text-[10px] px-3 py-1.5 rounded-full font-bold uppercase tracking-wide shadow-lg`}>
                      {project.status}
                    </span>

                    {/* Línea 2: PROMOCIÓN (si existe) - Siempre en rojo */}
                    {project.promotion && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-red-500 text-white text-[10px] px-3 py-1.5 rounded-full font-bold shadow-lg flex items-center gap-1.5"
                      >
                        {project.promotionType === 'discount' ? (
                          <Percent size={11} strokeWidth={3} />
                        ) : (
                          <Tag size={11} strokeWidth={3} />
                        )}
                        {project.promotion}
                      </motion.div>
                    )}
                  </div>

                  {/* Progress bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${percentageSold}%` } : {}}
                      transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                      className="h-full bg-gradient-to-r from-primary to-primary-light"
                    ></motion.div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 overflow-visible">
                  <h3 className="text-lg font-bold text-text-dark mb-2 group-hover:text-primary transition-colors leading-tight">
                    {project.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-text-light mb-4">
                    <MapPin size={14} className="text-primary flex-shrink-0" strokeWidth={2.5} />
                    <span className="font-medium">{project.location}</span>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <ClipboardCheck size={14} className="text-primary" strokeWidth={2.5} />
                      </div>
                      <div>
                        <div className="text-[9px] text-text-light uppercase tracking-wider font-medium">Rol</div>
                        <div className="text-xs font-bold text-text-dark">{project.rolStatus}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Calendar size={14} className="text-primary" strokeWidth={2.5} />
                      </div>
                      <div>
                        <div className="text-[9px] text-text-light uppercase tracking-wider font-medium">Entrega</div>
                        <div className="text-xs font-bold text-text-dark">{project.delivery}</div>
                      </div>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="flex items-center gap-2 mb-4 flex-wrap overflow-visible">
                    {project.amenities.includes("Portón") && (
                      <div className="group/amenity relative">
                        <div className="w-7 h-7 rounded-lg bg-primary/10 group-hover/amenity:bg-primary/20 flex items-center justify-center transition-colors cursor-pointer">
                          <DoorOpen size={13} className="text-primary" strokeWidth={2.5} />
                        </div>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-gray-900 text-white text-[10px] rounded whitespace-nowrap opacity-0 group-hover/amenity:opacity-100 transition-opacity pointer-events-none z-50 shadow-lg">
                          Portón de acceso
                        </div>
                      </div>
                    )}
                    {project.amenities.includes("Caminos") && (
                      <div className="group/amenity relative">
                        <div className="w-7 h-7 rounded-lg bg-primary/10 group-hover/amenity:bg-primary/20 flex items-center justify-center transition-colors cursor-pointer">
                          <Waypoints size={13} className="text-primary" strokeWidth={2.5} />
                        </div>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-gray-900 text-white text-[10px] rounded whitespace-nowrap opacity-0 group-hover/amenity:opacity-100 transition-opacity pointer-events-none z-50 shadow-lg">
                          Caminos estabilizados
                        </div>
                      </div>
                    )}
                    {project.amenities.includes("Agua") && (
                      <div className="group/amenity relative">
                        <div className="w-7 h-7 rounded-lg bg-primary/10 group-hover/amenity:bg-primary/20 flex items-center justify-center transition-colors cursor-pointer">
                          <Droplet size={13} className="text-primary" strokeWidth={2.5} />
                        </div>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-gray-900 text-white text-[10px] rounded whitespace-nowrap opacity-0 group-hover/amenity:opacity-100 transition-opacity pointer-events-none z-50 shadow-lg">
                          Derechos de agua de riego
                        </div>
                      </div>
                    )}
                    {project.amenities.includes("Luz") && (
                      <div className="group/amenity relative">
                        <div className="w-7 h-7 rounded-lg bg-primary/10 group-hover/amenity:bg-primary/20 flex items-center justify-center transition-colors cursor-pointer">
                          <Lightbulb size={13} className="text-primary" strokeWidth={2.5} />
                        </div>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-gray-900 text-white text-[10px] rounded whitespace-nowrap opacity-0 group-hover/amenity:opacity-100 transition-opacity pointer-events-none z-50 shadow-lg">
                          Factibilidad eléctrica
                        </div>
                      </div>
                    )}
                    {project.amenities.includes("Terreno plano") && (
                      <div className="group/amenity relative">
                        <div className="w-7 h-7 rounded-lg bg-primary/10 group-hover/amenity:bg-primary/20 flex items-center justify-center transition-colors cursor-pointer">
                          <Square size={13} className="text-primary" strokeWidth={2.5} />
                        </div>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-gray-900 text-white text-[10px] rounded whitespace-nowrap opacity-0 group-hover/amenity:opacity-100 transition-opacity pointer-events-none z-50 shadow-lg">
                          Terreno plano
                        </div>
                      </div>
                    )}
                    {project.amenities.includes("Sin torres") && (
                      <div className="group/amenity relative">
                        <div className="w-7 h-7 rounded-lg bg-primary/10 group-hover/amenity:bg-primary/20 flex items-center justify-center transition-colors cursor-pointer">
                          <RadioTower size={13} className="text-primary" strokeWidth={2.5} />
                        </div>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-gray-900 text-white text-[10px] rounded whitespace-nowrap opacity-0 group-hover/amenity:opacity-100 transition-opacity pointer-events-none z-50 shadow-lg">
                          Sin torres de alta tensión
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Price and CTA */}
                  <div className="pt-4 mt-4 border-t border-gray-100">
                    <div className="flex items-end justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="text-[9px] text-text-light uppercase tracking-wider font-bold mb-1.5">Precio desde</div>
                        <div className="text-xl font-bold bg-gradient-to-r from-primary-dark to-primary bg-clip-text text-transparent leading-none mb-1">
                          {project.price}
                        </div>
                        <div className="text-[9px] text-gray-500 font-medium">
                          Facilidades disponibles
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-shrink-0 group/cta px-4 py-2.5 rounded-lg bg-gradient-to-r from-primary-dark to-primary hover:from-primary hover:to-primary-light text-white font-semibold text-xs shadow-md hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center gap-1.5"
                      >
                        <span>Ver más</span>
                        <ChevronRight size={14} className="group-hover/cta:translate-x-0.5 transition-transform" strokeWidth={3} />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
