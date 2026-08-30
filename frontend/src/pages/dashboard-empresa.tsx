import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar-empresa';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import {
  StarIcon,
  ArrowTrendingUpIcon,
  CubeIcon,          
  EyeIcon,
  CurrencyDollarIcon,
  PlusIcon,
  TrashIcon,          
  XMarkIcon,          
  ArrowUpTrayIcon,    
  ChevronRightIcon,
  PencilSquareIcon,   
  CameraIcon,
  EnvelopeIcon,       
  PhoneIcon,
  CalendarIcon,
  ShieldCheckIcon,    
  ChartBarIcon        
} from "@heroicons/react/24/outline";

type Tab = 'products' | 'profile' | 'stats';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  sold: number;
  views: number;
  rating: number;
  stock: number;
  active: boolean;
  category: string;
}

interface ProductForm {
  name: string;
  price: string;
  stock: string;
  category: string;
  description: string;
  brand: string;
  model: string;
  warranty: string;
  weight: string;
  dimensions: string;
  imageUrl: string;
}

interface SellerInfo {
  name: string;
  email: string;
  phone: string;
  memberSince: string;
  rating: number;
  totalSales: number;
  totalReviews: number;
  avatar: string;
}

const INITIAL_PRODUCTS: Product[] = [];

const EMPTY_FORM: ProductForm = {
  name: '',
  price: '',
  stock: '',
  category: '',
  description: '',
  brand: '',
  model: '',
  warranty: '',
  weight: '',
  dimensions: '',
  imageUrl: '',
};

const REFERENCE_IMAGE = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop';

const INITIAL_SELLER_INFO: SellerInfo = {
  name: '',
  email: '',
  phone: '',
  memberSince: '',
  rating: 0,
  totalSales: 0,
  totalReviews: 0,
  avatar: '',
};

