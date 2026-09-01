import React, { useState } from "react";
import type { ComponentProps } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import type IoniconsType from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTheme } from "../../context/ThemeContext";
import { useCheckout } from "../../context/CheckoutContext";
import CheckoutHeader from "../../components/CheckoutHeader";
import { Button } from "../../components/ui";
import { formatCOP } from "../../utils/format";
import { errorDetailMessage } from "../../utils/errors";
import type { PaymentMethod } from "../../types/order";
import type { CheckoutStackParamList } from "../../navigation/types";

type Nav = NativeStackNavigationProp<CheckoutStackParamList, "Pago">;

type PayGlyph = ComponentProps<typeof IoniconsType>["name"];

const BANCOS = [
  "Bancolombia",
  "Banco de Bogotá",
  "BBVA Colombia",
  "Davivienda",
  "Banco Popular",
  "Scotiabank Colpatria",
  "Nequi",
  "Banco Agrario",
];

const METHODS: Array<{ key: PaymentMethod; label: string; icon: PayGlyph }> = [
  { key: "tarjeta", label: "Tarjeta de crédito/débito", icon: "card" },
  { key: "pse", label: "PSE", icon: "business" },
];

function detectCardType(num: string): string {
  const n = num.replace(/\s/g, "");
  if (/^4/.test(n)) return "Visa";
  if (/^(5[1-5]|2[2-7])/.test(n)) return "Mastercard";
  if (/^3[47]/.test(n)) return "Amex";
  if (/^(30[0-5]|36|38)/.test(n)) return "Diners";
  return "";
}

function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  const type = detectCardType(digits);
  if (type === "Amex") {
    return digits
      .replace(/^(\d{4})(\d{0,6})(\d{0,5})$/, (_, a, b, c) => [a, b, c].filter(Boolean).join(" "));
  }
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return digits.slice(0, 2) + "/" + digits.slice(2);
}

function luhnCheck(num: string): boolean {
  const digits = num.replace(/\D/g, "");
  if (digits.length < 13) return false;
  let sum = 0;
  let double = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = parseInt(digits[i], 10);
    if (double) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    double = !double;
  }
  return sum % 10 === 0;
}

function isValidExpiry(exp: string): boolean {
  const m = exp.match(/^(\d{2})\/(\d{2})$/);
  if (!m) return false;
  const month = parseInt(m[1], 10);
  if (month < 1 || month > 12) return false;
  const year = 2000 + parseInt(m[2], 10);
  const now = new Date();
  const expDate = new Date(year, month, 0);
  return expDate >= new Date(now.getFullYear(), now.getMonth(), 1);
}

