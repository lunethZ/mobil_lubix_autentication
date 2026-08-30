import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/Login";
import RegisterScreen from "../screens/Register";
import RecoverPasswordScreen from "../screens/RecoverPassword";
import VerificationCodeScreen from "../screens/VerificationCode";
import NewPasswordScreen from "../screens/NewPassword";
import HomeScreen from "../screens/Home";
import HomeUsuarioScreen from "../screens/HomeUsuario";
import HomeEmpresaScreen from "../screens/HomeEmpresa";
import DashboardUsuarioScreen from "../screens/DashboardUsuario";
import DashboardEmpresaScreen from "../screens/DashboardEmpresa";
import DashboardAdminScreen from "../screens/DashboardAdmin";
import CarritoScreen from "../screens/Carrito";
import BuscarProductoScreen from "../screens/BuscarProducto";
import ProductosScreen from "../screens/Productos";
import ProductoDetalleScreen from "../screens/ProductoDetalle";
import type { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Recover" component={RecoverPasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Verification" component={VerificationCodeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="NewPassword" component={NewPasswordScreen} options={{ headerShown: false }} />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen name="HomeUsuario" component={HomeUsuarioScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomeEmpresa" component={HomeEmpresaScreen} options={{ headerShown: false }} />
        <Stack.Screen name="DashboardUsuario" component={DashboardUsuarioScreen} options={{ headerShown: false }} />
        <Stack.Screen name="DashboardEmpresa" component={DashboardEmpresaScreen} options={{ headerShown: false }} />
        <Stack.Screen name="DashboardAdmin" component={DashboardAdminScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Carrito" component={CarritoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="BuscarProducto" component={BuscarProductoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Productos" component={ProductosScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProductoDetalle" component={ProductoDetalleScreen} options={{ headerShown: false }} />
      </Stack.Group>
    </Stack.Navigator>
  );
}