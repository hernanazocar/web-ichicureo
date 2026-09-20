"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import EditorLayout, { EditorSection, EditorInput, EditorActions } from "@/components/admin/EditorLayout";

export default function EditarConfiguracion() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombreSitio: "",
    logo: "",
    colores: { primario: "", secundario: "" }
  });

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (auth !== "true") {
      router.push("/admin/login");
      return;
    }
    loadData();
  }, [router]);

  const loadData = async () => {
    try {
      const response = await fetch('/api/contenido');
      const data = await response.json();
      setFormData(data.configuracion);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/contenido');
      const allData = await response.json();
      allData.configuracion = formData;

      await fetch('/api/contenido', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(allData)
      });

      alert("¡Configuración actualizada! Recarga para ver cambios.");
    } catch (error) {
      alert("Error al actualizar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <EditorLayout title="Configuración General" backLink="/admin/contenido">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">

          <EditorSection title="Información del Sitio" icon={<span>⚙️</span>} highlight>
            <div className="space-y-6">
              <EditorInput label="Nombre del Sitio" value={formData.nombreSitio} onChange={(val) => setFormData({...formData, nombreSitio: val})} placeholder="Inmobiliaria Chicureo" required />
              <EditorInput label="URL del Logo" value={formData.logo} onChange={(val) => setFormData({...formData, logo: val})} placeholder="/logo.png" />
            </div>
          </EditorSection>

          <EditorSection title="Colores del Sitio" icon={<span>🎨</span>}>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-bold mb-3 text-gray-800">Color Primario</label>
                <div className="flex gap-4">
                  <input type="color" value={formData.colores.primario} onChange={(e) => setFormData({...formData, colores: {...formData.colores, primario: e.target.value}})} className="w-20 h-14 border-2 border-gray-300 rounded-lg cursor-pointer" />
                  <input type="text" value={formData.colores.primario} onChange={(e) => setFormData({...formData, colores: {...formData.colores, primario: e.target.value}})} placeholder="#2E7D32" className="flex-1 px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-900 font-bold text-lg" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-3 text-gray-800">Color Secundario</label>
                <div className="flex gap-4">
                  <input type="color" value={formData.colores.secundario} onChange={(e) => setFormData({...formData, colores: {...formData.colores, secundario: e.target.value}})} className="w-20 h-14 border-2 border-gray-300 rounded-lg cursor-pointer" />
                  <input type="text" value={formData.colores.secundario} onChange={(e) => setFormData({...formData, colores: {...formData.colores, secundario: e.target.value}})} placeholder="#1B5E20" className="flex-1 px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-900 font-bold text-lg" />
                </div>
              </div>
            </div>
          </EditorSection>

          <EditorActions onCancel="/admin/contenido" onSave={() => {}} loading={loading} saveText="Guardar Configuración" />
        </form>
      </div>
    </EditorLayout>
  );
}
