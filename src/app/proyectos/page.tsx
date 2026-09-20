"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronRight, MapPin, Building2, Percent, Tag, DoorOpen, Waypoints, Droplet, Lightbulb, Square, RadioTower, Calendar, ClipboardCheck, Filter } from "lucide-react";

const allProjects = [
  {
    id: 1,
    slug: "mirador-de-rinconada",
    title: "Mirador de Rinconada",
    location: "Rinconada, Los Andes",
    region: "Valparaíso",
    price: "$34.900.000",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80&fit=crop",
    logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%232B5329'/%3E%3Ctext x='50' y='62' font-family='Arial,sans-serif' font-size='36' font-weight='bold' fill='white' text-anchor='middle'%3EMR%3C/text%3E%3C/svg%3E",
    status: "Recién lanzado",
    statusColor: "blue",
    promotion: "15% descuento Septiembre",
    promotionType: "discount",
    size: "5.000 m²",
    amenities: ["Portón", "Caminos", "Agua", "Luz", "Terreno plano", "Sin torres"],
    availableUnits: 12,
    totalUnits: 45,
    delivery: "Inmediata",
    rolStatus: "Aprobado"
  },
  {
    id: 2,
    slug: "hacienda-calle-larga",
    title: "Hacienda Calle Larga",
    location: "Calle Larga, Los Andes",
    region: "Valparaíso",
    price: "$49.900.000",
    image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&q=80",
    status: "Últimas unidades",
    statusColor: "orange",
    promotion: null,
    promotionType: null,
    size: "8.000 m²",
    amenities: ["Portón", "Caminos", "Agua", "Luz", "Terreno plano", "Sin torres"],
    availableUnits: 5,
    totalUnits: 32,
    delivery: "Inmediata",
    rolStatus: "Aprobado"
  },
  {
    id: 3,
    slug: "villas-de-requinoa",
    title: "Villas de Requínoa",
    location: "Requínoa, VI Región",
    region: "O'Higgins",
    price: "$25.900.000",
    image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&q=80",
    status: "Disponible",
    statusColor: "green",
    promotion: "Bono Septiembre $1.000.000",
    promotionType: "special",
    size: "5.000 m²",
    amenities: ["Portón", "Caminos", "Agua", "Luz", "Terreno plano", "Sin torres"],
    availableUnits: 28,
    totalUnits: 60,
    delivery: "Inmediata",
    rolStatus: "Aprobado"
  },
  {
    id: 4,
    slug: "hacienda-las-higueras",
    title: "Hacienda Las Higueras",
    location: "Graneros, VI Región",
    region: "O'Higgins",
    price: "$45.900.000",
    image: "https://images.unsplash.com/photo-1595209457335-235f23d5e838?w=800&q=80",
    status: "Próximamente",
    statusColor: "purple",
    promotion: "Pre-venta 20% off",
    promotionType: "discount",
    size: "6.500 m²",
    amenities: ["Portón", "Caminos", "Agua", "Luz", "Terreno plano", "Sin torres"],
    availableUnits: 22,
    totalUnits: 38,
    delivery: "Marzo 2027",
    rolStatus: "En proceso"
  },
  {
    id: 5,
    slug: "parcelas-el-manzano",
    title: "Parcelas El Manzano",
    location: "San Esteban, Los Andes",
    region: "Valparaíso",
    price: "$38.500.000",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
    status: "Disponible",
    statusColor: "green",
    promotion: null,
    promotionType: null,
    size: "7.000 m²",
    amenities: ["Portón", "Caminos", "Agua", "Luz", "Terreno plano", "Sin torres"],
    availableUnits: 18,
    totalUnits: 42,
    delivery: "Inmediata",
    rolStatus: "Aprobado"
  },
  {
    id: 6,
    slug: "vista-al-campo",
    title: "Vista al Campo",
    location: "Rancagua, VI Región",
    region: "O'Higgins",
    price: "$32.900.000",
    image: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=800&q=80",
    status: "Recién lanzado",
    statusColor: "blue",
    promotion: "10% descuento",
    promotionType: "discount",
    size: "5.500 m²",
    amenities: ["Portón", "Caminos", "Agua", "Luz", "Terreno plano", "Sin torres"],
    availableUnits: 35,
    totalUnits: 50,
    delivery: "Inmediata",
    rolStatus: "Aprobado"
  }
];