export default function MetodoPagoScreen() {
  const navigation = useNavigation<Nav>();
  const { C } = useTheme();
  const {
    paymentMethod,
    setPaymentMethod,
    address,
    total,
    submitting,
    submit,
  } = useCheckout();

  const [card, setCard] = useState({ number: "", holder: "", expiry: "", cvv: "" });
  const [bank, setBank] = useState("");
  const [bankOpen, setBankOpen] = useState(false);
  const [error, setError] = useState("");

  const cardType = detectCardType(card.number);

  const validate = (): string | null => {
    if (!address) return "Falta la dirección de envío.";
    if (paymentMethod === "tarjeta") {
      const digits = card.number.replace(/\s/g, "");
      if (!digits) return "Ingresa el número de la tarjeta.";
      if (digits.length < 15) return "Número incompleto.";
      if (!luhnCheck(digits)) return "Número de tarjeta inválido.";
      if (!card.holder.trim()) return "Ingresa el nombre del titular.";
      if (!card.expiry.trim()) return "La fecha de expiración es obligatoria.";
      if (!isValidExpiry(card.expiry)) return "Fecha de expiración inválida o expirada.";
      if (!card.cvv.trim()) return "El CVV es obligatorio.";
      if (card.cvv.length < (detectCardType(card.number) === "Amex" ? 4 : 3))
        return "CVV incompleto.";
    }
    if (paymentMethod === "pse" && !bank) return "Selecciona tu banco.";
    return null;
  };

  const pay = async () => {
    if (submitting) return;
    const validation = validate();
    if (validation) {
      setError(validation);
      return;
    }
    setError("");
    try {
      const orderId = await submit();
      navigation.replace("Confirmacion", { orderId });
    } catch (e: unknown) {
      const isMissingAddress =
        e instanceof Error && e.message === "Falta la dirección de envío";
      const msg = isMissingAddress
        ? ""
        : errorDetailMessage(e, "");
      setError(msg || "No se pudo procesar el pago. Intenta de nuevo.");
    }
  };

  const selectBank = (name: string) => {
    setBank(name);
    setBankOpen(false);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.screen, { backgroundColor: C.bg }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <CheckoutHeader step={2} />
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 24 }}>
        <Text style={[styles.title, { color: C.text }]}>Método de pago</Text>
        <Text style={[styles.subtitle2, { color: C.textSecondary }]}>
          Selecciona cómo quieres pagar tu compra.
        </Text>

        {METHODS.map((method) => {
          const active = paymentMethod === method.key;
          return (
            <TouchableOpacity
              key={method.key}
              style={[
                styles.methodCard,
                { backgroundColor: C.bgCard, borderColor: active ? C.accent : C.border, borderWidth: 2 },
              ]}
              onPress={() => setPaymentMethod(method.key)}
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <View style={[styles.radio, { borderColor: active ? C.accent : C.border }]}>
                  {active && <View style={[styles.radioInner, { backgroundColor: C.accent }]} />}
                </View>
                <Ionicons name={method.icon} size={20} color={active ? C.accent : C.textSecondary} />
                <Text style={{ color: C.text, fontWeight: "700", fontSize: 14 }}>{method.label}</Text>
              </View>
            </TouchableOpacity>
          );
        })}

        {paymentMethod === "tarjeta" && (
          <View style={[styles.formCard, { backgroundColor: C.bgCard, borderColor: C.border }]}>
            <Text style={[styles.subtitle, { color: C.text }]}>Datos de la tarjeta</Text>

            <TextField
              label="Número de tarjeta *"
              value={card.number}
              onChangeText={(v) => setCard({ ...card, number: formatCardNumber(v) })}
              placeholder="4111 1111 1111 1111"
              keyboardType="number-pad"
              badge={cardType || undefined}
            />
            <TextField
              label="Nombre del titular *"
              value={card.holder}
              onChangeText={(v) => setCard({ ...card, holder: v })}
              placeholder="Como aparece en la tarjeta"
            />
            <View style={{ flexDirection: "row", gap: 10 }}>
              <View style={{ flex: 1 }}>
                <TextField
                  label="Expiración *"
                  value={card.expiry}
                  onChangeText={(v) => setCard({ ...card, expiry: formatExpiry(v) })}
                  placeholder="MM/AA"
                  keyboardType="number-pad"
                />
              </View>
              <View style={{ flex: 1 }}>
                <TextField
                  label="CVV *"
                  value={card.cvv}
                  onChangeText={(v) =>
                    setCard({ ...card, cvv: v.replace(/\D/g, "").slice(0, 4) })
                  }
                  placeholder={cardType === "Amex" ? "1234" : "123"}
                  keyboardType="number-pad"
                  secureTextEntry
                />
              </View>
            </View>
            <View style={styles.securityNote}>
              <Ionicons name="lock-closed" size={13} color={C.textSecondary} />
              <Text style={{ color: C.textSecondary, fontSize: 11, flex: 1 }}>
                Tus datos de pago están protegidos y cifrados. No se almacenan en nuestro servidor.
              </Text>
            </View>
          </View>
        )}

        {paymentMethod === "pse" && (
          <View style={[styles.formCard, { backgroundColor: C.bgCard, borderColor: C.border }]}>
            <Text style={[styles.subtitle, { color: C.text }]}>Entidad bancaria</Text>
            <Text style={{ color: C.textSecondary, fontSize: 12, marginBottom: 8 }}>
              Selecciona tu banco *
            </Text>
            <TouchableOpacity
              style={[
                styles.bankSelect,
                { backgroundColor: C.inputBg, borderColor: C.inputBorder },
              ]}
              onPress={() => setBankOpen(!bankOpen)}
            >
              <Text style={{ color: bank ? C.text : C.textSecondary, fontSize: 14, flex: 1 }}>
                {bank || "-- Elige un banco --"}
              </Text>
              <Ionicons name={bankOpen ? "chevron-up" : "chevron-down"} size={18} color={C.textSecondary} />
            </TouchableOpacity>
            {bankOpen && (
              <View style={[styles.bankList, { backgroundColor: C.bgCard, borderColor: C.border }]}>
                {BANCOS.map((b) => {
                  const selected = bank === b;
                  return (
                    <TouchableOpacity
                      key={b}
                      style={[styles.bankOption, { borderBottomColor: C.border }]}
                      onPress={() => selectBank(b)}
                    >
                      <Text style={{ color: selected ? C.accent : C.text, fontWeight: selected ? "700" : "400" }}>
                        {b}
                      </Text>
                      {selected && <Ionicons name="checkmark-circle" size={18} color={C.accent} />}
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
            <View style={styles.securityNote}>
              <Ionicons name="business" size={13} color={C.textSecondary} />
              <Text style={{ color: C.textSecondary, fontSize: 11, flex: 1 }}>
                Serás redirigido a la pasarela de tu banco para autorizar el pago de forma segura.
              </Text>
            </View>
          </View>
        )}

        {error ? <Text style={{ color: C.errorText, marginTop: 12 }}>{error}</Text> : null}

        <View style={[styles.summary, { backgroundColor: C.bgCard, borderColor: C.border }]}>
          <View style={styles.sumRow}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6, flex: 1 }}>
              <Ionicons name="location-outline" size={14} color={C.textSecondary} />
              <Text style={{ color: C.textSecondary, flex: 1 }}>
                {address?.address}, {address?.city}
              </Text>
            </View>
          </View>
          <View style={[styles.sumRow, styles.grand]}>
            <Text style={{ color: C.text, fontSize: 16, fontWeight: "800" }}>Total a pagar</Text>
            <Text style={{ color: C.accent, fontSize: 20, fontWeight: "900" }}>{formatCOP(total)}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: C.bgCard, borderTopColor: C.border }]}>
        <Button
          title={submitting ? "Procesando pago..." : "Confirmar y pagar"}
          onPress={pay}
          loading={submitting}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

function TextField({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  secureTextEntry,
  badge,
}: {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
  keyboardType?: "number-pad" | "default";
  secureTextEntry?: boolean;
  badge?: string;
}) {
  const { C } = useTheme();
  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={{ color: C.textSecondary, fontSize: 12, marginBottom: 5 }}>{label}</Text>
      <View style={{ position: "relative" }}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={C.textSecondary}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          style={[
            styles.input,
            {
              backgroundColor: C.inputBg,
              borderColor: C.inputBorder,
              color: C.text,
              paddingRight: badge ? 62 : 14,
            },
          ]}
        />
        {badge ? (
          <View
            style={[
              styles.badge,
              { position: "absolute", right: 10, top: "50%", marginTop: -11 },
            ]}
          >
            <Text style={[styles.badgeText, { color: C.text }]}>{badge}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  title: { fontSize: 19, fontWeight: "800", marginBottom: 4 },
  subtitle2: { fontSize: 13, marginBottom: 14 },
  subtitle: { fontSize: 14, fontWeight: "700", marginBottom: 12 },
  methodCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    marginBottom: 12,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: { width: 10, height: 10, borderRadius: 5 },
  formCard: { borderRadius: 14, borderWidth: 1, padding: 16, marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: "rgba(127,127,127,0.15)",
  },
  badgeText: { fontSize: 11, fontWeight: "700" },
  bankSelect: {
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  bankList: {
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 6,
    overflow: "hidden",
  },
  bankOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  securityNote: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 10,
  },
  summary: { borderRadius: 14, borderWidth: 1, padding: 16, marginTop: 12, gap: 8 },
  sumRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  grand: { borderTopWidth: 1, borderTopColor: "rgba(0,0,0,0.08)", paddingTop: 10 },
  footer: { borderTopWidth: 1, padding: 16 },
});