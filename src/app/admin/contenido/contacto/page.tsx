"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import EditorLayout, { EditorSection, EditorInput, EditorActions } from "@/components/admin/EditorLayout";
import ImageUpload from "@/components/admin/ImageUpload";

export default function EditarContacto() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    hero: { title: "", subtitle: "", backgroundImage: "" },
    oficina: { direccion: "", telefono: "", email: "", horario: "" },
    redes: { whatsapp: "", facebook: "", instagram: "", linkedin: "" },
    mapa: { lat: 0, lng: 0, zoom: 15 }
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
      setFormData(data.contacto);
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
      allData.contacto = formData;

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
    <EditorLayout title="Editar Contacto" backLink="/admin/contenido">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">

          <EditorSection title="Hero" icon={<span>🎯</span>} highlight>
            <div className="space-y-6">
              <EditorInput label="Título" value={formData.hero.title} onChange={(val) => setFormData({...formData, hero: {...formData.hero, title: val}})} placeholder="Hablemos de tu proyecto" required />
              <EditorInput label="Subtítulo" value={formData.hero.subtitle} onChange={(val) => setFormData({...formData, hero: {...formData.hero, subtitle: val}})} placeholder="Nuestro equipo está listo" required />
              <ImageUpload
                label="Imagen de Fondo *"
                value={formData.hero.backgroundImage}
                onChange={(url) => setFormData({...formData, hero: {...formData.hero, backgroundImage: url}})}
              />
            </div>
          </EditorSection>

          <EditorSection title="Información de Oficina" icon={<span>🏢</span>}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <EditorInput label="Dirección" value={formData.oficina.direccion} onChange={(val) => setFormData({...formData, oficina: {...formData.oficina, direccion: val}})} placeholder="Av. Principal 1234" />
              <EditorInput label="Teléfono" type="tel" value={formData.oficina.telefono} onChange={(val) => setFormData({...formData, oficina: {...formData.oficina, telefono: val}})} placeholder="+56 9 1234 5678" />
              <EditorInput label="Email" type="email" value={formData.oficina.email} onChange={(val) => setFormData({...formData, oficina: {...formData.oficina, email: val}})} placeholder="contacto@ichicureo.cl" />
              <EditorInput label="Horario" value={formData.oficina.horario} onChange={(val) => setFormData({...formData, oficina: {...formData.oficina, horario: val}})} placeholder="Lunes a Viernes 9:00 - 18:00" />
            </div>
          </EditorSection>

          <EditorSection title="Redes Sociales" icon={<span>📱</span>}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <EditorInput label="WhatsApp" value={formData.redes.whatsapp} onChange={(val) => setFormData({...formData, redes: {...formData.redes, whatsapp: val}})} placeholder="+56912345678" />
              <EditorInput label="Facebook" value={formData.redes.facebook} onChange={(val) => setFormData({...formData, redes: {...formData.redes, facebook: val}})} placeholder="inmobiliariachicureo" />
              <EditorInput label="Instagram" value={formData.redes.instagram} onChange={(val) => setFormData({...formData, redes: {...formData.redes, instagram: val}})} placeholder="@ichicureo" />
              <EditorInput label="LinkedIn" value={formData.redes.linkedin} onChange={(val) => setFormData({...formData, redes: {...formData.redes, linkedin: val}})} placeholder="inmobiliaria-chicureo" />
            </div>
          </EditorSection>

          <EditorActions onCancel="/admin/contenido" onSave={() => {}} loading={loading} />
        </form>
      </div>
    </EditorLayout>
  );
}
