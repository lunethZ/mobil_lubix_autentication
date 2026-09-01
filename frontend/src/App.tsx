import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Login from "./pages/login";
import Register from "./pages/register";
import RecoverPassword from "./pages/reset-password";
import VerificationCode from "./pages/verific-code";
import NewPassword from "./pages/new-password";
import Home from "./pages/Home"; 
import HomeUsuario from "./pages/home-usuario";
import Dashboard from "./pages/dashboard-empresa";
import DashboardUsuario from "./pages/dashboard-usuario";
import BuscarProducto from "./pages/buscar-producto";
import Productos from "./pages/productos";
import CartPage from "./pages/carrito";
import PagarPage from "./pages/pagar";
import { useAuth } from "./context/AuthContext";
import DashboardAdmin from "./pages/dashboardadmin";
import ProductoDetalle from "./pages/producto-detalle";
import PQRSPage from "./pages/pqrs";

function ProtectedRoute({ allowedRoles, children }: { allowedRoles?: Array<"user" | "empresa" | "admin">, children: React.ReactNode }) {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role_id)) {
    // Redirigir al home correcto según rol si intenta entrar a ruta no autorizada
    if (user.role_id === "empresa") return <Navigate to="/dashboard-empresa" replace />;
    if (user.role_id === "admin") return <Navigate to="/dashboard-admin" replace />;
    return <Navigate to="/home-usuario" replace />;
  }

  return <>{children}</>;
}

function PublicOnlyRoute({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated } = useAuth();
  if (isAuthenticated && user) {
    if (user.role_id === "empresa") return <Navigate to="/dashboard-empresa" replace />;
    if (user.role_id === "admin") return <Navigate to="/dashboard-admin" replace />;
    return <Navigate to="/home-usuario" replace />;
  }
  return <>{children}</>;
}

function ProtectedAdminRoute() {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated || !user || user.role_id !== "admin") {
    return <Navigate to="/" replace />;
  }
  return <DashboardAdmin />;
}

function App() {
  const { logout } = useAuth();

  // Seguridad: la sesión se cierra automáticamente cuando el usuario
  // sale de la página (cerrar pestaña/ventana o navegar a otro sitio)
  // o cuando vuelve con el botón atrás (página restaurada desde bfcache).
  useEffect(() => {
    const handlePageHide = () => {
      // Al salir de la página, se borran tokens y datos de usuario
      const token = localStorage.getItem("access_token");
      if (token) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");
      }
    };

    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        // Volvió con botón atrás/adelante desde bfcache: la sesión ya fue
        // borrada en pagehide, se sincroniza el estado y se fuerza el login.
        logout();
        const token = localStorage.getItem("access_token");
        const userStr = localStorage.getItem("user");
        if (!token || !userStr) {
          window.location.href = "/login";
        }
      }
    };

    window.addEventListener("pagehide", handlePageHide);
    window.addEventListener("pageshow", handlePageShow);
    return () => {
      window.removeEventListener("pagehide", handlePageHide);
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, [logout]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
      <Route path="/register" element={<PublicOnlyRoute><Register /></PublicOnlyRoute>} />
      <Route path="/recover" element={<RecoverPassword />} />
      <Route path="/register/VerifyEmailPage" element={<VerificationCode />} />
      <Route path="/new-password" element={<NewPassword />} />

      {/* Rutas protegidas: requieren sesión. El back tras logout no podrá verlas gracias a ProtectedRoute + replace */}
      <Route path="/home-usuario" element={<ProtectedRoute allowedRoles={["user"]}><HomeUsuario /></ProtectedRoute>} />
      <Route path="/home-empresa" element={<Navigate to="/dashboard-empresa" replace />} />
      <Route path="/dashboard-empresa" element={<ProtectedRoute allowedRoles={["empresa"]}><Dashboard /></ProtectedRoute>} />
      <Route path="/dashboard-usuario" element={<ProtectedRoute allowedRoles={["user"]}><DashboardUsuario /></ProtectedRoute>} />
      <Route path="/carrito" element={<ProtectedRoute allowedRoles={["user"]}><CartPage /></ProtectedRoute>} />
      <Route path="/pago" element={<ProtectedRoute allowedRoles={["user"]}><PagarPage /></ProtectedRoute>} />
      <Route path="/buscar" element={<BuscarProducto />} />
      <Route path="/producto/:id" element={<ProductoDetalle />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/pqrs" element={<PQRSPage />} />
      <Route path="/dashboard-admin" element={<ProtectedAdminRoute />} />
    </Routes>
  );
}

export default App;
