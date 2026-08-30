import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { Screen } from "../components/ui";
import AppHeader from "../components/AppHeader";
import { useTheme } from "../context/ThemeContext";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { PRODUCTS, CATEGORIES, formatCOP } from "../data/products";
import type { RootStackParamList } from "../navigation/types";

type Route = RouteProp<RootStackParamList, "BuscarProducto">;
type Nav = NativeStackNavigationProp<RootStackParamList>;
type Order = "relevance" | "price_asc" | "price_desc" | "name_asc";

export default function BuscarProductoScreen() {
  const route = useRoute<Route>();
  const navigation = useNavigation<Nav>();
  const { C } = useTheme();
  const [query, setQuery] = useState(route.params?.q || "");
  const [category, setCategory] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [order, setOrder] = useState<Order>("relevance");

  const results = PRODUCTS.filter((p) => {
    if (category && p.category !== category) return false;
    if (minPrice && p.price < Number(minPrice)) return false;
    if (maxPrice && p.price > Number(maxPrice)) return false;
    if (query.trim() && !p.name.toLowerCase().includes(query.trim().toLowerCase())) return false;
    return true;
  }).sort((a, b) => {
    if (order === "price_asc") return a.price - b.price;
    if (order === "price_desc") return b.price - a.price;
    if (order === "name_asc") return a.name.localeCompare(b.name);
    return 0;
  });

  const clearFilters = () => {
    setCategory(null);
    setMinPrice("");
    setMaxPrice("");
    setQuery("");
    setOrder("relevance");
  };

  return (
    <Screen>
      <AppHeader role="user" />
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={{ color: C.text, fontSize: 22, fontWeight: "800", marginBottom: 16 }}>Buscar productos</Text>

        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Buscar producto..."
          placeholderTextColor={C.textSecondary}
          style={{ backgroundColor: C.bgCard, borderWidth: 1, borderColor: C.border, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, color: C.text, marginBottom: 12 }}
        />

        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={{ backgroundColor: category === cat ? C.btnPrimary : C.btnSecondary, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6 }}
              onPress={() => setCategory(category === cat ? null : cat)}
            >
              <Text style={{ color: category === cat ? "#fff" : C.text, fontWeight: "600", fontSize: 12 }}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ flexDirection: "row", gap: 8, marginBottom: 12 }}>
          <TextInput
            value={minPrice}
            onChangeText={setMinPrice}
            placeholder="Min $"
            placeholderTextColor={C.textSecondary}
            keyboardType="numeric"
            style={{ flex: 1, backgroundColor: C.inputBg, borderWidth: 1, borderColor: C.inputBorder, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8, color: C.text }}
          />
          <TextInput
            value={maxPrice}
            onChangeText={setMaxPrice}
            placeholder="Máx $"
            placeholderTextColor={C.textSecondary}
            keyboardType="numeric"
            style={{ flex: 1, backgroundColor: C.inputBg, borderWidth: 1, borderColor: C.inputBorder, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8, color: C.text }}
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
          {(["relevance", "price_asc", "price_desc", "name_asc"] as Order[]).map((o) => (
            <TouchableOpacity
              key={o}
              style={{ backgroundColor: order === o ? C.btnPrimary : C.btnSecondary, borderRadius: 8, paddingHorizontal: 14, paddingVertical: 8, marginRight: 8 }}
              onPress={() => setOrder(o)}
            >
              <Text style={{ color: order === o ? "#fff" : C.text, fontWeight: "600", fontSize: 12 }}>
                {o === "relevance" ? "Relevancia" : o === "price_asc" ? "Precio: menor" : o === "price_desc" ? "Precio: mayor" : "Nombre"}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity onPress={clearFilters}>
          <Text style={{ color: C.accent, fontWeight: "600", fontSize: 13, marginBottom: 12 }}>Limpiar filtros</Text>
        </TouchableOpacity>

        {results.length === 0 ? (
          <View style={{ alignItems: "center", paddingVertical: 30 }}>
            <Text style={{ fontSize: 36, marginBottom: 8 }}>🔍</Text>
            <Text style={{ color: C.text, fontWeight: "700" }}>Sin resultados</Text>
            <Text style={{ color: C.textSecondary, fontSize: 13, textAlign: "center", marginTop: 4 }}>Prueba con otros términos o limpia los filtros.</Text>
          </View>
        ) : (
          results.map((p) => (
            <TouchableOpacity
              key={p.id}
              style={{ flexDirection: "row", backgroundColor: C.bgCard, borderWidth: 1, borderColor: C.border, borderRadius: 12, padding: 12, marginBottom: 10 }}
              onPress={() => navigation.navigate("ProductoDetalle", { id: p.id })}
            >
              <View style={{ width: 60, height: 60, borderRadius: 8, backgroundColor: C.bgSecondary, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontSize: 24 }}>{p.category === "Audio" ? "🎧" : p.category === "Cámaras" ? "📷" : "📦"}</Text>
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text numberOfLines={2} style={{ color: C.text, fontWeight: "700", fontSize: 14 }}>{p.name}</Text>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: 2 }}>
                  <Text style={{ color: "#f59e0b", fontSize: 12 }}>{"★".repeat(Math.round(p.rating))}{"☆".repeat(5 - Math.round(p.rating))}</Text>
                  <Text style={{ color: C.textSecondary, fontSize: 11 }}>{p.rating.toFixed(1)}</Text>
                </View>
                <Text style={{ color: C.textSecondary, fontSize: 11, marginTop: 2 }}>{p.store}</Text>
                {p.discount ? (
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginTop: 4 }}>
                    <Text style={{ color: C.textSecondary, fontSize: 12, textDecorationLine: "line-through" }}>{formatCOP(p.originalPrice || 0)}</Text>
                    <Text style={{ color: C.accent, fontSize: 11, fontWeight: "700" }}>-{p.discount}%</Text>
                  </View>
                ) : null}
                <Text style={{ color: C.text, fontSize: 15, fontWeight: "800", marginTop: 2 }}>{formatCOP(p.price)}</Text>
                {p.stock === 0 && <Text style={{ color: C.errorText, fontSize: 11, fontWeight: "700" }}>Agotado</Text>}
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </Screen>
  );
}