"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Heart, TrendingUp, Users } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Patrimonio seguro",
    description: "Un activo real y tangible"
  },
  {
    icon: Heart,
    title: "Calidad de vida",
    description: "Naturaleza y tranquilidad"
  },
  {
    icon: TrendingUp,
    title: "Plusvalía",
    description: "Zonas con alta plusvalía"
  },
  {
    icon: Users,
    title: "Acompañamiento",
    description: "Desde la reserva hasta la entrega"
  }
];

export default function InvestmentSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-20 bg-primary-dark text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
          >
            <p className="text-xs uppercase tracking-widest text-white/70 mb-4 font-semibold">
              Más que parcelas
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Invertir en tierra
              <br />
              es invertir en tu futuro
            </h2>

            <button className="text-sm text-white font-medium hover:text-primary-light transition mt-8">
              Conoce más sobre nosotros →
            </button>
          </motion.div>

          {/* Right Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all"
                >
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-white/70">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
