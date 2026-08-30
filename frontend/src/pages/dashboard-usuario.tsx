import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/navbaruser';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { PRODUCTOS, getFavorites } from './home-usuario';
import type { Producto } from './home-usuario';
import {
  UserIcon,
  CubeIcon,            
  HeartIcon,
  MapPinIcon,
  ChevronRightIcon,
  ShoppingBagIcon,
  CameraIcon,
  PhoneIcon,
  EnvelopeIcon,        
  CalendarIcon,
  ShieldCheckIcon,
  PencilSquareIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';

type Tab = 'overview' | 'orders' | 'saved' | 'profile';

export default function BuyerDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    memberSince: '',
    avatar: '',
    totalOrders: 0,
    totalSpent: 0,
    savedProducts: 0,
    addresses: 0,
  });
  const [loading, setLoading] = useState(true);
  const [favoriteProducts, setFavoriteProducts] = useState<Producto[]>([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    const favIds = getFavorites();
    setFavoriteProducts(PRODUCTOS.filter((p) => favIds.includes(p.id)));
  }, [activeTab]);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const res = await api.get("/user/dashboard/me");
      const data = res.data;

      setUserData({
        name: data.fullName || user?.name || "",
        email: data.email || user?.email || "",
        phone: data.tell || "",
        memberSince: data.memberSince ? new Date(data.memberSince).toLocaleDateString() : "",
        avatar: (data.fullName || "U").charAt(0).toUpperCase(),
        totalOrders: data.totalOrders || 0,
        totalSpent: data.totalSpent || 0,
        savedProducts: data.savedProducts || 0,
        addresses: data.addresses || 0,
      });
    } catch (err) {
      console.error("Error fetching user data:", err);
      if (user) {
        setUserData(prev => ({
          ...prev,
          name: user.name || "",
          email: user.email || "",
          avatar: user.name?.charAt(0)?.toUpperCase() || "U",
        }));
      }
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = (id: number) => {
    const current = getFavorites();
    const updated = current.filter((f) => f !== id);
    localStorage.setItem("favorites", JSON.stringify(updated));
    setFavoriteProducts((prev) => prev.filter((p) => p.id !== id));
    setUserData((prev) => ({ ...prev, savedProducts: updated.length }));
  };

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Resumen', icon: <UserIcon className="w-4 h-4" /> },
    { id: 'orders', label: 'Mis Pedidos', icon: <CubeIcon className="w-4 h-4" /> },
    { id: 'saved', label: 'Guardados', icon: <HeartIcon className="w-4 h-4" /> },
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

        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 mb-8 shadow-xl shadow-blue-500/20">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              <div className="w-24 h-24 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center text-4xl font-bold text-blue-400 shadow-lg border-4 border-white/20">
                {userData.avatar}
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-400 transition-colors">
                <CameraIcon className="w-4 h-4 text-white" />
              </button>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{userData.name}</h1>
              <p className="text-blue-100 mb-3">{userData.email}</p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-white/80">
                <div className="flex items-center gap-1">
                  <CalendarIcon className="w-4 h-4" />
                  <span>Miembro desde {userData.memberSince}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ShoppingBagIcon className="w-4 h-4" />
                  <span>{userData.totalOrders} compras realizadas</span>
                </div>
              </div>
            </div>
            <Link
              to="/home-usuario"
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-lg transition-colors border border-white/20"
            >
              <PencilSquareIcon className="w-4 h-4" />
              Editar perfil
            </Link>
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

        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Pedidos', value: userData.totalOrders, icon: <CubeIcon className="w-5 h-5 text-blue-400" /> },
                { label: 'Total gastado', value: `$${userData.totalSpent.toLocaleString()}`, icon: <ShoppingBagIcon className="w-5 h-5 text-green-400" /> },
                { label: 'Guardados', value: favoriteProducts.length, icon: <HeartIcon className="w-5 h-5 text-pink-400" /> },
                { label: 'Direcciones', value: userData.addresses, icon: <MapPinIcon className="w-5 h-5 text-yellow-400" /> },
              ].map((stat) => (
                <div key={stat.label} className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 p-5 hover:border-gray-200 dark:border-slate-700 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-500 dark:text-gray-400 text-sm">{stat.label}</span>
                    {stat.icon}
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
              ))}
            </div>

            {favoriteProducts.length > 0 && (
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">Productos guardados</h2>
                  <button onClick={() => setActiveTab('saved')} className="flex items-center gap-1 text-green-400 hover:text-green-300 text-sm">
                    Ver todos <ChevronRightIcon className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {favoriteProducts.slice(0, 3).map((p) => (
                    <div key={p.id} className="rounded-xl overflow-hidden bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:bg-slate-700 transition-all group cursor-pointer">
                      <div className="relative">
                        <img src={p.imagen} alt={p.nombre} className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-300" />
                        <button
                          onClick={() => removeFavorite(p.id)}
                          className="absolute top-2 right-2 w-7 h-7 bg-white dark:bg-slate-900/80 rounded-full flex items-center justify-center"
                        >
                          <HeartSolid className="w-3.5 h-3.5 text-pink-400" />
                        </button>
                      </div>
                      <div className="p-3">
                        <p className="text-gray-900 dark:text-white text-sm font-medium line-clamp-1">{p.nombre}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-green-400 font-bold text-sm">${(p.precio / 1000000).toFixed(1)}M</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {favoriteProducts.length === 0 && (
              <div className="text-center py-20 text-gray-500 dark:text-gray-400 bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800">
                <ShoppingBagIcon className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium">Bienvenido a Lubix</p>
                <p className="text-sm mt-1">Explora productos y empieza a comprar</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Todos mis pedidos</h2>
            <div className="text-center py-16 text-gray-500 dark:text-gray-400">
              <CubeIcon className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">No tienes pedidos aún</p>
              <p className="text-sm mt-1">Tus compras aparecerán aquí</p>
            </div>
          </div>
        )}

        {activeTab === 'saved' && (
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Productos guardados ({favoriteProducts.length})</h2>
            {favoriteProducts.length === 0 ? (
              <div className="text-center py-16 text-gray-500 dark:text-gray-400">
                <HeartIcon className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium">No tienes productos guardados</p>
                <p className="text-sm mt-1">Ve al inicio y haz clic en el corazón para guardar productos</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {favoriteProducts.map((p) => (
                  <div key={p.id} className="rounded-xl overflow-hidden bg-gray-100 dark:bg-slate-800 hover:shadow-lg hover:shadow-blue-500/10 transition-all group">
                    <div className="relative">
                      <img src={p.imagen} alt={p.nombre} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300" />
                      <button
                        onClick={() => removeFavorite(p.id)}
                        className="absolute top-3 right-3 w-8 h-8 bg-white dark:bg-slate-900/80 rounded-full flex items-center justify-center hover:bg-red-500/20 transition-colors"
                      >
                        <HeartSolid className="w-4 h-4 text-pink-400" />
                      </button>
                    </div>
                    <div className="p-4">
                      <p className="text-white font-semibold mb-2">{p.nombre}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-green-400 font-bold text-lg">${p.precio.toLocaleString('es-CO')}</span>
                      </div>
                      <button className="w-full mt-3 py-2 bg-green-500 hover:bg-green-400 text-white rounded-lg font-medium transition-colors">
                        Agregar al carrito
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 p-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
                <UserIcon className="w-5 h-5 text-blue-400" /> Información personal
              </h2>
              <div className="space-y-4">
                {[
                  { label: 'Nombre completo', value: userData.name, icon: <UserIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" /> },
                  { label: 'Correo electrónico', value: userData.email, icon: <EnvelopeIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" /> },
                  { label: 'Teléfono', value: userData.phone, icon: <PhoneIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" /> },
                  { label: 'Miembro desde', value: userData.memberSince, icon: <CalendarIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" /> },
                ].map((field) => (
                  <div key={field.label} className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-slate-800 rounded-lg">
                    {field.icon}
                    <div className="flex-1">
                      <p className="text-gray-500 text-xs">{field.label}</p>
                      <p className="text-gray-900 dark:text-white text-sm font-medium">{field.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 p-6">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <ShieldCheckIcon className="w-5 h-5 text-green-400" /> Seguridad
                </h2>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between p-3 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:bg-slate-700 rounded-lg transition-colors">
                    <span className="text-white text-sm">Cambiar contraseña</span>
                    <ChevronRightIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:bg-slate-700 rounded-lg transition-colors">
                    <span className="text-white text-sm">Verificación en 2 pasos</span>
                    <ChevronRightIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
