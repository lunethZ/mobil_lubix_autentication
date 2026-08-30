import { useAuth } from "../context/AuthContext";
import Navbar from "./navbar";
import NavbarUsuario from "./navbaruser";
import NavbarEmpresa from "./navbar-empresa";
import NavbarAdmin from "./navbar-admin";

export default function NavbarAuto() {
  const { user } = useAuth();
  const role = user?.role_id;

  if (role === "admin") return <NavbarAdmin />;
  if (role === "empresa") return <NavbarEmpresa />;
  if (role === "user") return <NavbarUsuario />;
  return <Navbar />;
}