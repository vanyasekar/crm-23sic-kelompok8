import { Routes, Route } from "react-router-dom";

import UserLayout from "./components/MainLayout";
import AdminLayout from "./components/AdminLayout";

import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Unauthorized from "./pages/401";
import Forbidden from "./pages/Forbidden";

import Product from "./pages/Produk";
import ProductAntibacterial from "./pages/ProdukAntibacterial";
import ProductColor from "./pages/ProdukColor";
import ProductGreen from "./pages/ProdukGreen";

import SalesManagement from "./pages/SalesManagement";
import CustomerManagement from "./pages/CustomerManagement";
import Delivery from "./pages/Delivery";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/401" element={<Unauthorized />} />
      <Route path="/403" element={<Forbidden />} />

      {/* Routes with UserLayout */}
      <Route element={<UserLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/produk" element={<Product />} />
        <Route path="/produk/antibacterial-guard" element={<ProductAntibacterial />} />
        <Route path="/produk/color-care" element={<ProductColor />} />
        <Route path="/produk/green-clean" element={<ProductGreen />} />
        <Route path="/penjualan" element={<SalesManagement />} />
        <Route path="/pelanggan" element={<CustomerManagement />} />
        <Route path="/delivery" element={<Delivery />} />
      </Route>

      {/* Routes with AdminLayout */}
      <Route element={<AdminLayout />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