export default function ProyectosPage() {
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const regions = ["Todos", "Valparaíso", "O'Higgins"];
  const statuses = ["Todos", "Recién lanzado", "Disponible", "Últimas unidades", "Próximamente"];

  const filteredProjects = allProjects.filter(project => {
    const matchRegion = selectedRegion === "all" || project.region === selectedRegion;
    const matchStatus = selectedStatus === "all" || project.status === selectedStatus;
    return matchRegion && matchStatus;
  });

  // Solo mostrar proyectos disponibles en esta página
  const availableProjects = filteredProjects.filter(p => p.availableUnits > 0);

  const statusColors: { [key: string]: string } = {
    blue: "bg-blue-500",
    orange: "bg-orange-500",
    green: "bg-green-500",
    purple: "bg-purple-500"
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.3) 100%), url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600&q=80')`,
              backgroundPosition: 'center center',
              filter: 'brightness(1.05) contrast(1.1) saturate(1.08)'
            }}
          ></div>
        </div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Building2 size={28} className="text-white" strokeWidth={2.5} />
              </div>
              <p className="text-sm uppercase tracking-[0.3em] font-bold text-white/90">
                Proyectos Disponibles
              </p>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Encuentra tu parcela ideal
            </h1>
            <p className="text-white/90 text-xl leading-relaxed">
              Explora todos nuestros proyectos y encuentra el terreno perfecto para invertir,
              vivir o construir el futuro que siempre soñaste.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { number: "6", label: "Proyectos activos" },
              { number: "120+", label: "Parcelas disponibles" },
              { number: "3", label: "Regiones" },
              { number: "5.000m²", label: "Desde" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-center"
              >
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white sticky top-24 z-40 border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-primary" strokeWidth={2.5} />
              <span className="font-bold text-text-dark">Filtrar por:</span>
            </div>

            {/* Region Filter */}
            <div className="flex flex-wrap gap-2">
              {regions.map((region, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedRegion(index === 0 ? "all" : region)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    (selectedRegion === "all" && region === "Todos") || selectedRegion === region
                      ? "bg-primary text-white shadow-md"
                      : "bg-gray-100 text-text-light hover:bg-gray-200"
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>

            <div className="h-8 w-px bg-gray-300"></div>

            {/* Status Filter */}
            <div className="flex flex-wrap gap-2">
              {statuses.map((status, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedStatus(index === 0 ? "all" : status)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    (selectedStatus === "all" && status === "Todos") || selectedStatus === status
                      ? "bg-primary text-white shadow-md"
                      : "bg-gray-100 text-text-light hover:bg-gray-200"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Proyectos en Venta */}
      <section ref={ref} className="py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-gray-600">
              Mostrando <span className="font-bold text-primary">{availableProjects.length}</span> proyectos disponibles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {availableProjects.map((project, index) => {
              const percentageSold = Math.round(((project.totalUnits - project.availableUnits) / project.totalUnits) * 100);

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link href={`/proyectos/${project.slug}`}>
                    <div className="group cursor-pointer bg-white rounded-2xl hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-primary/30 h-full">
                      {/* Image */}
                      <div className="relative h-64 bg-gray-100 overflow-hidden rounded-t-2xl">
                        <div
                          className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                          style={{ backgroundImage: `url(${project.image})` }}
                        ></div>

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                        {/* Logo del proyecto */}
                        {project.logo && (
                          <div className="absolute top-3 right-3 w-16 h-16 bg-white rounded-xl shadow-lg p-2 flex items-center justify-center">
                            <img src={project.logo} alt={`Logo ${project.title}`} className="w-full h-full object-contain" />
                          </div>
                        )}

                        {/* Tags Top */}
                        <div className="absolute top-3 left-3 right-20 flex flex-col items-start gap-2">
                          <span className={`${statusColors[project.statusColor]} text-white text-[10px] px-3 py-1.5 rounded-full font-bold uppercase tracking-wide shadow-lg`}>
                            {project.status}
                          </span>

                          {project.promotion && (
                            <div className="bg-red-500 text-white text-[10px] px-3 py-1.5 rounded-full font-bold shadow-lg flex items-center gap-1.5">
                              {project.promotionType === 'discount' ? (
                                <Percent size={11} strokeWidth={3} />
                              ) : (
                                <Tag size={11} strokeWidth={3} />
                              )}
                              {project.promotion}
                            </div>
                          )}
                        </div>

                        {/* Progress bar */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-primary-light"
                            style={{ width: `${percentageSold}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-text-dark mb-2 group-hover:text-primary transition-colors leading-tight">
                          {project.title}
                        </h3>

                        <div className="flex items-center gap-1.5 text-sm text-text-light mb-4">
                          <MapPin size={14} className="text-primary flex-shrink-0" strokeWidth={2.5} />
                          <span className="font-medium">{project.location}</span>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-gray-100">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <ClipboardCheck size={14} className="text-primary" strokeWidth={2.5} />
                            </div>
                            <div>
                              <div className="text-[9px] text-text-light uppercase tracking-wider font-medium">Rol</div>
                              <div className="text-xs font-bold text-text-dark">{project.rolStatus}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Calendar size={14} className="text-primary" strokeWidth={2.5} />
                            </div>
                            <div>
                              <div className="text-[9px] text-text-light uppercase tracking-wider font-medium">Entrega</div>
                              <div className="text-xs font-bold text-text-dark">{project.delivery}</div>
                            </div>
                          </div>
                        </div>

                        {/* Amenities */}
                        <div className="flex items-center gap-2 mb-4 flex-wrap">
                          {project.amenities.slice(0, 6).map((amenity, idx) => {
                            const icons = {
                              "Portón": DoorOpen,
                              "Caminos": Waypoints,
                              "Agua": Droplet,
                              "Luz": Lightbulb,
                              "Terreno plano": Square,
                              "Sin torres": RadioTower
                            };
                            const Icon = icons[amenity as keyof typeof icons];

                            return Icon ? (
                              <div key={idx} className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Icon size={13} className="text-primary" strokeWidth={2.5} />
                              </div>
                            ) : null;
                          })}
                        </div>

                        {/* Price and CTA */}
                        <div className="pt-4 border-t border-gray-100">
                          <div className="flex items-end justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="text-[9px] text-text-light uppercase tracking-wider font-bold mb-1.5">Precio desde</div>
                              <div className="text-2xl font-bold bg-gradient-to-r from-primary-dark to-primary bg-clip-text text-transparent leading-none">
                                {project.price}
                              </div>
                            </div>

                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              className="flex-shrink-0 px-4 py-2.5 rounded-lg bg-gradient-to-r from-primary-dark to-primary text-white font-semibold text-xs shadow-md flex items-center gap-1.5"
                            >
                              <span>Ver más</span>
                              <ChevronRight size={14} strokeWidth={3} />
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {availableProjects.length === 0 && (
            <div className="text-center py-20">
              <Building2 size={64} className="text-gray-300 mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="text-2xl font-bold text-text-dark mb-2">No se encontraron proyectos</h3>
              <p className="text-text-light">Intenta con otros filtros</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
