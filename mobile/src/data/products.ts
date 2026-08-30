export interface Review {
  id: number;
  user: string;
  date: string;
  rating: number;
  title?: string;
  comment: string;
}

export interface Spec {
  label: string;
  value: string;
}

export interface StoreInfo {
  logo: string;
  address: string;
  city: string;
  rating: number;
  reviewCount: number;
  sales: number;
  memberSince: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  images: string[];
  category: string;
  store: string;
  storeInfo: StoreInfo;
  stock: number;
  rating: number;
  reviewCount: number;
  specs: Spec[];
  reviews: Review[];
}

export const CATEGORIES = [
  "Computadoras",
  "Celulares",
  "Audio",
  "Cámaras",
  "Wearables",
  "Gaming",
];

const stores = {
  lubixTech: {
    logo: "LT",
    address: "Cra 15 # 88 - 34, Local 203",
    city: "Bogotá",
    rating: 4.8,
    reviewCount: 1240,
    sales: 3820,
    memberSince: "2024",
  },
  audioPro: {
    logo: "AP",
    address: "Av. El Poblado # 43A - 100",
    city: "Medellín",
    rating: 4.6,
    reviewCount: 862,
    sales: 2140,
    memberSince: "2024",
  },
  smartMovil: {
    logo: "SM",
    address: "Calle 93 # 13 - 52, CC Unicentro",
    city: "Bogotá",
    rating: 4.4,
    reviewCount: 1573,
    sales: 5100,
    memberSince: "2023",
  },
  compuCenter: {
    logo: "CC",
    address: "Carrera 70 # 4 - 30",
    city: "Cali",
    rating: 4.7,
    reviewCount: 638,
    sales: 1890,
    memberSince: "2024",
  },
  techSound: {
    logo: "TS",
    address: "Cl. 45 # 12 - 09, Centro Comercial",
    city: "Barranquilla",
    rating: 4.5,
    reviewCount: 421,
    sales: 1130,
    memberSince: "2025",
  },
  movilStore: {
    logo: "MS",
    address: "Av. Las Américas # 18N - 25",
    city: "Cali",
    rating: 4.3,
    reviewCount: 905,
    sales: 2760,
    memberSince: "2023",
  },
};

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Laptop Asus TUF Gaming F15",
    description: "Laptop gamer RTX 4060, 16GB RAM, 512GB SSD",
    price: 3150000,
    originalPrice: 4200000,
    discount: 25,
    image: "https://placehold.co/400x300?text=Laptop",
    images: [
      "https://placehold.co/400x300?text=Laptop",
      "https://placehold.co/400x300?text=Laptop+2",
      "https://placehold.co/400x300?text=Laptop+3",
    ],
    category: "Computadoras",
    store: "Lubix Tech",
    storeInfo: stores.lubixTech,
    stock: 12,
    rating: 4.8,
    reviewCount: 312,
    specs: [
      { label: "Procesador", value: "Intel Core i7 13620H" },
      { label: "GPU", value: "NVIDIA RTX 4060 8GB" },
      { label: "Memoria RAM", value: "16 GB DDR5" },
      { label: "Almacenamiento", value: "512 GB NVMe SSD" },
      { label: "Pantalla", value: '15.6" FHD 144Hz' },
      { label: "Sistema operativo", value: "Windows 11 Home" },
      { label: "Garantía", value: "12 meses" },
    ],
    reviews: [
      { id: 101, user: "Carlos Mendoza", date: "2026-06-15", rating: 5, title: "Excelente rendimiento", comment: "Corre todo en ultra sin problemas. La pantalla 144Hz se ve increíble." },
      { id: 102, user: "Ana María Silva", date: "2026-06-10", rating: 4, title: "Muy buena", comment: "Muy rápida, aunque se calienta un poco en sesiones largas de juego." },
      { id: 103, user: "Julián Rojas", date: "2026-05-28", rating: 5, title: "La mejor compra", comment: "La compré para streaming y no me ha defraudado. Envío rapidísimo." },
    ],
  },
  {
    id: 2,
    name: "iPhone 16 Pro 256GB",
    description: "Smartphone Apple con chip A18 Pro",
    price: 5890000,
    originalPrice: 6400000,
    discount: 8,
    image: "https://placehold.co/400x300?text=iPhone",
    images: [
      "https://placehold.co/400x300?text=iPhone",
      "https://placehold.co/400x300?text=iPhone+2",
      "https://placehold.co/400x300?text=iPhone+3",
    ],
    category: "Celulares",
    store: "SmartMovil",
    storeInfo: stores.smartMovil,
    stock: 8,
    rating: 4.6,
    reviewCount: 415,
    specs: [
      { label: "Almacenamiento", value: "256 GB" },
      { label: "Procesador", value: "Apple A18 Pro" },
      { label: "Pantalla", value: '6.3" ProMotion 120Hz' },
      { label: "Cámara", value: "Triple 48 MP" },
      { label: "Batería", value: "Hasta 27 horas de video" },
      { label: "Material", value: "Titanio" },
      { label: "Garantía", value: "12 meses" },
    ],
    reviews: [
      { id: 201, user: "Valentina Torres", date: "2026-07-02", rating: 5, title: "Impresionante", comment: "La cámara es espectacular y el rendimiento no tiene comparación." },
      { id: 202, user: "Felipe Duarte", date: "2026-06-25", rating: 4, title: "Muy bueno", comment: "Excelente teléfono, solo le quito una estrella por el tiempo de entrega." },
      { id: 203, user: "María Fernanda", date: "2026-06-18", rating: 5, title: "Vale la pena", comment: "La batería dura dos días con uso normal." },
    ],
  },
  {
    id: 3,
    name: "Samsung Galaxy S24 Ultra",
    description: "Smartphone premium con cámara 200MP",
    price: 5200000,
    image: "https://placehold.co/400x300?text=Galaxy",
    images: [
      "https://placehold.co/400x300?text=Galaxy",
      "https://placehold.co/400x300?text=Galaxy+2",
      "https://placehold.co/400x300?text=Galaxy+3",
    ],
    category: "Celulares",
    store: "MóvilStore",
    storeInfo: stores.movilStore,
    stock: 5,
    rating: 4.4,
    reviewCount: 267,
    specs: [
      { label: "Almacenamiento", value: "256 GB" },
      { label: "Procesador", value: "Snapdragon 8 Gen 3" },
      { label: "Pantalla", value: '6.8" QHD+ 120Hz' },
      { label: "Cámara", value: "Cuádruple 200 MP" },
      { label: "Batería", value: "5000 mAh" },
      { label: "S-Pen", value: "Incluido" },
      { label: "Garantía", value: "12 meses" },
    ],
    reviews: [
      { id: 301, user: "Camila Ortiz", date: "2026-06-29", rating: 4, title: "Buen teléfono", comment: "El producto llegó bien empacado. No incluye cargador." },
      { id: 302, user: "Ricardo Mora", date: "2026-06-16", rating: 5, title: "Excelente", comment: "La cámara con zoom 100x es increíble." },
    ],
  },
  {
    id: 4,
    name: "Audífonos Sony WH-1000XM5",
    description: "Audífonos con cancelación de ruido",
    price: 1450000,
    originalPrice: 1700000,
    discount: 15,
    image: "https://placehold.co/400x300?text=Sony",
    images: [
      "https://placehold.co/400x300?text=Sony",
      "https://placehold.co/400x300?text=Sony+2",
      "https://placehold.co/400x300?text=Sony+3",
    ],
    category: "Audio",
    store: "AudioPro Colombia",
    storeInfo: stores.audioPro,
    stock: 20,
    rating: 4.6,
    reviewCount: 198,
    specs: [
      { label: "Tipo", value: "Over-ear inalámbricos" },
      { label: "Cancelación de ruido", value: "ANC híbrida activa" },
      { label: "Autonomía", value: "Hasta 40 horas" },
      { label: "Conexión", value: "Bluetooth 5.3 / 3.5 mm" },
      { label: "Carga", value: "USB-C, carga rápida" },
      { label: "Códecs", value: "SBC, AAC, LDAC" },
      { label: "Garantía", value: "12 meses" },
    ],
    reviews: [
      { id: 401, user: "David Restrepo", date: "2026-06-28", rating: 5, title: "Sonido brutal", comment: "La cancelación de ruido es de otro nivel." },
      { id: 402, user: "Laura Gómez", date: "2026-06-22", rating: 4, title: "Muy buenos", comment: "Muy buen producto por el precio, se sienten robustos." },
    ],
  },
  {
    id: 5,
    name: "Cámara Canon EOS R50",
    description: "Cámara mirrorless con lente 18-45mm",
    price: 2650000,
    image: "https://placehold.co/400x300?text=Canon",
    images: [
      "https://placehold.co/400x300?text=Canon",
      "https://placehold.co/400x300?text=Canon+2",
      "https://placehold.co/400x300?text=Canon+3",
    ],
    category: "Cámaras",
    store: "Lubix Tech",
    storeInfo: stores.lubixTech,
    stock: 6,
    rating: 4.7,
    reviewCount: 145,
    specs: [
      { label: "Sensor", value: "APS-C 24.2 MP" },
      { label: "Video", value: "4K 30p" },
      { label: "Enfoque", value: "Dual Pixel CMOS AF II" },
      { label: "Lente", value: "RF-S 18-45mm" },
      { label: "Pantalla", value: '3" táctil articulada' },
      { label: "Conectividad", value: "Wi-Fi y Bluetooth" },
      { label: "Garantía", value: "12 meses" },
    ],
    reviews: [
      { id: 501, user: "Santiago Peña", date: "2026-06-20", rating: 5, title: "Top", comment: "Ideal para iniciar en fotografía, la calidad es excelente." },
      { id: 502, user: "Diana Castillo", date: "2026-06-11", rating: 4, title: "Recomendada", comment: "Rendimiento excelente, el soporte de la tienda respondió rápido." },
    ],
  },
  {
    id: 6,
    name: "Reloj Smart Watch Serie 9",
    description: "Smartwatch con pantalla siempre activa",
    price: 950000,
    originalPrice: 1150000,
    discount: 17,
    image: "https://placehold.co/400x300?text=Watch",
    images: [
      "https://placehold.co/400x300?text=Watch",
      "https://placehold.co/400x300?text=Watch+2",
      "https://placehold.co/400x300?text=Watch+3",
    ],
    category: "Wearables",
    store: "CompuCenter",
    storeInfo: stores.compuCenter,
    stock: 15,
    rating: 4.5,
    reviewCount: 96,
    specs: [
      { label: "Pantalla", value: "OLED siempre activa" },
      { label: "Batería", value: "Hasta 18 horas" },
      { label: "Resistencia", value: "50 metros" },
      { label: "Sensores", value: "ECG, oxígeno, ritmo" },
      { label: "Conectividad", value: "Bluetooth 5.3" },
      { label: "Garantía", value: "12 meses" },
    ],
    reviews: [
      { id: 601, user: "Karen Suárez", date: "2026-06-27", rating: 5, title: "Me encanta", comment: "La batería dura muchísimo y las mediciones son precisas." },
      { id: 602, user: "Miguel Ángel", date: "2026-06-14", rating: 4, title: "Buenos", comment: "Cumple con lo prometido. El estuche es un poco grande." },
    ],
  },
];

export function getProductById(id: number | string): Product | undefined {
  return PRODUCTS.find((p) => String(p.id) === String(id));
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  return PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, limit);
}

export function getCategoryEmoji(category: string): string {
  switch (category) {
    case "Audio":
      return "🎧";
    case "Cámaras":
      return "📷";
    case "Wearables":
      return "⌚";
    case "Gaming":
      return "🎮";
    case "Celulares":
      return "📱";
    default:
      return "💻";
  }
}

export const ofertas = [
  {
    titulo: "Asus Tuf Gaming F15",
    descripcion: "Hasta 40% en laptops",
    color: "#134e4a",
  },
  {
    titulo: "iPhone 16 Pro",
    descripcion: "Smartphones con 30% de descuento",
    color: "#111827",
  },
  {
    titulo: "Samsung Galaxy Tv",
    descripcion: "Accesorios 2x1",
    color: "#134e4a",
  },
];

export const formatCOP = (value: number) =>
  "$" + value.toLocaleString("es-CO", { maximumFractionDigits: 0 });