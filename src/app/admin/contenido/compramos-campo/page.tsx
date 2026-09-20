"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import EditorLayout, { EditorSection, EditorInput, EditorActions } from "@/components/admin/EditorLayout";
import ImageUpload from "@/components/admin/ImageUpload";

export default function EditarCompramosCampo() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    hero: { title: "", subtitle: "", backgroundImage: "" },
    beneficios: [] as Array<{ title: string; description: string }>,
    requisitos: [] as string[]
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
      setFormData(data.compramosCampo);
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
      allData.compramosCampo = formData;

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
    <EditorLayout title="Editar Compramos tu Campo" backLink="/admin/contenido">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">

          <EditorSection title="Hero" icon={<span>🎯</span>} highlight>
            <div className="space-y-6">
              <EditorInput
                label="Título"
                value={formData.hero.title}
                onChange={(val) => setFormData({...formData, hero: {...formData.hero, title: val}})}
                placeholder="¿Tienes un campo que quieres vender?"
                required
              />
              <EditorInput
                label="Subtítulo"
                value={formData.hero.subtitle}
                onChange={(val) => setFormData({...formData, hero: {...formData.hero, subtitle: val}})}
                placeholder="Te lo compramos al mejor precio"
                required
              />
              <ImageUpload
                label="Imagen de Fondo *"
                value={formData.hero.backgroundImage}
                onChange={(url) => setFormData({...formData, hero: {...formData.hero, backgroundImage: url}})}
              />
            </div>
          </EditorSection>

          <EditorSection title="Beneficios" icon={<span>✨</span>}>
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600 font-medium">Beneficios de vender tu campo con nosotros</p>
              <button type="button" onClick={() => setFormData({...formData, beneficios: [...formData.beneficios, {title: "", description: ""}]})} className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-all hover:scale-105">
                <Plus size={18} />Agregar
              </button>
            </div>
            <div className="space-y-3">
              {formData.beneficios.map((beneficio, i) => (
                <div key={i} className="flex gap-4 p-5 border-2 border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-all">
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    <input type="text" value={beneficio.title} onChange={(e) => {const newBeneficios = [...formData.beneficios]; newBeneficios[i].title = e.target.value; setFormData({...formData, beneficios: newBeneficios});}} placeholder="Título" className="px-5 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-900 font-bold hover:border-gray-400 transition-all" />
                    <input type="text" value={beneficio.description} onChange={(e) => {const newBeneficios = [...formData.beneficios]; newBeneficios[i].description = e.target.value; setFormData({...formData, beneficios: newBeneficios});}} placeholder="Descripción" className="px-5 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-900 font-medium hover:border-gray-400 transition-all" />
                  </div>
                  <button type="button" onClick={() => setFormData({...formData, beneficios: formData.beneficios.filter((_, idx) => idx !== i)})} className="p-3 text-red-600 hover:bg-red-100 rounded-lg transition-all hover:scale-110">
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          </EditorSection>

          <EditorActions
            onCancel="/admin/contenido"
            onSave={() => {}}
            loading={loading}
          />
        </form>
      </div>
    </EditorLayout>
  );
}
