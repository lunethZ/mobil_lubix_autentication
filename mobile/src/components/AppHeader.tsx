import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import type { RootStackParamList } from "../navigation/types";

type Nav = NativeStackNavigationProp<RootStackParamList>;

interface Props {
  role?: "user" | "empresa" | "admin" | "guest";
}

  export default function AppHeader({ role = "guest" }: Props) {
    const navigation = useNavigation<Nav>();
    const { user, logout } = useAuth();
    const { C } = useTheme();
    const barBg = C.navbar;

  const handleLogout = async () => {
    await logout();
    navigation.reset({ index: 0, routes: [{ name: "Login" }] });
  };

  const home = () => {
    if (role === "user") navigation.navigate("HomeUsuario");
    else if (role === "empresa") navigation.navigate("HomeEmpresa");
    else if (role === "admin") navigation.navigate("DashboardAdmin");
    else navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: barBg }]}>
      <View style={styles.nav}>
        <TouchableOpacity onPress={home}>
          <Text style={styles.logo}>Lubix</Text>
        </TouchableOpacity>
        <View style={styles.actions}>
          {role === "user" && (
            <TouchableOpacity onPress={() => navigation.navigate("Carrito")}>
              <Text style={[styles.link, { color: C.text }]}>Carrito</Text>
            </TouchableOpacity>
          )}
          {user && (
            <View style={styles.avatarWrap}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{user.name?.charAt(0).toUpperCase() || "U"}</Text>
              </View>
              <TouchableOpacity onPress={handleLogout}>
                <Text style={styles.logout}>Salir</Text>
              </TouchableOpacity>
            </View>
          )}
          {!user && (
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={[styles.link, { color: C.text }]}>Entrar</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {},
  nav: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: { color: "#22c55e", fontWeight: "800", fontSize: 20 },
  actions: { flexDirection: "row", alignItems: "center", gap: 12 },
  avatarWrap: { flexDirection: "row", alignItems: "center", gap: 10 },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#4ade80",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: "#000", fontWeight: "700" },
  link: { color: "#ffffff", fontSize: 14, fontWeight: "600" },
  logout: { color: "#fca5a5", fontSize: 13, fontWeight: "600" },
});