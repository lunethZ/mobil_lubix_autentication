import { useState } from 'react';
import NavbarEmpresa from '../components/navbar-empresa';

// INTERFACES 

//==================================

interface Comentario {
  id: number;
  usuario: string;
  fecha: string;
  calificacion: number;
  texto: string;
}

interface Estadisticas {
  ventasMensuales: number[];
  unidadesVendidas: number;
  ingresosTotales: number;
  vistasUnicas: number;
}

interface Producto {
  id: number;
  nombre: string;
  sku: string;
  precio: number;
  stock: number;
  imagen: string;
  stats: Estadisticas;
  calificacion: number;
  comentarios: Comentario[];
}

// ==========================================

// 2. DATOS DE LAS IMAGENES

const PRODUCTOS_DATA: Producto[] = [
  {
    id: 1,
    nombre: "Laptop Pro 15\"",
    sku: "LAP-PRO-01",
    precio: 3330100, // $3.330.100 
    stock: 15,
    imagen: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60",
    stats: {
      ventasMensuales: [45, 52, 49, 62],
      unidadesVendidas: 208,
      ingresosTotales: 692660800, 
      vistasUnicas: 1420
    },
    calificacion: 4.8,
    comentarios: [
      { id: 101, usuario: "Carlos Mendoza", fecha: "2026-06-15", calificacion: 5, texto: "Excelente rendimiento para desarrollo de software. La pantalla es increíble." },
      { id: 102, usuario: "Ana María Silva", fecha: "2026-06-10", calificacion: 4, texto: "Muy rápida, aunque calienta un poco cuando compilo proyectos grandes." }
    ]
  },
  {
    id: 2,
    nombre: "Teclado Mecánico RGB",
    sku: "TEC-MEC-02",
    precio: 350000, // $350.000 COP
    stock: 45,
    imagen: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500&auto=format&fit=crop&q=60",
    stats: {
      ventasMensuales: [80, 95, 110, 125],
      unidadesVendidas: 410,
      ingresosTotales: 143500000,
      vistasUnicas: 2900
    },
    calificacion: 4.5,
    comentarios: [
      { id: 201, usuario: "David R.", fecha: "2026-06-28", calificacion: 5, texto: "Los switches son muy suaves y el patrón RGB se ve genial en el setup." },
      { id: 202, usuario: "Laura Gómez", fecha: "2026-06-22", calificacion: 4, texto: "Muy buen teclado por el precio, se siente robusto." }
    ]
  },
  {
    id: 3,
    nombre: "Mouse Ergonómico Inalámbrico",
    sku: "MOU-ERG-03",
    precio: 199900, // $199.900 COP
    stock: 8,
    imagen: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=60",
    stats: {
      ventasMensuales: [120, 140, 135, 150],
      unidadesVendidas: 545,
      ingresosTotales: 108945500,
      vistasUnicas: 3100
    },
    calificacion: 4.2,
    comentarios: [
      { id: 301, usuario: "Juan Pablo", fecha: "2026-06-18", calificacion: 4, texto: "Me ayudó mucho con el dolor de muñeca. La batería dura semanas." },
      { id: 302, usuario: "Sergio T.", fecha: "2026-05-30", calificacion: 3, texto: "Es cómodo pero los materiales se sienten muy plásticos." }
    ]
  }
];

// Helper para formatear en moneda colombiana limpia (sin centavos)
const formatCOP = (valor: number) => {
  return valor.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  });
};


// 3. COMPONENTE PRINCIPAL

