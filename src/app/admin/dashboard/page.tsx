"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Building2, Users, TrendingUp, Plus, Eye, FileText, Edit } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (auth !== "true") {
      router.push("/admin/login");
    } else {
      setIsAuth(true);
    }
  }, [router]);

  const stats = [
    { icon: Building2, label: "Proyectos Activos Web", value: "6", color: "from-blue-500 to-blue-600" },
    { icon: Users, label: "Visitas del Mes", value: "2,847", color: "from-green-500 to-green-600" },
    { icon: TrendingUp, label: "Formularios Completados", value: "34", color: "from-purple-500 to-purple-600" },
    { icon: Home, label: "Próximos Lanzamientos", value: "12", color: "from-orange-500 to-orange-600" }
  ];

  const quickActions = [
    { icon: Plus, label: "Nuevo Proyecto", href: "/admin/proyectos/nuevo", color: "primary" },
    { icon: Building2, label: "Ver Proyectos", href: "/admin/proyectos", color: "blue" },
    { icon: Edit, label: "Editar Sitio Web", href: "/admin/contenido", color: "purple" },
    { icon: Eye, label: "Ver Sitio", href: "/", color: "green", external: true }
  ];

  if (!isAuth) return null;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-8 py-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-600 mt-1">Bienvenido al panel de administración</p>
          </div>
        </div>
      </header>

      <div className="p-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <Icon size={24} className="text-white" strokeWidth={2.5} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Acciones Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link key={index} href={action.href} target={action.external ? "_blank" : undefined}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-5 border-2 border-gray-200 rounded-xl hover:border-primary hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                      <Icon size={20} className="text-primary" strokeWidth={2.5} />
                    </div>
                    <p className="font-semibold text-gray-900 text-sm">{action.label}</p>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Actividad Reciente</h2>
          <div className="space-y-1">
            {[
              { action: "Proyecto creado", item: "Mirador de Rinconada", time: "Hace 2 horas", color: "bg-green-100 text-green-700" },
              { action: "Proyecto editado", item: "Hacienda Calle Larga", time: "Hace 5 horas", color: "bg-blue-100 text-blue-700" },
              { action: "Imagen actualizada", item: "Villas de Requínoa", time: "Hace 1 día", color: "bg-purple-100 text-purple-700" }
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-4 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`w-2 h-2 rounded-full ${activity.color.split(' ')[0]}`}></div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.item}</p>
                </div>
                <span className="text-xs text-gray-500 font-medium">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
