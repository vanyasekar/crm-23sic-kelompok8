
import { Route, Routes } from "react-router-dom"


import MainLayout from "./components/MainLayout"
import Dashboard from "./pages/Dashboard"
import SalesManagement from "./pages/SalesManagement"
import Product from "./pages/Produk";
import CustomerManagement from "./pages/CustomerManagement";

function App() {
  return (
    <Routes>

      <Route element={<MainLayout />}>
        
          <Route path="/" element={<Dashboard />} />
          
          <Route path="/produk" element={<Product />} />
          <Route path="/Pelanggan" element={<CustomerManagement />} />
          <Route path="/penjualan" element={<SalesManagement />} />
        
      </Route>

    

    </Routes>
  );
}
export default App