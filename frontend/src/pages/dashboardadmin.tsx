import { useState } from 'react';
import NavbarAdmin from '../components/navbar-admin';


// 1. INTERFACES DE TYPESCRIPT

interface KpiMetric {
  title: string;
  value: number;
  change: string;
  isPositive: boolean;
  type: 'currency' | 'number' | 'percentage';
}

interface LogActividad {
  id: number;
  usuario: string;
  accion: string;
  modulo: string;
  hora: string;
  estado: 'completado' | 'pendiente' | 'alerta';
}

interface IngresoMes {
  mes: string;
  valor: number; 
}


// 2. DATOS SIMULADOS PARA EL DASHBOARD

const METRICAS_GENERALES: KpiMetric[] = [
  { title: "Ingresos Totales", value: 945106300, change: "+12.4%", isPositive: true, type: 'currency' },
  { title: "Gastos Operativos", value: 312450000, change: "-3.2%", isPositive: true, type: 'currency' },
  { title: "Margen de Ganancia", value: 66.9, change: "+2.1%", isPositive: true, type: 'percentage' },
  { title: "Nuevos Clientes", value: 1240, change: "+18.5%", isPositive: true, type: 'number' }
];

const RECIENTES_LOGS: LogActividad[] = [
  { id: 1, usuario: "Carlos Mendoza", accion: "Actualizó stock de Laptop Pro 15\"", modulo: "Inventario", hora: "Hace 5 min", estado: "completado" },
  { id: 2, usuario: "Sistema Automático", accion: "Copia de seguridad realizada con éxito", modulo: "Base de Datos", hora: "Hace 1 hora", estado: "completado" },
  { id: 3, usuario: "Ana María Silva", accion: "Reportó error en pasarela de pagos", modulo: "Ventas", hora: "Hace 3 horas", estado: "alerta" },
  { id: 4, usuario: "Sergio T.", accion: "Modificó permisos del rol Administrador", modulo: "Usuarios", hora: "Ayer", estado: "pendiente" }
];

const HISTORIAL_INGRESOS: IngresoMes[] = [
  { mes: "Ene", valor: 140 },
  { mes: "Feb", valor: 198 },
  { mes: "Mar", valor: 220 },
  { mes: "Abr", valor: 285 },
  { mes: "May", valor: 310 },
  { mes: "Jun", valor: 392 }
];

// Helper para formatear en COP sin decimales
const formatCOP = (valor: number) => {
  return valor.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  });
};

// Valor tope referencial para calcular la altura de las barras de la gráfica
const VALOR_MAXIMO_GRAFICA = 400;

