export interface Resena {
  id: number;
  usuario: string;
  fecha: string;
  calificacion: number;
  titulo?: string;
  comentario: string;
}

export interface Caracteristica {
  label: string;
  value: string;
}

export interface Tienda {
  nombre: string;
  logo: string;
  direccion: string;
  ciudad: string;
  calificacion: number;
  numResenas: number;
  ventas: number;
  miembrosDesde: string;
}

export interface Producto {
  id: number;
  nombre: string;
  desc: string;
  precio: number;
  antes: number | null;
  descuento: string | null;
  imagen: string;
  imagenes: string[];
  categoria: string;
  stock: number;
  tienda: Tienda;
  calificacion: number;
  numResenas: number;
  caracteristicas: Caracteristica[];
  reseñas: Resena[];
}

export const TIENDAS = {
  lubixTech: {
    nombre: "Lubix Tech",
    logo: "LT",
    direccion: "Cra 15 # 88 - 34, Local 203",
    ciudad: "Bogotá",
    calificacion: 4.8,
    numResenas: 1240,
    ventas: 3820,
    miembrosDesde: "2024",
  },
  audioPro: {
    nombre: "AudioPro Colombia",
    logo: "AP",
    direccion: "Av. El Poblado # 43A - 100",
    ciudad: "Medellín",
    calificacion: 4.6,
    numResenas: 862,
    ventas: 2140,
    miembrosDesde: "2024",
  },
  smartMovil: {
    nombre: "SmartMovil",
    logo: "SM",
    direccion: "Calle 93 # 13 - 52, CC Unicentro",
    ciudad: "Bogotá",
    calificacion: 4.4,
    numResenas: 1573,
    ventas: 5100,
    miembrosDesde: "2023",
  },
  compuCenter: {
    nombre: "CompuCenter",
    logo: "CC",
    direccion: "Carrera 70 # 4 - 30",
    ciudad: "Cali",
    calificacion: 4.7,
    numResenas: 638,
    ventas: 1890,
    miembrosDesde: "2024",
  },
  techSound: {
    nombre: "TechSound",
    logo: "TS",
    direccion: "Cl. 45 # 12 - 09, Centro Comercial",
    ciudad: "Barranquilla",
    calificacion: 4.5,
    numResenas: 421,
    ventas: 1130,
    miembrosDesde: "2025",
  },
  movilStore: {
    nombre: "MóvilStore",
    logo: "MS",
    direccion: "Av. Las Américas # 18N - 25",
    ciudad: "Cali",
    calificacion: 4.3,
    numResenas: 905,
    ventas: 2760,
    miembrosDesde: "2023",
  },
} as const;

