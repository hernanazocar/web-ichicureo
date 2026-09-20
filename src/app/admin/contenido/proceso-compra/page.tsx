"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Sparkles, List, FileText, CreditCard } from "lucide-react";
import EditorLayout, { EditorActions } from "@/components/admin/EditorLayout";
import ImageUpload from "@/components/admin/ImageUpload";

export default function EditarProcesoCompra() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    hero: { title: "", subtitle: "", backgroundImage: "" },
    pasos: [] as Array<{ numero: number; title: string; description: string }>,
    documentos: [] as string[],
    facilidades: [] as Array<{ title: string; description: string }>
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
      setFormData(data.procesCompra);
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
      allData.procesCompra = formData;

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
    <EditorLayout title="Editar Proceso de Compra" backLink="/admin/contenido">
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
                <label className={labelClass}>Título</label>
                <input type="text" value={formData.hero.title} onChange={(e) => setFormData({...formData, hero: {...formData.hero, title: e.target.value}})} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Subtítulo</label>
                <input type="text" value={formData.hero.subtitle} onChange={(e) => setFormData({...formData, hero: {...formData.hero, subtitle: e.target.value}})} className={inputClass} />
              </div>
              <ImageUpload
                label="Imagen de Fondo"
                value={formData.hero.backgroundImage}
                onChange={(url) => setFormData({...formData, hero: {...formData.hero, backgroundImage: url}})}
              />
            </div>
          </div>

          {/* Pasos del Proceso */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-green-600 rounded-lg flex items-center justify-center">
                  <List className="text-white" size={14} />
                </div>
                <h2 className="text-base font-bold text-gray-900">Pasos del Proceso ({formData.pasos.length})</h2>
              </div>
              <button
                type="button"
                onClick={() => setFormData({...formData, pasos: [...formData.pasos, {numero: formData.pasos.length + 1, title: "", description: ""}]})}
                className="flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white text-xs font-bold rounded-lg hover:bg-green-700"
              >
                <Plus size={14} />
                Agregar
              </button>
            </div>

            <div className="space-y-2">
              {formData.pasos.map((paso, index) => (
                <div key={index} className="bg-white rounded-lg p-3 border border-gray-200">
                  <div className="flex gap-2">
                    <div className="flex items-center justify-center w-8 h-8 bg-green-600 text-white font-bold rounded-lg flex-shrink-0 text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <input
                        type="text"
                        value={paso.title}
                        onChange={(e) => {
                          const newPasos = [...formData.pasos];
                          newPasos[index].title = e.target.value;
                          setFormData({...formData, pasos: newPasos});
                        }}
                        placeholder="Título del paso"
                        className={inputClass}
                      />
                      <textarea
                        value={paso.description}
                        onChange={(e) => {
                          const newPasos = [...formData.pasos];
                          newPasos[index].description = e.target.value;
                          setFormData({...formData, pasos: newPasos});
                        }}
                        placeholder="Descripción"
                        rows={2}
                        className={inputClass}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, pasos: formData.pasos.filter((_, i) => i !== index)})}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg h-fit"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Documentos Requeridos */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-purple-500 rounded-lg flex items-center justify-center">
                  <FileText className="text-white" size={14} />
                </div>
                <h2 className="text-base font-bold text-gray-900">Documentos Requeridos ({formData.documentos.length})</h2>
              </div>
              <button
                type="button"
                onClick={() => setFormData({...formData, documentos: [...formData.documentos, ""]})}
                className="flex items-center gap-2 px-3 py-1.5 bg-purple-600 text-white text-xs font-bold rounded-lg hover:bg-purple-700"
              >
                <Plus size={14} />
                Agregar
              </button>
            </div>

            <div className="space-y-2">
              {formData.documentos.map((doc, index) => (
                <div key={index} className="bg-white rounded-lg p-2 border border-gray-200 flex gap-2">
                  <input
                    type="text"
                    value={doc}
                    onChange={(e) => {
                      const newDocs = [...formData.documentos];
                      newDocs[index] = e.target.value;
                      setFormData({...formData, documentos: newDocs});
                    }}
                    placeholder="Nombre del documento"
                    className={inputClass}
                  />
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, documentos: formData.documentos.filter((_, i) => i !== index)})}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Facilidades de Pago */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-orange-600 rounded-lg flex items-center justify-center">
                  <CreditCard className="text-white" size={14} />
                </div>
                <h2 className="text-base font-bold text-gray-900">Facilidades de Pago ({formData.facilidades.length})</h2>
              </div>
              <button
                type="button"
                onClick={() => setFormData({...formData, facilidades: [...formData.facilidades, {title: "", description: ""}]})}
                className="flex items-center gap-2 px-3 py-1.5 bg-orange-600 text-white text-xs font-bold rounded-lg hover:bg-orange-700"
              >
                <Plus size={14} />
                Agregar
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {formData.facilidades.map((facilidad, index) => (
                <div key={index} className="bg-white rounded-lg p-3 border border-gray-200">
                  <div className="flex gap-2">
                    <div className="flex-1 space-y-1.5">
                      <input
                        type="text"
                        value={facilidad.title}
                        onChange={(e) => {
                          const newFacilidades = [...formData.facilidades];
                          newFacilidades[index].title = e.target.value;
                          setFormData({...formData, facilidades: newFacilidades});
                        }}
                        placeholder="Título"
                        className={inputClass}
                      />
                      <input
                        type="text"
                        value={facilidad.description}
                        onChange={(e) => {
                          const newFacilidades = [...formData.facilidades];
                          newFacilidades[index].description = e.target.value;
                          setFormData({...formData, facilidades: newFacilidades});
                        }}
                        placeholder="Descripción"
                        className={inputClass}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, facilidades: formData.facilidades.filter((_, i) => i !== index)})}
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
