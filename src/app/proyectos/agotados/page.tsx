"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Building2, MapPin } from "lucide-react";

// Simulando datos - en producción vendrían de API
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
    size: "5.000 m²",
    availableUnits: 0,
    totalUnits: 45
  }
];

export default function ProyectosAgotados() {
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const regions = ["Todos", "Valparaíso", "O'Higgins"];

  const filteredProjects = allProjects.filter(project => {
    const matchRegion = selectedRegion === "all" || project.region === selectedRegion;
    const isSoldOut = project.availableUnits === 0;
    return matchRegion && isSoldOut;
  });

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center grayscale"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.5) 100%), url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600&q=80')`,
              backgroundPosition: 'center center'
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
              <div className="w-14 h-14 rounded-xl bg-red-600/80 backdrop-blur-md flex items-center justify-center">
                <Building2 size={28} className="text-white" strokeWidth={2.5} />
              </div>
              <p className="text-sm uppercase tracking-[0.3em] font-bold text-white/90">
                Proyectos Agotados
              </p>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Proyectos 100% Vendidos
            </h1>
            <p className="text-white/90 text-xl leading-relaxed">
              Conoce nuestros proyectos que alcanzaron el éxito total con todas sus unidades vendidas.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { number: filteredProjects.length.toString(), label: "Proyectos agotados" },
              { number: "100%", label: "Vendidos" },
              { number: "500+", label: "Familias felices" },
              { number: "45Ha", label: "Vendidas" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-red-600/20 backdrop-blur-md border border-red-500/30 rounded-xl p-6 text-center"
              >
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            <span className="text-sm font-semibold text-gray-700">Región:</span>
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region === "Todos" ? "all" : region)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  (selectedRegion === "all" && region === "Todos") || selectedRegion === region
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section ref={ref} className="py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-gray-600">
              Mostrando <span className="font-bold text-red-600">{filteredProjects.length}</span> proyectos agotados
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="relative group cursor-not-allowed bg-white rounded-2xl border border-gray-200 h-full opacity-75 hover:opacity-60 transition-all">
                  {/* Marca de AGOTADO */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold text-xl shadow-2xl rotate-[-15deg] border-4 border-white">
                      AGOTADO
                    </div>
                  </div>

                  {/* Image */}
                  <div className="relative h-64 bg-gray-100 overflow-hidden rounded-t-2xl">
                    <div
                      className="w-full h-full bg-cover bg-center grayscale"
                      style={{ backgroundImage: `url(${project.image})` }}
                    ></div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                    {project.logo && (
                      <div className="absolute top-3 right-3 w-16 h-16 bg-white rounded-xl shadow-lg p-2 flex items-center justify-center opacity-50">
                        <img src={project.logo} alt={`Logo ${project.title}`} className="w-full h-full object-contain grayscale" />
                      </div>
                    )}

                    <div className="absolute top-3 left-3 right-20 flex flex-col items-start gap-2">
                      <span className="bg-red-600 text-white text-[10px] px-3 py-1.5 rounded-full font-bold uppercase tracking-wide shadow-lg">
                        AGOTADO
                      </span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
                      <div className="h-full bg-red-600" style={{ width: '100%' }}></div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-700 mb-2 leading-tight">
                      {project.title}
                    </h3>

                    <div className="flex items-start gap-2 text-gray-600 mb-4">
                      <MapPin size={16} className="flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span className="text-sm">{project.location}</span>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Precio desde</div>
                        <div className="text-2xl font-bold text-gray-700">{project.price}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500 mb-1">Desde</div>
                        <div className="text-lg font-bold text-gray-700">{project.size}</div>
                      </div>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
                      <p className="text-sm font-bold text-red-700">Todas las unidades vendidas</p>
                      <p className="text-xs text-red-600 mt-1">{project.totalUnits} parcelas vendidas</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <Building2 size={64} className="text-gray-300 mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No hay proyectos agotados</h3>
              <p className="text-gray-600">Todos nuestros proyectos aún tienen unidades disponibles</p>
              <Link href="/proyectos" className="inline-block mt-6 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors">
                Ver Proyectos Disponibles
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
