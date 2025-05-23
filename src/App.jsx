
import { Route, Routes } from "react-router-dom"


import MainLayout from "./components/MainLayout"
import Dashboard from "./Pages/Dashboard"
import SalesManagement from "./pages/SalesManagement"

function App() {
  return(

    <Routes>
      <Route element={<MainLayout/>}>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/penjualan" element={<SalesManagement/>}/>
      </Route>
    </Routes>
  )
}
export default App