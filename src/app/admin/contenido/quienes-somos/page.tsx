"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Sparkles, BookOpen, Target, Eye, Award } from "lucide-react";
import EditorLayout, { EditorActions } from "@/components/admin/EditorLayout";
import ImageUpload from "@/components/admin/ImageUpload";

export default function EditarQuienesSomos() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    hero: { title: "", subtitle: "", backgroundImage: "" },
    historia: { title: "", content: "", image: "" },
    mision: { title: "", content: "", icon: "" },
    vision: { title: "", content: "", icon: "" },
    valores: [] as Array<{ title: string; description: string }>
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
      setFormData(data.quienesSomos);
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
      allData.quienesSomos = formData;

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

  const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary bg-white text-gray-900 font-medium text-sm";
  const labelClass = "block text-xs font-bold mb-1.5 text-gray-800";

  return (
    <EditorLayout title="Editar Quiénes Somos" backLink="/admin/contenido">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Hero */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-blue-500 rounded-lg flex items-center justify-center">
                <Sparkles className="text-white" size={14} />
              </div>
              <h2 className="text-base font-bold text-gray-900">Hero</h2>
            </div>
            <div className="space-y-2">
              <div>
                <label className={labelClass}>Título *</label>
                <input type="text" value={formData.hero.title} onChange={(e) => setFormData({...formData, hero: {...formData.hero, title: e.target.value}})} className={inputClass} required />
              </div>
              <div>
                <label className={labelClass}>Subtítulo *</label>
                <textarea value={formData.hero.subtitle} onChange={(e) => setFormData({...formData, hero: {...formData.hero, subtitle: e.target.value}})} rows={2} className={inputClass} required />
              </div>
              <ImageUpload
                label="Imagen de Fondo *"
                value={formData.hero.backgroundImage}
                onChange={(url) => setFormData({...formData, hero: {...formData.hero, backgroundImage: url}})}
              />
            </div>
          </div>

          {/* Historia */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-purple-500 rounded-lg flex items-center justify-center">
                <BookOpen className="text-white" size={14} />
              </div>
              <h2 className="text-base font-bold text-gray-900">Historia</h2>
            </div>
            <div className="space-y-2">
              <div>
                <label className={labelClass}>Título</label>
                <input type="text" value={formData.historia.title} onChange={(e) => setFormData({...formData, historia: {...formData.historia, title: e.target.value}})} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Contenido</label>
                <textarea value={formData.historia.content} onChange={(e) => setFormData({...formData, historia: {...formData.historia, content: e.target.value}})} rows={3} className={inputClass} />
              </div>
              <ImageUpload
                label="Imagen"
                value={formData.historia.image}
                onChange={(url) => setFormData({...formData, historia: {...formData.historia, image: url}})}
              />
            </div>
          </div>

          {/* Misión y Visión */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Misión */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 bg-green-600 rounded-lg flex items-center justify-center">
                  <Target className="text-white" size={14} />
                </div>
                <h2 className="text-base font-bold text-gray-900">Misión</h2>
              </div>
              <div className="space-y-2">
                <div>
                  <label className={labelClass}>Título</label>
                  <input type="text" value={formData.mision.title} onChange={(e) => setFormData({...formData, mision: {...formData.mision, title: e.target.value}})} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Contenido</label>
                  <textarea value={formData.mision.content} onChange={(e) => setFormData({...formData, mision: {...formData.mision, content: e.target.value}})} rows={4} className={inputClass} />
                </div>
              </div>
            </div>

            {/* Visión */}
            <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-4 border border-teal-200">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 bg-teal-600 rounded-lg flex items-center justify-center">
                  <Eye className="text-white" size={14} />
                </div>
                <h2 className="text-base font-bold text-gray-900">Visión</h2>
              </div>
              <div className="space-y-2">
                <div>
                  <label className={labelClass}>Título</label>
                  <input type="text" value={formData.vision.title} onChange={(e) => setFormData({...formData, vision: {...formData.vision, title: e.target.value}})} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Contenido</label>
                  <textarea value={formData.vision.content} onChange={(e) => setFormData({...formData, vision: {...formData.vision, content: e.target.value}})} rows={4} className={inputClass} />
                </div>
              </div>
            </div>
          </div>

          {/* Valores */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-4 border border-amber-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-amber-600 rounded-lg flex items-center justify-center">
                  <Award className="text-white" size={14} />
                </div>
                <h2 className="text-base font-bold text-gray-900">Valores ({formData.valores.length})</h2>
              </div>
              <button
                type="button"
                onClick={() => setFormData({...formData, valores: [...formData.valores, {title: "", description: ""}]})}
                className="flex items-center gap-2 px-3 py-1.5 bg-amber-600 text-white text-xs font-bold rounded-lg hover:bg-amber-700"
              >
                <Plus size={14} />
                Agregar
              </button>
            </div>

            <div className="space-y-2">
              {formData.valores.map((valor, index) => (
                <div key={index} className="bg-white rounded-lg p-3 border border-gray-200">
                  <div className="flex gap-2">
                    <div className="flex-1 grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={valor.title}
                        onChange={(e) => {
                          const newValores = [...formData.valores];
                          newValores[index].title = e.target.value;
                          setFormData({...formData, valores: newValores});
                        }}
                        placeholder="Título"
                        className={inputClass}
                      />
                      <input
                        type="text"
                        value={valor.description}
                        onChange={(e) => {
                          const newValores = [...formData.valores];
                          newValores[index].description = e.target.value;
                          setFormData({...formData, valores: newValores});
                        }}
                        placeholder="Descripción"
                        className={inputClass}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, valores: formData.valores.filter((_, i) => i !== index)})}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg h-fit"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <EditorActions onCancel="/admin/contenido" onSave={() => {}} loading={loading} saveText="Guardar Cambios" />
        </form>
      </div>
    </EditorLayout>
  );
}
