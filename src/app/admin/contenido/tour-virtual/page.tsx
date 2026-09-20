"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

export default function EditarTourVirtual() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    hero: { title: "", subtitle: "", videoUrl: "" },
    tourUrl: "",
    proyectos: [] as Array<{ nombre: string; url: string }>
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
      setFormData(data.tourVirtual);
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
      allData.tourVirtual = formData;

      await fetch('/api/contenido', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(allData)
      });

      alert("¡Contenido actualizado!");
    } catch (error) {
      alert("Error al actualizar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/admin/contenido">
              <button className="p-2 hover:bg-gray-100 rounded-lg"><ArrowLeft size={20} /></button>
            </Link>
            <h1 className="text-2xl font-bold">Editar Tour Virtual</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-bold mb-6">Hero</h2>
            <div className="space-y-4">
              <input
                type="text"
                value={formData.hero.title}
                onChange={(e) => setFormData({...formData, hero: {...formData.hero, title: e.target.value}})}
                placeholder="Título"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <input
                type="text"
                value={formData.hero.subtitle}
                onChange={(e) => setFormData({...formData, hero: {...formData.hero, subtitle: e.target.value}})}
                placeholder="Subtítulo"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <input
                type="url"
                value={formData.hero.videoUrl}
                onChange={(e) => setFormData({...formData, hero: {...formData.hero, videoUrl: e.target.value}})}
                placeholder="URL del video (MP4)"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-bold mb-6">Tour 360°</h2>
            <input
              type="url"
              value={formData.tourUrl}
              onChange={(e) => setFormData({...formData, tourUrl: e.target.value})}
              placeholder="URL del tour 360° (ej: https://ichicureo.cl/360/...)"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div className="flex gap-4">
            <Link href="/admin/contenido" className="flex-1">
              <button type="button" className="w-full px-6 py-3 border-2 border-gray-200 rounded-xl font-semibold hover:bg-gray-50">Cancelar</button>
            </Link>
            <button type="submit" disabled={loading} className="flex-1 bg-gradient-to-r from-primary-dark to-primary text-white font-bold px-6 py-3 rounded-xl hover:shadow-lg flex items-center justify-center gap-2">
              <Save size={18} />
              {loading ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
