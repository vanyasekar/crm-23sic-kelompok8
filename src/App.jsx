import { Routes, Route } from "react-router-dom";
//user
import UserLayout from "./components/MainLayout";
import AdminLayout from "./components/AdminLayout";
import RequireAuth from "./components/RequireAuth";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Unauthorized from "./pages/401";
import Forbidden from "./pages/Forbidden";

import Product from "./pages/Produk";
import ProductBioDetergency from "./pages/ProdukBioDetergency";
import ProductColor from "./pages/ProdukColor";
import ProductStainRemoval from "./pages/ProdukStainRemoval";
import ProductAntibacterial from "./pages/ProdukAntibacterial";
import ProductBriteWhite from "./pages/ProdukBriteWhite";

import FormPemesanan from "./pages/FormPemesanan";
import Delivery from "./pages/Delivery";

//admin
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrderAnalytics from "./pages/admin/AdminOrderAnalytics";
import AdminPesanan from "./pages/admin/AdminPesanan";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/401" element={<Unauthorized />} />
      <Route path="/403" element={<Forbidden />} />

      {/* User Layout with Protected Routes */}
      <Route
        path="/"
        element={
          <RequireAuth role="user">
            <UserLayout />
          </RequireAuth>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="produk" element={<Product />} />
        <Route path="produk/bio-detergency" element={<ProductBioDetergency />} />
        <Route path="produk/color-care" element={<ProductColor />} />
        <Route path="produk/stain-removal" element={<ProductStainRemoval />} />
        <Route path="produk/antibacterial-guard" element={<ProductAntibacterial />} />
        <Route path="produk/brite-white" element={<ProductBriteWhite />} />
        <Route path="form" element={<FormPemesanan />} />
        <Route path="delivery" element={<Delivery />} />
      </Route>

      {/* Admin Layout with Protected Route */}
      <Route
        path="/admin"
        element={
          <RequireAuth role="admin">
            <AdminLayout />
          </RequireAuth>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="laporan" element={<AdminOrderAnalytics/>}/>
        <Route path="pesanan" element={<AdminPesanan/>}/>
      </Route>
    </Routes>
  );
}

export default App;
