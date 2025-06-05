
import { Route, Routes } from "react-router-dom"


import MainLayout from "./components/MainLayout"
import Dashboard from "./Pages/Dashboard"
import SalesManagement from "./pages/SalesManagement"
import Login from "./pages/Login"
import Product from "./pages/Produk"
import Unauthorized from "./pages/401";
import ProductAntibacterial from "./pages/ProdukAntibacterial"
import ProductColor from "./pages/ProdukColor"
import ProductGreen from "./pages/ProdukGreen"



function App() {
  return(

    <Routes>
      <Route element={<MainLayout/>}>
        <Route path="/401" element={<Unauthorized />} />
        <Route path="/" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/produk" element={<Product/>}/>
          <Route path="/produk/antibacterial-guard" element={<ProductAntibacterial/>}/>
          <Route path="/produk/color-care" element={<ProductColor/>}/>
          <Route path="/produk/green-clean" element={<ProductGreen/>}/>
        <Route path="/penjualan" element={<SalesManagement/>}/>

      </Route>
    </Routes>
  )
}
export default App