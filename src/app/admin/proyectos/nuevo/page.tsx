"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Image as ImageIcon, X } from "lucide-react";

export default function NuevoProyecto() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    location: "",
    region: "Valparaíso",
    price: "",
    priceRange: "",
    status: "Disponible",
    statusColor: "green",
    promotion: "",
    promotionType: "discount",
    size: "",
    sizeRange: "",
    totalUnits: "",
    availableUnits: "",
    delivery: "Inmediata",
    rolStatus: "Aprobado",
    description: "",
    amenities: [] as string[],
    images: [] as string[],
    destacadoHome: false,
    proximoLanzamiento: false,
    vendido: false
  });

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (auth !== "true") router.push("/admin/login");
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/proyectos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("Proyecto creado exitosamente!");
        router.push("/admin/proyectos");
      } else {
        throw new Error('Error al crear proyecto');
      }
    } catch (error) {
      alert("Error al crear proyecto");
    } finally {
      setLoading(false);
    }
  };

  const amenitiesList = ["Portón", "Caminos", "Agua", "Luz", "Terreno plano", "Sin torres"];

  const toggleAmenity = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/admin/proyectos">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <ArrowLeft size={20} />
              </button>
            </Link>
            <h1 className="text-2xl font-bold">Nuevo Proyecto</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información Básica */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-bold mb-6">Información Básica</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2">Título del Proyecto *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Ej: Mirador de Rinconada"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Ubicación *</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Ej: Rinconada, Los Andes"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Región *</label>
                <select
                  value={formData.region}
                  onChange={(e) => setFormData({...formData, region: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="Valparaíso">Valparaíso</option>
                  <option value="O'Higgins">O'Higgins</option>
                  <option value="Metropolitana">Metropolitana</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Precio Desde *</label>
                <input
                  type="text"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="$34.900.000"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Rango de Precios</label>
                <input
                  type="text"
                  value={formData.priceRange}
                  onChange={(e) => setFormData({...formData, priceRange: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="$34.900.000 - $42.500.000"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2">Descripción *</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Descripción del proyecto..."
                />
              </div>
            </div>
          </div>

          {/* Estado y Promociones */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-bold mb-6">Estado y Promociones</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Estado *</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="Recién lanzado">Recién lanzado</option>
                  <option value="Disponible">Disponible</option>
                  <option value="Últimas unidades">Últimas unidades</option>
                  <option value="Próximamente">Próximamente</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Color de Estado</label>
                <select
                  value={formData.statusColor}
                  onChange={(e) => setFormData({...formData, statusColor: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="blue">Azul</option>
                  <option value="green">Verde</option>
                  <option value="orange">Naranja</option>
                  <option value="purple">Morado</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Promoción (opcional)</label>
                <input
                  type="text"
                  value={formData.promotion}
                  onChange={(e) => setFormData({...formData, promotion: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="15% descuento Septiembre"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Tipo de Promoción</label>
                <select
                  value={formData.promotionType}
                  onChange={(e) => setFormData({...formData, promotionType: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="discount">Descuento</option>
                  <option value="special">Especial</option>
                </select>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-bold mb-4 text-gray-900">📍 Visibilidad en Home</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.destacadoHome}
                    onChange={(e) => setFormData({...formData, destacadoHome: e.target.checked})}
                    className="w-5 h-5 text-primary"
                  />
                  <div>
                    <span className="font-semibold text-gray-900">Mostrar en Proyectos Destacados</span>
                    <p className="text-sm text-gray-600">Aparecerá en la sección principal del Home</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.proximoLanzamiento}
                    onChange={(e) => setFormData({...formData, proximoLanzamiento: e.target.checked})}
                    className="w-5 h-5 text-primary"
                  />
                  <div>
                    <span className="font-semibold text-gray-900">Mostrar en Próximos Lanzamientos</span>
                    <p className="text-sm text-gray-600">Aparecerá en la sección de próximos proyectos</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.vendido}
                    onChange={(e) => setFormData({...formData, vendido: e.target.checked})}
                    className="w-5 h-5 text-primary"
                  />
                  <div>
                    <span className="font-semibold text-gray-900">Marcar como Vendido</span>
                    <p className="text-sm text-gray-600">Aparecerá en la sección de proyectos vendidos</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Detalles del Proyecto */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-bold mb-6">Detalles del Proyecto</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Tamaño *</label>
                <input
                  type="text"
                  required
                  value={formData.size}
                  onChange={(e) => setFormData({...formData, size: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="5.000 m²"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Rango de Tamaños</label>
                <input
                  type="text"
                  value={formData.sizeRange}
                  onChange={(e) => setFormData({...formData, sizeRange: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="5.000 - 7.000 m²"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Total Unidades *</label>
                <input
                  type="number"
                  required
                  value={formData.totalUnits}
                  onChange={(e) => setFormData({...formData, totalUnits: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="45"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Unidades Disponibles *</label>
                <input
                  type="number"
                  required
                  value={formData.availableUnits}
                  onChange={(e) => setFormData({...formData, availableUnits: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="12"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Entrega *</label>
                <input
                  type="text"
                  required
                  value={formData.delivery}
                  onChange={(e) => setFormData({...formData, delivery: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Inmediata"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Estado Rol *</label>
                <select
                  value={formData.rolStatus}
                  onChange={(e) => setFormData({...formData, rolStatus: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="Aprobado">Aprobado</option>
                  <option value="En proceso">En proceso</option>
                </select>
              </div>
            </div>
          </div>

          {/* Amenidades */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-bold mb-6">Amenidades</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {amenitiesList.map((amenity) => (
                <label
                  key={amenity}
                  className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    formData.amenities.includes(amenity)
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.amenities.includes(amenity)}
                    onChange={() => toggleAmenity(amenity)}
                    className="w-5 h-5 text-primary"
                  />
                  <span className="font-medium">{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Botones */}
          <div className="flex gap-4">
            <Link href="/admin/proyectos" className="flex-1">
              <button
                type="button"
                className="w-full px-6 py-3 border-2 border-gray-200 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-primary-dark to-primary text-white font-bold px-6 py-3 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Save size={18} />
              {loading ? "Guardando..." : "Guardar Proyecto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
