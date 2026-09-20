"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Sparkles, BarChart3, Building2, Rocket, CheckCircle, TrendingUp, DollarSign, Users, Mail } from "lucide-react";
import EditorLayout, { EditorActions } from "@/components/admin/EditorLayout";
import ImageUpload from "@/components/admin/ImageUpload";

export default function EditarHome() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("hero");
  const [todosProyectos, setTodosProyectos] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    hero: {
      titulo: "", subtitulo: "", botonTexto: "", botonLink: "", imagenFondo: "", tagTexto: "",
      textosRotativos: [] as string[],
      cards: [] as Array<{ icono: string; titulo: string; descripcion: string }>
    },
    stats: [] as Array<{ value: string; label: string; suffix: string }>,
    proyectosDestacados: { titulo: "", subtitulo: "", proyectosSeleccionados: [] as number[], mostrarCantidad: 6 },
    proximosProyectos: {
      etiqueta: "", tituloGrande: "", tituloDestacado: "", descripcion: "",
      formulario: { placeholder: "", botonTexto: "", textoConfirmacion: "" },
      cardLateral: {
        etiqueta: "", titulo: "", subtitulo: "", ubicacion: "", imagenFondo: "",
        beneficios: [] as Array<{ icono: string; texto: string }>
      },
      mostrar: true
    },
    proyectosVendidos: { titulo: "", subtitulo: "", descripcion: "", proyectosSeleccionados: [] as number[], mostrar: true },
    inversion: {
      etiqueta: "", titulo: "", subtitulo: "", botonTexto: "", botonLink: "",
      items: [] as Array<{ icono: string; titulo: string; descripcion: string }>
    },
    equipo: {
      etiqueta: "", titulo: "", subtitulo: "", textoBoton: "",
      miembros: [] as Array<{ nombre: string; cargo: string; foto: string }>,
      mostrar: true
    },
    contacto: {
      titulo: "", descripcion: "", imagenFondo: "", textoDecorativo: "", botonTexto: "",
      infoContacto: { telefono: "", email: "", direccion: "" },
      mostrar: true
    }
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
      const [contenidoRes, proyectosRes] = await Promise.all([
        fetch('/api/contenido'),
        fetch('/api/proyectos')
      ]);
      const contenido = await contenidoRes.json();
      const proyectos = await proyectosRes.json();

      if (contenido.home) setFormData(contenido.home);
      setTodosProyectos(proyectos);
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
      allData.home = formData;

      await fetch('/api/contenido', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(allData)
      });

      alert("¡Contenido actualizado exitosamente!");
    } catch (error) {
      alert("Error al actualizar contenido");
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: "hero", name: "Hero & Contenido", icon: Sparkles, color: "blue" },
    { id: "stats", name: "Estadísticas", icon: BarChart3, color: "purple" },
    { id: "proyectos", name: "Proyectos", icon: Building2, color: "green" },
    { id: "secciones", name: "Otras Secciones", icon: Rocket, color: "orange" }
  ];

  const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary bg-white text-gray-900 font-medium text-sm";
  const labelClass = "block text-xs font-bold mb-1.5 text-gray-800";

  return (
    <EditorLayout title="Editar Página Principal" backLink="/admin/contenido">
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 py-4">

        {/* TABS */}
        <div className="bg-white rounded-xl shadow border border-gray-200 mb-4 sticky top-20 z-40">
          <div className="flex border-b border-gray-100">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 font-semibold text-sm transition-all relative ${activeTab === tab.id ? 'text-primary bg-primary/5' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}>
                  <Icon size={18} strokeWidth={2.5} />
                  <span>{tab.name}</span>
                  {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-dark to-primary"></div>}
                </button>
              );
            })}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* TAB: HERO */}
          {activeTab === "hero" && (
            <div className="space-y-3 animate-fadeIn">

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 bg-blue-500 rounded-lg flex items-center justify-center"><Sparkles className="text-white" size={14} /></div>
                  <div><h2 className="text-base font-bold text-gray-900">Hero Principal</h2></div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="col-span-2"><label className={labelClass}>Título *</label><input type="text" value={formData.hero.titulo} onChange={(e) => setFormData({...formData, hero: {...formData.hero, titulo: e.target.value}})} className={inputClass} required /></div>
                  <div className="col-span-2"><label className={labelClass}>Subtítulo</label><textarea value={formData.hero.subtitulo} onChange={(e) => setFormData({...formData, hero: {...formData.hero, subtitulo: e.target.value}})} rows={2} className={inputClass} /></div>
                  <div><label className={labelClass}>Tag</label><input type="text" value={formData.hero.tagTexto} onChange={(e) => setFormData({...formData, hero: {...formData.hero, tagTexto: e.target.value}})} className={inputClass} /></div>
                  <div><label className={labelClass}>Botón</label><input type="text" value={formData.hero.botonTexto} onChange={(e) => setFormData({...formData, hero: {...formData.hero, botonTexto: e.target.value}})} className={inputClass} /></div>
                  <div className="col-span-2">
                    <ImageUpload
                      label="Imagen de Fondo"
                      value={formData.hero.imagenFondo}
                      onChange={(url) => setFormData({...formData, hero: {...formData.hero, imagenFondo: url}})}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-bold">Textos Rotativos</h3>
                  <button type="button" onClick={() => setFormData({...formData, hero: {...formData.hero, textosRotativos: [...formData.hero.textosRotativos, ""]}})} className="px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded hover:bg-blue-700"><Plus size={14} /></button>
                </div>
                <div className="space-y-2">
                  {formData.hero.textosRotativos.map((texto, i) => (
                    <div key={i} className="flex gap-2">
                      <input type="text" value={texto} onChange={(e) => {const newTextos = [...formData.hero.textosRotativos]; newTextos[i] = e.target.value; setFormData({...formData, hero: {...formData.hero, textosRotativos: newTextos}});}} className={inputClass} />
                      <button type="button" onClick={() => setFormData({...formData, hero: {...formData.hero, textosRotativos: formData.hero.textosRotativos.filter((_, idx) => idx !== i)}})} className="p-2 text-red-600 hover:bg-red-100 rounded"><Trash2 size={16} /></button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-bold">Cards Hero</h3>
                  <button type="button" onClick={() => setFormData({...formData, hero: {...formData.hero, cards: [...formData.hero.cards, {icono: "", titulo: "", descripcion: ""}]}})} className="px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded hover:bg-blue-700"><Plus size={14} /></button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {formData.hero.cards.map((card, i) => (
                    <div key={i} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <div className="flex gap-2">
                        <div className="flex-1 space-y-2">
                          <input type="text" value={card.icono} onChange={(e) => {const newCards = [...formData.hero.cards]; newCards[i].icono = e.target.value; setFormData({...formData, hero: {...formData.hero, cards: newCards}});}} placeholder="Icono" className={inputClass} />
                          <input type="text" value={card.titulo} onChange={(e) => {const newCards = [...formData.hero.cards]; newCards[i].titulo = e.target.value; setFormData({...formData, hero: {...formData.hero, cards: newCards}});}} placeholder="Título" className={inputClass} />
                          <input type="text" value={card.descripcion} onChange={(e) => {const newCards = [...formData.hero.cards]; newCards[i].descripcion = e.target.value; setFormData({...formData, hero: {...formData.hero, cards: newCards}});}} placeholder="Descripción" className={inputClass} />
                        </div>
                        <button type="button" onClick={() => setFormData({...formData, hero: {...formData.hero, cards: formData.hero.cards.filter((_, idx) => idx !== i)}})} className="p-2 text-red-600 hover:bg-red-100 rounded h-fit"><Trash2 size={16} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: STATS */}
          {activeTab === "stats" && (
            <div className="animate-fadeIn">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-purple-500 rounded-lg flex items-center justify-center"><BarChart3 className="text-white" size={14} /></div>
                    <h2 className="text-base font-bold">Estadísticas</h2>
                  </div>
                  <button type="button" onClick={() => setFormData({...formData, stats: [...formData.stats, {value: "", label: "", suffix: ""}]})} className="px-3 py-1.5 bg-purple-600 text-white text-xs font-bold rounded hover:bg-purple-700"><Plus size={14} /> Agregar</button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {formData.stats.map((stat, i) => (
                    <div key={i} className="bg-white rounded-lg p-3 border border-gray-200">
                      <div className="flex gap-2">
                        <div className="flex-1 space-y-2">
                          <input type="text" value={stat.value} onChange={(e) => {const newStats = [...formData.stats]; newStats[i].value = e.target.value; setFormData({...formData, stats: newStats});}} placeholder="26" className={inputClass} />
                          <input type="text" value={stat.label} onChange={(e) => {const newStats = [...formData.stats]; newStats[i].label = e.target.value; setFormData({...formData, stats: newStats});}} placeholder="Proyectos" className={inputClass} />
                          <input type="text" value={stat.suffix} onChange={(e) => {const newStats = [...formData.stats]; newStats[i].suffix = e.target.value; setFormData({...formData, stats: newStats});}} placeholder="+" className={inputClass} />
                        </div>
                        <button type="button" onClick={() => setFormData({...formData, stats: formData.stats.filter((_, idx) => idx !== i)})} className="p-2 text-red-600 hover:bg-red-100 rounded h-fit"><Trash2 size={16} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: PROYECTOS */}
          {activeTab === "proyectos" && (
            <div className="space-y-3 animate-fadeIn">

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 bg-green-600 rounded-lg flex items-center justify-center"><Building2 className="text-white" size={14} /></div>
                  <h2 className="text-base font-bold">Proyectos Destacados</h2>
                </div>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <input type="text" value={formData.proyectosDestacados.titulo} onChange={(e) => setFormData({...formData, proyectosDestacados: {...formData.proyectosDestacados, titulo: e.target.value}})} placeholder="Título" className={inputClass} />
                    <input type="text" value={formData.proyectosDestacados.subtitulo} onChange={(e) => setFormData({...formData, proyectosDestacados: {...formData.proyectosDestacados, subtitulo: e.target.value}})} placeholder="Subtítulo" className={inputClass} />
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-green-300">
                    <h3 className="text-xs font-bold mb-2 flex items-center gap-1"><CheckCircle size={14} className="text-green-600" /> Seleccionar ({formData.proyectosDestacados.proyectosSeleccionados.length})</h3>
                    <div className="space-y-1.5 max-h-60 overflow-y-auto">
                      {todosProyectos.map((proyecto) => (
                        <label key={proyecto.id} className="flex items-center gap-2 p-2 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer hover:bg-green-50 hover:border-green-300 transition-all">
                          <input type="checkbox" checked={formData.proyectosDestacados.proyectosSeleccionados.includes(proyecto.id)} onChange={(e) => {
                            const newSel = e.target.checked ? [...formData.proyectosDestacados.proyectosSeleccionados, proyecto.id] : formData.proyectosDestacados.proyectosSeleccionados.filter(id => id !== proyecto.id);
                            setFormData({...formData, proyectosDestacados: {...formData.proyectosDestacados, proyectosSeleccionados: newSel}});
                          }} className="w-4 h-4" />
                          <div className="flex-1">
                            <span className="font-bold text-gray-900 block text-sm">{proyecto.title}</span>
                            <p className="text-xs text-gray-600">{proyecto.location} • {proyecto.price}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 bg-orange-600 rounded-lg flex items-center justify-center"><TrendingUp className="text-white" size={14} /></div>
                  <h2 className="text-base font-bold">Proyectos Vendidos</h2>
                </div>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <input type="text" value={formData.proyectosVendidos.titulo} onChange={(e) => setFormData({...formData, proyectosVendidos: {...formData.proyectosVendidos, titulo: e.target.value}})} placeholder="Título" className={inputClass} />
                    <input type="text" value={formData.proyectosVendidos.subtitulo} onChange={(e) => setFormData({...formData, proyectosVendidos: {...formData.proyectosVendidos, subtitulo: e.target.value}})} placeholder="Subtítulo" className={inputClass} />
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-orange-300">
                    <h3 className="text-xs font-bold mb-2 flex items-center gap-1"><CheckCircle size={14} className="text-orange-600" /> Seleccionar ({formData.proyectosVendidos.proyectosSeleccionados.length})</h3>
                    <div className="space-y-1.5 max-h-60 overflow-y-auto">
                      {todosProyectos.map((proyecto) => (
                        <label key={proyecto.id} className="flex items-center gap-2 p-2 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer hover:bg-orange-50 hover:border-orange-300 transition-all">
                          <input type="checkbox" checked={formData.proyectosVendidos.proyectosSeleccionados.includes(proyecto.id)} onChange={(e) => {
                            const newSel = e.target.checked ? [...formData.proyectosVendidos.proyectosSeleccionados, proyecto.id] : formData.proyectosVendidos.proyectosSeleccionados.filter(id => id !== proyecto.id);
                            setFormData({...formData, proyectosVendidos: {...formData.proyectosVendidos, proyectosSeleccionados: newSel}});
                          }} className="w-4 h-4" />
                          <div className="flex-1">
                            <span className="font-bold text-gray-900 block text-sm">{proyecto.title}</span>
                            <p className="text-xs text-gray-600">{proyecto.location} • {proyecto.price}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: OTRAS SECCIONES */}
          {activeTab === "secciones" && (
            <div className="space-y-3 animate-fadeIn">

              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-4 border border-indigo-200">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center"><Rocket className="text-white" size={14} /></div>
                  <h2 className="text-base font-bold">Próximos Lanzamientos</h2>
                </div>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <input type="text" value={formData.proximosProyectos.etiqueta} onChange={(e) => setFormData({...formData, proximosProyectos: {...formData.proximosProyectos, etiqueta: e.target.value}})} placeholder="Etiqueta" className={inputClass} />
                    <input type="text" value={formData.proximosProyectos.tituloGrande} onChange={(e) => setFormData({...formData, proximosProyectos: {...formData.proximosProyectos, tituloGrande: e.target.value}})} placeholder="Título grande" className={inputClass} />
                  </div>
                  <input type="text" value={formData.proximosProyectos.tituloDestacado} onChange={(e) => setFormData({...formData, proximosProyectos: {...formData.proximosProyectos, tituloDestacado: e.target.value}})} placeholder="Título destacado" className={inputClass} />
                  <textarea value={formData.proximosProyectos.descripcion} onChange={(e) => setFormData({...formData, proximosProyectos: {...formData.proximosProyectos, descripcion: e.target.value}})} rows={2} placeholder="Descripción" className={inputClass} />

                  <div className="bg-white rounded-lg p-3 border border-indigo-300">
                    <h3 className="text-xs font-bold mb-2">Formulario</h3>
                    <div className="space-y-2">
                      <input type="text" value={formData.proximosProyectos.formulario.placeholder} onChange={(e) => setFormData({...formData, proximosProyectos: {...formData.proximosProyectos, formulario: {...formData.proximosProyectos.formulario, placeholder: e.target.value}}})} placeholder="Placeholder" className={inputClass} />
                      <input type="text" value={formData.proximosProyectos.formulario.botonTexto} onChange={(e) => setFormData({...formData, proximosProyectos: {...formData.proximosProyectos, formulario: {...formData.proximosProyectos.formulario, botonTexto: e.target.value}}})} placeholder="Botón" className={inputClass} />
                      <input type="text" value={formData.proximosProyectos.formulario.textoConfirmacion} onChange={(e) => setFormData({...formData, proximosProyectos: {...formData.proximosProyectos, formulario: {...formData.proximosProyectos.formulario, textoConfirmacion: e.target.value}}})} placeholder="Confirmación" className={inputClass} />
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-3 border border-indigo-300">
                    <h3 className="text-xs font-bold mb-2">Card Lateral</h3>
                    <div className="space-y-2 mb-2">
                      <input type="text" value={formData.proximosProyectos.cardLateral.etiqueta} onChange={(e) => setFormData({...formData, proximosProyectos: {...formData.proximosProyectos, cardLateral: {...formData.proximosProyectos.cardLateral, etiqueta: e.target.value}}})} placeholder="Etiqueta" className={inputClass} />
                      <div className="grid grid-cols-2 gap-2">
                        <input type="text" value={formData.proximosProyectos.cardLateral.titulo} onChange={(e) => setFormData({...formData, proximosProyectos: {...formData.proximosProyectos, cardLateral: {...formData.proximosProyectos.cardLateral, titulo: e.target.value}}})} placeholder="Título" className={inputClass} />
                        <input type="text" value={formData.proximosProyectos.cardLateral.subtitulo} onChange={(e) => setFormData({...formData, proximosProyectos: {...formData.proximosProyectos, cardLateral: {...formData.proximosProyectos.cardLateral, subtitulo: e.target.value}}})} placeholder="Subtítulo" className={inputClass} />
                      </div>
                      <input type="text" value={formData.proximosProyectos.cardLateral.ubicacion} onChange={(e) => setFormData({...formData, proximosProyectos: {...formData.proximosProyectos, cardLateral: {...formData.proximosProyectos.cardLateral, ubicacion: e.target.value}}})} placeholder="Ubicación" className={inputClass} />
                      <ImageUpload
                        label="Imagen de Fondo"
                        value={formData.proximosProyectos.cardLateral.imagenFondo}
                        onChange={(url) => setFormData({...formData, proximosProyectos: {...formData.proximosProyectos, cardLateral: {...formData.proximosProyectos.cardLateral, imagenFondo: url}}})}
                      />
                    </div>
                    <div className="flex justify-between items-center mb-1.5">
                      <h4 className="text-xs font-bold">Beneficios</h4>
                      <button type="button" onClick={() => setFormData({...formData, proximosProyectos: {...formData.proximosProyectos, cardLateral: {...formData.proximosProyectos.cardLateral, beneficios: [...formData.proximosProyectos.cardLateral.beneficios, {icono: "", texto: ""}]}}})} className="px-2 py-1 bg-indigo-600 text-white text-xs rounded"><Plus size={12} /></button>
                    </div>
                    <div className="space-y-1.5">
                      {formData.proximosProyectos.cardLateral.beneficios.map((beneficio, i) => (
                        <div key={i} className="flex gap-2">
                          <input type="text" value={beneficio.icono} onChange={(e) => {const newBeneficios = [...formData.proximosProyectos.cardLateral.beneficios]; newBeneficios[i].icono = e.target.value; setFormData({...formData, proximosProyectos: {...formData.proximosProyectos, cardLateral: {...formData.proximosProyectos.cardLateral, beneficios: newBeneficios}}});}} placeholder="Icono" className="w-20 px-3 py-1.5 border border-gray-300 rounded bg-white text-gray-900 text-sm" />
                          <input type="text" value={beneficio.texto} onChange={(e) => {const newBeneficios = [...formData.proximosProyectos.cardLateral.beneficios]; newBeneficios[i].texto = e.target.value; setFormData({...formData, proximosProyectos: {...formData.proximosProyectos, cardLateral: {...formData.proximosProyectos.cardLateral, beneficios: newBeneficios}}});}} placeholder="Texto" className="flex-1 px-3 py-1.5 border border-gray-300 rounded bg-white text-gray-900 text-sm" />
                          <button type="button" onClick={() => setFormData({...formData, proximosProyectos: {...formData.proximosProyectos, cardLateral: {...formData.proximosProyectos.cardLateral, beneficios: formData.proximosProyectos.cardLateral.beneficios.filter((_, idx) => idx !== i)}}})} className="p-1.5 text-red-600 hover:bg-red-100 rounded"><Trash2 size={14} /></button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-4 border border-teal-200">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 bg-teal-600 rounded-lg flex items-center justify-center"><DollarSign className="text-white" size={14} /></div>
                  <h2 className="text-base font-bold">Inversión</h2>
                </div>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <input type="text" value={formData.inversion.etiqueta} onChange={(e) => setFormData({...formData, inversion: {...formData.inversion, etiqueta: e.target.value}})} placeholder="Etiqueta" className={inputClass} />
                    <input type="text" value={formData.inversion.titulo} onChange={(e) => setFormData({...formData, inversion: {...formData.inversion, titulo: e.target.value}})} placeholder="Título" className={inputClass} />
                  </div>
                  <input type="text" value={formData.inversion.subtitulo} onChange={(e) => setFormData({...formData, inversion: {...formData.inversion, subtitulo: e.target.value}})} placeholder="Subtítulo" className={inputClass} />
                  <div className="grid grid-cols-2 gap-2">
                    <input type="text" value={formData.inversion.botonTexto} onChange={(e) => setFormData({...formData, inversion: {...formData.inversion, botonTexto: e.target.value}})} placeholder="Botón" className={inputClass} />
                    <input type="text" value={formData.inversion.botonLink} onChange={(e) => setFormData({...formData, inversion: {...formData.inversion, botonLink: e.target.value}})} placeholder="Link" className={inputClass} />
                  </div>

                  <div className="bg-white rounded-lg p-3 border border-teal-300">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xs font-bold">Items</h3>
                      <button type="button" onClick={() => setFormData({...formData, inversion: {...formData.inversion, items: [...formData.inversion.items, {icono: "", titulo: "", descripcion: ""}]}})} className="px-2 py-1 bg-teal-600 text-white text-xs rounded"><Plus size={12} /></button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {formData.inversion.items.map((item, i) => (
                        <div key={i} className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                          <div className="flex gap-2">
                            <div className="flex-1 space-y-1.5">
                              <input type="text" value={item.icono} onChange={(e) => {const newItems = [...formData.inversion.items]; newItems[i].icono = e.target.value; setFormData({...formData, inversion: {...formData.inversion, items: newItems}});}} placeholder="Icono" className={inputClass} />
                              <input type="text" value={item.titulo} onChange={(e) => {const newItems = [...formData.inversion.items]; newItems[i].titulo = e.target.value; setFormData({...formData, inversion: {...formData.inversion, items: newItems}});}} placeholder="Título" className={inputClass} />
                              <input type="text" value={item.descripcion} onChange={(e) => {const newItems = [...formData.inversion.items]; newItems[i].descripcion = e.target.value; setFormData({...formData, inversion: {...formData.inversion, items: newItems}});}} placeholder="Descripción" className={inputClass} />
                            </div>
                            <button type="button" onClick={() => setFormData({...formData, inversion: {...formData.inversion, items: formData.inversion.items.filter((_, idx) => idx !== i)}})} className="p-1.5 text-red-600 hover:bg-red-100 rounded h-fit"><Trash2 size={14} /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-4 border border-amber-200">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 bg-amber-600 rounded-lg flex items-center justify-center"><Users className="text-white" size={14} /></div>
                  <h2 className="text-base font-bold">Equipo</h2>
                </div>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <input type="text" value={formData.equipo.etiqueta} onChange={(e) => setFormData({...formData, equipo: {...formData.equipo, etiqueta: e.target.value}})} placeholder="Etiqueta" className={inputClass} />
                    <input type="text" value={formData.equipo.titulo} onChange={(e) => setFormData({...formData, equipo: {...formData.equipo, titulo: e.target.value}})} placeholder="Título" className={inputClass} />
                  </div>
                  <input type="text" value={formData.equipo.subtitulo} onChange={(e) => setFormData({...formData, equipo: {...formData.equipo, subtitulo: e.target.value}})} placeholder="Subtítulo" className={inputClass} />
                  <input type="text" value={formData.equipo.textoBoton} onChange={(e) => setFormData({...formData, equipo: {...formData.equipo, textoBoton: e.target.value}})} placeholder="Botón" className={inputClass} />

                  <div className="bg-white rounded-lg p-3 border border-amber-300">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xs font-bold">Miembros ({formData.equipo.miembros.length})</h3>
                      <button type="button" onClick={() => setFormData({...formData, equipo: {...formData.equipo, miembros: [...formData.equipo.miembros, {nombre: "", cargo: "", foto: ""}]}})} className="px-2 py-1 bg-amber-600 text-white text-xs rounded"><Plus size={12} /></button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {formData.equipo.miembros.map((miembro, i) => (
                        <div key={i} className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                          <div className="flex gap-2">
                            <div className="flex-1 space-y-1.5">
                              <input type="text" value={miembro.nombre} onChange={(e) => {const newMiembros = [...formData.equipo.miembros]; newMiembros[i].nombre = e.target.value; setFormData({...formData, equipo: {...formData.equipo, miembros: newMiembros}});}} placeholder="Nombre" className={inputClass} />
                              <input type="text" value={miembro.cargo} onChange={(e) => {const newMiembros = [...formData.equipo.miembros]; newMiembros[i].cargo = e.target.value; setFormData({...formData, equipo: {...formData.equipo, miembros: newMiembros}});}} placeholder="Cargo" className={inputClass} />
                              <ImageUpload
                                label="Foto (opcional)"
                                value={miembro.foto}
                                onChange={(url) => {const newMiembros = [...formData.equipo.miembros]; newMiembros[i].foto = url; setFormData({...formData, equipo: {...formData.equipo, miembros: newMiembros}});}}
                              />
                            </div>
                            <button type="button" onClick={() => setFormData({...formData, equipo: {...formData.equipo, miembros: formData.equipo.miembros.filter((_, idx) => idx !== i)}})} className="p-1.5 text-red-600 hover:bg-red-100 rounded h-fit"><Trash2 size={14} /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-rose-50 to-rose-100 rounded-lg p-4 border border-rose-200">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 bg-rose-600 rounded-lg flex items-center justify-center"><Mail className="text-white" size={14} /></div>
                  <h2 className="text-base font-bold">Contacto</h2>
                </div>
                <div className="space-y-2">
                  <div><label className={labelClass}>Título</label><input type="text" value={formData.contacto.titulo} onChange={(e) => setFormData({...formData, contacto: {...formData.contacto, titulo: e.target.value}})} className={inputClass} /></div>
                  <div><label className={labelClass}>Descripción</label><textarea value={formData.contacto.descripcion} onChange={(e) => setFormData({...formData, contacto: {...formData.contacto, descripcion: e.target.value}})} rows={2} className={inputClass} /></div>
                  <div>
                    <ImageUpload
                      label="Imagen de Fondo"
                      value={formData.contacto.imagenFondo}
                      onChange={(url) => setFormData({...formData, contacto: {...formData.contacto, imagenFondo: url}})}
                    />
                  </div>
                  <div><label className={labelClass}>Texto Decorativo (Enter = salto de línea)</label><textarea value={formData.contacto.textoDecorativo} onChange={(e) => setFormData({...formData, contacto: {...formData.contacto, textoDecorativo: e.target.value}})} rows={3} className={inputClass} /></div>
                  <div><label className={labelClass}>Botón</label><input type="text" value={formData.contacto.botonTexto} onChange={(e) => setFormData({...formData, contacto: {...formData.contacto, botonTexto: e.target.value}})} className={inputClass} /></div>

                  <div className="bg-white rounded-lg p-3 border border-rose-300">
                    <h3 className="text-xs font-bold mb-2">Info Contacto</h3>
                    <div className="space-y-2">
                      <input type="tel" value={formData.contacto.infoContacto.telefono} onChange={(e) => setFormData({...formData, contacto: {...formData.contacto, infoContacto: {...formData.contacto.infoContacto, telefono: e.target.value}}})} placeholder="Teléfono" className={inputClass} />
                      <input type="email" value={formData.contacto.infoContacto.email} onChange={(e) => setFormData({...formData, contacto: {...formData.contacto, infoContacto: {...formData.contacto.infoContacto, email: e.target.value}}})} placeholder="Email" className={inputClass} />
                      <input type="text" value={formData.contacto.infoContacto.direccion} onChange={(e) => setFormData({...formData, contacto: {...formData.contacto, infoContacto: {...formData.contacto.infoContacto, direccion: e.target.value}}})} placeholder="Dirección" className={inputClass} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <EditorActions onCancel="/admin/contenido" onSave={() => {}} loading={loading} saveText="Guardar Cambios" />
        </form>
      </div>
    </EditorLayout>
  );
}
