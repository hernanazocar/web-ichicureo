"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plus, Trash2, User, Mail, Phone, Briefcase } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

interface Miembro {
  nombre: string;
  cargo: string;
  foto: string;
  email?: string;
  telefono?: string;
}

export default function AdminEquipo() {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const [miembros, setMiembros] = useState<Miembro[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (auth !== "true") {
      router.push("/admin/login");
    } else {
      setIsAuth(true);
      loadData();
    }
  }, [router]);

  const loadData = async () => {
    try {
      const response = await fetch('/api/contenido');
      const data = await response.json();
      setMiembros(data.home?.equipo?.miembros || []);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/contenido');
      const allData = await response.json();

      if (!allData.home) allData.home = {};
      if (!allData.home.equipo) allData.home.equipo = {};
      allData.home.equipo.miembros = miembros;

      await fetch('/api/contenido', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(allData)
      });

      alert("¡Equipo actualizado!");
      setEditingIndex(null);
    } catch (error) {
      alert("Error al actualizar");
    } finally {
      setLoading(false);
    }
  };

  const addMiembro = () => {
    setMiembros([...miembros, { nombre: "", cargo: "", foto: "", email: "", telefono: "" }]);
    setEditingIndex(miembros.length);
  };

  const removeMiembro = (index: number) => {
    if (confirm("¿Eliminar este miembro del equipo?")) {
      setMiembros(miembros.filter((_, i) => i !== index));
    }
  };

  const updateMiembro = (index: number, field: keyof Miembro, value: string) => {
    const newMiembros = [...miembros];
    newMiembros[index] = { ...newMiembros[index], [field]: value };
    setMiembros(newMiembros);
  };

  if (!isAuth) return null;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Equipo</h1>
              <p className="text-sm text-gray-600 mt-1">{miembros.length} miembros del equipo</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={addMiembro}
                className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium"
              >
                <Plus size={18} strokeWidth={2.5} />
                Agregar Miembro
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50"
              >
                {loading ? "Guardando..." : "Guardar Cambios"}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {miembros.map((miembro, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-primary/30 hover:shadow-lg transition-all"
            >
              {/* Foto */}
              <div className="mb-4">
                <ImageUpload
                  label="Foto del Miembro"
                  value={miembro.foto}
                  onChange={(url) => updateMiembro(index, 'foto', url)}
                />
              </div>

              {/* Campos */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold mb-1.5 text-gray-800 flex items-center gap-2">
                    <User size={14} />
                    Nombre *
                  </label>
                  <input
                    type="text"
                    value={miembro.nombre}
                    onChange={(e) => updateMiembro(index, 'nombre', e.target.value)}
                    placeholder="Ej: Andrea Fernández"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary bg-white text-gray-900 font-medium text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1.5 text-gray-800 flex items-center gap-2">
                    <Briefcase size={14} />
                    Cargo *
                  </label>
                  <input
                    type="text"
                    value={miembro.cargo}
                    onChange={(e) => updateMiembro(index, 'cargo', e.target.value)}
                    placeholder="Ej: Asesora Comercial"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary bg-white text-gray-900 font-medium text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1.5 text-gray-800 flex items-center gap-2">
                    <Mail size={14} />
                    Email
                  </label>
                  <input
                    type="email"
                    value={miembro.email || ""}
                    onChange={(e) => updateMiembro(index, 'email', e.target.value)}
                    placeholder="correo@ejemplo.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary bg-white text-gray-900 font-medium text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1.5 text-gray-800 flex items-center gap-2">
                    <Phone size={14} />
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={miembro.telefono || ""}
                    onChange={(e) => updateMiembro(index, 'telefono', e.target.value)}
                    placeholder="+56 9 1234 5678"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary bg-white text-gray-900 font-medium text-sm"
                  />
                </div>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => removeMiembro(index)}
                className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium text-sm"
              >
                <Trash2 size={16} />
                Eliminar Miembro
              </button>
            </motion.div>
          ))}

          {miembros.length === 0 && (
            <div className="col-span-full text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User size={32} className="text-gray-400" />
              </div>
              <p className="text-gray-600 font-medium mb-2">No hay miembros en el equipo</p>
              <p className="text-sm text-gray-500 mb-4">Agrega el primer miembro para comenzar</p>
              <button
                onClick={addMiembro}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium"
              >
                <Plus size={18} strokeWidth={2.5} />
                Agregar Miembro
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
