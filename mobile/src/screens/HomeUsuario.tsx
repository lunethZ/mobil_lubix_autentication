import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { Screen } from "../components/ui";
import AppHeader from "../components/AppHeader";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { PRODUCTS, CATEGORIES, ofertas, formatCOP } from "../data/products";
import { favoritesStore, cartStore } from "../store/cartStore";
import type { RootStackParamList } from "../navigation/types";

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function HomeUsuarioScreen() {
  const navigation = useNavigation<Nav>();
  const { C } = useTheme();
  const { user } = useAuth();
  const [favs, setFavs] = useState<number[]>([]);
  const [ofertasIndex, setOfertasIndex] = useState(0);

  useEffect(() => {
    favoritesStore.get().then(setFavs);
    const interval = setInterval(() => setOfertasIndex((prev) => (prev + 1) % ofertas.length), 3000);
    return () => clearInterval(interval);
  }, []);

  const toggleFav = async (id: number) => {
    const updated = await favoritesStore.toggle(id);
    setFavs(updated);
  };

  const addToCart = async (p: (typeof PRODUCTS)[number]) => {
    await cartStore.add({ id: p.id, name: p.name, price: p.price, image: p.image });
  };

  const shortcuts = [
    { icon: "🛒", label: "Tus Compras" },
    { icon: "👤", label: "Perfil" },
    { icon: "⚙️", label: "Configuración" },
  ];

  return (
    <Screen>
      <AppHeader role="user" />
      <ScrollView>
        <View style={{ padding: 20 }}>
          <Text style={{ color: C.accent, fontSize: 13, fontWeight: "600", marginBottom: 4 }}>
            Bienvenido {user?.name || "Usuario"}
          </Text>
          <Text style={{ color: C.text, fontSize: 24, fontWeight: "800" }}>Encuentra las mejores ofertas</Text>

          <TouchableOpacity
            style={{ marginTop: 16, marginBottom: 20 }}
            onPress={() => navigation.navigate("BuscarProducto")}
          >
            <View style={{ backgroundColor: C.bgCard, borderWidth: 1, borderColor: C.border, borderRadius: 12, padding: 14 }}>
              <Text style={{ color: C.textSecondary }}>🔍  Buscar productos...</Text>
            </View>
          </TouchableOpacity>

          <View style={{ flexDirection: "row", justifyContent: "space-around", marginBottom: 24 }}>
            {shortcuts.map((s) => (
              <TouchableOpacity key={s.label} style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 28, marginBottom: 4 }}>{s.icon}</Text>
                <Text style={{ color: C.textSecondary, fontSize: 12, fontWeight: "600" }}>{s.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={{ backgroundColor: "#0f172a", borderRadius: 16, overflow: "hidden", marginBottom: 24 }}>
            <View style={{ height: 110, backgroundColor: ofertas[ofertasIndex].color, justifyContent: "center", alignItems: "center" }}>
              <Text style={{ color: "#fff", fontSize: 15, fontWeight: "700" }}>{ofertas[ofertasIndex].titulo}</Text>
            </View>
            <View style={{ padding: 14, alignItems: "center" }}>
              <Text style={{ color: "#cbd5e1", fontSize: 13 }}>{ofertas[ofertasIndex].descripcion}</Text>
            </View>
          </View>

          <Text style={{ color: C.text, fontSize: 20, fontWeight: "800", marginBottom: 12 }}>
            Categorías Principales
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 24 }}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={{ backgroundColor: C.bgCard, borderWidth: 1, borderColor: C.border, borderRadius: 999, paddingHorizontal: 18, paddingVertical: 10, marginRight: 10 }}
                onPress={() => navigation.navigate("BuscarProducto", { q: cat })}
              >
                <Text style={{ color: C.text, fontWeight: "600" }}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={{ color: C.text, fontSize: 20, fontWeight: "800", marginBottom: 12 }}>
            Productos Destacados
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
            {PRODUCTS.slice(0, 6).map((product) => (
              <TouchableOpacity
                key={product.id}
                style={{ width: "48%", backgroundColor: C.bgCard, borderRadius: 14, borderWidth: 1, borderColor: C.border, marginBottom: 14, overflow: "hidden" }}
                onPress={() => navigation.navigate("ProductoDetalle", { id: product.id })}
              >
                <View style={{ height: 100, backgroundColor: C.bgSecondary, justifyContent: "center", alignItems: "center" }}>
                  <Text style={{ fontSize: 30 }}>{product.category === "Audio" ? "🎧" : product.category === "Cámaras" ? "📷" : product.category === "Wearables" ? "⌚" : product.category === "Gaming" ? "🎮" : product.category === "Celulares" ? "📱" : "💻"}</Text>
                </View>
                <View style={{ padding: 12 }}>
                  <TouchableOpacity
                    style={{ position: "absolute", right: 10, top: 10, zIndex: 10 }}
                    onPress={() => toggleFav(product.id)}
                  >
                    <Text style={{ fontSize: 20 }}>{favs.includes(product.id) ? "❤️" : "🤍"}</Text>
                  </TouchableOpacity>
                  <Text numberOfLines={2} style={{ color: C.text, fontSize: 13, fontWeight: "600", height: 36 }}>{product.name}</Text>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: 2 }}>
                    <Text style={{ color: "#f59e0b", fontSize: 12 }}>{"★".repeat(Math.round(product.rating))}{"☆".repeat(5 - Math.round(product.rating))}</Text>
                    <Text style={{ color: C.textSecondary, fontSize: 11 }}>{product.rating.toFixed(1)}</Text>
                  </View>
                  <Text style={{ color: C.textSecondary, fontSize: 11 }}>{product.store}</Text>
                  {product.discount ? (
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginTop: 4 }}>
                      <Text style={{ color: C.textSecondary, fontSize: 12, textDecorationLine: "line-through" }}>{formatCOP(product.originalPrice || 0)}</Text>
                      <Text style={{ color: C.accent, fontSize: 11, fontWeight: "700" }}>-{product.discount}%</Text>
                    </View>
                  ) : null}
                  <Text style={{ color: C.text, fontSize: 16, fontWeight: "800", marginVertical: 4 }}>{formatCOP(product.price)}</Text>
                  <TouchableOpacity
                    style={{ backgroundColor: C.btnPrimary, borderRadius: 999, paddingVertical: 8, alignItems: "center" }}
                    onPress={() => addToCart(product)}
                  >
                    <Text style={{ color: "#fff", fontWeight: "700", fontSize: 12 }}>Agregar al carrito</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ borderWidth: 1, borderColor: C.border, borderRadius: 999, paddingVertical: 8, alignItems: "center", marginTop: 6 }}
                    onPress={() => navigation.navigate("ProductoDetalle", { id: product.id })}
                  >
                    <Text style={{ color: C.text, fontWeight: "600", fontSize: 12 }}>Ver detalle y reseñas</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}