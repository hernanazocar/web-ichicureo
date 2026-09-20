"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  Building2,
  FileText,
  Users,
  Settings,
  LogOut,
  Home,
  ChevronRight
} from "lucide-react";

const menuItems = [
  {
    section: "Principal",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
      { icon: Home, label: "Ver Sitio", href: "/" }
    ]
  },
  {
    section: "Gestión",
    items: [
      { icon: Building2, label: "Proyectos", href: "/admin/proyectos" },
      { icon: FileText, label: "Sitio Web", href: "/admin/contenido" },
      { icon: Users, label: "Equipo", href: "/admin/equipo" }
    ]
  },
  {
    section: "Sistema",
    items: [
      { icon: Settings, label: "Configuración", href: "/admin/configuracion" }
    ]
  }
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    router.push("/admin/login");
  };

  const isActive = (href: string) => {
    if (href === "/admin/dashboard") return pathname === href;
    return pathname?.startsWith(href) && href !== "/";
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 border-r border-gray-700 flex flex-col z-50">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <Link href="/admin/dashboard">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative w-10 h-10 bg-white rounded-lg p-1.5 group-hover:scale-105 transition-transform">
              <Image src="/logo.png" alt="Logo" width={40} height={40} className="w-full h-full object-contain" />
            </div>
            <div>
              <h2 className="text-white font-bold text-sm">Inmobiliaria</h2>
              <p className="text-gray-400 text-xs">Chicureo</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-3">
        <div className="space-y-6">
          {menuItems.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-3">
                {section.section}
              </p>
              <div className="space-y-1">
                {section.items.map((item, itemIndex) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  const isExternal = item.href === "/";

                  return (
                    <Link key={itemIndex} href={item.href} target={isExternal ? "_blank" : undefined}>
                      <div
                        className={`
                          flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group cursor-pointer
                          ${active
                            ? 'bg-primary text-white shadow-lg shadow-primary/30'
                            : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                          }
                        `}
                      >
                        <Icon
                          size={18}
                          className={active ? 'text-white' : 'text-gray-400 group-hover:text-white'}
                          strokeWidth={2.5}
                        />
                        <span className="flex-1 text-sm font-medium">{item.label}</span>
                        {active && <ChevronRight size={16} className="text-white" />}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-800/50 mb-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white text-sm font-bold">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-medium truncate">Administrador</p>
            <p className="text-gray-400 text-xs truncate">admin@ichicureo.cl</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:bg-red-500/10 hover:text-red-400 transition-all group"
        >
          <LogOut size={18} strokeWidth={2.5} />
          <span className="text-sm font-medium">Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
}