export const PRODUCTOS: Producto[] = [
  {
    id: 1,
    nombre: 'MacBook Pro 14" M3 Pro',
    desc: "Laptop de alto rendimiento con chip M3 Pro para profesionales.",
    precio: 9562500,
    antes: 11250000,
    descuento: "-15%",
    imagen: "/macbook.png",
    imagenes: ["/macbook.png", "/macbook.png", "/macbook.png"],
    categoria: "Computadoras",
    stock: 12,
    tienda: TIENDAS.lubixTech,
    calificacion: 4.8,
    numResenas: 312,
    caracteristicas: [
      { label: "Procesador", value: "Apple M3 Pro (11 núcleos)" },
      { label: "Memoria RAM", value: "18 GB unificada" },
      { label: "Almacenamiento", value: "512 GB SSD" },
      { label: "Pantalla", value: '14.2" Liquid Retina XDR 3024x1964' },
      { label: "Batería", value: "Hasta 18 horas" },
      { label: "Puertos", value: "2x Thunderbolt 4, HDMI, SDXC" },
      { label: "Sistema operativo", value: "macOS Sonoma" },
      { label: "Garantía", value: "12 meses" },
    ],
    reseñas: [
      { id: 101, usuario: "Carlos Mendoza", fecha: "2026-06-15", calificacion: 5, titulo: "Excelente inversión", comentario: "Excelente rendimiento para desarrollo de software. La pantalla es increíble y la batería dura todo el día." },
      { id: 102, usuario: "Ana María Silva", fecha: "2026-06-10", calificacion: 4, titulo: "Muy buena", comentario: "Muy rápida, aunque calienta un poco cuando compilo proyectos grandes. Por lo demás, perfecta." },
      { id: 103, usuario: "Julián Rojas", fecha: "2026-05-28", calificacion: 5, titulo: "La mejor laptop", comentario: "La compré para edición de video y no me ha defraudado. El envío de Lubix Tech fue rapidísimo." },
    ],
  },
  {
    id: 2,
    nombre: "Auriculares Premium",
    desc: "Auriculares inalámbricos con cancelación activa de ruido.",
    precio: 1080000,
    antes: 1350000,
    descuento: "-20%",
    imagen: "/headphones.png",
    imagenes: ["/headphones.png", "/headphones.png", "/headphones.png"],
    categoria: "Audio",
    stock: 28,
    tienda: TIENDAS.audioPro,
    calificacion: 4.6,
    numResenas: 198,
    caracteristicas: [
      { label: "Tipo", value: "Over-ear inalámbricos" },
      { label: "Cancelación de ruido", value: "ANC híbrida activa" },
      { label: "Autonomía", value: "Hasta 40 horas" },
      { label: "Conexión", value: "Bluetooth 5.3 / 3.5 mm" },
      { label: "Carga", value: "USB-C, carga rápida (10 min = 5 h)" },
      { label: "Códecs", value: "SBC, AAC, aptX HD" },
      { label: "Garantía", value: "12 meses" },
    ],
    reseñas: [
      { id: 201, usuario: "David Restrepo", fecha: "2026-06-28", calificacion: 5, titulo: "Sonido brutal", comentario: "Los switches son muy suaves y el sonido se escucha genial. La cancelación de ruido es de otro nivel." },
      { id: 202, usuario: "Laura Gómez", fecha: "2026-06-22", calificacion: 4, titulo: "Muy buenos", comentario: "Muy buen producto por el precio, se sienten robustos y la almohadilla es cómoda." },
      { id: 203, usuario: "Andrés Pérez", fecha: "2026-05-30", calificacion: 5, titulo: "Recomendados", comentario: "Los uso para trabajar y viajar. La batería dura muchísimo. La tienda respondió muy bien mis dudas." },
    ],
  },
  {
    id: 3,
    nombre: "iPhone 15 Pro Max",
    desc: "256GB Titanio Azul, cámara profesional y chip A17 Pro.",
    precio: 5400000,
    antes: null,
    descuento: null,
    imagen: "/iphone15.png",
    imagenes: ["/iphone15.png", "/iphone15.png", "/iphone15.png"],
    categoria: "Celulares",
    stock: 8,
    tienda: TIENDAS.smartMovil,
    calificacion: 4.4,
    numResenas: 415,
    caracteristicas: [
      { label: "Almacenamiento", value: "256 GB" },
      { label: "Procesador", value: "Apple A17 Pro" },
      { label: "Pantalla", value: '6.7" Super Retina XDR, 120Hz' },
      { label: "Cámara", value: "Triple 48 MP + telefoto 5x" },
      { label: "Batería", value: "Hasta 29 horas de video" },
      { label: "Material", value: "Titanio azul" },
      { label: "Garantía", value: "12 meses" },
    ],
    reseñas: [
      { id: 301, usuario: "Valentina Torres", fecha: "2026-07-02", calificacion: 5, titulo: "Impresionante", comentario: "La cámara es espectacular y el rendimiento no tiene comparación. Llegó sellado y en perfecto estado." },
      { id: 302, usuario: "Felipe Duarte", fecha: "2026-06-25", calificacion: 4, titulo: "Muy bueno", comentario: "Excelente teléfono, solo le pongo 4 por el tiempo de entrega que fue un poco largo." },
      { id: 303, usuario: "María Fernanda", fecha: "2026-06-18", calificacion: 4, titulo: "Vale la pena", comentario: "El color titanio azul es hermoso y la batería dura dos días con uso normal." },
    ],
  },
  {
    id: 4,
    nombre: 'MacBook Pro 14" M3 Pro',
    desc: "Laptop de alto rendimiento con chip M3 Pro para profesionales.",
    precio: 9562500,
    antes: 11250000,
    descuento: "-15%",
    imagen: "/macbook.png",
    imagenes: ["/macbook.png", "/macbook.png", "/macbook.png"],
    categoria: "Computadoras",
    stock: 6,
    tienda: TIENDAS.compuCenter,
    calificacion: 4.7,
    numResenas: 145,
    caracteristicas: [
      { label: "Procesador", value: "Apple M3 Pro (11 núcleos)" },
      { label: "Memoria RAM", value: "18 GB unificada" },
      { label: "Almacenamiento", value: "512 GB SSD" },
      { label: "Pantalla", value: '14.2" Liquid Retina XDR 3024x1964' },
      { label: "Batería", value: "Hasta 18 horas" },
      { label: "Puertos", value: "2x Thunderbolt 4, HDMI, SDXC" },
      { label: "Sistema operativo", value: "macOS Sonoma" },
      { label: "Garantía", value: "12 meses" },
    ],
    reseñas: [
      { id: 401, usuario: "Santiago Peña", fecha: "2026-06-20", calificacion: 5, titulo: "Top", comentario: "CompuCenter me dio el mejor precio de la ciudad y el equipo llegó impecable." },
      { id: 402, usuario: "Diana Castillo", fecha: "2026-06-11", calificacion: 4, titulo: "Recomendada", comentario: "Rendimiento excelente para diseño. El soporte de la tienda respondió rápido." },
    ],
  },
  {
    id: 5,
    nombre: "Auriculares Premium",
    desc: "Auriculares inalámbricos con cancelación activa de ruido.",
    precio: 1080000,
    antes: 1350000,
    descuento: "-20%",
    imagen: "/headphones.png",
    imagenes: ["/headphones.png", "/headphones.png", "/headphones.png"],
    categoria: "Audio",
    stock: 35,
    tienda: TIENDAS.techSound,
    calificacion: 4.5,
    numResenas: 96,
    caracteristicas: [
      { label: "Tipo", value: "Over-ear inalámbricos" },
      { label: "Cancelación de ruido", value: "ANC híbrida activa" },
      { label: "Autonomía", value: "Hasta 40 horas" },
      { label: "Conexión", value: "Bluetooth 5.3 / 3.5 mm" },
      { label: "Carga", value: "USB-C, carga rápida (10 min = 5 h)" },
      { label: "Códecs", value: "SBC, AAC, aptX HD" },
      { label: "Garantía", value: "12 meses" },
    ],
    reseñas: [
      { id: 501, usuario: "Karen Suárez", fecha: "2026-06-27", calificacion: 5, titulo: "Me encantan", comentario: "Comodísimos y el sonido es cristalino. La tienda TechSound fue muy atenta en la entrega." },
      { id: 502, usuario: "Miguel Ángel", fecha: "2026-06-14", calificacion: 4, titulo: "Buenos", comentario: "Muy buena calidad, cumplen con lo prometido. El estuche es un poco grande pero todo bien." },
    ],
  },
  {
    id: 6,
    nombre: "iPhone 15 Pro Max",
    desc: "256GB Titanio Azul, cámara profesional y chip A17 Pro.",
    precio: 5400000,
    antes: null,
    descuento: null,
    imagen: "/iphone15.png",
    imagenes: ["/iphone15.png", "/iphone15.png", "/iphone15.png"],
    categoria: "Celulares",
    stock: 4,
    tienda: TIENDAS.movilStore,
    calificacion: 4.3,
    numResenas: 267,
    caracteristicas: [
      { label: "Almacenamiento", value: "256 GB" },
      { label: "Procesador", value: "Apple A17 Pro" },
      { label: "Pantalla", value: '6.7" Super Retina XDR, 120Hz' },
      { label: "Cámara", value: "Triple 48 MP + telefoto 5x" },
      { label: "Batería", value: "Hasta 29 horas de video" },
      { label: "Material", value: "Titanio azul" },
      { label: "Garantía", value: "12 meses" },
    ],
    reseñas: [
      { id: 601, usuario: "Camila Ortiz", fecha: "2026-06-29", calificacion: 4, titulo: "Buen teléfono", comentario: "El producto es original y llegó bien empacado. Le quito una estrella porque no incluyó el cargador." },
      { id: 602, usuario: "Ricardo Mora", fecha: "2026-06-16", calificacion: 5, titulo: "Excelente", comentario: "Todo perfecto, la tienda ofrece garantía extendida y eso me dio mucha confianza." },
    ],
  },
];

