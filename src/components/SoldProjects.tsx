"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const soldProjects = [
  {
    id: 1,
    title: "Fundo Santa María",
    location: "VI Región",
    image: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=800&q=80",
    status: "100% VENDIDO"
  },
  {
    id: 2,
    title: "Villas de Requínoa",
    location: "VI Región",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
    status: "100% ENTREGADO"
  },
  {
    id: 3,
    title: "Hacienda El Carmen",
    location: "VI Región",
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80",
    status: "100% VENDIDO"
  },
  {
    id: 4,
    title: "Los Nogales de San Esteban",
    location: "VI Región",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80",
    status: "100% ENTREGADO"
  }
];

export default function SoldProjects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-widest text-text-light mb-3 font-medium">
              Proyectos vendidos y entregados
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-text-dark">
              Historias que ya son realidad
            </h2>
          </div>
          <button className="hidden lg:flex text-sm text-text-dark hover:text-primary font-medium items-center gap-1">
            Ver todos los proyectos →
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {soldProjects.map((project, index) => (
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
                <div className="absolute top-3 right-3">
                  <span className="bg-primary text-white text-xs px-3 py-1.5 rounded font-semibold uppercase tracking-wide">
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="text-base font-semibold text-text-dark mb-1">
                  {project.title}
                </h3>
                <p className="text-sm text-text-light">{project.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
