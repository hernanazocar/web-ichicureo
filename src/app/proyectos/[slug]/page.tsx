"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  MapPin, ChevronRight, Calendar, DoorOpen, Waypoints, Droplet,
  Lightbulb, Square, RadioTower, Phone, Mail, User, MessageSquare,
  CheckCircle2, Download, Share2, FileText, Map, Maximize2, Eye,
  ChevronLeft, ExternalLink, Navigation, School, ShoppingCart, Building,
  Hospital, Store, Trees, Home, Rocket, FileCheck, Split, HardHat,
  FileSignature, KeyRound
} from "lucide-react";

const projectsData: { [key: string]: any } = {
  "mirador-de-rinconada": {
    title: "Mirador de Rinconada",
    location: "Rinconada, Los Andes",
    region: "Valparaíso",
    price: "$34.900.000",
    priceRange: "$34.900.000 - $42.500.000",
    status: "Recién lanzado",
    promotion: "15% descuento Septiembre",
    size: "5.000 m²",
    sizeRange: "5.000 - 7.000 m²",
    totalUnits: 45,
    availableUnits: 12,
    delivery: "Inmediata",
    rolStatus: "Aprobado",
    description: "Proyecto exclusivo de parcelas ubicado en el corazón de Los Andes, con impresionante vista a la cordillera. Ideal para inversión o construcción de vivienda campestre.",
    logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%232B5329'/%3E%3Ctext x='50' y='62' font-family='Arial,sans-serif' font-size='36' font-weight='bold' fill='white' text-anchor='middle'%3EMR%3C/text%3E%3C/svg%3E",
    heroImage: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&q=80",
    images: [
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&q=80",
      "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=1200&q=80",
      "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=1200&q=80",
      "https://images.unsplash.com/photo-1595209457335-235f23d5e838?w=1200&q=80"
    ],
    amenities: [
      { name: "Portón de acceso", icon: DoorOpen, description: "Acceso controlado" },
      { name: "Caminos estabilizados", icon: Waypoints, description: "Red vial pavimentada" },
      { name: "Agua de riego", icon: Droplet, description: "Derechos garantizados" },
      { name: "Factibilidad eléctrica", icon: Lightbulb, description: "Proyecto aprobado" },
      { name: "Terreno plano", icon: Square, description: "Listo para construir" },
      { name: "Sin torres", icon: RadioTower, description: "Zona libre" }
    ],
    highlights: [
      "Sector de alta plusvalía y crecimiento sostenido",
      "Inversión segura con proyección de valorización",
      "Zona en desarrollo con infraestructura en expansión",
      "Excelente conectividad con principales centros urbanos"
    ],
    nearbyServices: [
      { name: "Colegio San Felipe", icon: School, distance: "2,5 km", time: "5 min" },
      { name: "Supermercado Líder", icon: ShoppingCart, distance: "3 km", time: "6 min" },
      { name: "Municipalidad Los Andes", icon: Building, distance: "4 km", time: "8 min" },
      { name: "Hospital San Juan de Dios", icon: Hospital, distance: "4,5 km", time: "9 min" },
      { name: "Mall Portal Andino", icon: Store, distance: "5 km", time: "10 min" },
      { name: "Parque El Resbalón", icon: Trees, distance: "3,5 km", time: "7 min" }
    ],
    coordinates: { lat: -32.8333, lng: -70.5167 },
    masterPlan: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&q=80",
    brochure: "/brochures/mirador-rinconada.pdf",
    tourVirtual: "https://ichicureo.cl/360/mirador-de-rinconada/",
    timeline: [
      { fase: "Lanzamiento", descripcion: "Apertura oficial del proyecto y venta de unidades", icon: Rocket, estado: "completado" },
      { fase: "Ingreso al SAG", descripcion: "Presentación del proyecto ante el Servicio Agrícola y Ganadero", icon: FileCheck, estado: "completado" },
      { fase: "Subdivisión Aprobada", descripcion: "Aprobación oficial de la subdivisión del terreno", icon: Split, estado: "en-curso" },
      { fase: "Inicio de Obras", descripcion: "Comienzo de la construcción de caminos y urbanización", icon: HardHat, estado: "pendiente" },
      { fase: "Escrituración", descripcion: "Firma y tramitación de escrituras de cada parcela", icon: FileSignature, estado: "pendiente" },
      { fase: "Entrega", descripcion: "Entrega final de las parcelas a sus propietarios", icon: KeyRound, estado: "pendiente" }
    ]
  }
};