// ==========================================
// 3. COMPONENTE PRINCIPAL DEL DASHBOARD
// ==========================================
export default function DashboardAdminPage() {
  const [filtroModulo, setFiltroModulo] = useState<string>("Todos");

  const logsFiltrados = filtroModulo === "Todos" 
    ? RECIENTES_LOGS 
    : RECIENTES_LOGS.filter(log => log.modulo === filtroModulo);

  return (
    <div className="bg-white dark:bg-[#030712] min-h-screen text-gray-900 dark:text-slate-100 flex flex-col font-sans">
      {/* Navbar de Administración Unificado */}
      <NavbarAdmin />

      {/* Contenido Principal */}
      <main className="p-6 flex-1 max-w-7xl w-full mx-auto space-y-6">
        
        {/* Encabezado Principal */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Panel de Administración General</h1>
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Monitoreo global de operaciones, finanzas y registros del sistema.</p>
        </div>

        {/* Rejilla de Indicadores Clave (KPIs) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {METRICAS_GENERALES.map((kpi, idx) => (
            <div key={idx} className="bg-white dark:bg-[#1f2937] p-5 rounded-xl border border-gray-200 dark:border-slate-700/70 shadow-md">
              <span className="text-xs text-gray-500 dark:text-slate-400 block uppercase font-mono tracking-wider">{kpi.title}</span>
              <div className="flex items-baseline justify-between mt-2">
                <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                  {kpi.type === 'currency' 
                    ? formatCOP(kpi.value) 
                    : kpi.type === 'percentage' 
                      ? `${kpi.value}%` 
                      : kpi.value.toLocaleString('es-CO')
                  }
                </span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                  kpi.isPositive 
                    ? 'bg-green-950/60 text-green-400 border border-green-900/40' 
                    : 'bg-rose-950/60 text-rose-400 border border-rose-900/40'
                }`}>
                  {kpi.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Sección de Gráficos y Auditoría (Dos Columnas) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* COLUMNA IZQUIERDA: Gráfica Financiera (Ocupa 2 columnas de ancho) */}
          <div className="bg-white dark:bg-[#1f2937] p-6 rounded-xl border border-gray-200 dark:border-slate-700/70 shadow-md lg:col-span-2 flex flex-col justify-between">
            <div className="mb-6">
              <h3 className="text-base font-bold text-gray-900 dark:text-white tracking-tight">Tendencia de Ingresos Mensuales</h3>
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">Expresado en millones de pesos ($M COP).</p>
            </div>
            
            {/* Contenedor del Área de Barras con altura explícita (h-48) para cálculo en React */}
            <div className="flex items-end justify-between h-48 pt-6 px-4 border-b border-l border-gray-300 dark:border-slate-600 relative">
              {HISTORIAL_INGRESOS.map((item, index) => {
                // Cálculo porcentual exacto respecto al máximo definido
                const alturaPorcentaje = (item.valor / VALOR_MAXIMO_GRAFICA) * 100;

                return (
                  <div key={index} className="flex flex-col items-center w-1/6 group relative z-10">
                    {/* Tooltip flotante al hacer Hover */}
                    <span className="text-[11px] font-mono font-bold text-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute -top-7">
                      ${item.valor}M
                    </span>
                    
                    {/* Barra Geométrica Verde Pintada */}
                    <div 
                      style={{ height: `${alturaPorcentaje}%` }} 
                      className="w-full max-w-[36px] bg-green-500 rounded-t shadow-[0_0_12px_rgba(34,197,94,0.15)] group-hover:bg-green-400 group-hover:shadow-[0_0_16px_rgba(34,197,94,0.35)] transition-all duration-300 cursor-pointer"
                    />
                    
                    {/* Nombre del Mes */}
                    <span className="text-xs text-gray-500 dark:text-slate-400 mt-2 font-medium">
                      {item.mes}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* COLUMNA DERECHA: Auditoría del Sistema (Ocupa 1 columna de ancho) */}
          <div className="bg-white dark:bg-[#1f2937] p-6 rounded-xl border border-gray-200 dark:border-slate-700/70 shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white tracking-tight">Auditoría del Sistema</h3>
                <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">Acciones recientes de usuarios.</p>
              </div>
              
              {/* Filtro por Módulo */}
              <select 
                value={filtroModulo} 
                onChange={(e) => setFiltroModulo(e.target.value)}
                className="bg-white dark:bg-[#030712] text-xs text-gray-600 dark:text-slate-300 border border-gray-300 dark:border-slate-600 rounded-md py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-green-500 transition cursor-pointer"
              >
                <option value="Todos">Todos</option>
                <option value="Inventario">Inventario</option>
                <option value="Base de Datos">Base de Datos</option>
                <option value="Ventas">Ventas</option>
                <option value="Usuarios">Usuarios</option>
              </select>
            </div>

            {/* Lista con Scroll Interno para los Eventos */}
            <div className="space-y-3 h-48 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-700">
              {logsFiltrados.map((log) => (
                <div key={log.id} className="p-3 bg-white dark:bg-[#030712] rounded-lg border border-gray-200 dark:border-slate-700/50 text-xs flex justify-between items-start">
                  <div className="space-y-1">
                    <span className="font-semibold text-gray-700 dark:text-slate-200 block">{log.usuario}</span>
                    <p className="text-gray-500 dark:text-slate-400 font-sans line-clamp-1">{log.accion}</p>
                    <span className="text-[10px] bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400 px-1.5 py-0.5 rounded font-mono uppercase tracking-wider font-semibold">
                      {log.modulo}
                    </span>
                  </div>
                  <div className="text-right flex flex-col items-end justify-between h-full min-h-[42px] ml-2">
                    <span className="text-[10px] text-gray-400 dark:text-slate-500 font-medium whitespace-nowrap">{log.hora}</span>
                    <span className={`w-2 h-2 rounded-full mt-1.5 ${
                      log.estado === 'completado' 
                        ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' 
                        : log.estado === 'pendiente' 
                          ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]' 
                          : 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]'
                    }`} title={log.estado}></span>
                  </div>
                </div>
              ))}

              {logsFiltrados.length === 0 && (
                <div className="flex items-center justify-center h-full text-center text-gray-400 dark:text-slate-500 text-xs py-4">
                  No hay registros en este módulo.
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}