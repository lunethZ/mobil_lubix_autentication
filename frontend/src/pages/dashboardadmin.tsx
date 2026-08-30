import { useState, useEffect } from 'react';
import NavbarAdmin from '../components/navbar-admin';
import api from '../api/axios';

interface PendingCompany {
  id: string;
  companyName: string;
  companyNIT: string;
  email: string;
}

export default function DashboardAdminPage() {
  const [companies, setCompanies] = useState<PendingCompany[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [approving, setApproving] = useState<string | null>(null);

  const showMessage = (msg: string, type: "success" | "error") => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => { setMessage(""); setMessageType(""); }, 4000);
  };

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const res = await api.get<PendingCompany[]>("/admin/pending-companies");
      setCompanies(res.data);
    } catch {
      showMessage("Error al cargar empresas pendientes", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCompanies(); }, []);

  const handleApprove = async (id: string) => {
    if (!window.confirm("¿Aprobar esta empresa?")) return;
    try {
      setApproving(id);
      await api.post(`/admin/approve-company/${id}`);
      showMessage("Empresa aprobada exitosamente", "success");
      setCompanies((prev) => prev.filter((c) => c.id !== id));
    } catch {
      showMessage("Error al aprobar la empresa", "error");
    } finally {
      setApproving(null);
    }
  };

  return (
    <div className="bg-white dark:bg-[#030712] min-h-screen text-gray-900 dark:text-slate-100 flex flex-col font-sans">
      <NavbarAdmin />

      <main className="p-6 flex-1 max-w-7xl w-full mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Panel de Administración</h1>
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Gestión de empresas pendientes de aprobación.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-[#1f2937] p-5 rounded-xl border border-gray-200 dark:border-slate-700/70 shadow-md">
            <span className="text-xs text-gray-500 dark:text-slate-400 block uppercase font-mono tracking-wider">Pendientes de aprobación</span>
            <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight mt-2 block">{companies.length}</span>
          </div>
          <div className="bg-white dark:bg-[#1f2937] p-5 rounded-xl border border-gray-200 dark:border-slate-700/70 shadow-md">
            <span className="text-xs text-gray-500 dark:text-slate-400 block uppercase font-mono tracking-wider">Total aprobadas</span>
            <span className="text-xl font-bold text-green-500 dark:text-green-400 tracking-tight mt-2 block">—</span>
          </div>
          <div className="bg-white dark:bg-[#1f2937] p-5 rounded-xl border border-gray-200 dark:border-slate-700/70 shadow-md">
            <span className="text-xs text-gray-500 dark:text-slate-400 block uppercase font-mono tracking-wider">Rol</span>
            <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight mt-2 block capitalize">Admin</span>
          </div>
          <div className="bg-white dark:bg-[#1f2937] p-5 rounded-xl border border-gray-200 dark:border-slate-700/70 shadow-md">
            <span className="text-xs text-gray-500 dark:text-slate-400 block uppercase font-mono tracking-wider">Acceso</span>
            <span className="text-xl font-bold text-green-500 dark:text-green-400 tracking-tight mt-2 block">Activo</span>
          </div>
        </div>

        {message && (
          <div className={messageType === "success" ? "popup-success" : "popup-error"}>
            <span className="font-medium text-xs sm:text-sm">{message}</span>
          </div>
        )}

        <div className="bg-white dark:bg-[#1f2937] rounded-xl border border-gray-200 dark:border-slate-700/70 shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-slate-700">
            <h3 className="text-base font-bold text-gray-900 dark:text-white">Empresas pendientes</h3>
          </div>
          {loading ? (
            <div className="p-8 text-center text-gray-500 dark:text-slate-400">Cargando empresas pendientes...</div>
          ) : companies.length === 0 ? (
            <div className="p-8 text-center text-gray-500 dark:text-slate-400">No hay empresas pendientes de aprobación.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-slate-800 text-left">
                    <th className="px-4 py-3 text-xs font-semibold text-gray-600 dark:text-slate-300 uppercase tracking-wider">Empresa</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-600 dark:text-slate-300 uppercase tracking-wider">NIT</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-600 dark:text-slate-300 uppercase tracking-wider">Email</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-600 dark:text-slate-300 uppercase tracking-wider text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                  {companies.map((c) => (
                    <tr key={c.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition">
                      <td className="px-4 py-3 text-gray-900 dark:text-white font-medium">{c.companyName}</td>
                      <td className="px-4 py-3 text-gray-500 dark:text-slate-400 font-mono text-xs">{c.companyNIT}</td>
                      <td className="px-4 py-3 text-gray-500 dark:text-slate-400">{c.email}</td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => handleApprove(c.id)}
                          disabled={approving === c.id}
                          className="px-3 py-1.5 bg-green-600 hover:bg-green-500 text-white text-xs font-semibold rounded-lg transition disabled:opacity-50"
                        >
                          {approving === c.id ? "Aprobando..." : "Aprobar"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
