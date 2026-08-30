import AsyncStorage from "@react-native-async-storage/async-storage";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const CART_KEY = "cart";
const FAV_KEY = "favorites";

export const cartStore = {
  async get(): Promise<CartItem[]> {
    try {
      const raw = await AsyncStorage.getItem(CART_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  },
  async set(cart: CartItem[]): Promise<void> {
    try {
      await AsyncStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
      // ignore
    }
  },
  async add(item: { id: number; name: string; price: number; image: string }): Promise<CartItem[]> {
    const cart = await this.get();
    const existing = cart.find((c) => c.id === item.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }
    await this.set(cart);
    return cart;
  },
  async updateQuantity(id: number, delta: number): Promise<CartItem[]> {
    const cart = await this.get();
    const updated = cart.map((i) =>
      i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i
    );
    await this.set(updated);
    return updated;
  },
  async remove(id: number): Promise<CartItem[]> {
    const cart = await this.get();
    const updated = cart.filter((i) => i.id !== id);
    await this.set(updated);
    return updated;
  },
  async clear(): Promise<void> {
    try {
      await AsyncStorage.removeItem(CART_KEY);
    } catch {
      // ignore
    }
  },
};

export const favoritesStore = {
  async get(): Promise<number[]> {
    try {
      const raw = await AsyncStorage.getItem(FAV_KEY);
      return raw ? (JSON.parse(raw) as number[]) : [];
    } catch {
      return [];
    }
  },
  async toggle(id: number): Promise<number[]> {
    const favs = await this.get();
    const updated = favs.includes(id) ? favs.filter((f) => f !== id) : [...favs, id];
    await AsyncStorage.setItem(FAV_KEY, JSON.stringify(updated)).catch(() => {});
    return updated;
  },
  async remove(id: number): Promise<number[]> {
    const favs = await this.get();
    const updated = favs.filter((f) => f !== id);
    await AsyncStorage.setItem(FAV_KEY, JSON.stringify(updated)).catch(() => {});
    return updated;
  },
};