import { useState } from 'react'
import { FiDollarSign } from "react-icons/fi"
import { FaUserFriends } from "react-icons/fa"
import {
  LayoutDashboard,
  ShoppingCart,
  Box,
  BarChart2,
  Settings,
  LogIn,
  UserPlus,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const location = useLocation()
  const [openSubmenu, setOpenSubmenu] = useState(false)

  const isActive = (path) => location.pathname === path

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard />, path: '/' },
    { name: 'Produk', icon: <Box />, path: '/produk' },
    { name: 'Laporan', icon: <BarChart2 />, path: '/laporan' },
    { name: 'Delivery', icon: <ShoppingCart />, path: '/delivery' }
  ]

  const accountItems = [
    { name: 'Pengaturan Akun', icon: <Settings />, path: '/akun' },
    { name: 'Sign In', icon: <LogIn />, path: '/signin' },
    { name: 'Sign Up', icon: <UserPlus />, path: '/signup' }
  ]

  return (
    <aside className="bg-white w-64 h-screen shadow-lg px-4 py-6 hidden md:block">
      <div className="text-xl font-bold mb-8 text-purple-700">UMKM CRM</div>

      {/* Menu Utama */}
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-purple-100 transition ${
              isActive(item.path)
                ? 'bg-purple-200 text-purple-800 font-semibold'
                : 'text-gray-700'
            }`}
          >
            <span className="w-5 h-5">{item.icon}</span>
            {item.name}
          </Link>
        ))}

        {/* Dropdown Pelanggan */}
        <div>
          <button
            onClick={() => setOpenSubmenu(!openSubmenu)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-purple-100 transition ${
              location.pathname.startsWith('/pelanggan')
                ? 'bg-purple-200 text-purple-800 font-semibold'
                : 'text-gray-700'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="w-5 h-5"><FaUserFriends /></span>
              Pelanggan
            </div>
            {openSubmenu ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          {openSubmenu && (
            <div className="ml-8 mt-1 space-y-1">
              <Link
                to="/pelanggan"
                className={`block px-2 py-1 rounded hover:bg-purple-100 ${
                  isActive('/pelanggan') ? 'text-purple-700 font-medium' : 'text-gray-700'
                }`}
              >
                Data Pelanggan
              </Link>
              <Link
                to="/pelanggan/status"
                className={`block px-2 py-1 rounded hover:bg-purple-100 ${
                  isActive('/pelanggan/status') ? 'text-purple-700 font-medium' : 'text-gray-700'
                }`}
              >
                Status Laundry
              </Link>
              <Link
                to="/pelanggan/jadwal-penjemputan"
                className={`block px-2 py-1 rounded hover:bg-purple-100 ${
                  isActive('/pelanggan/jadwal-penjemputan') ? 'text-purple-700 font-medium' : 'text-gray-700'
                }`}
              >
                Jadwal Penjemputan
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Akun */}
      <div className="mt-8 text-xs font-semibold text-gray-500">AKUN</div>
      <nav className="mt-2 space-y-1">
        {accountItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-purple-100 transition ${
              isActive(item.path)
                ? 'bg-purple-200 text-purple-800 font-semibold'
                : 'text-gray-700'
            }`}
          >
            <span className="w-5 h-5">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar

