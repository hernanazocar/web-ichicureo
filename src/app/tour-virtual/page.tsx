"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Play, MapPin, Maximize2, Eye } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Mirador de Rinconada",
    location: "Rinconada, Los Andes",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80",
    tourUrl: "https://ichicureo.cl/360/mirador-de-rinconada/",
    views: "1.2k"
  },
  {
    id: 2,
    title: "Hacienda Calle Larga",
    location: "Calle Larga, Los Andes",
    image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&q=80",
    tourUrl: "https://ichicureo.cl/360/mirador-de-rinconada/",
    views: "980"
  },
  {
    id: 3,
    title: "Villas de Requínoa",
    location: "Requínoa, VI Región",
    image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&q=80",
    tourUrl: "https://ichicureo.cl/360/mirador-de-rinconada/",
    views: "850"
  }
];

export default function TourVirtualPage() {
  const [selectedProject, setSelectedProject] = useState(projects[0]);

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero con Video de Dron */}
      <section className="relative pt-32 pb-20 text-white overflow-hidden min-h-[600px] flex items-center">
        {/* Video de fondo - Dron volando sobre campos */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover scale-105"
            poster="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1600&q=80"
          >
            {/* Videos de dron HD volando sobre campos - Pexels */}
            <source src="https://videos.pexels.com/video-files/2491284/2491284-hd_1920_1080_25fps.mp4" type="video/mp4" />
            <source src="https://videos.pexels.com/video-files/3843436/3843436-uhd_2560_1440_30fps.mp4" type="video/mp4" />
            <source src="https://videos.pexels.com/video-files/4010141/4010141-hd_1920_1080_25fps.mp4" type="video/mp4" />
            {/* Si tienes tu propio video: <source src="/videos/drone-campo.mp4" type="video/mp4" /> */}
          </video>
          {/* Overlay oscuro con gradiente para mejor legibilidad del texto */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/60 to-black/40"></div>

          {/* Efecto de vignette para enfocar el centro */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/30"></div>
        </div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-xl">
                <Play size={28} className="text-white" strokeWidth={2.5} />
              </div>
              <p className="text-sm uppercase tracking-[0.3em] font-bold text-white/90">Tours 360°</p>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Recorre nuestros proyectos desde casa
            </h1>
            <p className="text-white/90 text-xl leading-relaxed max-w-2xl">
              Explora cada proyecto con tours virtuales interactivos. Conoce los terrenos,
              amenidades y alrededores sin salir de casa.
            </p>

            {/* Indicador de scroll */}
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: [0, 10, 0] }}
              transition={{
                opacity: { delay: 1, duration: 0.5 },
                y: { delay: 1.5, duration: 1.5, repeat: Infinity }
              }}
              className="mt-12 flex items-center gap-2 text-white/60"
            >
              <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-2">
                <div className="w-1 h-2 bg-white/60 rounded-full"></div>
              </div>
              <span className="text-sm">Descubre nuestros tours</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Tour Viewer */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Video Player */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
                <div className="aspect-video bg-black">
                  <iframe
                    className="w-full h-full"
                    src={selectedProject.tourUrl}
                    title={selectedProject.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-text-dark mb-2">{selectedProject.title}</h2>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-text-light">
                      <MapPin size={16} className="text-primary" strokeWidth={2.5} />
                      <span>{selectedProject.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-text-light">
                      <Eye size={16} className="text-primary" strokeWidth={2.5} />
                      <span>{selectedProject.views} vistas</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tour Controls Info */}
              <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                  <Maximize2 size={20} className="text-blue-600" strokeWidth={2.5} />
                  Cómo usar el tour virtual 360°
                </h3>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li>• <strong>Girar:</strong> Haz clic y arrastra para rotar la vista 360°</li>
                  <li>• <strong>Zoom:</strong> Usa el scroll del mouse o pincha para acercar/alejar</li>
                  <li>• <strong>Navegar:</strong> Haz clic en las flechas o puntos para moverte por el proyecto</li>
                  <li>• <strong>Pantalla completa:</strong> Haz clic en el ícono de pantalla completa para una mejor experiencia</li>
                  <li>• <strong>Giroscopio:</strong> En móviles, mueve tu dispositivo para explorar</li>
                </ul>
              </div>
            </div>

            {/* Project List */}
            <div className="lg:col-span-1">
              <h3 className="text-xl font-bold text-text-dark mb-6">Otros proyectos</h3>
              <div className="space-y-4">
                {projects.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className={`w-full text-left rounded-xl overflow-hidden transition-all ${
                      selectedProject.id === project.id
                        ? "ring-4 ring-primary shadow-lg"
                        : "hover:shadow-md"
                    }`}
                  >
                    <div className="relative h-32">
                      <div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${project.image})` }}
                      ></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <h4 className="text-white font-bold text-sm mb-1">{project.title}</h4>
                        <div className="flex items-center gap-1 text-white/80 text-xs">
                          <MapPin size={12} strokeWidth={2.5} />
                          <span>{project.location}</span>
                        </div>
                      </div>
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2">
                        <Play size={16} className="text-primary" strokeWidth={2.5} />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8 max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-text-dark mb-6">
            ¿Te gustó lo que viste?
          </h2>
          <p className="text-text-light text-lg mb-8">
            Agenda una visita presencial y conoce el proyecto en persona
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-primary-dark to-primary text-white font-bold px-8 py-4 rounded-xl hover:shadow-lg hover:shadow-primary/40 transition-all"
          >
            Agendar Visita Presencial
          </motion.button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