export default function ProductosPage() {
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);
  const [busqueda, setBusqueda] = useState<string>("");

  const productosFiltrados = PRODUCTOS_DATA.filter(p => 
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
    p.sku.toLowerCase().includes(busqueda.toLowerCase())
  );

  // VISTA A: DETALLE INDIVIDUAL (ESTADÍSTICAS Y COMENTARIOS)
  if (productoSeleccionado) {
    const p = productoSeleccionado;
    return (
      <>
        <NavbarEmpresa />
        <div className="p-6 bg-gray-50 text-gray-900 dark:bg-[#030712] dark:text-slate-100 min-h-screen">
          {/* Botón de Regresar */}
          <button 
            onClick={() => setProductoSeleccionado(null)}
            className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-2 mb-6 text-sm transition-colors cursor-pointer"
          >
            ← Volver al listado de productos
          </button>

          {/* Encabezado del Producto */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 dark:bg-[#1f2937] dark:border-slate-700 flex flex-col md:flex-row gap-6 mb-6">
            <img src={p.imagen} alt={p.nombre} className="w-full md:w-48 h-48 object-cover rounded-lg" />
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <span className="text-xs bg-indigo-950 text-indigo-300 px-2 py-1 rounded font-mono font-semibold border border-indigo-800">{p.sku}</span>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{p.nombre}</h2>
                <p className="text-xl font-semibold text-emerald-400 mt-1">{formatCOP(p.precio)}</p>
              </div>
              <div className="flex items-center gap-4 mt-4 md:mt-0 pt-4 border-t border-slate-700">
                <div className="text-sm">
                  <span className="text-gray-500 dark:text-slate-400">Stock actual:</span>{" "}
                  <span className="font-semibold text-gray-700 dark:text-slate-200">{p.stock} unidades</span>
                </div>
                <div className="text-sm flex items-center gap-1 bg-amber-950/40 px-2 py-1 rounded text-amber-400 font-medium border border-amber-900/50">
                  ⭐ {p.calificacion} / 5.0
                </div>
              </div>
            </div>
          </div>

          {/* Módulos de Analíticas */}
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Estadísticas de Rendimiento</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 dark:bg-[#1f2937] dark:border-slate-700">
              <span className="text-xs text-gray-500 dark:text-slate-400 block uppercase font-medium">Unidades Vendidas</span>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">{p.stats.unidadesVendidas} uds</span>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 dark:bg-[#1f2937] dark:border-slate-700">
              <span className="text-xs text-gray-500 dark:text-slate-400 block uppercase font-medium">Ingresos Totales</span>
              <span className="text-2xl font-bold text-emerald-400">{formatCOP(p.stats.ingresosTotales)}</span>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 dark:bg-[#1f2937] dark:border-slate-700">
              <span className="text-xs text-gray-500 dark:text-slate-400 block uppercase font-medium">Vistas de la página</span>
              <span className="text-2xl font-bold text-blue-400">{p.stats.vistasUnicas} visitas</span>
            </div>
          </div>

          {/* Gráfico de Barras de Tendencia */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 dark:bg-[#1f2937] dark:border-slate-700 mb-8">
            <h4 className="text-sm font-semibold text-gray-600 dark:text-slate-300 mb-4">Historial de Ventas (Últimos 4 meses)</h4>
            <div className="flex items-end justify-between h-32 pt-4 px-4 border-b border-l border-gray-300 dark:border-slate-600">
              {p.stats.ventasMensuales.map((ventas, index) => (
                <div key={index} className="flex flex-col items-center w-1/5 group">
                  <span className="text-xs font-semibold text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity mb-1">{ventas}</span>
                  <div 
                    style={{ height: `${(ventas / 160) * 100}%` }} 
                    className="w-full bg-indigo-600 rounded-t hover:bg-indigo-500 transition-all cursor-pointer"
                  ></div>
                  <span className="text-xs text-gray-500 dark:text-slate-400 mt-2">Mes {index + 1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Panel de Reseñas de Clientes */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 dark:bg-[#1f2937] dark:border-slate-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Comentarios y Calificaciones</h3>
            <div className="space-y-4">
              {p.comentarios.map((c) => (
                <div key={c.id} className="p-4 bg-gray-100 rounded-lg border border-gray-200 dark:bg-[#111827] dark:border-slate-700">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h5 className="text-sm font-semibold text-gray-700 dark:text-slate-200">{c.usuario}</h5>
                      <span className="text-[11px] text-gray-500 dark:text-slate-400">{c.fecha}</span>
                    </div>
                    <div className="text-amber-400 text-xs font-bold bg-[#1f2937] px-2 py-0.5 rounded shadow-sm border border-gray-300 dark:border-slate-600">
                      {"★".repeat(c.calificacion)}{"☆".repeat(5 - c.calificacion)}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-slate-300 italic">"{c.texto}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  // VISTA B: LISTADO COMPACTO DE PRODUCTOS
  return (
    <>
      <NavbarEmpresa />
      <div className="p-6 bg-gray-50 text-gray-900 dark:bg-[#030712] dark:text-slate-100 min-h-screen">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Catálogo de Productos</h1>
            <p className="text-sm text-gray-500 dark:text-slate-400">Haz clic en un producto para auditar sus estadísticas e interacciones.</p>
          </div>
        </div>

        {/* Buscador de Productos */}
        <div className="bg-white p-4 rounded-xl shadow-md mb-6 flex items-center border border-gray-200 dark:bg-[#1f2937] dark:border-slate-700">
          <input
            type="text"
            placeholder="Buscar producto por nombre o SKU..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full max-w-sm px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 dark:bg-[#111827] dark:border-slate-700 dark:text-white dark:placeholder-slate-500"
          />
        </div>

        {/* Muestra del Grid General */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {productosFiltrados.map((producto) => (
            <div key={producto.id} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden flex flex-col justify-between hover:shadow-lg hover:border-gray-300 transition-all dark:bg-[#1f2937] dark:border-slate-700 dark:hover:border-slate-600">
              <div className="relative h-44 bg-slate-100 border-b border-gray-200 dark:bg-slate-900 dark:border-slate-700">
                <img src={producto.imagen} alt={producto.nombre} className="w-full h-full object-cover" />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs text-gray-500 dark:text-slate-400 font-mono">{producto.sku}</span>
                  <h3 className="font-semibold text-gray-700 dark:text-slate-200 text-base mb-1 line-clamp-1">{producto.nombre}</h3>
                  <p className="text-base font-bold text-emerald-400 mb-4">{formatCOP(producto.precio)}</p>
                </div>

                <button 
                  onClick={() => setProductoSeleccionado(producto)}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 px-4 rounded-lg text-xs transition-colors text-center block cursor-pointer border border-indigo-500"
                >
                  Ver estadísticas y comentarios
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Estado Vacío */}
        {productosFiltrados.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300 mt-6 dark:bg-[#1f2937] dark:border-slate-600">
            <p className="text-gray-500 dark:text-slate-400 text-sm">No se encontraron productos coincidentes.</p>
          </div>
        )}
      </div>
    </>
  );
}