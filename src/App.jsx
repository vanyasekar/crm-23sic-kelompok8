
import { Route, Routes } from "react-router-dom"


import MainLayout from "./components/MainLayout"
import Dashboard from "./Pages/Dashboard"
import Product from "./pages/Produk"

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/produk" element={<Product />} />
      </Route>
    </Routes>
  );
}
export default App