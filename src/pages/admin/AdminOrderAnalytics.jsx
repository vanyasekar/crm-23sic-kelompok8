
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useOrders } from "../../hooks/useOrders"; // Import custom hook
import AnalyticsPieChart from "../../components/AnalyticsPieChart";

export default function AdminOrderAnalytics() {
  // Panggil hook, tapi kita hanya butuh data untuk chart dan status loading
  const { layananData, statusData, loading } = useOrders();

  if (loading) {
    return <div className="p-6 text-center">Memuat data analitik...</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Analitik Pesanan</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Layanan Paling Populer</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={layananData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <XAxis dataKey="layanan" angle={-15} textAnchor="end" height={50} interval={0} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Status Pesanan</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statusData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <XAxis dataKey="status" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <AnalyticsPieChart/>
    </div>
    
  );
}