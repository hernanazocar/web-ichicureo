"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, Droplets, ShieldCheck, Coins, Lock, Leaf } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "Rol propio (SAN)",
    text: "Cada parcela con rol individual asegurado"
  },
  {
    icon: Zap,
    title: "Factibilidad eléctrica",
    text: "Energía garantizada para tu proyecto"
  },
  {
    icon: Droplets,
    title: "Derechos de agua de riego",
    text: "Agua asegurada para tus cultivos"
  },
  {
    icon: ShieldCheck,
    title: "Cambio establecido",
    text: "Permisos y zonificación gestionados"
  },
  {
    icon: Lock,
    title: "Acceso controlado",
    text: "Seguridad 24/7 en todos nuestros proyectos"
  },
  {
    icon: Coins,
    title: "Desde UF 1.000",
    text: "Financiamiento flexible disponible"
  }
];

export default function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="text-center"
              >
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <Icon size={24} className="text-primary" strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="text-sm font-semibold text-text-dark mb-1">
                  {feature.title}
                </h3>
                <p className="text-xs text-text-light leading-relaxed">
                  {feature.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