export default function ProyectoDetalle() {
  const params = useParams();
  const slug = params.slug as string;
  const project = projectsData[slug] || projectsData["mirador-de-rinconada"];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const percentageSold = Math.round(((project.totalUnits - project.availableUnits) / project.totalUnits) * 100);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero con imagen de fondo */}
      <section className="relative h-[85vh] min-h-[680px] sm:h-[70vh] sm:min-h-[600px] flex items-end">
        {/* Imagen de fondo */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${project.heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
        </div>

        {/* Contenido */}
        <div className="relative z-10 w-full pb-16 pt-28 sm:pt-32">
          <div className="container mx-auto px-6 lg:px-8">
            {/* Logo destacado */}
            {project.logo && (
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 md:w-32 md:h-32 bg-white rounded-2xl shadow-2xl p-3 md:p-4 border-4 border-white/50 backdrop-blur-sm">
                  <img src={project.logo} alt={`Logo ${project.title}`} className="w-full h-full object-contain" />
                </div>
              </div>
            )}

            {/* Badges */}
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-blue-500 text-white text-xs px-3 py-1.5 rounded-full font-bold uppercase backdrop-blur-sm">
                {project.status}
              </span>
              {project.promotion && (
                <span className="bg-red-500 text-white text-xs px-3 py-1.5 rounded-full font-bold backdrop-blur-sm">
                  {project.promotion}
                </span>
              )}
            </div>

            {/* Título */}
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl">
              {project.title}
            </h1>

            {/* Ubicación */}
            <div className="flex items-center gap-2 text-white/90 mb-8">
              <MapPin size={24} className="text-primary drop-shadow-lg" strokeWidth={2.5} />
              <span className="text-xl font-medium drop-shadow-lg">{project.location}</span>
            </div>

            {/* Stats rápidas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="text-xs text-white/70 mb-1">Desde</div>
                <div className="text-2xl font-bold text-white">{project.size}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="text-xs text-white/70 mb-1">Precio</div>
                <div className="text-2xl font-bold text-white">{project.price}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="text-xs text-white/70 mb-1">Disponibles</div>
                <div className="text-2xl font-bold text-white">{project.availableUnits}/{project.totalUnits}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="text-xs text-white/70 mb-1">Entrega</div>
                <div className="text-2xl font-bold text-white">{project.delivery}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Barra de acciones rápidas */}
      <section className="bg-white/95 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-40 shadow-lg">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              {/* Tour 360° */}
              <a
                href={project.tourVirtual}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <Eye size={18} strokeWidth={2.5} />
                <span className="text-sm">Tour 360°</span>
              </a>

              {/* Ver Plano */}
              <button className="group flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-primary hover:text-white hover:shadow-lg hover:scale-105 transition-all duration-300">
                <FileText size={18} strokeWidth={2.5} />
                <span className="text-sm">Ver Plano</span>
              </button>

              {/* Ver Brochure */}
              <button className="group flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-primary hover:text-white hover:shadow-lg hover:scale-105 transition-all duration-300">
                <Eye size={18} strokeWidth={2.5} />
                <span className="text-sm">Ver Brochure</span>
              </button>

              {/* Descargar Plano */}
              <button className="group flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-primary hover:text-white hover:shadow-lg hover:scale-105 transition-all duration-300">
                <Download size={18} strokeWidth={2.5} />
                <span className="text-sm">Descargar Plano</span>
              </button>

              {/* Cómo Llegar */}
              <a
                href={`https://www.google.com/maps?q=${project.coordinates.lat},${project.coordinates.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-primary hover:text-white hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <Navigation size={18} strokeWidth={2.5} />
                <span className="text-sm">Cómo Llegar</span>
              </a>
            </div>

            {/* CTA Principal */}
            <a href="#contacto">
              <button className="bg-gradient-to-r from-primary to-green-600 text-white px-8 py-3 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2">
                <Calendar size={20} strokeWidth={2.5} />
                Agendar Visita
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Descripción y características */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Descripción */}
            <div className="lg:col-span-2 space-y-6">
              {/* Sobre el Proyecto */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-md">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/10 to-blue-500/10 flex items-center justify-center border border-primary/20">
                    <Home size={16} className="text-primary" strokeWidth={2.5} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Sobre el Proyecto</h2>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{project.description}</p>
              </div>

              {/* Características */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500/10 to-green-600/10 flex items-center justify-center border border-green-500/20">
                    <CheckCircle2 size={16} className="text-green-600" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Características</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {project.amenities.map((amenity: any, index: number) => {
                    const Icon = amenity.icon;
                    return (
                      <div key={index} className="group bg-white rounded-xl p-4 border border-gray-200 hover:border-primary hover:shadow-lg transition-all duration-300">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                            <Icon size={18} className="text-primary" strokeWidth={2.5} />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 text-sm mb-0.5">{amenity.name}</h4>
                            <p className="text-xs text-gray-600">{amenity.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Beneficios */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/10 flex items-center justify-center border border-blue-500/20">
                    <CheckCircle2 size={16} className="text-blue-600" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Beneficios</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {project.highlights.map((highlight: string, index: number) => (
                    <div key={index} className="group bg-gradient-to-br from-green-50 to-white rounded-lg p-3 border border-green-200 hover:border-green-500 hover:shadow-md transition-all duration-300">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="text-green-600 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
                        <span className="text-gray-800 font-medium text-xs">{highlight}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card de precio sticky */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border-2 border-primary/20 p-6 shadow-lg sticky top-24">
                <div className="text-sm text-gray-600 uppercase tracking-wider mb-2">Precio desde</div>
                <div className="text-4xl font-bold text-primary mb-2">{project.price}</div>
                <div className="text-sm text-gray-600 mb-8">Rango: {project.priceRange}</div>

                <div className="space-y-4 mb-6">
                  <a href="#contacto">
                    <button className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary-dark transition-colors">
                      Agendar Visita
                    </button>
                  </a>
                  <button className="w-full border-2 border-gray-200 text-gray-700 font-semibold py-3 rounded-lg hover:border-primary hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <Download size={18} />
                    Descargar Brochure
                  </button>
                  <button className="w-full border-2 border-gray-200 text-gray-700 font-semibold py-3 rounded-lg hover:border-primary hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <Map size={18} />
                    Descargar Plano
                  </button>
                  <button className="w-full border-2 border-gray-200 text-gray-700 font-semibold py-3 rounded-lg hover:border-primary hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <Share2 size={18} />
                    Compartir
                  </button>
                </div>

                <div className="pt-6 border-t border-gray-200 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 size={16} className="text-green-500" />
                    <span>Facilidades de pago</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 size={16} className="text-green-500" />
                    <span>Asesoría legal incluida</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ubicación Estratégica */}
      <section className="py-10 bg-gradient-to-br from-gray-50 via-white to-primary/5 relative overflow-hidden">
        {/* Elementos decorativos */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-xl mb-3 shadow-md">
              <MapPin size={20} className="text-white" strokeWidth={2.5} />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Ubicación Estratégica</h2>
            <p className="text-gray-600 text-sm max-w-2xl mx-auto">
              Cerca de todo lo que necesitas para tu día a día
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 max-w-5xl mx-auto">
            {project.nearbyServices?.map((service: any, index: number) => {
              const Icon = service.icon;

              return (
                <div key={index} className="group bg-white rounded-xl p-3 border border-gray-200 hover:border-primary/40 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-9 h-9 flex-shrink-0 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon size={18} className="text-primary" strokeWidth={2.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-base font-bold text-gray-900 leading-tight">{service.distance}</div>
                      <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">{service.time}</div>
                    </div>
                  </div>
                  <h4 className="font-semibold text-gray-700 text-xs leading-tight">{service.name}</h4>
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl shadow-md">
              <CheckCircle2 size={24} className="text-green-600" strokeWidth={2.5} />
              <span className="text-green-800 font-bold text-sm">Conectividad excepcional con todos los servicios</span>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline / Fases del Proyecto */}
      {project.timeline && (
        <section className="py-12 bg-white relative overflow-hidden">
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary to-green-600 rounded-xl mb-4 shadow-lg">
                <Rocket size={24} className="text-white" strokeWidth={2.5} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Fases del Proyecto</h2>
              <p className="text-gray-600 text-sm max-w-2xl mx-auto">
                Sigue el avance del proyecto en cada una de sus etapas
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              {/* Línea de tiempo */}
              <div className="relative">
                {/* Línea conectora (desktop) */}
                <div className="hidden md:block absolute top-8 left-0 right-0 h-1 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-green-500 rounded-full transition-all duration-700"
                    style={{
                      width: `${(project.timeline.filter((t: any) => t.estado === "completado").length / project.timeline.length) * 100}%`
                    }}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-6 gap-0 md:gap-4">
                  {project.timeline.map((fase: any, index: number) => {
                    const Icon = fase.icon;
                    const isCompletado = fase.estado === "completado";
                    const isEnCurso = fase.estado === "en-curso";
                    const isLast = index === project.timeline.length - 1;

                    return (
                      <div key={index} className="relative flex md:flex-col items-start md:items-center gap-4 md:gap-0 text-left md:text-center pb-8 md:pb-0">
                        {/* Línea conectora vertical (mobile) */}
                        {!isLast && (
                          <div className="md:hidden absolute left-8 top-16 bottom-0 w-1 -translate-x-1/2 bg-gray-200 rounded-full">
                            {isCompletado && (
                              <div className="w-full h-full bg-gradient-to-b from-primary to-green-500 rounded-full" />
                            )}
                          </div>
                        )}

                        {/* Ícono / nodo */}
                        <div
                          className={`relative z-10 flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center shadow-lg border-4 border-white transition-transform
                            ${isCompletado ? "bg-gradient-to-br from-primary to-green-600" : ""}
                            ${isEnCurso ? "bg-gradient-to-br from-amber-400 to-orange-500 animate-pulse" : ""}
                            ${!isCompletado && !isEnCurso ? "bg-gray-200" : ""}
                          `}
                        >
                          <Icon
                            size={26}
                            className={isCompletado || isEnCurso ? "text-white" : "text-gray-400"}
                            strokeWidth={2.5}
                          />
                        </div>

                        <div className="md:mt-4">
                          <h4 className={`font-bold text-sm mb-1 ${isCompletado || isEnCurso ? "text-gray-900" : "text-gray-400"}`}>
                            {fase.fase}
                          </h4>
                          <p className={`text-xs leading-snug ${isCompletado || isEnCurso ? "text-gray-600" : "text-gray-400"}`}>
                            {fase.descripcion}
                          </p>
                          {isEnCurso && (
                            <span className="inline-block mt-2 px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-bold uppercase tracking-wide rounded-full">
                              En curso
                            </span>
                          )}
                          {isCompletado && (
                            <span className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wide rounded-full">
                              <CheckCircle2 size={10} /> Completado
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Tour Virtual */}
      {project.tourVirtual && (
        <section className="py-12 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden">
          {/* Elementos decorativos de fondo */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-xl mb-3 border border-primary/20">
                <Eye size={20} className="text-primary" strokeWidth={2.5} />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Tour Virtual 360°</h2>
              <p className="text-gray-600 text-sm max-w-2xl mx-auto">
                Explora cada rincón del proyecto desde la comodidad de tu hogar
              </p>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-3xl p-4 shadow-2xl border border-gray-200/50 backdrop-blur-sm">
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-gray-100">
                  <iframe
                    src={project.tourVirtual}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allowFullScreen
                    allow="xr-spatial-tracking"
                    className="w-full h-full"
                  ></iframe>
                </div>

                {/* Información adicional */}
                <div className="mt-6 flex items-center justify-between px-4">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="font-semibold">Tour interactivo activo</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Maximize2 size={16} className="text-primary" />
                      <span>Pantalla completa disponible</span>
                    </div>
                  </div>
                  <a
                    href={project.tourVirtual}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors font-semibold text-sm"
                  >
                    <ExternalLink size={16} />
                    Abrir en nueva ventana
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Galería */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Galería</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {project.images.map((image: string, index: number) => (
              <div key={index} className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group">
                <div className="w-full h-full bg-cover bg-center transition-transform group-hover:scale-110 duration-300" style={{ backgroundImage: `url(${image})` }}></div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={32} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plano y Ubicación */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Plano Maestro */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Plano Maestro</h3>
              <div className="relative aspect-square rounded-xl overflow-hidden mb-4">
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${project.masterPlan})` }}></div>
              </div>
              <button className="w-full bg-primary/10 text-primary font-semibold py-3 rounded-lg hover:bg-primary/20 transition-colors flex items-center justify-center gap-2">
                <Download size={18} />
                Descargar Plano
              </button>
            </div>

            {/* Mapa */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Ubicación</h3>
              <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-gray-200">
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106476.77!2d${project.coordinates.lng}!3d${project.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDQ5JzU5LjkiUyA3MMKwMzEnMDAuMSJX!5e0!3m2!1sen!2scl!4v1234567890`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
              <a href={`https://www.google.com/maps?q=${project.coordinates.lat},${project.coordinates.lng}`} target="_blank" rel="noopener noreferrer">
                <button className="w-full bg-primary/10 text-primary font-semibold py-3 rounded-lg hover:bg-primary/20 transition-colors flex items-center justify-center gap-2">
                  <Navigation size={18} />
                  Cómo Llegar
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Formulario de contacto */}
      <section id="contacto" className="py-20 bg-gradient-to-br from-blue-50/30 via-white to-gray-50 relative overflow-hidden">
        {/* Elementos decorativos */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-6 lg:px-8 max-w-4xl relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-2xl mb-6 border border-primary/20">
              <MessageSquare size={32} className="text-primary" strokeWidth={2.5} />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">¿Interesado en este proyecto?</h2>
            <p className="text-gray-600 text-lg">Completa el formulario y un asesor se contactará contigo</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl border border-gray-200/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-bold mb-2 text-gray-800">Nombre *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-gray-900 placeholder:text-gray-400 transition-all"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 text-gray-800">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-gray-900 placeholder:text-gray-400 transition-all"
                  placeholder="tu@email.com"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold mb-2 text-gray-800">Teléfono *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-gray-900 placeholder:text-gray-400 transition-all"
                  placeholder="+56 9 1234 5678"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold mb-2 text-gray-800">Mensaje</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-gray-900 placeholder:text-gray-400 min-h-[120px] transition-all resize-none"
                  placeholder="Cuéntanos sobre tu interés..."
                ></textarea>
              </div>
            </div>

            {formSubmitted ? (
              <div className="bg-green-50 border-2 border-green-500 rounded-xl p-4 flex items-center gap-3">
                <CheckCircle2 className="text-green-600" size={24} strokeWidth={2.5} />
                <div>
                  <p className="font-bold text-green-900">¡Mensaje enviado!</p>
                  <p className="text-sm text-green-700">Un asesor se contactará pronto.</p>
                </div>
              </div>
            ) : (
              <button type="submit" className="w-full bg-gradient-to-r from-primary to-blue-600 text-white font-bold py-4 rounded-xl hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                Enviar Consulta
              </button>
            )}
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
