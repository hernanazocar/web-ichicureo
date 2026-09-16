"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect } from "react";
import { Users, Briefcase, MapPin, Calendar } from "lucide-react";

const stats = [
  {
    icon: Users,
    number: 2500,
    prefix: "+",
    label: "Clientes felices"
  },
  {
    icon: Briefcase,
    number: 25,
    prefix: "+",
    label: "Proyectos desarrollados"
  },
  {
    icon: MapPin,
    number: 12000,
    prefix: "+",
    label: "Parcelas comercializadas"
  },
  {
    icon: Calendar,
    number: 10,
    suffix: "+",
    label: "Años de experiencia"
  }
];

function Counter({ value, prefix = "", suffix = "", inView }: { value: number; prefix?: string; suffix?: string; inView: boolean }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, latest => {
    return Math.round(latest).toLocaleString('es-CL');
  });

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, {
        duration: 2,
        ease: "easeOut"
      });
      return controls.stop;
    }
  }, [count, value, inView]);

  return (
    <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-dark to-primary bg-clip-text text-transparent">
      {prefix}<motion.span>{rounded}</motion.span>{suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="relative py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Compact horizontal layout */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm border border-primary/10 rounded-2xl shadow-lg p-8 md:p-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    className="flex flex-col items-start gap-3 group"
                  >
                    {/* Icon - small and elegant */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300"
                    >
                      <Icon
                        size={20}
                        strokeWidth={2}
                        className="text-primary-dark"
                      />
                    </motion.div>

                    {/* Number */}
                    <div>
                      <Counter
                        value={stat.number}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                        inView={isInView}
                      />
                    </div>

                    {/* Label */}
                    <p className="text-xs text-gray-600 font-medium leading-tight">
                      {stat.label}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
