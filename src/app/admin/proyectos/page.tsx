"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Eye, Search, ArrowUp, ArrowDown } from "lucide-react";

export default function AdminProyectos() {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const [proyectos, setProyectos] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (auth !== "true") {
      router.push("/admin/login");
    } else {
      setIsAuth(true);
      loadProyectos();
    }
  }, [router]);

  const loadProyectos = async () => {
    try {
      const response = await fetch('/api/proyectos');
      const data = await response.json();
      // Ordenar por campo 'orden' si existe, sino por id
      const sorted = data.sort((a: any, b: any) => {
        if (a.orden !== undefined && b.orden !== undefined) {
          return a.orden - b.orden;
        }
        return a.id - b.id;
      });
      setProyectos(sorted);
    } catch (error) {
      console.error('Error al cargar proyectos:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("¿Estás seguro de eliminar este proyecto?")) {
      try {
        await fetch(`/api/proyectos?id=${id}`, { method: 'DELETE' });
        loadProyectos();
        alert("Proyecto eliminado exitosamente");
      } catch (error) {
        alert("Error al eliminar proyecto");
      }
    }
  };

  const handleToggleActive = async (id: number) => {
    const proyecto = proyectos.find(p => p.id === id);
    if (!proyecto) return;

    try {
      await fetch('/api/proyectos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...proyecto, active: !proyecto.active })
      });
      loadProyectos();
    } catch (error) {
      alert("Error al actualizar proyecto");
    }
  };

  const handleMoveUp = async (index: number) => {
    if (index === 0) return;

    const newProyectos = [...proyectos];
    [newProyectos[index], newProyectos[index - 1]] = [newProyectos[index - 1], newProyectos[index]];

    // Actualizar orden de ambos proyectos
    try {
      await Promise.all([
        fetch('/api/proyectos', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...newProyectos[index], orden: index })
        }),
        fetch('/api/proyectos', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...newProyectos[index - 1], orden: index - 1 })
        })
      ]);
      loadProyectos();
    } catch (error) {
      alert("Error al actualizar orden");
    }
  };

  const handleMoveDown = async (index: number) => {
    if (index === proyectos.length - 1) return;

    const newProyectos = [...proyectos];
    [newProyectos[index], newProyectos[index + 1]] = [newProyectos[index + 1], newProyectos[index]];

    // Actualizar orden de ambos proyectos
    try {
      await Promise.all([
        fetch('/api/proyectos', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...newProyectos[index], orden: index })
        }),
        fetch('/api/proyectos', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...newProyectos[index + 1], orden: index + 1 })
        })
      ]);
      loadProyectos();
    } catch (error) {
      alert("Error al actualizar orden");
    }
  };

  const filteredProyectos = proyectos.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.location.toLowerCase().includes(search.toLowerCase())
  );

  if (!isAuth) return null;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Proyectos</h1>
              <p className="text-sm text-gray-600 mt-1">{filteredProyectos.length} proyectos inmobiliarios</p>
            </div>
            <Link href="/admin/proyectos/nuevo">
              <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium">
                <Plus size={18} strokeWidth={2.5} />
                Nuevo Proyecto
              </button>
            </Link>
          </div>
        </div>
      </header>

      <div className="p-8">
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar proyectos..."
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-4">
          {filteredProyectos.map((proyecto, index) => (
            <motion.div
              key={proyecto.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-text-dark">{proyecto.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      proyecto.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                    }`}>
                      {proyecto.active ? "Activo" : "Inactivo"}
                    </span>
                  </div>
                  <p className="text-text-light text-sm mb-3">{proyecto.location}</p>
                  <div className="flex items-center gap-6 text-sm">
                    <div>
                      <span className="text-text-light">Precio: </span>
                      <span className="font-semibold text-primary">{proyecto.price}</span>
                    </div>
                    <div>
                      <span className="text-text-light">Disponibles: </span>
                      <span className="font-semibold">{proyecto.availableUnits}/{proyecto.totalUnits}</span>
                    </div>
                    <div>
                      <span className="text-text-light">Estado: </span>
                      <span className="font-semibold">{proyecto.status}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Orden */}
                  <div className="flex flex-col gap-1 mr-2 border-r pr-2">
                    <button
                      onClick={() => handleMoveUp(index)}
                      disabled={index === 0}
                      className="p-1 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      title="Mover arriba"
                    >
                      <ArrowUp size={16} strokeWidth={2.5} />
                    </button>
                    <button
                      onClick={() => handleMoveDown(index)}
                      disabled={index === filteredProyectos.length - 1}
                      className="p-1 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      title="Mover abajo"
                    >
                      <ArrowDown size={16} strokeWidth={2.5} />
                    </button>
                  </div>

                  <Link href={`/proyectos/${proyecto.id}`} target="_blank">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Ver en sitio">
                      <Eye size={18} />
                    </button>
                  </Link>
                  <button
                    onClick={() => handleToggleActive(proyecto.id)}
                    className="px-3 py-2 text-sm font-semibold text-primary hover:bg-primary/10 rounded-lg transition-colors"
                  >
                    {proyecto.active ? "Desactivar" : "Activar"}
                  </button>
                  <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Editar">
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(proyecto.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Eliminar"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProyectos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-light">No se encontraron proyectos</p>
          </div>
        )}
      </div>
    </div>
  );
}