export function getProductoById(id: number | string): Producto | undefined {
  return PRODUCTOS.find((p) => String(p.id) === String(id));
}

export function getFavorites(): number[] {
  try {
    const raw = localStorage.getItem("favorites");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleFavorite(id: number): number[] {
  const favs = getFavorites();
  const updated = favs.includes(id) ? favs.filter((f) => f !== id) : [...favs, id];
  localStorage.setItem("favorites", JSON.stringify(updated));
  return updated;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export function getCart(): CartItem[] {
  try {
    const raw = localStorage.getItem("cart");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCart(cart: CartItem[]) {
  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(new CustomEvent("cart-changed"));
}

export function addToCart(prod: Producto, quantity = 1) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === prod.id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ id: prod.id, name: prod.nombre, price: prod.precio, image: prod.imagen, quantity });
  }
  saveCart(cart);
}

export function formatCOP(value: number) {
  return "$" + value.toLocaleString("es-CO", { maximumFractionDigits: 0 });
}

export const OFERTAS = [
  { titulo: "Oferta 1", descripcion: "Hasta 40% en laptops", color: "bg-gradient-to-tr from-emerald-500 to-green-700 text-white", imagen: "/portatil.png" },
  { titulo: "Oferta 2", descripcion: "Smartphones con 30% de descuento", color: "bg-gradient-to-tr from-emerald-950 to-gray-900 text-white", imagen: "/iphone.png" },
  { titulo: "Oferta 3", descripcion: "Accesorios 2x1", color: "bg-gradient-to-tr from-emerald-500 to-green-700 text-white", imagen: "/televisor.png" },
];