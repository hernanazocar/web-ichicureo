"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Settings, Globe, Palette, Mail, Phone, MapPin, Clock, Send, Share2 } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

export default function AdminConfiguracion() {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState({
    sitio: {
      nombre: "Inmobiliaria Chicureo",
      descripcion: "Tu parcela ideal en Chicureo",
      tagline: "Invierte, vive o construye ese proyecto de vida",
      logo: "/logo.png"
    },
    colores: {
      primario: "#2B5329",
      secundario: "#3d7a3a"
    },
    contacto: {
      telefono: "+56 9 1234 5678",
      email: "contacto@ichicureo.cl",
      direccion: "Chicureo, Región Metropolitana",
      horario: "Lunes a Viernes 9:00 - 18:00, Sábados 10:00 - 14:00"
    },
    redes: {
      whatsapp: "+56912345678",
      facebook: "inmobiliariachicureo",
      instagram: "@ichicureo",
      linkedin: "inmobiliaria-chicureo"
    },
    seo: {
      titulo: "Inmobiliaria Chicureo - Parcelas y Terrenos",
      descripcion: "Descubre las mejores parcelas y terrenos en Chicureo. Proyectos exclusivos para vivir, invertir o construir.",
      keywords: "parcelas chicureo, terrenos chicureo, inmobiliaria, proyectos inmobiliarios"
    }
  });

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
      if (data.configuracion) {
        setConfig({
          sitio: data.configuracion.sitio || config.sitio,
          colores: data.configuracion.colores || config.colores,
          contacto: data.configuracion.contacto || config.contacto,
          redes: data.configuracion.redes || config.redes,
          seo: data.configuracion.seo || config.seo
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/contenido');
      const allData = await response.json();
      allData.configuracion = config;

      await fetch('/api/contenido', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(allData)
      });

      alert("¡Configuración actualizada!");
    } catch (error) {
      alert("Error al actualizar");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary bg-white text-gray-900 font-medium text-sm";
  const labelClass = "block text-xs font-bold mb-1.5 text-gray-800";

  if (!isAuth) return null;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Configuración</h1>
              <p className="text-sm text-gray-600 mt-1">Ajustes generales del sitio web</p>
            </div>
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium disabled:opacity-50"
            >
              {loading ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>
        </div>
      </header>

      <div className="p-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Información del Sitio */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <Globe className="text-white" size={16} />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Información del Sitio</h2>
            </div>
            <div className="space-y-3">
              <div>
                <label className={labelClass}>Nombre del Sitio *</label>
                <input
                  type="text"
                  value={config.sitio.nombre}
                  onChange={(e) => setConfig({...config, sitio: {...config.sitio, nombre: e.target.value}})}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Descripción</label>
                <input
                  type="text"
                  value={config.sitio.descripcion}
                  onChange={(e) => setConfig({...config, sitio: {...config.sitio, descripcion: e.target.value}})}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Tagline</label>
                <textarea
                  value={config.sitio.tagline}
                  onChange={(e) => setConfig({...config, sitio: {...config.sitio, tagline: e.target.value}})}
                  rows={2}
                  className={inputClass}
                />
              </div>
              <ImageUpload
                label="Logo del Sitio"
                value={config.sitio.logo}
                onChange={(url) => setConfig({...config, sitio: {...config.sitio, logo: url}})}
              />
            </div>
          </div>

          {/* Colores de Marca */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                <Palette className="text-white" size={16} />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Colores de Marca</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Color Primario</label>
                <div className="flex gap-3 items-center">
                  <input
                    type="color"
                    value={config.colores.primario}
                    onChange={(e) => setConfig({...config, colores: {...config.colores, primario: e.target.value}})}
                    className="w-16 h-10 rounded-lg border border-gray-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={config.colores.primario}
                    onChange={(e) => setConfig({...config, colores: {...config.colores, primario: e.target.value}})}
                    className={inputClass}
                    placeholder="#2B5329"
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>Color Secundario</label>
                <div className="flex gap-3 items-center">
                  <input
                    type="color"
                    value={config.colores.secundario}
                    onChange={(e) => setConfig({...config, colores: {...config.colores, secundario: e.target.value}})}
                    className="w-16 h-10 rounded-lg border border-gray-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={config.colores.secundario}
                    onChange={(e) => setConfig({...config, colores: {...config.colores, secundario: e.target.value}})}
                    className={inputClass}
                    placeholder="#3d7a3a"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Contacto */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <Phone className="text-white" size={16} />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Información de Contacto</h2>
            </div>
            <div className="space-y-3">
              <div>
                <label className={labelClass}>
                  <Phone size={12} className="inline mr-1" />
                  Teléfono
                </label>
                <input
                  type="tel"
                  value={config.contacto.telefono}
                  onChange={(e) => setConfig({...config, contacto: {...config.contacto, telefono: e.target.value}})}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>
                  <Mail size={12} className="inline mr-1" />
                  Email
                </label>
                <input
                  type="email"
                  value={config.contacto.email}
                  onChange={(e) => setConfig({...config, contacto: {...config.contacto, email: e.target.value}})}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>
                  <MapPin size={12} className="inline mr-1" />
                  Dirección
                </label>
                <input
                  type="text"
                  value={config.contacto.direccion}
                  onChange={(e) => setConfig({...config, contacto: {...config.contacto, direccion: e.target.value}})}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>
                  <Clock size={12} className="inline mr-1" />
                  Horario de Atención
                </label>
                <input
                  type="text"
                  value={config.contacto.horario}
                  onChange={(e) => setConfig({...config, contacto: {...config.contacto, horario: e.target.value}})}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Redes Sociales */}
          <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-6 border border-pink-200">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center">
                <Send className="text-white" size={16} />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Redes Sociales</h2>
            </div>
            <div className="space-y-3">
              <div>
                <label className={labelClass}>
                  <Phone size={12} className="inline mr-1" />
                  WhatsApp
                </label>
                <input
                  type="text"
                  value={config.redes.whatsapp}
                  onChange={(e) => setConfig({...config, redes: {...config.redes, whatsapp: e.target.value}})}
                  placeholder="+56912345678"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Facebook</label>
                <input
                  type="text"
                  value={config.redes.facebook}
                  onChange={(e) => setConfig({...config, redes: {...config.redes, facebook: e.target.value}})}
                  placeholder="nombre-usuario"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Instagram</label>
                <input
                  type="text"
                  value={config.redes.instagram}
                  onChange={(e) => setConfig({...config, redes: {...config.redes, instagram: e.target.value}})}
                  placeholder="@usuario"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>LinkedIn</label>
                <input
                  type="text"
                  value={config.redes.linkedin}
                  onChange={(e) => setConfig({...config, redes: {...config.redes, linkedin: e.target.value}})}
                  placeholder="nombre-empresa"
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* SEO */}
          <div className="lg:col-span-2 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-6 border border-amber-200">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center">
                <Settings className="text-white" size={16} />
              </div>
              <h2 className="text-lg font-bold text-gray-900">SEO - Optimización para Buscadores</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Título SEO (60-70 caracteres)</label>
                <input
                  type="text"
                  value={config.seo.titulo}
                  onChange={(e) => setConfig({...config, seo: {...config.seo, titulo: e.target.value}})}
                  maxLength={70}
                  className={inputClass}
                />
                <p className="text-xs text-gray-600 mt-1">{config.seo.titulo.length}/70 caracteres</p>
              </div>
              <div>
                <label className={labelClass}>Keywords (separadas por coma)</label>
                <input
                  type="text"
                  value={config.seo.keywords}
                  onChange={(e) => setConfig({...config, seo: {...config.seo, keywords: e.target.value}})}
                  className={inputClass}
                />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Descripción SEO (150-160 caracteres)</label>
                <textarea
                  value={config.seo.descripcion}
                  onChange={(e) => setConfig({...config, seo: {...config.seo, descripcion: e.target.value}})}
                  maxLength={160}
                  rows={3}
                  className={inputClass}
                />
                <p className="text-xs text-gray-600 mt-1">{config.seo.descripcion.length}/160 caracteres</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
