
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import RecoverPassword from "./pages/reset-password";
import VerificationCode from "./pages/verific-code";
import NewPassword from "./pages/new-password";
import Home from "./pages/Home"; 
import HomeUsuario from "./pages/home-usuario";
import HomeEmpresa from "./pages/home-empresa";
import Dashboard from "./pages/dashboard-empresa";
import DashboardUsuario from "./pages/dashboard-usuario";
import BuscarProducto from "./pages/buscar-producto";
import Productos from "./pages/productos";
import CartPage from "./pages/carrito";
import PagarPage from "./pages/pagar";
import { useAuth } from "./context/AuthContext";
import DashboardAdmin from "./pages/dashboardadmin";

function ProtectedAdminRoute() {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated || !user || user.role_id !== "admin") {
    return <Navigate to="/" replace />;
  }
  return <DashboardAdmin />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/recover" element={<RecoverPassword />} />
      <Route path="/register/VerifyEmailPage" element={<VerificationCode />} />
      <Route path="/new-password" element={<NewPassword />} />
      <Route path="/home-usuario" element={<HomeUsuario />} />
      <Route path="/home-empresa" element={<HomeEmpresa />} />
      <Route path="/dashboard-empresa" element={<Dashboard/>} />
      <Route path="/dashboard-usuario" element={<DashboardUsuario/>} />
      <Route path="/carrito" element={<CartPage/>} />
      <Route path="/pago" element={<PagarPage />} />
      <Route path="/buscar" element={<BuscarProducto/>} />
      <Route path="/productos" element={<Productos/>} />
      <Route path="/dashboard-admin" element={<ProtectedAdminRoute />} />
    </Routes>
  );
}

export default App;
