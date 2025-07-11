import { FiLogOut } from "react-icons/fi"; 
import { GiClothes } from "react-icons/gi"; 
import {
  LayoutDashboard,
  ShoppingCart,  // untuk delivery
  Box,           // untuk produk
  BarChart2,     // untuk laporan
  Settings,      // untuk pengaturan akun
  LogIn,         // untuk sign in
  
} from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // Pastikan path ini benar

// Data bisa kita letakkan di luar komponen karena tidak berubah
const menuItems = [
  { name: 'Dashboard', icon: <LayoutDashboard />, path: '/admin/dashboard' },
  { name: 'Pesanan', icon: <GiClothes  />, path: '/admin/pesanan' },
  { name: 'Laporan', icon: <BarChart2 />, path: '/admin/laporan' },
  { name: 'Delivery', icon: <ShoppingCart />, path: '/admin/delivery' }
]

const accountItems = [
  { name: 'Pengaturan Akun', icon: <Settings />, path: '/akun' },
  // Kita akan menangani Log Out secara khusus
  { name: 'Log Out', icon: <FiLogOut />, path: '/logout' }, 
];


// --- KOMPONEN KECIL & BISA DIPAKAI ULANG ---
// Komponen ini bertanggung jawab untuk me-render satu link sidebar
function SidebarLink({ item, isActive }) {
  return (
    <Link
      to={item.path}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
        isActive
          ? 'bg-purple-600 text-white font-semibold shadow-md'
          : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700'
      }`}
    >
      <span className="w-5 h-5">{item.icon}</span>
      {item.name}
    </Link>
  );
}


// --- KOMPONEN UTAMA SIDEBAR ---
export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  // Fungsi untuk menangani proses logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/'); // Arahkan ke halaman utama atau login setelah logout
  };

  return (
    // Menggunakan flex-col untuk tata letak vertikal
    <aside className="bg-white w-64 h-screen shadow-lg p-4 flex flex-col hidden md:flex">
      <div className="text-2xl font-bold mb-10 text-center text-purple-700">
        UMKM CRM
      </div>

      {/* --- Bagian Menu Utama --- */}
      <nav className="flex-grow">
        <p className="text-xs font-semibold text-gray-400 mb-2 px-3">MENU</p>
        <div className="space-y-1">
          {menuItems.map((item) => (
            <SidebarLink key={item.name} item={item} isActive={isActive(item.path)} />
          ))}
        </div>
      </nav>

      {/* --- Bagian Akun (Akan menempel di bawah) --- */}
      <div className="mt-auto"> {/* 'mt-auto' mendorong blok ini ke bawah */}
        <p className="text-xs font-semibold text-gray-400 mb-2 px-3">AKUN</p>
        <div className="space-y-1">
          {accountItems.map((item) => {
            // Tangani kasus "Log Out" secara khusus
            if (item.name === 'Log Out') {
              return (
                <button
                  key={item.name}
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200"
                >
                  <span className="w-5 h-5">{item.icon}</span>
                  {item.name}
                </button>
              );
            }
            // Untuk item lainnya, gunakan komponen SidebarLink
            return <SidebarLink key={item.name} item={item} isActive={isActive(item.path)} />;
          })}
        </div>
      </div>
    </aside>
  );
}