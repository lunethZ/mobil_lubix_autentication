import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { 
  UserCircleIcon, 
  ShieldCheckIcon, 
  UsersIcon, 
  DocumentTextIcon, 
  CpuChipIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  ChatBubbleLeftRightIcon,
  ArrowRightOnRectangleIcon
} from "@heroicons/react/24/outline";
import { useState } from "react";

interface NavbarAdminProps {
  onReportarCambios?: () => void;
  onAbrirConfiguracion?: () => void;
}

export default function NavbarAdmin({ onReportarCambios, onAbrirConfiguracion }: NavbarAdminProps) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    logout();
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-[#111827] border-b border-slate-700 w-full select-none">
      
      {/* SECCIÓN MARCA: Solo texto estilizado, sin dependencias de imagen */}
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <span className="text-white text-xl font-black tracking-wide leading-none">
            Lubix Console
          </span>
          <span className="text-[10px] bg-green-950/80 text-green-400 border border-green-800/50 px-1.5 py-0.5 rounded font-mono uppercase mt-1 font-bold tracking-wider self-start">
            Admin Root
          </span>
        </div>
      </div>

      {/* ENLACES DE CONTROL CENTRALES */}
       <div className="hidden md:flex items-center gap-6 text-white text-sm font-medium">
        <button onClick={() => navigate('/dashboard-admin')} className="flex items-center gap-1.5 hover:text-green-400 transition">
          <UsersIcon className="w-5 h-5 text-gray-400" />
          <span>Usuarios</span>
        </button>

        <button onClick={() => navigate('/dashboard-admin')} className="flex items-center gap-1.5 hover:text-green-400 transition">
          <DocumentTextIcon className="w-5 h-5 text-gray-400" />
          <span>Auditoría</span>
        </button>

        <button onClick={() => navigate('/dashboard-admin')} className="flex items-center gap-1.5 hover:text-green-400 transition">
          <CpuChipIcon className="w-5 h-5 text-gray-400" />
          <span>Sistema</span>
        </button>
      </div>

      {/* ACCIONES DERECHAS: Tema + Menú de Perfil */}
      <div className="flex items-center gap-6 text-white">
        
        {/* Toggle Theme */}
        <button
          onClick={toggleTheme}
          className="relative w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-all duration-300"
          title={theme === "light" ? "Modo oscuro" : "Modo claro"}
          style={{ backgroundColor: "var(--color-btn-primary)" }}
        >
          <svg
            className={`w-6 h-6 text-white absolute transition-all duration-300 ${
              theme === "light" ? "opacity-100 rotate-0" : "opacity-0 rotate-180"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
          <svg
            className={`w-6 h-6 text-yellow-400 absolute transition-all duration-300 ${
              theme === "dark" ? "opacity-100 rotate-0" : "opacity-0 -rotate-180"
            }`}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M12 8a4 4 0 100 8 4 4 0 000-8zm0-6.75a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V2a.75.75 0 01.75-.75zm0 18a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zm10-9.25a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 01.75.75zm-18 0a.75.75 0 01-.75.75H1.75a.75.75 0 010-1.5H3a.75.75 0 01.75.75zM17.657 6.343a.75.75 0 011.06 1.06l-1.06 1.06a.75.75 0 11-1.06-1.06l1.06-1.06zm-11.314 11.314a.75.75 0 011.06 1.06l-1.06 1.06a.75.75 0 11-1.06-1.06l1.06-1.06zm11.314 1.06a.75.75 0 01-1.06-1.06l1.06-1.06a.75.75 0 111.06 1.06l-1.06 1.06zm-11.314-11.314a.75.75 0 01-1.06-1.06l1.06-1.06a.75.75 0 111.06 1.06L6.343 6.343z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Menú Desplegable con Icono de Perfil */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 border-l border-gray-700 pl-4 group focus:outline-none"
          >
            {user?.name ? (
              <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-black bg-green-400 shadow-sm group-hover:bg-green-300 transition">
                {user.name.charAt(0).toUpperCase()}
              </div>
            ) : (
              <UserCircleIcon className="w-9 h-9 text-green-500 group-hover:text-green-400 transition" />
            )}
            <span className="font-medium hidden sm:inline text-sm">{user?.name || "Admin"}</span>
            <ChevronDownIcon className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${menuOpen ? 'rotate-180' : ''}`} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-[#1f2937] border border-slate-700 rounded-lg shadow-2xl py-2 z-50 text-xs text-slate-200">
              {/* Badge de Estado del Rol */}
              <div className="px-4 py-2 text-slate-400 font-mono text-[10px] uppercase border-b border-slate-700/60 mb-1 flex items-center gap-1">
                <ShieldCheckIcon className="w-4 h-4 text-green-400" />
                <span>Nivel: Superusuario</span>
              </div>
              
              {/* Acción 1: Configuración (Se ejecuta in-page) */}
              <button
                onClick={() => {
                  setMenuOpen(false);
                  if (onAbrirConfiguracion) onAbrirConfiguracion();
                }}
                className="w-full text-left flex items-center gap-2 px-4 py-2.5 hover:bg-[#111827] hover:text-green-400 transition"
              >
                <Cog6ToothIcon className="w-4 h-4 text-slate-400" />
                <span>Configuración</span>
              </button>

              {/* Acción 2: Reportar Cambios (Se ejecuta in-page) */}
              <button
                onClick={() => {
                  setMenuOpen(false);
                  if (onReportarCambios) onReportarCambios();
                }}
                className="w-full text-left flex items-center gap-2 px-4 py-2.5 hover:bg-[#111827] hover:text-green-400 transition"
              >
                <ChatBubbleLeftRightIcon className="w-4 h-4 text-slate-400" />
                <span>Reportar Cambios</span>
              </button>

              <hr className="border-slate-700/60 my-1" />

              {/* Acción 3: Cerrar Sesión (Redirección nativa de auth) */}
              <button
                onClick={handleLogout}
                className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-rose-400 hover:bg-rose-950/40 transition font-medium"
              >
                <ArrowRightOnRectangleIcon className="w-4 h-4 text-rose-400" />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}