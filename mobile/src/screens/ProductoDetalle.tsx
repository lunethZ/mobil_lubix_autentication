import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getProductById, getRelatedProducts, getCategoryEmoji, formatCOP } from "../data/products";
import type { Product } from "../data/products";
import { favoritesStore, cartStore } from "../store/cartStore";
import type { RootStackParamList } from "../navigation/types";

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Route = RouteProp<RootStackParamList, "ProductoDetalle">;

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < full) stars.push("★");
    else if (i === full && half) stars.push("⯨");
    else stars.push("☆");
  }
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Text style={{ color: "#f59e0b", fontSize: size }}>{stars.join("")}</Text>
    </View>
  );
}

const ratingBreakdown = (product: Product) => {
  const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } as Record<number, number>;
  product.reviews.forEach((r) => {
    const key = Math.max(1, Math.min(5, Math.round(r.rating))) as 1 | 2 | 3 | 4 | 5;
    counts[key] += 1;
  });
  const total = product.reviews.length || 1;
  return [5, 4, 3, 2, 1].map((n) => ({
    star: n,
    pct: Math.round(((counts[n] || 0) / total) * 100),
  }));
};

export default function ProductoDetalleScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { C } = useTheme();
  const product = getProductById(route.params.id);
  const [imageIndex, setImageIndex] = useState(0);
  const [fav, setFav] = useState(false);

  if (!product) {
    return (
      <View style={{ flex: 1, backgroundColor: C.bg, alignItems: "center", justifyContent: "center", padding: 20 }}>
        <Text style={{ fontSize: 40, marginBottom: 12 }}>😕</Text>
        <Text style={{ color: C.text, fontSize: 16, fontWeight: "700", marginBottom: 16 }}>Producto no encontrado</Text>
        <TouchableOpacity style={{ backgroundColor: C.btnPrimary, borderRadius: 999, paddingHorizontal: 20, paddingVertical: 10 }} onPress={() => navigation.goBack()}>
          <Text style={{ color: "#fff", fontWeight: "700" }}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const related = getRelatedProducts(product);
  const breakdown = ratingBreakdown(product);

  const toggleFav = async () => {
    const updated = await favoritesStore.toggle(product.id);
    setFav(updated.includes(product.id));
  };

  const addToCart = async () => {
    await cartStore.add({ id: product.id, name: product.name, price: product.price, image: product.image });
    navigation.navigate("Carrito");
  };

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <View style={{ paddingHorizontal: 16, paddingTop: 50, paddingBottom: 10, flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: C.btnSecondary, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ color: C.text, fontSize: 18 }}>←</Text>
        </TouchableOpacity>
        <Text style={{ color: C.text, fontSize: 18, fontWeight: "800", marginLeft: 12, flex: 1 }} numberOfLines={1}>Detalle del producto</Text>
        <TouchableOpacity onPress={toggleFav} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: C.btnSecondary, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 20 }}>{fav ? "❤️" : "🤍"}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 110 }}>
        <View style={{ backgroundColor: C.bgSecondary }}>
          <View style={{ height: 240, alignItems: "center", justifyContent: "center" }}>
            <Image source={{ uri: product.images[imageIndex] || product.image }} style={{ width: "100%", height: "100%", resizeMode: "contain" }} />
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center", gap: 8, paddingVertical: 10 }}>
            {product.images.map((img, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => setImageIndex(i)}
                style={{ width: 44, height: 44, borderRadius: 8, backgroundColor: imageIndex === i ? C.btnPrimary : C.bgCard, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: imageIndex === i ? C.btnPrimary : C.border }}
              >
                <Text style={{ fontSize: 20 }}>{getCategoryEmoji(product.category)}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={{ padding: 20 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 6 }}>
            <Text style={{ color: C.textSecondary, fontSize: 12, fontWeight: "600" }}>{product.category}</Text>
            <Text style={{ color: C.textSecondary }}>•</Text>
            <Text style={{ color: C.accent, fontSize: 12, fontWeight: "600" }}>{product.store}</Text>
          </View>
          <Text style={{ color: C.text, fontSize: 20, fontWeight: "800", lineHeight: 26 }}>{product.name}</Text>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginTop: 8 }}>
            <Stars rating={product.rating} />
            <Text style={{ color: C.textSecondary, fontSize: 13 }}>{product.rating.toFixed(1)}</Text>
            <Text style={{ color: C.textSecondary, fontSize: 13 }}>({product.reviewCount} reseñas)</Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 10, marginTop: 12 }}>
            <Text style={{ color: C.text, fontSize: 26, fontWeight: "800" }}>{formatCOP(product.price)}</Text>
            {product.discount ? (
              <>
                <Text style={{ color: C.textSecondary, fontSize: 15, textDecorationLine: "line-through" }}>{formatCOP(product.originalPrice || 0)}</Text>
                <Text style={{ color: C.accent, fontSize: 13, fontWeight: "800" }}>-{product.discount}%</Text>
              </>
            ) : null}
          </View>
          <Text style={{ color: C.textSecondary, fontSize: 14, lineHeight: 21, marginTop: 8 }}>{product.description}</Text>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginTop: 10 }}>
            <Text style={{ color: C.textSecondary, fontSize: 13 }}>Stock disponible:</Text>
            <Text style={{ color: product.stock > 0 ? C.accent : C.errorText, fontWeight: "700", fontSize: 13 }}>
              {product.stock > 0 ? `${product.stock} unidades` : "Agotado"}
            </Text>
          </View>
        </View>

        <View style={{ marginHorizontal: 20, backgroundColor: C.bgCard, borderRadius: 14, borderWidth: 1, borderColor: C.border, padding: 16, marginBottom: 20 }}>
          <Text style={{ color: C.text, fontSize: 15, fontWeight: "800", marginBottom: 10 }}>Vendido por</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ width: 46, height: 46, borderRadius: 23, backgroundColor: C.accent, alignItems: "center", justifyContent: "center" }}>
              <Text style={{ color: "#fff", fontWeight: "800", fontSize: 14 }}>{product.storeInfo.logo}</Text>
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={{ color: C.text, fontWeight: "700", fontSize: 15 }}>{product.store}</Text>
              <Text style={{ color: C.textSecondary, fontSize: 12 }}>{product.storeInfo.address}, {product.storeInfo.city}</Text>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: 2 }}>
                <Stars rating={product.storeInfo.rating} size={11} />
                <Text style={{ color: C.textSecondary, fontSize: 11 }}>{product.storeInfo.rating.toFixed(1)}</Text>
                <Text style={{ color: C.textSecondary, fontSize: 11 }}>· {product.storeInfo.reviewCount} opiniones</Text>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: "row", gap: 16, marginTop: 12 }}>
            <Text style={{ color: C.textSecondary, fontSize: 12 }}>🛍️ {product.storeInfo.sales.toLocaleString()} ventas</Text>
            <Text style={{ color: C.textSecondary, fontSize: 12 }}>✅ Miembro desde {product.storeInfo.memberSince}</Text>
          </View>
        </View>

        <View style={{ marginHorizontal: 20, marginBottom: 20 }}>
          <Text style={{ color: C.text, fontSize: 15, fontWeight: "800", marginBottom: 10 }}>Características</Text>
          <View style={{ backgroundColor: C.bgCard, borderRadius: 14, borderWidth: 1, borderColor: C.border, overflow: "hidden" }}>
            {product.specs.map((s, i) => (
              <View key={i} style={{ flexDirection: "row", padding: 12, borderBottomWidth: i < product.specs.length - 1 ? 1 : 0, borderBottomColor: C.border }}>
                <Text style={{ color: C.textSecondary, fontSize: 13, width: 140 }}>{s.label}</Text>
                <Text style={{ color: C.text, fontSize: 13, fontWeight: "600", flex: 1 }}>{s.value}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ marginHorizontal: 20, marginBottom: 20 }}>
          <Text style={{ color: C.text, fontSize: 15, fontWeight: "800", marginBottom: 4 }}>Opiniones y Comentarios</Text>
          <Text style={{ color: C.textSecondary, fontSize: 12, marginBottom: 12 }}>{product.reviewCount} reseñas de clientes</Text>

          <View style={{ flexDirection: "row", backgroundColor: C.bgCard, borderRadius: 14, borderWidth: 1, borderColor: C.border, padding: 16, marginBottom: 14 }}>
            <View style={{ alignItems: "center", marginRight: 16 }}>
              <Text style={{ color: C.text, fontSize: 34, fontWeight: "800" }}>{product.rating.toFixed(1)}</Text>
              <Stars rating={product.rating} size={12} />
            </View>
            <View style={{ flex: 1, justifyContent: "center", gap: 4 }}>
              {breakdown.map((b) => (
                <View key={b.star} style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                  <Text style={{ color: C.textSecondary, fontSize: 11, width: 22 }}>{b.star}★</Text>
                  <View style={{ flex: 1, height: 6, borderRadius: 3, backgroundColor: C.btnSecondary, overflow: "hidden" }}>
                    <View style={{ width: `${b.pct}%`, height: 6, backgroundColor: "#f59e0b" }} />
                  </View>
                  <Text style={{ color: C.textSecondary, fontSize: 11, width: 30 }}>{b.pct}%</Text>
                </View>
              ))}
            </View>
          </View>

          {product.reviews.map((r) => (
            <View key={r.id} style={{ backgroundColor: C.bgCard, borderRadius: 12, borderWidth: 1, borderColor: C.border, padding: 14, marginBottom: 10 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <Text style={{ color: C.text, fontWeight: "700", fontSize: 13 }}>{r.user}</Text>
                <Text style={{ color: C.textSecondary, fontSize: 11 }}>{r.date}</Text>
              </View>
              <Stars rating={r.rating} size={11} />
              {r.title ? <Text style={{ color: C.text, fontWeight: "700", fontSize: 13, marginTop: 6 }}>{r.title}</Text> : null}
              <Text style={{ color: C.textSecondary, fontSize: 13, lineHeight: 19, marginTop: 2 }}>{r.comment}</Text>
            </View>
          ))}
        </View>

        {related.length > 0 ? (
          <View style={{ marginHorizontal: 20, marginBottom: 20 }}>
            <Text style={{ color: C.text, fontSize: 15, fontWeight: "800", marginBottom: 10 }}>Productos relacionados</Text>
            {related.map((rp) => (
              <TouchableOpacity
                key={rp.id}
                style={{ flexDirection: "row", backgroundColor: C.bgCard, borderRadius: 12, borderWidth: 1, borderColor: C.border, padding: 12, marginBottom: 10 }}
                onPress={() => navigation.replace("ProductoDetalle", { id: rp.id })}
              >
                <View style={{ width: 56, height: 56, borderRadius: 8, backgroundColor: C.bgSecondary, alignItems: "center", justifyContent: "center" }}>
                  <Text style={{ fontSize: 26 }}>{getCategoryEmoji(rp.category)}</Text>
                </View>
                <View style={{ flex: 1, marginLeft: 12, justifyContent: "center" }}>
                  <Text numberOfLines={2} style={{ color: C.text, fontWeight: "700", fontSize: 13 }}>{rp.name}</Text>
                  <Text style={{ color: C.textSecondary, fontSize: 11, marginTop: 2 }}>{rp.store}</Text>
                  <Text style={{ color: C.accent, fontWeight: "800", fontSize: 14, marginTop: 2 }}>{formatCOP(rp.price)}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : null}
      </ScrollView>

      <View style={{ position: "absolute", left: 0, right: 0, bottom: 0, backgroundColor: C.bgCard, borderTopWidth: 1, borderTopColor: C.border, padding: 16, flexDirection: "row", alignItems: "center", gap: 12 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ color: C.textSecondary, fontSize: 11 }}>Total</Text>
          <Text style={{ color: C.accent, fontSize: 18, fontWeight: "800" }}>{formatCOP(product.price)}</Text>
        </View>
        <TouchableOpacity
          style={{ backgroundColor: C.btnPrimary, borderRadius: 999, paddingVertical: 12, paddingHorizontal: 22, alignItems: "center" }}
          onPress={addToCart}
        >
          <Text style={{ color: "#fff", fontWeight: "700", fontSize: 14 }}>Agregar al carrito</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}