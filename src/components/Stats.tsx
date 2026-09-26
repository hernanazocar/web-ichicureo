"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Users, Briefcase, MapPin, Calendar } from "lucide-react";

interface CmsStat {
  value: string;
  label: string;
  suffix: string;
}

// Icons cycle in a fixed order; the CMS controls the actual numbers/labels/suffixes.
const icons = [Users, Briefcase, MapPin, Calendar];

const defaultStats: CmsStat[] = [
  { value: "2500", label: "Clientes felices", suffix: "+" },
  { value: "25", label: "Proyectos desarrollados", suffix: "+" },
  { value: "12000", label: "Parcelas comercializadas", suffix: "+" },
  { value: "10", label: "Años de experiencia", suffix: "+" }
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
  const [stats, setStats] = useState<CmsStat[]>(defaultStats);

  useEffect(() => {
    fetch('/api/contenido')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data.home?.stats) && data.home.stats.length > 0) {
          setStats(data.home.stats);
        }
      })
      .catch(err => console.error('Error loading stats:', err));
  }, []);

  return (
    <section ref={ref} className="py-12 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-text-dark">
            Números que nos{" "}
            <span className="bg-gradient-to-r from-primary-dark to-primary bg-clip-text text-transparent">
              respaldan
            </span>
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = icons[index % icons.length];
            const numericValue = parseInt(stat.value, 10) || 0;
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
                whileHover={{ y: -6, scale: 1.02 }}
                className="group relative"
              >
                {/* Card */}
                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-all duration-500 border border-primary/20 hover:border-primary/40 overflow-hidden h-full group-hover:bg-white/90">
                  {/* Decorative corner element */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full"></div>

                  {/* Top accent line with animation */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-dark via-primary to-primary-light">
                    <div className="h-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-[shimmer_2s_infinite]"></div>
                  </div>

                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-[0.03]">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
                      backgroundSize: '20px 20px',
                      color: '#7A8F5C'
                    }}></div>
                  </div>

                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-green-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative flex flex-col items-center text-center">
                    {/* Icon with glow ring */}
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.15 }}
                      transition={{ duration: 0.7, ease: "easeInOut" }}
                      className="mb-3 relative"
                    >
                      {/* Outer glow ring */}
                      <div className="absolute -inset-2 bg-gradient-to-br from-primary/20 to-green-400/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* Icon container */}
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark rounded-xl blur-sm opacity-50"></div>
                        <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-primary via-primary to-primary-dark flex items-center justify-center shadow-xl shadow-primary/40 ring-2 ring-white/50 group-hover:ring-white/80 transition-all duration-500">
                          <Icon size={20} strokeWidth={2.5} className="text-white drop-shadow-lg" />
                        </div>
                      </div>
                    </motion.div>

                    {/* Number with better styling */}
                    <div className="mb-1.5 relative">
                      <div className="absolute -inset-2 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <Counter
                        value={numericValue}
                        suffix={stat.suffix}
                        inView={isInView}
                      />
                    </div>

                    {/* Label with decoration */}
                    <div className="relative">
                      <p className="text-xs font-bold text-gray-700 group-hover:text-primary-dark leading-tight transition-colors duration-300">
                        {stat.label}
                      </p>
                      {/* Underline decoration */}
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent transition-all duration-500"></div>
                    </div>
                  </div>

                  {/* Bottom gradient bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-dark/20 via-primary/40 to-primary-light/20 opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
