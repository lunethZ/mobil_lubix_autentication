export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Recover: undefined;
  Verification: { email: string } | undefined;
  NewPassword: { email: string } | undefined;
  Home: undefined;
  HomeUsuario: undefined;
  HomeEmpresa: undefined;
  DashboardUsuario: undefined;
  DashboardEmpresa: undefined;
  DashboardAdmin: undefined;
  Carrito: undefined;
  BuscarProducto: { q?: string } | undefined;
  Productos: undefined;
  ProductoDetalle: { id: number };
};