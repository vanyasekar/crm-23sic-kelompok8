import { Routes, Route } from "react-router-dom"

import MainLayout from "./components/MainLayout"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Unauthorized from "./pages/401"

import Product from "./pages/Produk"
import ProductAntibacterial from "./pages/ProdukAntibacterial"
import ProductColor from "./pages/ProdukColor"
import ProductGreen from "./pages/ProdukGreen"

import SalesManagement from "./pages/SalesManagement"
import CustomerManagement from "./pages/CustomerManagement"
import Delivery from "./pages/Delivery"
import EstimatePage from "./pages/EstimatePage"
import StatusLaundry from "./pages/StatusLaundry"
import JadwalPenjemputan from "./pages/JadwalPenjemputan"

function App() {
  return (
    <Routes>
      {/* Layout utama untuk semua halaman setelah login */}
      <Route element={<MainLayout />}>
        {/* Halaman tidak punya akses */}
        <Route path="/401" element={<Unauthorized />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Produk & Subproduk */}
        <Route path="/produk" element={<Product />} />
        <Route path="/produk/antibacterial-guard" element={<ProductAntibacterial />} />
        <Route path="/produk/color-care" element={<ProductColor />} />
        <Route path="/produk/green-clean" element={<ProductGreen />} />

        {/* Manajemen Penjualan & Pelanggan */}
        <Route path="/penjualan" element={<SalesManagement />} />
        <Route path="/pelanggan" element={<CustomerManagement />} />
        <Route path="/estimasi" element={<EstimatePage/> } />
        <Route path="/pelanggan/jadwal-penjemputan" element={<JadwalPenjemputan/>} />,

        {/* Pengantaran */}
        <Route path="/delivery" element={<Delivery />} />
        <Route path="pelanggan/status" element={<StatusLaundry/>} />
      </Route>

      {/* Login (tanpa layout) */}
      <Route path="/" element={<Login />} />
    </Routes>
  )
}

export default App
