"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Users, ShoppingCart, MapPin, Video, Mail, Edit, Eye } from "lucide-react";

export default function AdminContenido() {
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

  const secciones = [
    {
      id: "home",
      title: "Página Principal",
      description: "Hero, estadísticas y facilidades de pago",
      icon: Home,
      color: "bg-blue-500",
      href: "/admin/contenido/home",
      badge: "Principal"
    },
    {
      id: "quienes-somos",
      title: "Quiénes Somos",
      description: "Historia, misión, visión y valores",
      icon: Users,
      color: "bg-purple-500",
      href: "/admin/contenido/quienes-somos",
      badge: "Institucional"
    },
    {
      id: "proceso-compra",
      title: "Proceso de Compra",
      description: "Pasos, documentos y facilidades",
      icon: ShoppingCart,
      color: "bg-green-600",
      href: "/admin/contenido/proceso-compra",
      badge: "Comercial"
    },
    {
      id: "compramos-campo",
      title: "Compramos tu Campo",
      description: "Beneficios y requisitos",
      icon: MapPin,
      color: "bg-orange-600",
      href: "/admin/contenido/compramos-campo",
      badge: "Servicios"
    },
    {
      id: "tour-virtual",
      title: "Tour Virtual",
      description: "Videos y tours 360°",
      icon: Video,
      color: "bg-red-500",
      href: "/admin/contenido/tour-virtual",
      badge: "Media"
    },
    {
      id: "contacto",
      title: "Contacto",
      description: "Información de contacto y redes sociales",
      icon: Mail,
      color: "bg-cyan-600",
      href: "/admin/contenido/contacto",
      badge: "Contacto"
    }
  ];

  if (!isAuth) return null;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-8 py-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Sitio Web</h1>
            <p className="text-sm text-gray-600 mt-1">Gestiona el contenido de todas las páginas</p>
          </div>
        </div>
      </header>

      <div className="p-8 max-w-7xl">
        {/* Tabla */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-3">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-5 text-xs font-bold text-gray-700 uppercase tracking-wide">Página</div>
              <div className="col-span-4 text-xs font-bold text-gray-700 uppercase tracking-wide">Descripción</div>
              <div className="col-span-2 text-xs font-bold text-gray-700 uppercase tracking-wide">Categoría</div>
              <div className="col-span-1 text-xs font-bold text-gray-700 uppercase tracking-wide text-right">Acciones</div>
            </div>
          </div>

          {/* Filas */}
          <div className="divide-y divide-gray-100">
            {secciones.map((seccion, index) => {
              const Icon = seccion.icon;
              return (
                <motion.div
                  key={seccion.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center">
                    {/* Página */}
                    <div className="col-span-5 flex items-center gap-3">
                      <div className={`w-10 h-10 ${seccion.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <Icon size={20} className="text-white" strokeWidth={2.5} />
                      </div>
                      <h3 className="text-sm font-bold text-gray-900">{seccion.title}</h3>
                    </div>

                    {/* Descripción */}
                    <div className="col-span-4">
                      <p className="text-sm text-gray-600">{seccion.description}</p>
                    </div>

                    {/* Categoría */}
                    <div className="col-span-2">
                      <span className="inline-block px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded">
                        {seccion.badge}
                      </span>
                    </div>

                    {/* Acciones */}
                    <div className="col-span-1 flex items-center justify-end gap-2">
                      <Link href={seccion.href}>
                        <button
                          className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                          title="Editar"
                        >
                          <Edit size={16} strokeWidth={2.5} />
                        </button>
                      </Link>
                      <a
                        href={`/${seccion.id === 'home' ? '' : seccion.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Ver en el sitio"
                      >
                        <Eye size={16} className="text-gray-600" strokeWidth={2.5} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