export default function SellerDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('products');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [sellerInfo, setSellerInfo] = useState<SellerInfo>(INITIAL_SELLER_INFO);
  const [loading, setLoading] = useState(true);
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  
  const [form, setForm] = useState<ProductForm>(EMPTY_FORM);
  const [imagePreview, setImagePreview] = useState('');
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [meRes, profileRes] = await Promise.all([
        api.get("/company/dashboard/me"),
        api.get("/company/dashboard/my-profile")
      ]);

      const me = meRes.data;
      const profile = profileRes.data;

      setSellerInfo({
        name: me.nameCompany || profile.nameCompany || user?.name || "",
        email: me.addressCompany || profile.emailCompany || "",
        phone: profile.tellCompany || user?.email || "",
        memberSince: me.memberAT ? new Date(me.memberAT).toLocaleDateString() : "",
        rating: me.stars || profile.averageRating || 0,
        totalSales: me.sales || profile.completeSales || 0,
        totalReviews: me.reviews || profile.totalReviews || 0,
        avatar: (me.nameCompany || "V").charAt(0).toUpperCase(),
      });

      setProfileForm({
        name: profile.nameCompany || me.nameCompany || "",
        email: profile.emailCompany || "",
        phone: profile.tellCompany || "",
      });
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  const totalRevenue = products.reduce((acc, p) => acc + p.price * p.sold, 0);
  const activeProducts = products.filter((p) => p.active);

  const toggleActive = (id: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p))
    );
  };

  const deleteProduct = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setShowDeleteConfirm(null);
  };

  const handleFormChange = (field: keyof ProductForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field === 'imageUrl') setImagePreview(value);
  };

  const handleAddProduct = () => {
    if (!form.name || !form.price || !form.stock) return;
    const newProduct: Product = {
      id: Date.now(),
      name: form.name,
      price: parseInt(form.price.replace(/\D/g, '')) || 0,
      image: form.imageUrl || REFERENCE_IMAGE,
      sold: 0,
      views: 0,
      rating: 0,
      stock: parseInt(form.stock) || 0,
      active: true,
      category: form.category || 'General',
    };
    setProducts((prev) => [newProduct, ...prev]);
    setForm(EMPTY_FORM);
    setImagePreview('');
    setShowAddModal(false);
  };

  const openEditProfile = () => {
    setProfileForm({
      name: sellerInfo.name,
      email: sellerInfo.email,
      phone: sellerInfo.phone,
    });
    setShowEditProfileModal(true);
  };

  const handleUpdateProfile = async () => {
    if (!profileForm.name.trim()) return;

    try {
      await api.patch("/company/dashboard/upgrade-my-profile", {
        nameCompany: profileForm.name,
        emailCompany: profileForm.email,
        tellCompany: profileForm.phone,
      });

      setSellerInfo((prev) => ({
        ...prev,
        name: profileForm.name,
        email: profileForm.email,
        phone: profileForm.phone,
        avatar: profileForm.name.charAt(0).toUpperCase() || 'V',
      }));
      setShowEditProfileModal(false);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'products', label: 'Mis Productos', icon: <CubeIcon className="w-4 h-4" /> },
    { id: 'stats', label: 'Estadísticas', icon: <ChartBarIcon className="w-4 h-4" /> },
    { id: 'profile', label: 'Mi Perfil', icon: <ShieldCheckIcon className="w-4 h-4" /> },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 mb-8 shadow-xl shadow-green-500/20">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              <div className="w-24 h-24 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center text-4xl font-bold text-green-500 shadow-lg border-4 border-white/20">
                {sellerInfo.avatar}
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-400 transition-colors">
                <CameraIcon className="w-4 h-4 text-white" />
              </button>
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start mb-1">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{sellerInfo.name}</h1>
                <span className="bg-green-500/20 border border-green-500/40 text-green-300 text-xs px-2 py-0.5 rounded-full font-medium">Vendedor</span>
              </div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-green-100 mt-2">
                <div className="flex items-center gap-1">
                  <StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{sellerInfo.rating}</span>
                  <span className="text-sm">({sellerInfo.totalReviews} reseñas)</span>
                </div>
                <div className="flex items-center gap-1">
                  <CubeIcon className="w-4 h-4" />
                  <span>{sellerInfo.totalSales} ventas</span>
                </div>
                <div className="text-sm">Miembro desde {sellerInfo.memberSince}</div>
              </div>
            </div>
            <button 
              onClick={openEditProfile}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-lg transition-colors border border-white/20"
            >
              <PencilSquareIcon className="w-4 h-4" />
              Editar perfil
            </button>
          </div>
        </div>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                  : 'bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:bg-slate-700'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'products' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Mis Productos <span className="text-gray-500 font-normal text-base">({products.length})</span></h2>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-green-500/30 hover:shadow-green-500/50"
              >
                <PlusIcon className="w-5 h-5" />
                Agregar producto
              </button>
            </div>

            {products.length === 0 ? (
              <div className="text-center py-20 text-gray-500 dark:text-gray-400">
                <CubeIcon className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium">No tienes productos aún</p>
                <p className="text-sm mt-1">Agrega tu primer producto para empezar a vender</p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="mt-4 inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white px-5 py-2.5 rounded-xl font-semibold transition-all"
                >
                  <PlusIcon className="w-5 h-5" />
                  Agregar producto
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className={`bg-white dark:bg-slate-900 rounded-xl border transition-all overflow-hidden ${
                      product.active
                        ? 'border-gray-200 dark:border-slate-800 hover:border-green-500/40 hover:shadow-lg hover:shadow-green-500/10'
                        : 'border-gray-200 dark:border-slate-700 opacity-60'
                    }`}
                  >
                    <div className="relative aspect-square bg-gray-100 dark:bg-slate-800">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      <div className={`absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded-full border ${
                        product.active
                          ? 'bg-green-500/20 border-green-500/40 text-green-300'
                          : 'bg-red-500/20 border-red-500/40 text-red-300'
                      }`}>
                        {product.active ? 'Activo' : 'Inactivo'}
                      </div>
                      <div className="absolute top-2 right-2 bg-white dark:bg-slate-900/90 backdrop-blur-sm px-2 py-0.5 rounded-lg text-xs font-semibold text-green-400 border border-gray-200 dark:border-slate-700">
                        Stock: {product.stock}
                      </div>
                    </div>

                    <div className="p-4">
                      <Link to={`/seller/product/${product.id}`} className="block mb-2">
                        <h3 className="text-gray-700 dark:text-gray-200 font-semibold line-clamp-2 h-11 hover:text-green-400 transition-colors text-sm">
                          {product.name}
                        </h3>
                      </Link>
                      <div className="text-green-400 font-bold mb-3">
                        ${product.price.toLocaleString('es-CO')}
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                        <div className="flex items-center gap-1">
                          <ArrowTrendingUpIcon className="w-3.5 h-3.5" />
                          <span>{product.sold} vendidos</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <EyeIcon className="w-3.5 h-3.5" />
                          <span>{product.views}</span>
                        </div>
                        {product.rating > 0 && (
                          <div className="flex items-center gap-1">
                            <StarIcon className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                            <span className="text-gray-600 dark:text-gray-300">{product.rating}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleActive(product.id)}
                          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                            product.active
                              ? 'bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20'
                              : 'bg-green-500/10 border border-green-500/30 text-green-400 hover:bg-green-500/20'
                          }`}
                          title={product.active ? 'Desactivar' : 'Activar'}
                        >
                          <span className={`w-6 h-3.5 flex items-center bg-gray-200 dark:bg-slate-700 rounded-full p-0.5 duration-300 ease-in-out ${product.active ? 'bg-yellow-500/40' : 'bg-green-500/40'}`}>
                            <span className={`bg-white w-2.5 h-2.5 rounded-full shadow-md transform duration-300 ease-in-out ${product.active ? 'translate-x-0' : 'translate-x-2.5'}`}></span>
                          </span>
                          {product.active ? 'Desactivar' : 'Activar'}
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(product.id)}
                          className="w-9 h-9 flex items-center justify-center bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 rounded-lg transition-all"
                          title="Eliminar producto"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Productos activos', value: activeProducts.length, icon: <CubeIcon className="w-5 h-5 text-green-400" /> },
                { label: 'Ventas totales', value: products.reduce((a, p) => a + p.sold, 0), icon: <ArrowTrendingUpIcon className="w-5 h-5 text-blue-400" /> },
                { label: 'Ingresos totales', value: `$${(totalRevenue / 1000000).toFixed(1)}M`, icon: <CurrencyDollarIcon className="w-5 h-5 text-yellow-400" /> },
                { label: 'Calificación', value: sellerInfo.rating, icon: <StarIcon className="w-5 h-5 text-yellow-400 fill-yellow-400" /> },
              ].map((stat) => (
                <div key={stat.label} className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-500 dark:text-gray-400 text-sm">{stat.label}</span>
                    {stat.icon}
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 p-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-5">Rendimiento por producto</h2>
              {products.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">No hay productos para mostrar</p>
              ) : (
                <div className="space-y-4">
                  {products.map((p) => {
                    const maxSold = Math.max(...products.map((x) => x.sold), 1);
                    return (
                      <div key={p.id} className="flex items-center gap-4">
                        <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-gray-900 dark:text-white text-sm font-medium line-clamp-1">{p.name}</span>
                            <span className="text-gray-500 dark:text-gray-400 text-xs ml-2 flex-shrink-0">{p.sold} vendidos</span>
                          </div>
                          <div className="w-full bg-gray-100 dark:bg-slate-800 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all"
                              style={{ width: `${(p.sold / maxSold) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 p-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
                <ShieldCheckIcon className="w-5 h-5 text-green-400" /> Información del vendedor
              </h2>
              <div className="space-y-4">
                {[
                  { id: 'name', label: 'Nombre de tienda', value: sellerInfo.name, icon: <CubeIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" /> },
                  { id: 'email', label: 'Correo electrónico', value: sellerInfo.email, icon: <EnvelopeIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" /> },
                  { id: 'phone', label: 'Teléfono', value: sellerInfo.phone, icon: <PhoneIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" /> },
                  { id: 'date', label: 'Miembro desde', value: sellerInfo.memberSince, icon: <CalendarIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" /> },
                ].map((field) => (
                  <div key={field.label} className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-slate-800 rounded-lg">
                    {field.icon}
                    <div className="flex-1">
                      <p className="text-gray-500 text-xs">{field.label}</p>
                      <p className="text-gray-900 dark:text-white text-sm font-medium">{field.value}</p>
                    </div>
                    {field.id !== 'date' && (
                      <button 
                        onClick={openEditProfile}
                        className="text-gray-500 hover:text-green-400 transition-colors"
                      >
                        <PencilSquareIcon className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button 
                onClick={openEditProfile}
                className="w-full mt-5 py-2.5 bg-green-600 hover:bg-green-500 text-white rounded-lg font-medium transition-colors"
              >
                Editar Información
              </button>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 p-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <StarIcon className="w-5 h-5 text-yellow-400" /> Reputación y métricas
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-slate-800 rounded-lg">
                  <span className="text-gray-600 dark:text-gray-300">Calificación promedio</span>
                  <div className="flex items-center gap-1">
                    <StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-gray-900 dark:text-white font-bold">{sellerInfo.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-slate-800 rounded-lg">
                  <span className="text-gray-600 dark:text-gray-300">Total de reseñas</span>
                  <span className="text-gray-900 dark:text-white font-bold">{sellerInfo.totalReviews}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-slate-800 rounded-lg">
                  <span className="text-gray-600 dark:text-gray-300">Ventas completadas</span>
                  <span className="text-gray-900 dark:text-white font-bold">{sellerInfo.totalSales}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-slate-800 rounded-lg">
                  <span className="text-gray-600 dark:text-gray-300">Nivel de vendedor</span>
                  <span className="bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 text-xs px-3 py-1 rounded-full font-semibold">Platinum</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-gray-100 dark:bg-slate-800 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-500 dark:text-gray-400 text-xs">Progreso nivel</span>
                  <span className="text-gray-500 dark:text-gray-400 text-xs">78%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-2 rounded-full" style={{ width: '78%' }} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-800 sticky top-0 bg-white dark:bg-slate-900 z-10">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <PlusIcon className="w-5 h-5 text-green-400" />
                Agregar nuevo producto
              </h2>
              <button
                onClick={() => { setShowAddModal(false); setForm(EMPTY_FORM); setImagePreview(''); }}
                className="w-8 h-8 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-white hover:bg-gray-100 dark:bg-slate-800 rounded-lg transition-all"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                    URL de imagen del producto
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      placeholder="https://..."
                      value={form.imageUrl}
                      onChange={(e) => handleFormChange('imageUrl', e.target.value)}
                      className="w-full bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-white placeholder-gray-500 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-green-500 transition-colors"
                    />
                  </div>
                  <div className="w-full aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-slate-800 border-2 border-dashed border-gray-200 dark:border-slate-700 flex items-center justify-center relative">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" onError={() => setImagePreview(REFERENCE_IMAGE)} />
                    ) : (
                      <div className="text-center">
                        <img src={REFERENCE_IMAGE} alt="Referencia" className="w-full h-full object-cover opacity-30" />
                        <div className="absolute inset-0 flex items-center justify-center flex-col gap-2">
                          <ArrowUpTrayIcon className="w-8 h-8 text-gray-500 dark:text-gray-400" />
                          <p className="text-gray-500 dark:text-gray-400 text-xs">Vista previa</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1.5">
                      Nombre del producto <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: Smartphone Samsung Galaxy S24"
                      value={form.name}
                      onChange={(e) => handleFormChange('name', e.target.value)}
                      className="w-full bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-white placeholder-gray-500 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-green-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1.5">
                      Precio (COP) <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: 3500000"
                      value={form.price}
                      onChange={(e) => handleFormChange('price', e.target.value)}
                      className="w-full bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-white placeholder-gray-500 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-green-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1.5">
                      Stock disponible <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="number"
                      placeholder="Ej: 20"
                      value={form.stock}
                      onChange={(e) => handleFormChange('stock', e.target.value)}
                      className="w-full bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-white placeholder-gray-500 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-green-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1.5">Categoría</label>
                    <select
                      value={form.category}
                      onChange={(e) => handleFormChange('category', e.target.value)}
                      className="w-full bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-green-500 transition-colors"
                    >
                      <option value="">Selecciona una categoría</option>
                      <option value="Computadores">Computadores</option>
                      <option value="Smartphones">Smartphones</option>
                      <option value="Audio">Audio</option>
                      <option value="Fotografía">Fotografía</option>
                      <option value="Gaming">Gaming</option>
                      <option value="Tablets">Tablets</option>
                      <option value="Accesorios">Accesorios</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1.5">Descripción</label>
                <textarea
                  rows={3}
                  placeholder="Describe las características principales del producto..."
                  value={form.description}
                  onChange={(e) => handleFormChange('description', e.target.value)}
                  className="w-full bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-white placeholder-gray-500 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-green-500 transition-colors resize-none"
                />
              </div>

              <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <ChevronRightIcon className="w-4 h-4 text-green-400" />
                  Especificaciones técnicas
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { field: 'brand' as keyof ProductForm, label: 'Marca', placeholder: 'Ej: Samsung' },
                    { field: 'model' as keyof ProductForm, label: 'Modelo', placeholder: 'Ej: Galaxy S24 Ultra' },
                    { field: 'warranty' as keyof ProductForm, label: 'Garantía', placeholder: 'Ej: 1 año' },
                    { field: 'weight' as keyof ProductForm, label: 'Peso', placeholder: 'Ej: 250g' },
                    { field: 'dimensions' as keyof ProductForm, label: 'Dimensiones', placeholder: 'Ej: 15 x 7 x 0.9 cm' },
                  ].map(({ field, label, placeholder }) => (
                    <div key={field} className={field === 'dimensions' ? 'col-span-2' : ''}>
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">{label}</label>
                      <input
                        type="text"
                        placeholder={placeholder}
                        value={form[field]}
                        onChange={(e) => handleFormChange(field, e.target.value)}
                        className="w-full bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-white placeholder-gray-500 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500 transition-colors"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => { setShowAddModal(false); setForm(EMPTY_FORM); setImagePreview(''); }}
                  className="flex-1 py-3 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-gray-300 rounded-xl font-medium transition-colors border border-gray-200 dark:border-slate-700"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddProduct}
                  disabled={!form.name || !form.price || !form.stock}
                  className="flex-1 py-3 bg-green-500 hover:bg-green-400 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-all shadow-lg shadow-green-500/30"
                >
                  Publicar producto
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showEditProfileModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <PencilSquareIcon className="w-5 h-5 text-green-400" />
                Editar perfil de tienda
              </h2>
              <button
                onClick={() => setShowEditProfileModal(false)}
                className="w-8 h-8 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-white hover:bg-gray-100 dark:bg-slate-800 rounded-lg transition-all"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1.5">
                  Nombre de la tienda <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="TechStore"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1.5">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                  className="w-full bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="tienda@correo.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1.5">
                  Teléfono de contacto
                </label>
                <input
                  type="text"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  className="w-full bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="+57 300 000 0000"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowEditProfileModal(false)}
                  className="flex-1 py-2.5 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-gray-300 rounded-xl font-medium transition-colors border border-gray-200 dark:border-slate-700"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleUpdateProfile}
                  disabled={!profileForm.name.trim()}
                  className="flex-1 py-2.5 bg-green-500 hover:bg-green-400 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-all shadow-lg shadow-green-500/30"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm !== null && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-red-500/30 rounded-2xl p-8 w-full max-w-sm shadow-2xl text-center">
            <div className="w-14 h-14 bg-red-500/10 border border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrashIcon className="w-7 h-7 text-red-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">¿Eliminar producto?</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Esta acción no se puede deshacer. El producto será removido permanentemente.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 py-2.5 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-gray-300 rounded-xl font-medium transition-colors border border-gray-200 dark:border-slate-700"
              >
                Cancelar
              </button>
              <button
                onClick={() => deleteProduct(showDeleteConfirm)}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl font-semibold transition-all"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
