import AsyncStorage from "@react-native-async-storage/async-storage";
import type { CartItem } from "./cartStore";

export type PaymentMethod = "tarjeta" | "pse" | "contraentrega";

export interface Order {
  id: string;
  fecha: string;
  estado: string;
  items: CartItem[];
  subtotal: number;
  descuento: number;
  envio: number;
  total: number;
  metodo: PaymentMethod;
  banco: string;
  direccionEnvio: string;
  destinatario: string;
}

const ORDERS_KEY = "orders";

export const orderStore = {
  async get(): Promise<Order[]> {
    try {
      const raw = await AsyncStorage.getItem(ORDERS_KEY);
      return raw ? (JSON.parse(raw) as Order[]) : [];
    } catch {
      return [];
    }
  },
  async add(order: Order): Promise<Order[]> {
    const orders = await this.get();
    orders.push(order);
    try {
      await AsyncStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    } catch {
      // ignore
    }
    return orders;
  },
};